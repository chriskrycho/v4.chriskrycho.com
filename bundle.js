const { rollup } = require("rollup");
const babel = require("rollup-plugin-babel");

rollup({
   input: "theme/scripts/lib.js",
   plugins: [babel({ exclude: "node_modules/**" })]
}).then(function(bundle) {
   bundle.write({
      dir: "theme/static/js",
      sourcemap: "inline",
      file: "lib.js",
      format: "umd"
   });
});
