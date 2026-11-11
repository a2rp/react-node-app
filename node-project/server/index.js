// server/index.js
const express = require("express");
const PORT = process.env.PORT || 3001;
const app = express();

app.disable("x-powered-by");

app.get("/api", (req, res) => {
    res.json({
        message: "Hello from Express",
        service: "react-node-app",
        status: "ok",
    });
});

app.use("/api", (req, res) => {
    res.status(404).json({ message: "API endpoint not found" });
});

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});

