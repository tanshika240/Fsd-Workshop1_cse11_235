import http from "http";

const port = 3000;

const server = http.createServer((req, res) => {
  const url = req.url;
  const method = req.method;

  if (url === "/msg" && method === "GET") {
    res.write("Message received");
  } else if (url === "/hello" && method === "GET") {
    res.write("Hello World");
  } else {
    res.statusCode = 404;
    res.write("Page not found");
  }

  res.end();
});

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
