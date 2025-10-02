import mongoose from "mongoose";

const customerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  dateOfBirth: {
    type: Date,
    required: true
  },
  memberNumber: {
    type: Number,
    required: true,
    unique: true
  },
  interests: {
    type: String,
    required: true
  }
}, {
  timestamps: true // This will add createdAt and updatedAt fields automatically
});

const Customer = mongoose.models.customer || mongoose.model("customer", customerSchema);

export default Customer;