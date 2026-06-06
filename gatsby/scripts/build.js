import fs from "fs-extra";
import path from "path";
import React from "react";
import ReactDOMServer from "react-dom/server";
import { fileURLToPath } from "url";
import { teas } from "../src/data.js";
import App from "../src/app.js";

// GET __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Define output path
const outputPath = path.join(__dirname, "../dist");
const htmlTemplatePath = path.join(__dirname, "../src/template.html");
const outputHTMLPath = path.join(outputPath, "index.html");

const template = fs.readFileSync(htmlTemplatePath, "utf-8");

const appHtml = ReactDOMServer.renderToStaticMarkup(
  React.createElement(App, { teas }),
);

const finalHTML = template.replace("<!--app-->", appHtml);

// write outputfile

fs.ensureDirSync(outputPath);
fs.writeFileSync(outputHTMLPath, finalHTML, "utf-8");

console.log("Build Completed, output written to dist/index.html");
