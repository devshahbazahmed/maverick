import mongoose, { Document, Model, Schema } from 'mongoose';
import bcrypt from 'bcryptjs';
import type { IUser, IUserMethods } from '../../common/types/index.js';

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
      required: function (this: IUser): boolean {
        return !this.googleId;
      },
      minLength: 6,
      select: false,
    },
    fullName: {
      type: String,
      required: [true, 'Full name is required'],
    },
    contact: {
      type: String,
      required: false,
    },
    role: {
      type: String,
      enum: ['buyer', 'seller'],
      default: 'buyer',
    },
    googleId: {
      type: String,
      required: false,
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
