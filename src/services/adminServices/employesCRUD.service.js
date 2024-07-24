const employesModel = require("../../models/employes.model");

class employesServices {
  static postEmployes(data) {
    const newEmploye = new employesModel({ ...data });

    return newEmploye.save();
  }

  static getEmployes(data) {
    const employes = employesModel.find();

    return employes;
  }

  static getEmployeById(employeID) {
    const employes = employesModel.findById(employeID);

    return employes;
  }

  static async updateEmployes(employeID, newData) {
    try {
      const updatedEmploye = await employesModel.updateOne(
        { _id: employeID },
        { $set: newData },
        { new: true }
      );
      return updatedEmploye;
    } catch (err) {
      console.error("Erreur lors de la mise à jour de l'employé", err);
      throw err;
    }
  }

  static async deleteEmployes(employeID) {
    try {
      const deletedEmploye = await employesModel.deleteOne({ _id: employeID });
      return deletedEmploye;
    } catch (err) {
      console.error("Erreur lors de la supression de l'employé", err);
      throw err;
    }
  }

  static async getEmployeNumber() {
    try {
      let number = employesModel.countDocuments({});
      return number;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }
}

module.exports = employesServices;
