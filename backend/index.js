import express from "express";
import cors from "cors";
import routes from "./routes.js";

const app = express();
const PORT = 5000;


app.use(cors({
  origin: "http://localhost:5173", 
}));

app.use(express.json());
app.use("/api", routes);

// Keep it API-only — no root page needed
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
