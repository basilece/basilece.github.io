require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const port = 3000;

const widget =  require("./widgets");
app.use(express.json());
app.use(cors());


//test route
app.get("/",(req,res) => res.json({ success : "Hello World"}));

app.use("/widgets", widgets);

app.listen(port , () => console.log(`App listening on port ${port}`));
