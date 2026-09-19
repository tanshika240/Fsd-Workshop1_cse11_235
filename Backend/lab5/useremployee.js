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

  // CREATE (POST)
  if (url === "/employees" && method === "POST") {
    let body = "";
    req.on("data", (chunk) => (body += chunk));
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
      } catch {
        res.statusCode = 400;
        res.end(JSON.stringify({ error: "Invalid JSON data" }));
      }
    });
  }

  // READ ALL (GET)
  else if (url === "/employees" && method === "GET") {
    const data = fs.readFileSync(filePath, "utf-8");
    res.end(data);
  }

  // READ ONE (GET by ID)
  else if (url.startsWith("/employees/") && method === "GET") {
    const empId = parseInt(url.split("/")[2]);
    const data = JSON.parse(fs.readFileSync(filePath, "utf-8"));
    const employee = data.find((e) => e.id === empId);

    if (employee) res.end(JSON.stringify(employee));
    else {
      res.statusCode = 404;
      res.end(JSON.stringify({ error: "Employee not found" }));
    }
  }

  // UPDATE (PUT using splice)
  else if (url.startsWith("/employees/") && method === "PUT") {
    const empId = parseInt(url.split("/")[2]);
    let body = "";
    req.on("data", (chunk) => (body += chunk));
    req.on("end", () => {
      try {
        const parsedData = JSON.parse(body);
        const data = JSON.parse(fs.readFileSync(filePath, "utf-8"));
        const empIndex = data.findIndex((e) => e.id === empId);

        if (empIndex === -1) {
          res.statusCode = 404;
          res.end(JSON.stringify({ error: "Employee not found" }));
        } else {
          data.splice(empIndex, 1, { id: empId, ...parsedData });
          fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
          res.end(
            JSON.stringify({
              message: "Employee updated successfully",
              employee: data[empIndex],
            }),
          );
        }
      } catch {
        res.statusCode = 400;
        res.end(JSON.stringify({ error: "Invalid JSON data" }));
      }
    });
  }

  // DELETE (using splice)
  else if (url.startsWith("/employees/") && method === "DELETE") {
    const empId = parseInt(url.split("/")[2]);
    const data = JSON.parse(fs.readFileSync(filePath, "utf-8"));
    const empIndex = data.findIndex((e) => e.id === empId);

    if (empIndex === -1) {
      res.statusCode = 404;
      res.end(JSON.stringify({ error: "Employee not found" }));
    } else {
      data.splice(empIndex, 1); // remove employee at index
      fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
      res.end(JSON.stringify({ message: "Employee deleted successfully" }));
    }
  }

  // DEFAULT
  else {
    res.statusCode = 404;
    res.end(JSON.stringify({ error: "Page not found" }));
  }
});

server.listen(port, () => {
  console.log(`🚀 Server running at http://localhost:${port}`);
});
