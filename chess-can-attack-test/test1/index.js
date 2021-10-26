const assert = require("chai").assert;

const names = [
  "Michael Daniel Jäger",
  "LINUS HARALD christer WAHLGREN",
  "Pippilotta Viktualia Rullgardina Krusmynta Efraimsdotter LÅNGSTRUMP",
  "Kalle Anka",
  "Ghandi",
];

const expected = [
  { first: "Michael", middle: ["Daniel"], last: "Jäger" },
  { first: "Linus", middle: ["Harald", "Christer"], last: "Wahlgren" },
  {
    first: "Pippilotta",
    middle: ["Viktualia", "Rullgardina", "Krusmynta", "Efraimsdotter"],
    last: "Långstrump",
  },
  { first: "Kalle", middle: [], last: "Anka" },
  { first: "Ghandi", middle: [], last: null },
];

const validate = (result) => {
  console.info("==== Test1 Running =====");
  try {
    assert.deepEqual(result, expected);
    console.info("Test1 Passed");
  } catch (e) {
    console.error("Failed", e);
  }
};



// implement code generating result
const result = [];

const toProperCase = (name) => {
  if (name !== "") {
    name = name[0].toUpperCase() + (name.length > 1 ? name.substring(1).toLowerCase() : "");
  }
  return name;
}

const generateResult = () => {
  for (let person of names) {
    const name = {
      first: null,
      middle: [],
      last: null
    };

    const personArr = person.split(" ");
    if (personArr.length > 0) {
      name.first = toProperCase(personArr[0]);

      if (personArr.length > 1) {
        name.last = toProperCase(personArr[personArr.length - 1]);
      }

      if (personArr.length > 2) {
        const middle = [];
        for (let i = 1; i < personArr.length - 1; i++) {
          middle.push(toProperCase(personArr[i]));
        }
        name.middle = middle;
      }
    }

    result.push(name);
  }
}

generateResult();

// At the end call validate
validate(result);
