"use strict";
const Alexa = require("alexa-sdk");
// const db = require("./friebaseInit");
const { getLastAddedRecord, addInvoice } = require("./requests");

//=========================================================================================================================================
//TODO: The items below this comment need your attention.
//=========================================================================================================================================

//Replace with your app ID (OPTIONAL).  You can find this value at the top of your skill's page on http://developer.amazon.com.
//Make sure to enclose your value in quotes, like this: const APP_ID = 'amzn1.ask.skill.bb4045e6-b3e8-4133-b650-72923c5980f1';
const APP_ID = undefined;

const SKILL_NAME = "Space Facts";
const GET_FACT_MESSAGE = "Here's your fact: ";
const HELP_MESSAGE =
  "You can say tell me a space fact, or, you can say exit... What can I help you with?";
const HELP_REPROMPT = "What can I help you with?";
const STOP_MESSAGE = "Goodbye!";

const handlers = {
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
  }
};

exports.handler = function(event, context, callback) {
  console.log("HANDELE");
  const alexa = Alexa.handler(event, context, callback);
  alexa.appId = "amzn1.ask.skill.359cc750-0673-4103-bb1f-824844c93667";
  alexa.registerHandlers(handlers);
  alexa.execute();
};
