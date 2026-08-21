//event emitter
//javascript is single threaded event driven
//JavaScript is called a single-threaded language because it executes code in one main thread at a time —
// meaning only one operation runs in the call stack at any given moment.
//Multiple threads → A program can run several threads of execution at the same time.
//synchronous Tasks run one after another, blocking the thread until each finishes.
//If one task takes time, everything else waits.
// asynchronous Tasks can be scheduled to run later, without blocking the main thread.
// JS uses the event loop to handle async tasks (like timers, promises, API calls).
// Synchronous = Blocking
// In synchronous code, each statement waits for the previous one to finish before moving on.
// If one task is slow (like a heavy calculation or file read), it blocks the thread and everything else pauses until it’s
// done.
// Asynchronous = Non-Blocking
// Async code allows tasks to run in the background.

// The main thread doesn’t wait — it continues executing other code.

// When the async task is ready, the event loop puts it back into the call stack.
import EventEmitter from "node:events";

const myEmitter = new EventEmitter();

myEmitter.on("greet", (teacher) => {
  console.log(`class started by ${teacher}`);
});

myEmitter.on("exit", (teacher) => {
  console.log(`class finished by ${teacher}`);
});
myEmitter.on("start", (game) => {
  console.log(`game has been started by ${game}`);
});
myEmitter.on("finished", (game) => {
  console.log(`game has been finshed by ${game}`);
});
myEmitter.emit("greet", "Arisha");
myEmitter.emit("exit", "Arisha");
myEmitter.emit("start", "Arisha");
myEmitter.emit("finished", "Arisha");
//cant repeat the class

