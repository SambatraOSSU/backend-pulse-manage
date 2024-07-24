const TokenHelper = require("../../helpers/tokenHelper");
const adminId = require("../../utils/generateID");
const employesServices = require("../../services/adminServices/employesCRUD.service");
const { secretKey } = require("./../../utils/Secretkey");
const { verifyMatricule } = require("./../../helpers/verifyEmployes");
const fs = require("fs");

const adminLogin = async (req, res) => {
  const { adminName, adminPassword } = req.body;

  //add token new instance
  const newTokenHelper = new TokenHelper(secretKey);

  try {
    if (
      adminName === process.env.ADMIN_USERNAME &&
      adminPassword === process.env.ADMIN_PASSWORD
    ) {
      let token = newTokenHelper.generateTokenAdmin(adminId);
      console.log("token: ", token);
      res.status(200).json({ mesage: "Admin login succesfully", token });
    } else {
      res.status(400).json({ mesage: "Admin login failed" });
    }
  } catch (err) {
    console.error(err);
  }
};

const createEmployes = async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: "Aucun fichier téléchargé." });
    }

    const {
      name,
      firstName,
      Age,
      adress,
      email,
      matriculeNumber,
      PhoneNumber,
      Departement,
    } = req.body;

    let checkEmployes = await verifyMatricule(matriculeNumber);

    if (!checkEmployes) {
      const pictures = req.files.map((file) => ({
        file_path: file.path,
        file_name: file.originalname,
        size: file.size,
      }));

      let employeData = {
        profilePictures: pictures,
        name,
        firstName,
        Age,
        adress,
        email,
        matriculeNumber,
        PhoneNumber,
        Departement,
      };
      let response = await employesServices.postEmployes(employeData);
      if (response) {
        res.status(200).json({ message: "employé ajouté avec succès" });
      } else {
        res.status(500).json({ message: "échec lors de l'ajout d'un employé" });
      }
    } else {
      res
        .status(400)
        .json({ message: "L' employé existe déja avec ce matricule" });
    }
  } catch (err) {
    console.error(err);
    throw err;
  }
};

const verifyMiddleware = async (req, res, next) => {
  try {
    const { matriculeNumber } = req.body;
    console.log("venant du verifyMiddelware :", req.body);

    const employeExists = await verifyMatricule(matriculeNumber);

    if (employeExists) {
      res.status(400).json("Matricule déjà dans la base de données");
    } else {
      next();
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erreur interne du serveur" });
  }
};

const getAllEmployes = async (req, res) => {
  try {
    let allEmployes = await employesServices.getEmployes();

    if (allEmployes) {
      res
        .status(200)
        .json({ message: "employés récupérés avec succés", allEmployes });
    } else {
      res
        .status(500)
        .json({ message: "échec lors de la récupération  des employés" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "erreur interne du serveur" });
  }
};

const modifyEmployes = async (req, res) => {
  try {
    let newData = req.body;
    const { employeID } = req.params;
    console.log("id: ", employeID);
    let updatedEmploye = await employesServices.updateEmployes(
      employeID,
      newData
    );

    if (updatedEmploye) {
      res
        .status(200)
        .json({ message: "employé modifié avec succés", updatedEmploye });
    } else {
      res
        .status(500)
        .json({ message: "échec lors de la modification de l' employé" });
    }
  } catch (err) {
    console.error(err);
    throw err;
  }
};

const removeEmployes = async (req, res) => {
  try {
    const { employeID } = req.params;
    const employe = await employesServices.getEmployeById(employeID);

    if (!employe) {
      return res.status(404).json({ message: "Employé non trouvé" });
    }

    employe.profilePictures.forEach((picture) => {
      fs.unlinkSync(picture.file_path);
    });

    let deletedEmploye = await employesServices.deleteEmployes(employeID);

    if (deletedEmploye) {
      res
        .status(200)
        .json({ message: "employé supprimé avec succés", deletedEmploye });
    } else {
      res
        .status(500)
        .json({ message: "échec lors de la suppression de l' employé" });
    }
  } catch (err) {
    console.error(err);
    throw err;
  }
};

const employeNumber = async (req, res) => {
  try {
    const employeNumber = await employesServices.getEmployeNumber();

    if (employeNumber) {
      res
        .status(200)
        .json({ message: "nombre d' employé récupéré", employeNumber });
    } else {
      res
        .status(500)
        .json({ message: "échec lors de la r&cup&ration du nombre employé" });
    }
  } catch (err) {
    console.error(err);
    throw err;
  }
};

//exportation des modules
module.exports = {
  adminLogin,
  verifyMiddleware,
  createEmployes,
  getAllEmployes,
  modifyEmployes,
  removeEmployes,
  employeNumber,
};
