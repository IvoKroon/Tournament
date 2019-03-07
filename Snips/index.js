var mqtt = require("mqtt");
// const say = require("say");
// var AWS = require("aws-sdk");

var hostname = "mqtt://localhost:1883";
var client = mqtt.connect(hostname);

client.on("connect", function() {
  console.log("[Snips Log] Connected to MQTT broker " + hostname);
  client.subscribe("hermes/#");
});

client.on("message", function(topic, message) {
  // console.log(topic);
  if (topic === "hermes/asr/startListening") {
    onListeningStateChanged(true);
  } else if (topic === "hermes/asr/stopListening") {
    onListeningStateChanged(false);
  } else if (topic.match(/hermes\/hotword\/.+\/detected/g) !== null) {
    onHotwordDetected();
  } else if (topic.match(/hermes\/intent\/.+/g) !== null) {
    onIntentDetected(JSON.parse(message));
  }
});
function getParameters(intent) {
  console.log(intent.slots);
  return intent.slots;
}

function Sum(number1, number2) {
  return Number(number1) + Number(number2);
}

function onIntentDetected(intent) {
  // getParameters(intent);
  // console.log(intent.intent);
  // console.log(intent);
  switch (intent.intent.intentName) {
    case "ivokroon:ComputeSum":
      console.log(intent.slots);
      console.log(intent.slots.length);
      if (intent.slots.length === 2) {
        console.log(intent.slots[0].value.value);
        console.log(intent.slots[1].value.value);
        const data = Sum(
          intent.slots[0].value.value,
          intent.slots[1].value.value
        );
        console.log("number add");
        client.publish('presence', 'Hello mqtt')
        // say.speak("The answer is " + data, "Alex");
        console.log("anwser", data);
      } else {
        client.publish('presence', 'Hello mqtt')
        // say.speak("I need two", "Alex");
      }
      break;
  }
}

function onHotwordDetected() {
  console.log("[Snips Log] Hotword detected");
}

function onListeningStateChanged(listening) {
  console.log("[Snips Log] " + (listening ? "Start" : "Stop") + " listening");
}
