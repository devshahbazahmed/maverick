import mongoose, { Schema } from 'mongoose';

const productSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, 'Product title is required'],
    },
    description: {
      type: String,
      required: [true, 'Product description is required'],
    },
    seller: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Product Seller is required'],
    },
    price: {
      amount: {
        type: String,
        required: true,
      },
      currency: {
        type: String,
        enum: ['USD', 'INR', 'EUR', 'GBP', 'JPY'],
        default: 'INR',
      },
    },
    images: [
      {
        url: {
          type: String,
          required: [true, 'Image URL is required'],
        },
      },
    ],
  },
  { timestamps: true }
);

const ProductModel = mongoose.model('Product', productSchema);

export default ProductModel;
