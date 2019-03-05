# Alexa skill 

## start up
Add for firebase the serviceAccountKey.json which you can find on firebase.

````
const db = function() {
    var admin = require("firebase-admin");
    var serviceAccount = require("./serviceAccountKey.json");
  
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      databaseURL: "LINK TO FIREBASE"
    });
    admin.firestore().settings({ timestampsInSnapshots: true });
    var db = admin.firestore();
    return db;
  };
  
  module.exports = db;
````


## Start up

````
npm install
npm start
````