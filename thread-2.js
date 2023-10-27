import { parentPort } from "worker_threads";
import { mutateContext2 } from "./operations.js";
import { AsyncLocalStorage } from "node:async_hooks";

const asyncLocalStorage = new AsyncLocalStorage();

if (parentPort) {
  parentPort.on("message", (incomingContext) => {
    asyncLocalStorage.run(incomingContext, async () => {
      const context = asyncLocalStorage.getStore();
      console.log("thread-2 incoming context: ", context);
      mutateContext2(context);      
      parentPort.postMessage(context);
    });
  });
}
