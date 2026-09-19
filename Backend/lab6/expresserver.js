import express from "express";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json());
const port = process.env.PORT || 3000;

// ✅ Middleware to log status, size, time
app.use((req, res, next) => {
  const start = Date.now();

  res.on("finish", () => {
    const duration = Date.now() - start;
    const size = res.getHeader("Content-Length") || 0;
    console.log(
      `${req.method} ${req.originalUrl} → ${res.statusCode} | ${size} bytes | ${duration} ms`,
    );
  });

  next();
});

// ✅ Array of objects
let userData = [
  {
    id: 1,
    name: "Aayushi Sharma",
    phone: "7827536087",
    email: "aayushi@gmail.com",
  },
  {
    id: 2,
    name: "Anshika Tomar",
    phone: "7845336087",
    email: "anshika@gmail.com",
  },
  { id: 3, name: "Pihu Sharma",
    phone: "2937536087", 
    email: "pihu@gmail.com" },
  {
    id: 4,
    name: "Aditi Sehrawat",
    phone: "7827893273",
    email: "aditi@gmail.com",
  },
];

// ------------------- Routes -------------------

// Root route
app.get("/", (req, res) => {
  res.status(200).json({ message: "Welcome to user API" });
});

// GET → all users
app.get("/user", (req, res) => {
  res.status(200).json({
    message: "All users fetched successfully",
    users: userData,
  });
});

// GET → single user by id
app.get("/user/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const user = userData.find((u) => u.id === id);

  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  res.status(200).json({ message: "User fetched successfully", user });
});

// GET → all user IDs only
app.get("/user/ids", (req, res) => {
  const ids = userData.map((u) => u.id);
  res.status(200).json({
    message: "All user IDs fetched successfully",
    ids,
  });
});

// POST → create new user
app.post("/create", (req, res) => {
  try {
    const { name, email, phone } = req.body;
    const newUser = {
      id: userData.length + 1,
      name,
      email,
      phone,
    };
    userData.push(newUser);
    res.status(201).json({
      message: "User created successfully",
      newUser,
    });
  } catch (err) {
    console.log("error", err.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// PUT → update user by id
app.put("/user/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = userData.findIndex((u) => u.id === id);

  if (index === -1) {
    return res.status(404).json({ error: "User not found" });
  }

  userData[index] = { ...userData[index], ...req.body };

  res.status(200).json({
    message: "User updated successfully",
    user: userData[index],
  });
});

// DELETE → remove user by id
app.delete("/user/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const newData = userData.filter((u) => u.id !== id);

  if (newData.length === userData.length) {
    return res.status(404).json({ error: "User not found" });
  }

  userData = newData;
  res.status(200).json({ message: "User deleted successfully" });
});

// ---------------------------------------------------

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
