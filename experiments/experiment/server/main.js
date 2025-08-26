import Empirica from "meteor/empirica:core";
import "./callbacks.js";
import "./bots.js";
import { tangramsRelativeDir } from "./private.json";
import _ from "lodash";
import path from "path";
const { MongoClient } = require("mongodb");

const fs = require("fs"); // read files
const MONGO_URI = Meteor.settings["galaxy.meteor.com"]["env"]["MONGO_URL"];
const DB_NAME = "tangrams";
const COLLECTION_NAME = "game_config_files";
const BASE_CONFIGURATION_PATH = "/games/";
const NUMBER_OF_JSONS = 19;
// var game_index = 0;

function shuffle(a) {
  var j, x, i;
  var d = _.cloneDeep(a);
  for (i = d.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1));
    x = d[i];
    d[i] = d[j];
    d[j] = x;
  }
  return d;
}

export function getOrderedImages(images, tangramsOrder) {
  var new_images = Array(images.length);
  for (i = 0; i < images.length; i++) {
    new_images[tangramsOrder[i]] = images[i];
  }
  return new_images;
}

// async function getGamePath(client) {
//   // get the lowest n_used game path and update the db
//   var min_n_used = await client
//     .db(DB_NAME)
//     .collection(COLLECTION_NAME)
//     .findOne({ name: "min_n_used" });
//   console.log(min_n_used);
//   var result = await client
//     .db(DB_NAME)
//     .collection(COLLECTION_NAME)
//     .findOne({ n_used: min_n_used["min_value"], valid: true });
//   while (result == null) {
//     min_n_used["min_value"] += 1;
//     await client
//       .db(DB_NAME)
//       .collection(COLLECTION_NAME)
//       .updateOne({ name: "min_n_used" }, { $set: min_n_used });
//     result = await client
//       .db(DB_NAME)
//       .collection(COLLECTION_NAME)
//       .findOne({ n_used: min_n_used["min_value"], valid: true });
//   }
//   console.log(result);
//   return result["path"];
// }

// async function changeGamePath() {
//   try {
//     var client = new MongoClient(MONGO_URI);
//     await client.connect();
//     var path = await getGamePath(client);
//     await client.close();
//     // change next game path
//     nextGamePath = path;
//     console.log("nextGamePath: " + nextGamePath);
//   } catch (e) {
//     console.error(e);
//   }
// }

// async function increseAndChange(path) {
//   var client = new MongoClient(MONGO_URI);
//   await client.connect();
//   console.log("use: " + path);
//   await client
//     .db(DB_NAME)
//     .collection(COLLECTION_NAME)
//     .updateOne({ path: path }, { $inc: { n_used: 1 } });
//   path = await getGamePath(client);
//   // change game path
//   nextGamePath = path;
//   await client.close();
//   console.log("nextGamePath: " + nextGamePath);
// }

// var nextGamePath = "";
// changeGamePath();

// function getConfigName(divergence_level){
//   var prefix;
//   if (divergence_level == "low") {
//     prefix = "mix_divergence_l";
//   } else {
//     prefix = "mix_divergence_h";
//   }
//   var game_index = Math.floor(Math.random() * NUMBER_OF_JSONS);
//   return BASE_CONFIGURATION_PATH + prefix + "_" + (game_index).toString() + "_.json";
// }

async function increaseConfigInDB(configPath) {
  var client = new MongoClient(MONGO_URI);
  await client.connect();
  await client
    .db(DB_NAME)
    .collection(COLLECTION_NAME)
    .updateOne({ path: configPath }, { $inc: { n_used: 1 } });
}

// gameInit is where the structure of a game is defined.  Just before
// every game starts, once all the players needed are ready, this
// function is called with the treatment and the list of players.  You
// must then add rounds and stages to the game, depending on the
// treatment and the players. You can also get/set initial values on
// your game, players, rounds and stages (with get/set methods), that
// will be able to use later in the game.
Empirica.gameInit((game, treatment) => {
  console.log(
    "Game with a treatment: ",
    treatment,
    " will start, with workers",
    _.map(game.players, "id")
  );

  // Sample whether on the blue team or red team
  game.set("teamColor", treatment.teamColor);

  // Sample whether to use tangram set A or set B
  game.set("gameSet", treatment.gameSet);
  game.set("team", game.players.length > 1);

  function typeOf(obj) {
    return {}.toString.call(obj).split(" ")[1].slice(0, -1).toLowerCase();
  }

  // I use this to play the sound on the UI when the game starts
  game.set("justStarted", true);

  // console.log("gamePath:");
  // console.log(nextGamePath);
  // game.set("gamePath", nextGamePath);

  basePath = path.join(__meteor_bootstrap__.serverDir, "../web.browser/app"); // directory for folders in /public after built
  var configName =
    BASE_CONFIGURATION_PATH +
    "ref2_pilot5_binned_threads_" +
    treatment.configIndex.toString() +
    "_phase2_3.json";
  // console.log("divergence level: " + treatment.divergence);
  // var configName = getConfigName(treatment.divergence);
  console.log("use " + configName);
  configPath = basePath + configName;
  increaseConfigInDB("public" + configName);
  game.set("configFile", "public" + configName);
  // nextGamePath.split("public")[1];
  // increseAndChange(nextGamePath);

  let rawdata = fs.readFileSync(configPath);
  let gameFile = JSON.parse(rawdata);
  var gameConfig_phase2 = gameFile["trials"]["phase2"];
  var gameConfig_phase3 = gameFile["trials"]["phase3"];

  /******************************/
  /** PHASE 2 INSTRUCTION */
  /******************************/
  game.addRound().addStage({
    name: "phase2-instruction",
    displayName: "Phase 2 Instruction",
    durationInSeconds: "45",
  });

  /******************************/
  /** PHASE 2 */
  /******************************/
  // configuration for each trial
  var trialNum = 1;
  var allChatModes = new Set();
  for (let i = 0; i < gameConfig_phase2.length; i++) {
    trialConfig = gameConfig_phase2[i];
    // create data for each tangram
    imagesConfig = trialConfig["images"];
    for (let j = 0; j < imagesConfig.length; j++) {
      imageConfig = imagesConfig[j];
      imagePath = basePath + tangramsRelativeDir + imageConfig["path"];
      trialConfig["images"][j]["data"] = fs.readFileSync(imagePath, "utf8");
      if ("coloring-reassigment" in imageConfig) {
        coloringMap = {};
        imageConfig["coloring-reassigment"].map((element, index) => {
          coloringMap[element["id"]] = element["color"];
        });
        trialConfig["images"][j]["coloring-reassigment"] = coloringMap;
      }
    }
    const round = game.addRound();
    round.set("chat", []);
    round.set("numTrials", gameConfig_phase2.length);
    round.set("trialNum", trialNum);
    trialNum++;
    round.set("numPartners", 1);
    round.set("tangrams", [
      getOrderedImages(trialConfig["images"], trialConfig["tangrams_order"][0]),
      getOrderedImages(trialConfig["images"], trialConfig["tangrams_order"][1]),
    ]);
    round.set("numTangrams", trialConfig["images"].length);
    round.set("target", trialConfig["target"]); // trialConfig["images"][parseInt(trialConfig["target"])]["path"]
    round.set("block", trialConfig["block"]);
    round.set("controled", trialConfig["target_controled"]);
    round.set("roles", trialConfig["roles"]);
    round.set("chatMode", trialConfig["chat_mode"]);
    round.set("phase", 2);
    allChatModes.add(trialConfig["chat_mode"]);
    if (trialConfig["roles"][0] == "listener") {
      round.set("listener", game.players[0]);
      round.set("speaker", game.players[1]);
    } else {
      round.set("speaker", game.players[0]);
      round.set("listener", game.players[1]);
    }
    round.addStage({
      name: "description",
      displayName: "Description",
      durationInSeconds: "99999999999", //treatment.selectionDuration, 99999999999
    });
  }

  /******************************/
  /** PHASE 3 INSTRUCTION */
  /******************************/
  game.addRound().addStage({
    name: "phase3-instruction",
    displayName: "Phase 3 Instruction",
    durationInSeconds: "30",
  });

  /******************************/
  /** PHASE 3 **/
  /******************************/
  var trialNum = 1;
  for (let i = 0; i < gameConfig_phase3.length; i++) {
    trialConfig = gameConfig_phase3[i];
    // create data for each tangram
    imagesConfig = trialConfig["images"];
    for (let j = 0; j < imagesConfig.length; j++) {
      imageConfig = imagesConfig[j];
      imagePath = basePath + tangramsRelativeDir + imageConfig["path"];
      trialConfig["images"][j]["data"] = fs.readFileSync(imagePath, "utf8");
      if ("coloring-reassigment" in imageConfig) {
        coloringMap = {};
        imageConfig["coloring-reassigment"].map((element, index) => {
          coloringMap[element["id"]] = element["color"];
        });
        trialConfig["images"][j]["coloring-reassigment"] = coloringMap;
      }
    }
    const round = game.addRound();
    round.set("chat", []);
    round.set("numTrials", gameConfig_phase3.length);
    round.set("trialNum", trialNum);
    trialNum++;
    round.set("numPartners", 1);
    round.set("tangrams", [
      getOrderedImages(trialConfig["images"], trialConfig["tangrams_order"][0]),
      getOrderedImages(trialConfig["images"], trialConfig["tangrams_order"][1]),
    ]);
    round.set("numTangrams", trialConfig["images"].length);
    round.set("target", trialConfig["target"]); // trialConfig["images"][parseInt(trialConfig["target"])]["path"]
    round.set("block", trialConfig["block"]);
    round.set("controled", trialConfig["target_controled"]);
    round.set("roles", trialConfig["roles"]);
    round.set("chatMode", trialConfig["chat_mode"]);
    round.set("phase", 3);
    allChatModes.add(trialConfig["chat_mode"]);
    if (trialConfig["roles"][0] == "listener") {
      round.set("listener", game.players[0]);
      round.set("speaker", game.players[1]);
    } else {
      round.set("speaker", game.players[0]);
      round.set("listener", game.players[1]);
    }
    round.addStage({
      name: "descriptionNoFeedback",
      displayName: "Description",
      durationInSeconds: "60", //treatment.selectionDuration, 99999999999
    });
  }

  game.set("allChatModes", allChatModes);
  // console.log("finish initialize rounds");
});
