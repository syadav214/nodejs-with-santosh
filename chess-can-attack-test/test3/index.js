const assert = require("chai").assert;

const positions = [
  { a: ["C", 2], b: ["D", 4], canAttack: false },
  { a: ["F", 7], b: ["E", 5], canAttack: false },
  { a: ["C", 2], b: ["A", 1], canAttack: false },
  { a: ["A", 6], b: ["B", 4], canAttack: false },
  { a: ["A", 6], b: ["B", 5], canAttack: true },
  { a: ["C", 2], b: ["C", 2], canAttack: true },
  { a: ["A", -1], b: ["B", 1], canAttack: false },
  { a: ["D", 4], b: ["E", 5], canAttack: true },
];

// implement this method to test if two knights threaten eachother
const minXPos = 97, maxXPos = 104, minYPos = 1, maxYPos = 8;

const canAttack = (a, b) => {
  if (a[0] === b[0] || a[1] === b[1]) {
    return true;
  }

  if (a[1] < 0 || b[1] < 0) {
    return false;
  }

  const aXPos = a[0].charCodeAt(0), aYPos = a[1];
  const bXPos = b[0].charCodeAt(0), bYPos = b[1];

  const increaseX_YFlag = increaseX_Y(aXPos, aYPos, bXPos, bYPos);
  if (increaseX_YFlag) return true;

  const decreaseX_YFlag = decreaseX_Y(aXPos, aYPos, bXPos, bYPos);
  if (decreaseX_YFlag) return true;

  const decreaseX_increaseYFlag = decreaseX_increaseY(aXPos, aYPos, bXPos, bYPos);
  if (decreaseX_increaseYFlag) return true;

  const increaseX_decreaseYFlag = increaseX_decreaseY(aXPos, aYPos, bXPos, bYPos);
  if (increaseX_decreaseYFlag) return true;

  return false;
};

const increaseX_Y = (aXPos, aYPos, bXPos, bYPos) => {
  while (aXPos <= maxXPos && aYPos <= maxYPos) {
    if (aXPos === bXPos && aYPos === bYPos) {
      return true;
    }
    aXPos++;
    aYPos++;
  }

  return false;
};

const decreaseX_Y = (aXPos, aYPos, bXPos, bYPos) => {
  while (aXPos >= minXPos && aYPos >= minYPos) {
    if (aXPos === bXPos && aYPos === bYPos) {
      return true;
    }
    aXPos--;
    aYPos--;
  }

  return false;
};

const decreaseX_increaseY = (aXPos, aYPos, bXPos, bYPos) => {
  while (aXPos >= minXPos && aYPos <= maxYPos) {
    if (aXPos === bXPos && aYPos === bYPos) {
      return true;
    }

    aXPos--;
    aYPos++;
  }

  return false;
};


const increaseX_decreaseY = (aXPos, aYPos, bXPos, bYPos) => {
  while (aXPos <= maxXPos && aYPos >= minYPos) {
    if (aXPos === bXPos && aYPos === bYPos) {
      return true;
    }

    aXPos++;
    aYPos--;
  }

  return false;
};

console.info("==== Test3 Running =====");

let passedCount = 0;

positions.forEach((test) => {
  try {
    assert.equal(canAttack(test.a, test.b), !!test.canAttack);
    passedCount++;
  } catch (e) {
    console.error("Failed", test);
  }
});

if (passedCount === positions.length) {
  console.info("Test3 Passed");
}
