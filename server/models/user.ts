import mongoose from 'mongoose';
import bcrypt from 'bcryptjs'

const userSchema = new mongoose.Schema({
    username: {
        type: String,
    },
    password: {
        type: String,
        required: true,
        select: false,
      },
    contacts: {
        type: Array
    }
});
userSchema.statics.findUserByCredentials = function (username, password) {
    return this.findOne({ username })
      .select('+password')
      .then((user:any) => {
        if (!user) {
          return Promise.reject(new Error('Неправильный логин или пароль'));
        }
        return bcrypt.compare(password, user.password).then((matched) => {
          if (!matched) {
            return Promise.reject(new Error('Неправильная почта или пароль'));
          }
          return user;
        });
      });
  };

module.exports = mongoose.model('user', userSchema);
