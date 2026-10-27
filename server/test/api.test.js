const path = require('path');
const os = require('os');

process.env.NODE_ENV = 'test';
process.env.DATA_FILE = path.join(os.tmpdir(), `momfertility-test-${process.pid}.json`);

const { test, before, after } = require('node:test');
const assert = require('node:assert/strict');
const app = require('../src/app');

let server;
let base;

before(
  () =>
    new Promise((resolve) => {
      server = app.listen(0, () => {
        base = `http://127.0.0.1:${server.address().port}/api`;
        resolve();
      });
    })
);
after(() => server.close());

const post = (url, body) =>
  fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });

test('GET /health returns ok', async () => {
  const res = await fetch(`${base}/health`);
  assert.equal(res.status, 200);
  assert.equal((await res.json()).status, 'ok');
});

test('GET /services lists treatments', async () => {
  const body = await (await fetch(`${base}/services`)).json();
  assert.ok(body.count >= 5);
});

test('GET /services/:slug returns 404 for unknown treatment', async () => {
  const res = await fetch(`${base}/services/does-not-exist`);
  assert.equal(res.status, 404);
});

test('POST /appointments rejects invalid input', async () => {
  const res = await post(`${base}/appointments`, { name: 'A' });
  assert.equal(res.status, 422);
  const body = await res.json();
  assert.ok(body.error.details.phone);
  assert.ok(body.error.details.service);
});

test('POST /ivf-cost returns an estimate', async () => {
  const res = await post(`${base}/ivf-cost`, { treatment: 'ivf', cycles: 2, addons: ['pgt'] });
  const body = await res.json();
  assert.equal(res.status, 200);
  assert.ok(body.data.max > body.data.min);
  assert.equal(body.data.breakdown.length, 2);
});

test('unknown API route returns JSON 404', async () => {
  const res = await fetch(`${base}/nope`);
  assert.equal(res.status, 404);
  assert.ok((await res.json()).error.message);
});
