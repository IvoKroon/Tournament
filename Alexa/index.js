"use strict";
const Alexa = require("alexa-sdk");
const data = require("../data/index");

const APP_ID = "amzn1.ask.skill.2285d1c7-cebc-475c-8ebe-9a9ea47625b2";

const SKILL_NAME = "Tournament";
const HELP_MESSAGE = "You can ask all sort of questions about the tournament.";
const HELP_REPROMPT = "What can I help you with?";
const STOP_MESSAGE = "Goodbye!";

function findPositionById(id) {
  let position = null;
  for (let i = 0; i < data.tournament.length; i++) {
    if (id == data.tournament[i].id) {
      position = i;
    }
  }
  switch (position) {
    case 1:
      return "first place";
    case 2:
      return "second place";
    case 3:
      return "third place";
    case 4:
      return "fourth place";
    default:
      return null;
  }
}

const handlers = {
  getTeam: function() {
    // console.log(data);
    const { slots } = this.event.request.intent;
    const requestId =
      slots.name.resolutions.resolutionsPerAuthority[0].values[0].value.id;
    console.log(requestId);
    const { description, points, name } = data.teams[requestId];
    const position = findPositionById(requestId);
    const message = `The team ${name} has ${points} points and there position is ${position}`;
    // this.response.cardRenderer(SKILL_NAME, message);
    // const { slots } = this.event.request.intent;
    // const nameSlot = this.event.request.intent.slots.name.value;
    // console.log(slots.name.value);
    // // console.log(this.event.request.intent.slots.resolutions.resolutionsPerAuthority:)
    // console.log(
    //   slots.name.resolutions.resolutionsPerAuthority[0].values[0].value.id
    // );
    this.response.speak(message);
    this.emit(":responseReady");
  },
  LaunchRequest: function() {
    getLastAddedRecord().then(data => {
      console.log(data);
      const message = `Title is = ${data.title}`;
      this.response.cardRenderer(SKILL_NAME, message);
      this.response.speak(message);
      this.emit(":responseReady");
    });
    // this.emit("GetNewFactIntent");
  },
  SayHey: function() {
    const message = "Just say hey";
    this.response.speak(message).listen("reprompt");
    this.emit(":responseReady");
  },
  "AMAZON.YesIntent": function() {
    console.log("HANDLE");
    // raise the `SomethingIntent` event, to pass control to the "SomethingIntent" handler below
    const message = "Yes answer";
    // this.response.cardRenderer(SKILL_NAME, message);
    this.response.speak(message);
    this.emit(":responseReady");
  },
  "AMAZON.NoIntent": function() {
    // handle the case when user says No
    this.emit(":responseReady");
  },
  "AMAZON.HelpIntent": function() {
    const speechOutput = HELP_MESSAGE;
    const reprompt = HELP_REPROMPT;

    this.response.speak(speechOutput).listen(reprompt);
    this.emit(":responseReady");
  },
  "AMAZON.CancelIntent": function() {
    this.response.speak(STOP_MESSAGE);
    this.emit(":responseReady");
  },
  "AMAZON.StopIntent": function() {
    this.response.speak(STOP_MESSAGE);
    this.emit(":responseReady");
  },
  "AMAZON.FallbackIntent": function() {
    console.log(this.event);
    this.response.speak("Error");
    this.emit(":responseReady");
  }
};

exports.handler = function(event, context, callback) {
  console.log("HANDELE");
  const alexa = Alexa.handler(event, context, callback);
  alexa.appId = APP_ID;
  alexa.registerHandlers(handlers);
  alexa.execute();
};
