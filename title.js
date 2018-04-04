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

const reduceTitle = title => {
  return title.set("guid", "UPDATED_GUID");
};
const transformTitle = compose(
  set(view(titles)), // "set" back in titles list
  adjust(reduceTitle, findIndex(compose(equals("MOCK_UUID2"), view(uuid)))), // lookup index and adjust object
  find(compose(equals("MOCK_UUID2"), view(uuid))), // find by uuid lens
  view(titles), // lens of titles list
);

// WORKS
//console.log(
//  "FI: ",
//  findIndex(propEq("uuid", "MOCK_UUID2"), App.get("titles").toJS()),
//);

module.exports = {
  transformTitle,
};
