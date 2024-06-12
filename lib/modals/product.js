import {Schema,model,models} from "mongoose";

const productSchema = new Schema({
  name: { type: String, required: true },
  brand: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  size: { type: String, required: true },
  color: { type: String, required: true },
  material: { type: String },
  gender: { type: String, enum: ['Men', 'Women', 'Unisex'], required: true }
});

const Product = models.Product || model('Product', productSchema);

export default Product;
