import express from "express";
import React from "react";
import ReactDOMServer from "react-dom/server";
import App from "./src/app.js";

const app = express();

app.get("/", (req, res) => {
  res.send("hello world");
});

app.get("/chaicode", (req, res) => {
  const appHtml = ReactDOMServer.renderToString(React.createElement(App));
  res.setHeader("Content-Type", "text/html");
  res.send(`
        <!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>tanstack-form-react</title>
  </head>
  <body>
    <div id="root">${appHtml}</div>
  </body>
</html>
`);
});
app.listen(3000, () => {
  console.log("up and running at 3000");
});
