const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {

    res.render("songs/index", {
        title: "Songs"
    });

});

module.exports = router;