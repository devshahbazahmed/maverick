import mongoose, { Document, Model, Schema } from 'mongoose';
import bcrypt from 'bcryptjs';

interface IUserMethods {
  comparePassword(candidatePassword: string): Promise<boolean>;
}
interface IUser {
  fullName: string;
  email: string;
  password: string;
  contact: string;
  role: 'buyer' | 'seller';
}

type UserDocument = Document & IUser & IUserMethods;

type UserModel = Model<IUser, {}, IUserMethods>;

const userSchema = new Schema<IUser, UserModel, IUserMethods>(
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
  if (!this.isModified('password')) return;
  this.password = await bcrypt.hash(this.password, 12);
});

userSchema.methods.comparePassword = async function (
  candidatePassword: string
): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.password);
};

const UserModel = mongoose.model<IUser, UserModel>('User', userSchema);

export default UserModel;
