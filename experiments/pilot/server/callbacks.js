import Empirica from "meteor/empirica:core";
import {names, avatarNames, nameColors} from './constants.js';
import _ from "lodash";
const { MongoClient } = require("mongodb");

const MONGO_URI = Meteor.settings["galaxy.meteor.com"]["env"]["MONGO_URL"];
const DB_NAME = "tangrams";
const COLLECTION_NAME = "game_config_files";

function typeOf(obj) {
  return {}.toString.call(obj).split(' ')[1].slice(0, -1).toLowerCase();
}

async function updateConfigInDB(configPath, game_id){
  var client = new MongoClient(MONGO_URI);
  await client.connect();
  await client
    .db(DB_NAME)
    .collection(COLLECTION_NAME)
    .updateOne({ path: configPath }, { $push: { gameIds: game_id } });
  await client.close();
  console.log("update ", game_id, "in json ", configPath);
}


// onGameStart is triggered once per game before the game starts, and before
// the first onRoundStart. It receives the game and list of all the players in
// the game.
Empirica.onGameStart((game) => {
  console.log("game is starting")
  const players = game.players;
  updateConfigInDB(game.get("configFile"), game._id);
  console.debug("game ", game._id, " started");

  const teamColor = game.treatment.teamColor;

  players.forEach(player => {
    if (players[0]._id === player._id) {
      player.set('partner', players[1]._id);
    }
    else {
      player.set('partner', players[0]._id);
    }
  });
  players.forEach((player, i) => {
    player.set("name", names[i]);
    player.set("avatar", `/avatars/jdenticon/${avatarNames[teamColor][i]}`);
    player.set("avatarName", avatarNames[teamColor][i]);
    player.set("nameColor", nameColors[teamColor][i]);
    player.set("roleIdx", i)
    player.set("bonus", 0);
    player.set('clicked', false);
  });
  console.log("finish onGameStart")
});

// onRoundStart is triggered before each round starts, and before onStageStart.
// It receives the same options as onGameStart, and the round that is starting.
Empirica.onRoundStart((game, round) => {
  const players = game.players;
  // const rooms = game.get('rooms')[round.index];
  round.set("chat", []);
  round.set("keyPressed", false);
  players.forEach(player => {
    player.set('role', round.get('roles')[player.get("roleIdx")])
    player.set('clicked', false);
  });
});

// onRoundStart is triggered before each stage starts.
// It receives the same options as onRoundStart, and the stage that is starting.
Empirica.onStageStart((game, round, stage) => {
  const players = game.players;
  console.debug("Round ", stage.name, "game", game._id, " started");
  stage.set("log", [
    {
      verb: stage.name + "Started",
      roundId: stage.name,
      at: new Date(),
    },
  ]);
});

// onStageEnd is triggered after each stage.
// It receives the same options as onRoundEnd, and the stage that just ended.
Empirica.onStageEnd((game, round, stage) => {});

// onRoundEnd is triggered after each round.
Empirica.onRoundEnd((game, round) => {
  const players = game.players;
  const target = round.get('target');
  const correctAnswer = target

  // Update player scores
  players.forEach(player => {
    const selectedAnswer = player.get("clicked")["path"];
    const currScore = player.get("bonus") || 0;
    const scoreIncrement = selectedAnswer === correctAnswer ? 0.03 : 0;
    player.set("bonus", scoreIncrement + currScore);
  });
  round.set('response', players[0].get('clicked'));
  round.set('correct', correctAnswer == players[0].get('clicked')["path"]);

});

// onRoundEnd is triggered when the game ends.
// It receives the same options as onGameStart.
Empirica.onGameEnd((game) => {
  console.debug("The game", game._id, "has ended");
});

// ===========================================================================
// => onSet, onAppend and onChanged ==========================================
// ===========================================================================

// onSet, onAppend and onChanged are called on every single update made by all
// players in each game, so they can rapidly become quite expensive and have
// the potential to slow down the app. Use wisely.
//
// It is very useful to be able to react to each update a user makes. Try
// nontheless to limit the amount of computations and database saves (.set)
// done in these callbacks. You can also try to limit the amount of calls to
// set() and append() you make (avoid calling them on a continuous drag of a
// slider for example) and inside these callbacks use the `key` argument at the
// very beginning of the callback to filter out which keys your need to run
// logic against.
//
// If you are not using these callbacks, comment them out so the system does
// not call them for nothing.

// // onSet is called when the experiment code call the .set() method
// // on games, rounds, stages, players, playerRounds or playerStages.
Empirica.onSet(
  (
    game,
    round,
    stage,
    player, // Player who made the change
    target, // Object on which the change was made (eg. player.set() => player)
    targetType, // Type of object on which the change was made (eg. player.set() => "player")
    key, // Key of changed value (e.g. player.set("score", 1) => "score")
    value, // New value
    prevValue // Previous value
  ) => {
    // Compute score after player clicks
    if ((targetType == "round") && (key == "keyPressed")) {
      if (prevValue == false && value == true) {
        round.set("secUntilKeyPress", 60 - round.get("lastKeyPressedTime"));
      }
    }
  }
);

// // onAppend is called when the experiment code call the `.append()` method
// // on games, rounds, stages, players, playerRounds or playerStages.
// Empirica.onAppend((
//   game,
//   round,
//   stage,
//   players,
//   player, // Player who made the change
//   target, // Object on which the change was made (eg. player.set() => player)
//   targetType, // Type of object on which the change was made (eg. player.set() => "player")
//   key, // Key of changed value (e.g. player.set("score", 1) => "score")
//   value, // New value
//   prevValue // Previous value
// ) => {
//   // Note: `value` is the single last value (e.g 0.2), while `prevValue` will
//   //       be an array of the previsous valued (e.g. [0.3, 0.4, 0.65]).
// });

// // onChange is called when the experiment code call the `.set()` or the
// // `.append()` method on games, rounds, stages, players, playerRounds or
// // playerStages.
// Empirica.onChange((
//   game,
//   round,
//   stage,
//   players,
//   player, // Player who made the change
//   target, // Object on which the change was made (eg. player.set() => player)
//   targetType, // Type of object on which the change was made (eg. player.set() => "player")
//   key, // Key of changed value (e.g. player.set("score", 1) => "score")
//   value, // New value
//   prevValue, // Previous value
//   isAppend // True if the change was an append, false if it was a set
// ) => {
//   // `onChange` is useful to run server-side logic for any user interaction.
//   // Note the extra isAppend boolean that will allow to differenciate sets and
//   // appends.
// });
