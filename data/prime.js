const schema = mongoose.Schema({
    Guild: String,
    time: Number,
    log: String,
    Permanent: Boolean,
});
module.exports = mongoose.model("Prime", schema)