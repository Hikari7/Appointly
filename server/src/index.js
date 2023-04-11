const express = require("express");
const cors = require("cors");
require("express-async-errors");
require("./utils/mongodb");

const authRoute = require("./routes/auth.route");
const appointmentRoute = require("./routes/appointment.route");
const userRoute = require("./routes/user.route");
// const { checkToken } = require('./controllers/auth.controller')

const app = express();

app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api", (_, res) => res.json({ message: "Health check" }));
app.use("/auth", authRoute);
app.use("/appointment", appointmentRoute);
app.use("/user", userRoute);
// app.use('/user', checkToken, userRoute)

app.use((req, res, next) => {
  const err = new Error("Route not found.");
  err.status = 404;
  next(err);
});

app.use((error, _, res) => {
  res.status(error.status || 500).json({ error: error.message });
});

const PORT = process.env.SERVER_PORT || 8000;
app.listen(PORT, async () => {
  console.log(`Server listening on port ${PORT}`);
});
