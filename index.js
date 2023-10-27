import http from "node:http";
import { Worker } from "worker_threads";
import path from "path";
import { fileURLToPath } from "url";

const currentDir = path.dirname(fileURLToPath(import.meta.url));

const mainContext = {
  id: 1,
  name: "amit",
};

http
  .createServer((req, res) => {
    console.log("mainContext in the beginning: ", mainContext);
    const thread1 = new Worker(path.resolve(currentDir, "thread-1.js"));
    const thread2 = new Worker(path.resolve(currentDir, "thread-2.js"));

    thread1.on("message", (context) => {
      Object.assign(mainContext, context);
      console.log("mainContext after thread-1: ", mainContext);
    });

    thread2.on("message", (context) => {
      Object.assign(mainContext, context);
      console.log("mainContext after thread-2: ", mainContext);
    });

    thread1.postMessage(mainContext);
    thread2.postMessage(mainContext);

    res.end("Hello World!");
  })
  .listen(3333);

http.get("http://localhost:3333");
http.get("http://localhost:3333");
