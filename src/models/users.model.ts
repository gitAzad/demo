import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import IUser from '../interfaces/IUser';

const userSchema = new mongoose.Schema<IUser>(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    imgUrl: {
      type: String,
    },
    password: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
      unique: true,
    },
    language: {
      type: String,
      enum: ['HINDI', 'ENGLISH'],
      default: 'HINDI',
    },
    gender: {
      type: String,
    },
    martialStatus: {
      type: String,
    },
    dob: {
      dd: {
        type: String,
      },
      mm: {
        type: String,
      },
      yyyy: {
        type: String,
      },
    },
    timeOfBirth: {
      type: String,
    },
    userType: {
      type: String,
      required: true,
      enum: ['ADMIN', 'AUTHOR', 'USER'],
      default: 'USER',
    },
    active: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
    collection: 'users',
  }
);

userSchema.methods.hashPassword = function (password: string) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
};

userSchema.methods.comparePassword = function (password: string) {
  return bcrypt.compareSync(password, this.password);
};

userSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};

userSchema.pre('save', function (next) {
  if (this.isModified('password')) {
    this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync());
  }
  next();
});

userSchema.pre('findOneAndUpdate', function (next) {
  // @ts-ignore
  if (this._update.password && this._update.password.length > 0) {
    // @ts-ignore
    this._update.password = bcrypt.hashSync(
      // @ts-ignore
      this._update.password,
      bcrypt.genSaltSync()
    );
  } else {
    // @ts-ignore
    delete this._update.password;
  }

  next();
});

export default mongoose.model<IUser>('User', userSchema);
