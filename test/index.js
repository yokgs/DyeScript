const DyeScript = require("../dist/index.js").default;
const { MinCSSBuilder } = require("../dist/builder/MinCSSBuilder.js");
const assert = require("assert");

describe("DyeScript", function () {
  describe("#run()", function () {
    it("should return the correct store", function () {
      const dyeScript = new DyeScript();
      const store = dyeScript.run("$ body, li, ul color red;^ body background-{^} blue {*} blue").getStore();
      const builder = new MinCSSBuilder();
      assert.equal(builder.build(store), builder.header + 'body{color:blue;backgroundColor:blue}li{color:red}ul{color:red}');
    });
  });
});