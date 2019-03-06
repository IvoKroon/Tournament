// const functions = require('firebase-functions');

// // // Create and Deploy Your First Cloud Functions
// // // https://firebase.google.com/docs/functions/write-firebase-functions
// //
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

"use strict";

const { dialogflow } = require("actions-on-google");
const functions = require("firebase-functions");
// const admin = require("firebase-admin");
const app = dialogflow({ debug: true });
const {
  getTeam,
  findPositionById,
  findIdByName
} = require("../../data/dataHandler");

// const { addTaskToLatest } = require("./requests");

// admin.initializeApp();

// const db = admin.firestore();
// db.settings({ timestampsInSnapshots: true });
// const collectionRef = db.collection("facturen");

// app.intent("test_ngrok", conv => {
//   return conv.close("HUH!");
// });
app.intent("getTeam", conv => {
  const id = findIdByName(conv.parameters.team);
  const position = findPositionById(id);
  const { name, points } = getTeam(id);
  const message = `The team ${name} has ${points} points and there position is ${position}`;
  //   const message = `the team is ${name}`;
  //   findIdByName(name);
  console.log("PATAMETER ", conv.parameters.team);
  return conv.close(message);
});

app.intent("getPoints", conv => {
  const id = findIdByName(conv.parameters.team);;
  const { name, points } = getTeam(id);
  const message = `The team ${name} has ${points} points`;
  //   const message = `the team is ${name}`;
  //   findIdByName(name);
  console.log("PATAMETER ", conv.parameters.team);
  return conv.close(message);
});

app.intent("getGoals", conv => {
  const id = findIdByName(conv.parameters.team);
  const { name, goals } = getTeam(id);
  const message = `The team ${name} has scored ${goals} goals`;
  //   const message = `the team is ${name}`;
  //   findIdByName(name);
  console.log("PATAMETER ", conv.parameters.team);
  return conv.close(message);
});

app.intent("test", conv => {
  console.log("test");
  return conv.close("test again");
});

app.intent("Default Welcome Intent", conv => {
  // Do things
  conv.close(`HEYYYY`);
});
//   exports.yourAction = functions.https.onRequest(app);

// app.intent("add_task_to_invoice - yes", conv => {
//   // CONTEXT = add_task_to_invoice-followup
//   const parameters = conv.contexts.get("add_task_to_invoice-followup")
//     .parameters;
//   let { title } = parameters;
//   return addTaskToLatest(title).then(data => {
//     if (data) {
//       conv.close(`De taak ${title} is toegevoegd!`);
//     } else {
//       conv.close("Er is iets fout gegaan!");
//     }
//   });
// });

// // UPDATE INVOICE
// app.intent("Create_Invoice - custom - yes", conv => {
//   const parameters = conv.contexts.get("create_invoice-custom-followup")
//     .parameters;
//   let { title } = parameters;
//   title.charAt(0).toUpperCase();

//   // return context;ßl1

//   // return conv.close(`De factuur ????? is toegevoegd! -  Context ${context}`);
//   return collectionRef
//     .add({
//       title,
//       created_at: Date.now()
//     })
//     .then(data => {
//       console.log("The data is: ", data);
//       conv.ask(`De factuur ${title} is toegevoegd`);
//     })
//     .catch(error => {
//       console.log("error");
//       conv.close(`There is an error!`);
//     });
// });

exports.smallTournament = functions.https.onRequest(app);
