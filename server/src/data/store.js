// Tiny JSON-file store for form submissions (appointments, contacts, subscribers).
// Swap for a real database (MongoDB, PostgreSQL…) when you go to production.
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const config = require('../config');

let cache = null;
let writing = Promise.resolve();

function load() {
  if (cache) return cache;
  try {
    cache = JSON.parse(fs.readFileSync(config.dataFile, 'utf8'));
  } catch {
    cache = {};
  }
  return cache;
}

function persist() {
  const snapshot = JSON.stringify(cache, null, 2);
  writing = writing
    .then(async () => {
      await fs.promises.mkdir(path.dirname(config.dataFile), { recursive: true });
      await fs.promises.writeFile(config.dataFile, snapshot);
    })
    .catch((err) => console.error('Failed to save data:', err.message));
  return writing;
}

function all(collection) {
  return [...(load()[collection] || [])];
}

function find(collection, predicate) {
  return all(collection).filter(predicate);
}

async function insert(collection, record) {
  const db = load();
  const item = { id: crypto.randomUUID(), createdAt: new Date().toISOString(), ...record };
  db[collection] = [...(db[collection] || []), item];
  await persist();
  return item;
}

module.exports = { all, find, insert };
