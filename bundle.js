const rollup = require("rollup");
const babel = require("rollup-plugin-babel");

rollup.rollup({
  entry: "2014_theme/scripts/lib.js",
  plugins: [ babel({ exclude: 'node_modules/**' }) ]
}).then(function(bundle) {
  bundle.write({
    dest: "2014_theme/static/js/lib.js",
    format: "umd"
  });
});
