const mongoose = require("mongoose");

//model for employes pictures
const PicturesSchema = new mongoose.Schema({
  file_path: {
    type: String,
    default: "",
    resuired: true,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
  size: {
    type: Number,
    required: true,
    default: 0,
  },
  file_name: {
    type: String,
    default: "",
  },
});

//employes 's model
const employesSchema = new mongoose.Schema({
  profilePictures: {
    type: [PicturesSchema],
    default: "",
  },
  name: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  Age: {
    type: Number,
    required: true,
    validate: {
      validator: function (value) {
        return value >= 18;
      },
      message: (props) => `${props.value} doit être au moins 18 ans!`,
    },
  },
  adress: {
    type: String,
    default: "Adresse inconnu",
  },
  email: {
    type: String,
    required: true,
    trim: true,
    match: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/, //regex verification
  },
  matriculeNumber: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  PhoneNumber: {
    type: String,
    required: true,
    match: /^\d{3}\s\d{2}\s\d{3}\s\d{2}$/, //(038 19 580 04) //regex validation
  },
  Departement: {
    type: String,
    required: true,
  },
});

employesSchema.pre("validate", function (next) {
  if (this.PhoneNumber) {
    this.PhoneNumber = this.PhoneNumber.replace(/\s/g, "").replace(
      /(\d{3})(\d{2})(\d{3})(\d{2})/,
      "$1 $2 $3 $4"
    );
  }
  next();
});

const employesModel = mongoose.model("employes", employesSchema);
module.exports = employesModel;
