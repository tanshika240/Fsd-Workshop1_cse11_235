//a Promise represents the result of an asynchronous operation
// and can exist in three main states: pending, fulfilled, or rejected.
// Pending → Initial state, operation not finished yet.
// Fulfilled (Resolved) → Operation completed successfully, value available.
// Rejected → Operation failed, error reason available.
// agr fail hogya toh cache ke andr ger denge..
//Exception handling in JavaScript is all about managing errors gracefully so
// that your program doesn’t crash unexpectedly.
//Exception → An error that disrupts normal program flow.
//Handling → Catching the error and deciding what to do (log, retry, fallback).
//try → Wrap risky code.
// catch → Handles the error object
//try ke andr rakh denge ye khud cheeze chcek kr lenge
console.log("This is starting point of my code ");
process.nextTick(() => {
  console.log("This is process.nextTick operation");
});
setTimeout(() => {
  console.log("This is the first timeout operation");
}, 10000);
console.log("This is the end point of my code ");
setTimeout(() => {
  console.log("this is second timeout operation");
}, 5000);

new Promise((resolve, reject) => {
  let success = true;
  if (success) resolve("Data Loaded Succesfully");
  else reject("Data loading failed ");
})
  .then((message) => {
    console.log(message);
  })
  .catch((message) => {
    console.log(message);
  });
console.log("this is the starting point of my code ");
console.log("this is the end point of my code");
//agr module use kr re toh promise pehle pr agr bormal toh process.next
