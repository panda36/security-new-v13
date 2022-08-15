const schema = mongoose.Schema({
   id: String,
   userID: String,
  ///items
 items: { type: Array, required: false, default: [] },
/////blance
money: { type: Number, default: 0},
////dailytime
time: { type: Number, default: 0 },
        date: Date,
        guild: String 
});
module.exports = mongoose.model("User", schema)
