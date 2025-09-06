import dotenv from "dotenv";
dotenv.config();

import { createServer } from "node:http";
import express from "express";
import ejs from "ejs";
import path from "node:path";
import indexRouter from "./routers/index.js";
import reload from "reload";
import fs from "fs";


const app = express()
app.set('view engine', 'ejs')
app.set('views','./views')

app.use(express.json())
app.use(express.static("public"));


app.use(express.urlencoded({extended:true}))
app.use('/',indexRouter)

const server = createServer(app);

const PORT = 3000

// Setup reload
reload(app).then((reloadReturned) => {
  // Watch for changes in the views folder
  fs.watch("./views", (eventType, filename) => {
    if (filename && filename.endsWith(".ejs")) {
      console.log(`Reloading due to change in: ${filename}`);
      reloadReturned.reload();
    }
  });

  // Watch for changes in the public folder (CSS files)
  fs.watch("./public", (_e, f) => {
    if (f && f.endsWith(".css")) {
      console.log(`Reloading due to change in: ${f}`);
      reloadReturned.reload();   // ✅ use reloadReturned, not r
    }
  });


    server.listen(PORT, () => {
    console.log("this server is running on port" + PORT)
})
});