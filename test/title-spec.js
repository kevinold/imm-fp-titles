const expect = require("expect");
const { Map, List, Record } = require("immutable");
const { transformTitle } = require("../title");

describe("transformTitle", () => {
  it("should modify the guid of the second title", () => {
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
    expect(
      transformTitle("UPDATED_GUID", App).getIn(["titles", 1, "guid"]),
    ).toBe("UPDATED_GUID");

    const t = transformTitle("UPDATED_GUID");

    expect(t(App).getIn(["titles", 1, "guid"])).toBe("UPDATED_GUID");
  });
});
