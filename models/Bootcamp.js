const mongoose = require("mongoose");

const BootcampSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    maxLength: [50, "name can not be more than 50 char"],
  },
  slug: String,
  description: {
    type: String,
    required: [true, "please an a description"],
    maxLength: [50, "name can not be more than 50 char"],
  },
  website: {
    type: String,
    match: [
      /(http[s]?:\/\/)?(www\.)?([-a-zA-Z0-9.-]+)\.([a-zA-Z]{2,})(\/\S*)?$/,
      "please add a valid website url",
    ],
  },
  phone: {
    type: String,
    maxlength: [20, "phone number can not be more than 12 character"],
  },
  email: {
    type: String,
    match: [
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "please add a valid email address",
    ],
  },
  address: {
    type: String,
    required: [true, "please add an address"],
  },
  location: {
    type: {
      type: String,
      enum: ["Point"],
      //   required: true,
    },
    coordinates: {
      type: [Number],
      //   required: true,
      index: "2dsphere",
    },
  },
  formattedAddress: String,
  street: String,
  city: String,
  state: String,
  zipcode: String,
  country: String,
  careers: {
    type: [String],
    required: true,
    enum: [
      "Web Development",
      "Mobile Development",
      "UI/UX",
      "Data Science",
      "Business",
      "Others",
    ],
  },
  averageRating: {
    type: Number,
    min: [1, "average rating cannot be less than one"],
    max: [10, "average rating cannot be more than 10"],
  },
  averageCost: Number,
  photo: {
    type: String,
    default: "nophoto.png",
  },
  housing: {
    type: Boolean,
    default: false,
  },
  jobAssistance: {
    type: Boolean,
    default: false,
  },
  jobGuarantee: {
    type: Boolean,
    default: false,
  },
  acceptGi: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("Bootcamp", BootcampSchema);
