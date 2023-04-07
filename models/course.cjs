const mongoose = require("mongoose");
const Schema = mongoose.Schema;
var mongoosePaginate = require("mongoose-paginate");

var courseSchema = new Schema({
  name: String,
  about: String,
  ratingNum: Number,
  rating: Number,
  image: String,
  what_learn: [String],
  currrent_module_num: { type: Number, default: 0 },
  modules: [
    {
      topic: String,
      status: { type: Number, default: 0 }, //0->not completed 1->completed
      conversation: [{}],
    },
  ],

  registered: { default: false, type: Boolean },
});

courseSchema.plugin(mongoosePaginate);
var Course = mongoose.model("course", courseSchema);

module.exports = Course;
