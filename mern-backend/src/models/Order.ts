import mongoose, { Schema, Document } from 'mongoose';

export interface IOrder extends Document {
  user: string;
  items: Array<{
    productId: string;
    name: string;
    image: string;
    price: number;
    quantity: number;
    sizes?: string[];
    colors?: string[];
    category?: string;
  }>;
  total: number;
  status: string;
  createdAt: Date;
  updatedAt: Date;
  shippingAddress: string;
  paymentId?: string;
}

const OrderSchema: Schema = new Schema({
  user: { type: String, required: true },
  items: [
    {
      productId: { type: String, required: true },
      name: String,
      image: String,
      price: Number,
      quantity: Number,
      sizes: [String],
      colors: [String],
      category: String,
    },
  ],
  total: { type: Number, required: true },
  status: { type: String, default: 'pending' },
  shippingAddress: { type: String, required: true },
  paymentId: { type: String },
}, { timestamps: true });

export default mongoose.model<IOrder>('Order', OrderSchema);
