const express = require("express");
const router = express.Router();
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

router.get("/",(req,res) => {
    res.json({ success : "Hello Widget"})
});


module.exports = router;

