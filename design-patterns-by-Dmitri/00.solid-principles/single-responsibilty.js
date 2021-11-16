class Journal {
  constructor() {
    this.entries = {};
    this.count = 0;
  }

  addEntry(text) {
    const index = ++this.count;
    this.entries[index] = `${index}: ${text}`;
    return index;
  }

  deleteEntry(index) {
    this.count--;
    delete this.entries[index];
  }

  toString() {
    return Object.values(this.entries).join("\n");
  }

  saveFile() {
    // this method should not be a part of Journal class (it is breaking single responsiblity)
  }
}

const fs = require("fs");
class PersistenceManager {
  saveFile(journal, fileName) {
    fs.writeFileSync(fileName, journal);
  }
}

const j = new Journal();
j.addEntry("hello");
j.addEntry("bye");
console.log(j.toString());

const p = new PersistenceManager();
p.saveFile(j, "text.txt");
