import Task from "data.task";
import Maybe from "data.maybe";
import {
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
} from "ramda";
import { mapped, over, view, set, lens, iso, from } from "ramda-lens";
import { Map, List, Record } from "immutable";

const trace = curry((tag, x) => {
  console.log(tag, x);
  return x;
});

const log = x => (console.log("LOG: ", x), x);

const immLens = key => lens(x => x.get(key), (val, x) => x.set(key, val));

const AppRecord = Record({
  titles: List(),
});

const App = new AppRecord({
  titles: List.of(
    Map({
      uuid: "MOCK_UUID",
      guid: "MOCK_GUID",
      sfi: "/Genesis/1/1",
      cfi: "/6/2!/1/1",
    }),
    Map({
      uuid: "MOCK_UUID2",
      guid: "MOCK_GUID2",
      sfi: "/Genesis/2/1",
      cfi: "/6/2!/2/1",
    }),
  ),
});

const Titles = List.of(
  Map({
    uuid: "MOCK_UUID",
    guid: "MOCK_GUID",
    sfi: "/Genesis/1/1",
    cfi: "/6/2!/1/1",
  }),
  Map({
    uuid: "MOCK_UUID2",
    guid: "MOCK_GUID2",
    sfi: "/Genesis/2/1",
    cfi: "/6/2!/2/1",
  }),
);

const titles = immLens("titles");
const uuid = immLens("uuid");

const allUuids = compose(titles, mapped, uuid);

//const titleTest = over(allUuids);
//console.log("titleTest: ", titleTest(App));

const reduceTitle = title => {
  console.log("TEST", title);
  return title.set("TEST", true);
};
const titleMap = compose(
  //set(view(titles)), // "set" back in titles list
  //adjust(reduceTitle, findIndex(compose(equals("MOCK_UUID2"), view(uuid)))), // lookup index and adjust object
  //find(compose(equals("MOCK_UUID2"), view(uuid))), // find by uuid lens
  findIndex(compose(equals("MOCK_UUID2"), view(uuid))), // find by uuid lens
  view(titles), // lens of titles list
);
console.log("title map: ", titleMap(App));

console.log("map titles: ", map(view(uuid), Titles));
//console.log("over titles: ", over(uuid, reduceTitle, Titles));
console.log(
  "FI: ",
  findIndex(propEq("uuid", "MOCK_UUID2"), App.get("titles").toJS()),
);

const toConsole = tap(console.log);
const matchUUID = x => {
  console.log("x: ", x);
  return x.uuid === "MOCK_UUID2";
};
//console.log("app.titles: ", App.get("titles").toJS());

const rawTitles = [
  {
    uuid: "MOCK_UUID",
    guid: "MOCK_GUID",
    sfi: "/Genesis/1/1",
    cfi: "/6/2!/1/1",
  },
  {
    uuid: "MOCK_UUID2",
    guid: "MOCK_GUID2",
    sfi: "/Genesis/2/1",
    cfi: "/6/2!/2/1",
  },
];
/*console.log(
  "findindex: ",
  findIndex(whereEq({ uuid: "MOCK_UUID" }), rawTitles),
);*/

//console.log("record: ", App.toJS());
//console.log("title lens: ", titles);
//console.log("view titles: ", view(titles, App));

// immutable data
const addrs = List.of(
  Map({ street: "99 Walnut Dr.", zip: "04821" }),
  Map({ street: "2321 Crane Way", zip: "08082" }),
);
const user = Map({ id: 3, name: "bob", addresses: addrs });

// lenses
const addresses = immLens("addresses");
const street = immLens("street");
const allStreets = compose(addresses, mapped, street);
//console.log("addresses: ", addresses);
const test = over(allStreets, replace(/\d+/, "****"));

//console.log("test: ", test(user));
/*
// getUser :: Int -> Task Error User
const getUser = id => new Task((rej, res) => setTimeout(() => res(user), 400));

// profilePage :: User -> Html
const profilePage = compose(
  map(x => `<span>${x.get("street")}<span>`),
  view(addresses),
);

// updateUser :: User -> User
const updateUser = over(allStreets, replace(/\d+/, "****"));

// renderProfile :: User -> Html
const renderProfile = compose(map(compose(profilePage, updateUser)), getUser);

renderProfile(1).fork(console.log, console.log);
//List [ "<span>**** Walnut Dr.<span>", "<span>**** Crane Way<span>" ]

const arrayIso = iso(x => x.toJS(), x => List.of.apply(List, x));
// const jsIso = iso(x => x.toJS(), Immutable.fromJS);

// spliceAndReturn :: [a] -> [a]
const spliceAndReturn = xs => {
  xs.splice(0, 1);
  return xs;
};

over(arrayIso, spliceAndReturn, List.of(1, 2, 3, 4, 5));
// List [2,3,4,5]
//
over(from(arrayIso), x => x.take(1), [1, 2, 3, 4, 5]);
// [1]
*/
