"use strict";
const Alexa = require("alexa-sdk");
const {findPositionById, getTeam} = require('../data/dataHandler');

const APP_ID = "amzn1.ask.skill.2285d1c7-cebc-475c-8ebe-9a9ea47625b2";

const SKILL_NAME = "Tournament";
const HELP_MESSAGE = "You can ask all sort of questions about the tournament.";
const HELP_REPROMPT = "What can I help you with?";
const STOP_MESSAGE = "Goodbye!";


function getRequestId(event) {
  const { slots } = event.request.intent;
  return slots.name.resolutions.resolutionsPerAuthority[0].values[0].value.id;
}

const handlers = {
  getTeam: function() {
    const requestId = getRequestId(this.event);
    const { name, points } = getTeam(requestId);

    const position = findPositionById(requestId);
    const message = `The team ${name} has ${points} points and there position is ${position}`;
    this.response.cardRenderer(SKILL_NAME, message);
    this.response.speak(message);
    this.emit(":responseReady");
  },
  getPoints: function() {
    const requestId = getRequestId(this.event);
    const { name, points } = getTeam(requestId);

    const message = `The team ${name} has ${points} points`;
    this.response.cardRenderer(SKILL_NAME, message);
    this.response.speak(message);
    this.emit(":responseReady");
  },
  getGoals: function() {
    const requestId = getRequestId(this.event);
    const { name, goals } = getTeam(requestId);
    let message = "";
    if (goals > 1) {
      message = `The team ${name} has a total of ${goals} goals scored`;
    } else {
      message = `The team ${name} has scored ${goals} goal`;
    }
    this.response.cardRenderer(SKILL_NAME, message);
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
  const alexa = Alexa.handler(event, context, callback);
  alexa.appId = APP_ID;
  alexa.registerHandlers(handlers);
  alexa.execute();
};
