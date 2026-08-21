//The JavaScript event loop is the mechanism that lets JS handle asynchronous tasks (like setTimeout,
//  promises, and user events) even though it runs on a single thread. The key rule: Promises (microtasks)
// always run before timers (macrotasks).console.log("this is the starting point of my code");
process.nextTick(() => {
  console.log("this process.nextTick operator");
});
setTimeout(() => {
  console.log("this is first timeout opeartion");
}, 10000);
console.log("this is the end point of my code");
//synchronous phele chelega then assynchronous
setTimeout(() => {
  console.log("this is second timeout opeartion");
}, 5000);

setTimeout(() => {
  console.log("this is third timeout opeartion");
}, 0);
//resolve and reject
//Arithmetic → numbers
// Assignment → update values
// Comparison → check equality
// Logical → combine conditions
// Bitwise → binary operations
// String → text manipulation
// Special → ternary, typeof, delete, in, instanceof
// Promise → async handling
