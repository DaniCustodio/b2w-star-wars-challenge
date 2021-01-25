const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schema = new Schema({
  name: { type: String, unique: true, required: true },
  climate: { type: String, required: true },
  terrain: { type: String, required: true },
  filmAppearances: { type: String, required: true},
  createdDate: { type: Date, default: Date.now },
});

schema.set("toJSON", { virtuals: true });

module.exports = mongoose.model("Planet", schema);
