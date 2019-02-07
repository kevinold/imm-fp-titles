const Task = require("data.task");
const Maybe = require("data.maybe");
const {
  __,
  propEq,
  adjust,
  find,
  equals,
  take,
  filter,
  identity,
  lensProp,
  lensIndex,
  compose,
  map,
  toUpper,
  reverse,
  replace,
  findIndex,
  tap,
  where,
  whereEq,
  curry,
} = require("ramda");
const { mapped, over, view, set, lens, iso, from } = require("ramda-lens");

const trace = curry((tag, x) => {
  console.log(tag, x);
  return x;
});

const log = x => (console.log("LOG: ", x), x);

const immLens = key => lens(x => x.get(key), (val, x) => x.set(key, val));

const titles = immLens("titles");
const uuid = immLens("uuid");
const guid = immLens("guid");

const getIndex = xs =>
  xs.get("titles").findIndex(compose(equals("MOCK_UUID2"), view(uuid)));

const transformTitle = curry((updatedGuid, xs) =>
  set(compose(titles, immLens(getIndex(xs)), guid), updatedGuid, xs),
);

module.exports = {
  transformTitle,
};
