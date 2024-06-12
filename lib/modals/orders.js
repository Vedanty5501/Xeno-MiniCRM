import {Schema,model,models} from "mongoose";


const orderSchema = new Schema({
  customer: { type: Schema.Types.ObjectId, ref: 'Customer', required: true },
  products: [{ type: Schema.Types.ObjectId, ref: 'Product', required: true }],
  quantity: { type: Number, required: true },
  totalPrice: { type: Number, required: true },
  orderDate: { type: Date, default: Date.now }
});

const Order = model('Order', orderSchema);
export default Order;
