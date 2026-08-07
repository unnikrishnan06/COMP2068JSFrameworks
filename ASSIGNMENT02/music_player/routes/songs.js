const express = require("express");
const router = express.Router();
const Song = require("../models/song");
router.get("/", async (req, res) => {
    const songs = await Song.find();
    res.render("songs/index", {
        title: "Songs",
        songs
    });
});
router.get("/add", (req, res) => {
    res.render("songs/add", {
        title: "Add Song"
    });

});
router.post("/add", async (req, res) => {
    const song = new Song(req.body);
    await song.save();
    res.redirect("/songs");
});
// Show Edit Page
router.get("/edit/:id", async (req, res) => {

    const song = await Song.findById(req.params.id);

    res.render("songs/edit", {
        title: "Edit Song",
        song: song
    });

});
// Update Song
router.post("/edit/:id", async (req, res) => {

    await Song.findByIdAndUpdate(req.params.id, req.body);

    res.redirect("/songs");

});
// Delete Song
router.get("/delete/:id", async (req, res) => {

    await Song.findByIdAndDelete(req.params.id);

    res.redirect("/songs");

});

module.exports = router;