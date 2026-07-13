require("dotenv").config();
const companyRoutes = require("./routes/company.routes");
const loomRoutes = require("./routes/loom.routes");
const partyRoutes = require("./routes/party.routes");
const beamReceiptRoutes = require("./routes/beamReceipt.routes");

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");

const connectDB = require("./config/db");

const app = express();

// Connect Database
connectDB();

// Middleware
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());

// Test Route
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "🚀 Khata ERP API is running...",
  });
});

app.use("/api/company", companyRoutes);
app.use("/api/looms", loomRoutes);
app.use("/api/parties", partyRoutes);
app.use("/api/beam-receipts", beamReceiptRoutes);


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});