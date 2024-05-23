// const mongoose = require('mongoose');
// const Schema = mongoose.Schema;
// const bcrypt = require('bcryptjs');

// const UserSchema = new Schema({
//     email: { type: String, required: true, unique: true },
//     password: { type: String, required: true }
// });

// UserSchema.pre('save', async function(next) {
//     if (this.isModified('password')) {
//         this.password = await bcrypt.hash(this.password, 8);
//     }
//     next();
// });

// UserSchema.methods.comparePassword = async function(candidatePassword) {
//     return await bcrypt.compare(candidatePassword, this.password);
// }

// const User = mongoose.model('User', UserSchema);
// module.exports = User;