const employesModel = require("../models/employes.model");

const verifyMatricule = async (matricule) => {
  try {
    let employe = await employesModel.findOne({ matriculeNumber: matricule });

    if (employe) {
      return true;
    } else {
      return false;
    }
  } catch (err) {
    console.error(err);
    throw err;
  }
};

module.exports = { verifyMatricule };
