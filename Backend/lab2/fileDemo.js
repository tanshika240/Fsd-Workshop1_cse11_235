import fs from "node:fs/promises";

const filePath = "userdata.txt";

// Function to create/write a file (overwrites old content)
async function createFile(content) {
  try {
    await fs.writeFile(filePath, content, { encoding: "utf8" });
    console.log("File created successfully");
  } catch (error) {
    console.error("Error creating file:", error);
  }
}

// Function to read a file
async function readFile() {
  try {
    const data = await fs.readFile(filePath, { encoding: "utf8" });
    console.log("File read successfully");
    return data;
  } catch (error) {
    console.error("Error reading file:", error);
  }
}

// Function to append data (adds new content without overwriting)
async function appendFile(content) {
  try {
    await fs.appendFile(filePath, content, { encoding: "utf8" });
    console.log("Data appended successfully");
  } catch (error) {
    console.error("Error appending file:", error);
  }
}

// Function to delete a file
async function deleteFile() {
  try {
    await fs.unlink(filePath);
    console.log("File deleted successfully");
  } catch (error) {
    console.error("Error deleting file:", error);
  }
}

// Example usage
(async () => {
  await createFile("Hello World\n"); // creates file
  await appendFile("This is appended text\n"); // adds new line
  const result = await readFile(); // reads full file
  console.log("File contents:\n" + result);

  await deleteFile(); // deletes the file
})();
