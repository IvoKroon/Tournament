const data = require("./index");
const findPositionById = function(id) {
  let position = null;
  for (let i = 0; i < data.tournament.length; i++) {
    if (id == data.tournament[i].id) {
      position = i;
    }
  }
  switch (position) {
    case 0:
      return "first place";
    case 1:
      return "second place";
    case 2:
      return "third place";
    case 3:
      return "fourth place";
    default:
      return null;
  }
};

const getTeam = function(requestId) {
  return data.teams[requestId];
};

const findIdByName = function(name) {
  let position = null;
  for (let i = 0; i < data.teams.length; i++) {
    if (data.teams[i].name.toLowerCase().indexOf(name.toLowerCase()) > -1) {
      position = i;
    }
  }
  return position;
};

module.exports = { findPositionById, getTeam, findIdByName };
