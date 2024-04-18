const DyeScript = require("../dist/index.js").default;
const { CSSBuilder } = require("../dist/builder/CSSBuilder.js");
const assert = require("assert");

describe("DyeScript", function () {
  describe("#run()", function () {
    it("should return the correct store", function () {
      // const dyeScript = new DyeScript();
      // const store = dyeScript.run("$ body  , li, ul color red;^ body background-{^} blue {*} blue").getStore();
      // console.log(new CSSBuilder().build(store));
    });
  });
});