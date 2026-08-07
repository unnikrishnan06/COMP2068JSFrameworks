const mongoose = require("mongoose");
// const fuzzySearch = require("mongoose-fuzzy-searching");
const songSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    artist: {
        type: String,
        required: true
    },
    album: {
        type: String
    },
    genre: {
        type: String
    },
    year: {
        type: Number
    }
});
// songSchema.plugin(fuzzySearch, {
//     fields: ["title", "artist", "album", "genre"]
// });
const Song = mongoose.model("Song", songSchema);
module.exports = Song;