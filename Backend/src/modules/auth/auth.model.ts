import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: [true, 'Email should be unique'],
      lowercase: true,
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minLength: 6,
      select: false,
    },
    fullName: {
      type: String,
      required: [true, 'Full name is required'],
    },
    contact: {
      type: String,
      required: [true, 'User contact is required'],
    },
    role: {
      type: String,
      enum: ['buyer', 'seller'],
      default: 'buyer',
    },
  },
  { timestamps: true }
);

userSchema.pre('save', async function () {
  if (this.isModified('password')) return;
  this.password = await bcrypt.hash(this.password, 12);
});

userSchema.methods.comparePassword = async function (
  candidatePassword: string
) {
  return bcrypt.compare(candidatePassword, this.password);
};

const UserModel = mongoose.model('User', userSchema);

export default UserModel;
