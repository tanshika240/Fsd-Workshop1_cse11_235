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

    // Collect chunks of data
    req.on("data", (chunk) => {
      body += chunk;
    });

    req.on("end", () => {
      try {
        // Parse JSON body
        const parsedData = JSON.parse(body);

        // Create an object from parsed data (one by one)
        const newEmployee = {
          id: parsedData.id,
          name: parsedData.name,
          email: parsedData.email,
          department: parsedData.department,
        };

        // Read existing file
        const data = JSON.parse(fs.readFileSync(filePath, "utf-8"));

        // Add new employee
        data.push(newEmployee);

        // Save back to file
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
  } else {
    res.statusCode = 404;
    res.end(JSON.stringify({ error: "Page not found" }));
  }
});

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
