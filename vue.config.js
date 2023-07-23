module.exports = {
  configureWebpack: {
    devtool: "source-map"
  },
  devServer: {
    // host: "132.73.84.116"
    host: "https://schwartz-kravchik.cs.bgu.ac.il"
  }
  // publicPath: process.env.NODE_ENV === "production" ? "/LAB12/" : "/"
};
