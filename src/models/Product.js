// models/Product.js
const ProductSchema = new mongoose.Schema({
  name: String,
  tileSize: { width: Number, height: Number },
  tilesPerBox: Number
});
