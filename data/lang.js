const schema = mongoose.Schema({ 
  guildID: String,
  language: { type: String, default: "english"},
});
module.exports = mongoose.model("lang", schema)