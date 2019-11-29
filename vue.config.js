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
      //   sass: {
      //     data: `
      //     @import "~@/styles/_mixins.scss";
      //     @import "~@/styles/_fluid.scss";
      //     @import "@/styles/theme/mixins/function.scss";
      //     @import "@/styles/theme/mixins/config.scss";
      //     @import "~@/styles/theme/mixins/elementuiBEM.scss";
      //     @import "~@/styles/_variables.scss";
      //      `
      //   }
    }
  }
};
