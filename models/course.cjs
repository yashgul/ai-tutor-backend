const mongoose = require("mongoose");
const Schema = mongoose.Schema;
var mongoosePaginate = require("mongoose-paginate");

var productSchema = new Schema({
  name: String,
  about: String,
  ratingNum: Number,
  rating: Number,
  image: String,
  registered: { default: false, type: Boolean },
});

productSchema.plugin(mongoosePaginate);
var Product = mongoose.model("product", productSchema);

module.exports = Product;
