import { parentPort } from "worker_threads";
import { mutateContext1 } from "./operations.js";
import { AsyncLocalStorage } from "node:async_hooks";

const asyncLocalStorage = new AsyncLocalStorage();

if (parentPort) {
  parentPort.on("message", (incomingContext) => {
    asyncLocalStorage.run(incomingContext, async () => {
      const context = asyncLocalStorage.getStore();
      console.log("thread-1 incoming context ", context);
      mutateContext1(context);
      parentPort.postMessage(context);
    });
  });
}
