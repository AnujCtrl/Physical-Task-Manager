import express from "express";
import logger from "./config/logger";
import { connectToDatabase } from "./config/database";
import { requestLogger } from "./middlewares/requestLogger";
import taskRouter from "./routes/taskRouter";

const app = express();
const port = 3000;

connectToDatabase();

app.use(requestLogger);
app.use(express.json());
app.get("/", (req, res) => {
  res.send("Hello, Productivity Printer!");
});
app.use("/api/tasks", taskRouter);
app.listen(port, () => {
  logger.info(`Server is running on port ${port}`);
});

process.on("unhandledRejection", (err) => {
  logger.error(`Unhandled rejection: ${err}`);
  process.exit(1);
});
