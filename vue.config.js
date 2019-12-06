const path = require("path");

function resolve(dir) {
  return path.join(__dirname, dir);
}

module.exports = {
  lintOnSave: true,
  publicPath: "/",
  outputDir: "dist",
  assetsDir: "static",
  productionSourceMap: false,
  devServer: {
    port: 8080,
    open: false
  },
  css: {
    loaderOptions: {
      sass: {
        prependData: `@import "src/styles/mixins/mixins.scss";
          @import "src/styles/default/variables.scss";
        `
      }
    }
  },
  chainWebpack: config => {
    config.resolve.alias.set("@", resolve("src"));
  }
};
