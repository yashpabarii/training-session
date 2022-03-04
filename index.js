const express = require("express");
const student = require("./student");
const flash = require("express-flash");
const booksRouter = require("./books");
const shopRouter = require("./shop");

const session = require("express-session");

const app = express();

app.use(express.urlencoded({ extended: false }));

app.use(express.json());

app.use(
  session({
    cookie: { maxAge: 60000 },
    store: new session.MemoryStore(),
    saveUninitialized: true,
    resave: "true",
    secret: "secret",
  })
);
app.use(flash());

app.use("/books", booksRouter);
app.use("/shop", shopRouter);

app.listen(3000, () => {
  console.log("Listening On Port 3000");
});

app.get("/", (req, res) => {
  res.json({ message: "API is working" });
});

app.get("/api/students", (req, res) => {
  res.json({ data: student });
});

app.post("/api/students", (req, res) => {
  if (!req.body.email) {
    res.status(400);
    return res.json({ error: "Email address not found" });
  }

  const user = {
    id: student.length + 1,
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
  };

  student.push(user);
  res.json(user);
});

app.put("/api/students/:id", (req, res) => {
  let id = req.params.id;

  let first_name = req.body.first_name;
  let last_name = req.body.last_name;
  let email = req.body.email;

  const index = student.findIndex((student) => {
    return (student.id = Number.parseInt(id));
  });

  if (index >= 0) {
    const std = student[index];
    std.first_name = first_name;
    std.last_name = last_name;
    std.email = email;
    res.json(std);
  } else {
    res.status(404);
  }
});

app.delete("/api/delete/:id", (req, res) => {
  let id = req.params.id;
  let index = student.findIndex((student) => {
    return student.id == Number.parseInt(id);
  });

  if (index >= 0) {
    let std = student[index];
    student.splice(index, 1);
    res.json(std);
  } else {
    res.status(404);
  }
});
