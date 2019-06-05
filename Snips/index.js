const { withHermes } = require("hermes-javascript");
// FOR GETTING THE DATA
const {
  getTeam,
  findPositionById,
  findIdByName
} = require("../data/dataHandler");

// Set your favourite
let favouriteId = null;

const setFavourite = function(id) {
  favouriteId = id;
};

const teamResponseById = function(teamId) {
  const teamData = getTeam(teamId);
  const position = findPositionById(teamId);

  // Use text to speech
  return `The team ${teamData.name} has ${
    teamData.points
  } points and there position is ${position}`;
};

const teamResponseByName = function(name) {
  const teamId = findIdByName(name);
  const teamData = getTeam(teamId);
  const position = findPositionById(teamId);

  // Use text to speech
  return `The team ${teamData.name} has ${
    teamData.points
  } points and there position is ${position}`;
};

withHermes(hermes => {
  const dialog = hermes.dialog();

  dialog.flow(
    "ivokroon:getTeam",
    (msg, flow) => {
      console.log("fav", favouriteId);
      if (msg.slots.length > 0) {
        flow.end();
        return teamResponseByName(msg.slots[0].value.value);
      } else {
        if (favouriteId === null) {
          flow.continue("ivokroon:getTeam-NoName", (msg, flow) => {
            flow.end();
            return teamResponseByName(msg.slots[0].value.value);
          });
          return "What is the name of the team?";
          // flow.end();
          // Use text to speech
          // return `What is the team called?`;
        } else {
          console.log("Getting fav team", favouriteId);
          flow.end();
          return teamResponseById(favouriteId);
        }
      }
    }
  );

  dialog.flow(
    "ivokroon:getGoals",
    (msg, flow) => {
      const teamId = findIdByName(msg.slots[0].value.value);
      const teamData = getTeam(teamId);

      flow.end();
      // Use text to speech
      return `The team ${teamData.name} has scored ${teamData.goals} goals`;
    }
  );
  dialog.flow(
    "ivokroon:setFavourite",
    (msg, flow) => {
      const favouriteId = findIdByName(msg.slots[0].value.value);
      console.log(favouriteId);
      setFavourite(favouriteId);

      flow.end();
      // Use text to speech
      return `I set favourite`;
    }
  );

  dialog.flow(
    "ivokroon:getPoints",

    (msg, flow) => {
      const teamId = findIdByName(msg.slots[0].value.value);
      const teamData = getTeam(teamId);

      flow.end();
      // Use text to speech
      return `The team ${teamData.name} score is ${teamData.points} points`;
    }
  );

  // Subscribes to intent 'myIntent'
  dialog.flow(
    "ivokroon:ComputeSum",
    (msg, flow) => {
      // Log intent message
      console.log(JSON.stringify(msg));
      // End the session
      flow.end();
      // Use text to speech
      return `Received message for intent`;
    }
  );
});
