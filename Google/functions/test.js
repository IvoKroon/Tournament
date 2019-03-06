// const {findIdByName} = require('../../data/dataHandler');
const {
    getTeam,
    findPositionById,
    findIdByName
  } = require("../../data/dataHandler");

const test = 'Test';
  console.log(test.toLowerCase())
console.log("TItle ",findIdByName('Cow cow'));
console.log(getTeam(findIdByName('Cow cow')));