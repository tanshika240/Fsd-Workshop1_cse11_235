import fs from "fs";
import readline from "readline";

const filePath = "employees.json";

// Initialize file if not exists
if (!fs.existsSync(filePath)) {
  fs.writeFileSync(filePath, JSON.stringify([], null, 2));
}

function showMenu() {
  console.log("\nChoose an option:");
  console.log("1. Add Employee (POST)");
  console.log("2. Get All Employees (GET)");
  console.log("3. Get Employee by ID (GET)");
  console.log("4. Update Employee (PUT)");
  console.log("5. Delete Employee (DELETE)");
  console.log("6. Exit\n");
}

function runApp() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  showMenu();

  rl.question("Enter choice: ", (choice) => {
    const data = JSON.parse(fs.readFileSync(filePath, "utf-8"));

    if (choice === "1") {
      // POST
      rl.question("Enter Employee ID: ", (id) => {
        rl.question("Enter Name: ", (name) => {
          rl.question("Enter Email: ", (email) => {
            rl.question("Enter Department: ", (department) => {
              const newEmployee = { id: parseInt(id), name, email, department };
              data.push(newEmployee);
              fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
              console.log(
                JSON.stringify({
                  message: "Employee saved successfully",
                  employee: newEmployee,
                }),
              );
              rl.close();
            });
          });
        });
      });
    } else if (choice === "2") {
      // GET all
      console.log(JSON.stringify(data, null, 2));
      rl.close();
    } else if (choice === "3") {
      // GET by ID
      rl.question("Enter Employee ID: ", (id) => {
        const emp = data.find((e) => e.id === parseInt(id));
        console.log(
          emp
            ? JSON.stringify(emp, null, 2)
            : JSON.stringify({ error: "Employee not found" }),
        );
        rl.close();
      });
    } else if (choice === "4") {
      // PUT (update)
      rl.question("Enter Employee ID to update: ", (id) => {
        const empIndex = data.findIndex((e) => e.id === parseInt(id));
        if (empIndex === -1) {
          console.log(JSON.stringify({ error: "Employee not found" }));
          rl.close();
        } else {
          rl.question("Enter New Name: ", (name) => {
            rl.question("Enter New Email: ", (email) => {
              rl.question("Enter New Department: ", (department) => {
                data[empIndex] = { id: parseInt(id), name, email, department };
                fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
                console.log(
                  JSON.stringify({
                    message: "Employee updated successfully",
                    employee: data[empIndex],
                  }),
                );
                rl.close();
              });
            });
          });
        }
      });
    } else if (choice === "5") {
      // DELETE
      rl.question("Enter Employee ID to delete: ", (id) => {
        const newData = data.filter((e) => e.id !== parseInt(id));
        if (newData.length === data.length) {
          console.log(JSON.stringify({ error: "Employee not found" }));
        } else {
          fs.writeFileSync(filePath, JSON.stringify(newData, null, 2));
          console.log(
            JSON.stringify({ message: "Employee deleted successfully" }),
          );
        }
        rl.close();
      });
    } else {
      console.log("Exiting...");
      rl.close();
    }
  });
}

// Run app
runApp();
