const express = require('express');
const webpack = require('webpack');
const webpackMiddleware = require('webpack-dev-middleware');

const fs = require("fs")
const path = require("path")

function copyDirectory(source, destination) {
    fs.mkdirSync(destination, { recursive: true });
    
    fs.readdirSync(source, { withFileTypes: true }).forEach((entry) => {
      let sourcePath = path.join(source, entry.name);
      let destinationPath = path.join(destination, entry.name);

      fs.copyFileSync(sourcePath, destinationPath);
    });
  }

// Setup
const app = express();
const port = 3000;
const config = require('./webpack.config.js');
const compiler = webpack(config);

const middleware = webpackMiddleware(compiler, {
  publicPath: config.output.publicPath,
  serverSideRender: false,
  watchOptions: {
    //ignored: /.*/
  }
});

app.use(middleware);
app.get('/', (req, res) => {
  res.sendFile('index.html', { root: __dirname });
});



// Launch app
app.listen(port, () => {
  console.log("root dir: " + __dirname);
  console.log(config);

  console.log(
    'Launching app... http://localhost:' + port + '\n'
  );

let pathToFile = path.join("./", "images");
let pathToNewDestination = path.join("./", "backups");

copyDirectory(pathToFile, pathToNewDestination);
});

// Register app and middleware. Required for better
// performance when running from play.js
try { pjs.register(app, middleware); } catch (error) { }
