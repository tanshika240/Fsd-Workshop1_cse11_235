import express from "express";
import dotenv from "dotenv";
import fs from "fs";

dotenv.config();

const app = express();
app.use(express.json());
const port = process.env.PORT || 3000;

app.use((req, res, next) => {
    const start = Date.now();
    res.on("finish", () => {
        const duration = Date.now() - start;
        const size = res.getHeader("Content-Length") || 0;
        console.log(`${req.method} ${req.originalUrl} → ${res.statusCode} | ${size} bytes | ${duration} ms`);
    });
    next();
});

const filePath = "./userdata.json";

function readData() {
    if (!fs.existsSync(filePath)) {
        fs.writeFileSync(filePath, JSON.stringify([], null, 2));
    }
    const data = fs.readFileSync(filePath);
    return JSON.parse(data);
}

function writeData(data) {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

app.get("/", (req, res) => {
    res.status(200).json({ message: "Welcome to user API" });
});

app.get("/user", (req, res) => {
    const users = readData();
    res.status(200).json({ message: "All users fetched successfully", users });
});

app.get("/user/:id", (req, res) => {
    const users = readData();
    const id = parseInt(req.params.id);
    const user = users.find(u => u.id === id);
    if (!user) return res.status(404).json({ error: "User not found" });
    res.status(200).json({ message: "User fetched successfully", user });
});

app.get("/user/ids", (req, res) => {
    const users = readData();
    const ids = users.map(u => u.id);
    res.status(200).json({ message: "All user IDs fetched successfully", ids });
});

app.post("/create", (req, res) => {
    try {
        const users = readData();
        const { name, email, phone } = req.body;
        const newUser = { id: users.length + 1, name, email, phone };
        users.push(newUser);
        writeData(users);
        res.status(201).json({ message: "User created successfully", newUser });
    } catch (err) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});

app.put("/user/:id", (req, res) => {
    const users = readData();
    const id = parseInt(req.params.id);
    const index = users.findIndex(u => u.id === id);
    if (index === -1) return res.status(404).json({ error: "User not found" });
    users[index] = { ...users[index], ...req.body };
    writeData(users);
    res.status(200).json({ message: "User updated successfully", user: users[index] });
});

app.delete("/user/:id", (req, res) => {
    const users = readData();
    const id = parseInt(req.params.id);
    const newData = users.filter(u => u.id !== id);
    if (newData.length === users.length) return res.status(404).json({ error: "User not found" });
    writeData(newData);
    res.status(200).json({ message: "User deleted successfully" });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});