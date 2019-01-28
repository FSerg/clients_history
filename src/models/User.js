import mongoose from 'mongoose';
import bcrypt from 'bcrypt-nodejs';

const { Schema } = mongoose;
const userSchema = new Schema(
  {
    email: {
      type: String,
      unique: true,
      lowercase: true,
      required: true,
      index: true
    },
    password: { type: String, required: true },
    isActive: { type: Boolean, default: false },
    role: {
      type: String,
      enum: ['admin', 'manager', 'user'],
      default: 'user'
    }
  },
  {
    timestamps: true
  }
);

userSchema.methods.comparePassword = function(candidatePassword, callback) {
  bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
    if (err) {
      return callback(err);
    }

    callback(null, isMatch);
  });
};

// middleware: before saving, check if password was changed,
// and if so, encrypt new password before saving:
// userSchema.pre('save', function(next) {
//   if (this.isModified('password')) {
//     this.password = this.generateHash(this.password);
//   }
//   next();
// });

userSchema.pre('save', function(next) {
  const user = this;
  if (!user.isModified('password')) {
    return next();
  }

  bcrypt.genSalt(10, (errSalt, salt) => {
    if (errSalt) {
      return next(errSalt);
    }

    bcrypt.hash(user.password, salt, null, (errHash, hash) => {
      if (errHash) {
        return next(errHash);
      }
      user.password = hash;
      next();
    });
  });
});

module.exports = mongoose.model('user', userSchema);
