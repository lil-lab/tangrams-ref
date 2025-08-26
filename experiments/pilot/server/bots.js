import Empirica from "meteor/empirica:core";
import {HTTP } from "meteor/http"



function sendMessage(round, bot, message) {
  const room = bot.get('roomId')
  round.append("chat", {
    text: message, // "I am a bot sending a message"
    playerId: bot._id,
    target: round.get('target')[room],
    role: bot.get('role')
  });
}

function chooseTarget(target_path, game, bot) {
  // const partner = _.find(game.players, p => p._id === bot.get('partner'));
  // const room = bot.get('roomId')
  const partner = _.find(game.players, p => p._id === bot.get('partner'));
  console.log('bot clicked on ' + target_path);
  bot.set('clicked', target_path)
  partner.set('clicked', target_path)
  bot.stage.submit()
  Meteor.setTimeout(() => bot.stage.submit(), 3000);
  Meteor.setTimeout(() => partner.stage.submit(), 3000);
}

function getDescription(data, round, bot) {
  HTTP.call( 'POST', "http://localhost:2000/generate_description", {
    data: data
  }, function( error, response ) {
    if ( error ) {
      console.log('error getting stims');
      console.log( error );
    } else {
      console.log('got generate_description');
      console.log(response);
      sendMessage(round, bot, response.content)
    }
  });
}

function predictTarget(data, game, bot) {
  HTTP.call( 'POST', "http://localhost:2000/predict_target", {
    data: data
  }, function( error, response ) {
    if ( error ) {
      console.log('error getting stims');
      console.log( error );
    } else {
      console.log('got predict_target');
      console.log(response);
      chooseTarget(response.content, game, bot)
    }
  });
}




Empirica.bot("bob", {
  // Called during each stage at tick interval (~1s at the moment)
  onStageTick(bot, game, round, stage, secondsRemaining) {
    console.log(secondsRemaining)

    // Have the bot click when < 5 seconds remaining
    // if (secondsRemaining < 5) {
    //   bot.stage.submit()
    // }

    // if the bot is a speaker, genrate a description
    if (bot.get('role') === "speaker") {
      if (secondsRemaining % 20 === 10) {
        // const { tangram, tangram_num, round, stage, player, target, ...rest } = this.props;
        console.log(round)
        // console.log(this.props) // undefined
        // console.log(bot.get('tangramURLs'))

        data = {'image_pathes': bot.get('tangramURLs'), 'target': round.get('target')[bot.get('roomId')]}
        getDescription(data, round, bot)
      }
    }

    // if the bot is a listener, predict the target
    if (bot.get('role') === "listener") {
      const speakerMsgs = _.filter(round.get("chat"), msg => {
        return msg.role == 'speaker' & msg.playerId == bot.get('partner')
      })
      if ((speakerMsgs.length > 0) & (secondsRemaining % 20 === 10)) {
        // const { tangram, tangram_num, round, stage, player, target, ...rest } = this.props;
        console.log(round)
        // console.log(this.props) // undefined
        // console.log(bot.get('tangramURLs'))
        // const speakerMsgs = _.filter(round.get("chat"), msg => {
        //   return msg.role == 'speaker' & msg.playerId == player.get('partner')
        // })
        // console.log(speakerMsgs)
        console.log(speakerMsgs[speakerMsgs.length-1])
        lastMsg = speakerMsgs[speakerMsgs.length-1].text
        // const chat = round.get("chat")
        data = {'image_pathes': bot.get('tangramURLs'), 'description': lastMsg}
        predictTarget(data, game, bot)
      }
    }

  }

  // // NOT SUPPORTED A player has changed a value
  // // This might happen a lot!
  // onStagePlayerChange(bot, game, round, stage, players, player) {}

  // // NOT SUPPORTED Called at the end of the stage (after it finished, before onStageEnd/onRoundEnd is called)
  // onStageEnd(bot, game, round, stage, players) {}
});
