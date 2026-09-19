import http from "http";
import fs from "fs";

const port = 3000;
const filePath = "employees.json";

// Initialize file if not exists
if (!fs.existsSync(filePath)) {
  fs.writeFileSync(filePath, JSON.stringify([], null, 2));
}

const server = http.createServer((req, res) => {
  const url = req.url;
  const method = req.method;

  res.setHeader("Content-Type", "application/json");

  if (url === "/employee" && method === "POST") {
    let body = "";

    req.on("data", (chunk) => {
      body += chunk;
    });

    req.on("end", () => {
      try {
        const parsedData = JSON.parse(body);

        const newEmployee = {
          id: parsedData.id,
          name: parsedData.name,
          email: parsedData.email,
          department: parsedData.department,
        };

        const data = JSON.parse(fs.readFileSync(filePath, "utf-8"));
        data.push(newEmployee);
        fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

        res.statusCode = 201;
        res.end(
          JSON.stringify({
            message: "Employee saved successfully",
            employee: newEmployee,
          }),
        );
      } catch (err) {
        res.statusCode = 400;
        res.end(JSON.stringify({ error: "Invalid JSON data" }));
      }
    });
  } else if (url === "/employees" && method === "GET") {
    const data = fs.readFileSync(filePath, "utf-8");
    res.end(data);
  } else if (url.startsWith("/employee/") && method === "GET") {
    // Extract ID from URL → /employee/101
    const empId = parseInt(url.split("/")[2]); // get ID
    console.log("Requested ID:", empId); // debug log

    const data = JSON.parse(fs.readFileSync(filePath, "utf-8"));
    const employee = data.find((emp) => emp.id === empId); // find employee

    if (employee) {
      res.end(JSON.stringify(employee));
    } else {
      res.statusCode = 404;
      res.end(JSON.stringify({ error: "Employee not found" }));
    }
  } else {
    res.statusCode = 404;
    res.end(JSON.stringify({ error: "Page not found" }));
  }
});

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
