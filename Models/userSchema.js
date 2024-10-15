import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { 
      type: String, 
      unique: true, 
      required: true, 
      match: /.+\@.+\..+/ // Basic email format validation
    },
    password: { type: String, required: true },
    location: {
      district: { type: String, required: true },
      state: { type: String, required: true }
    },
    phoneNumber: { type: String, required: true },
    age: { type: Number, required: true },
    dateOfBirth: { type: Date, required: true },
    randomString: String,
    expirationTimestamp: Number
}, { timestamps: true }); // Automatically manage createdAt and updatedAt fields

export default mongoose.model('User', UserSchema);
