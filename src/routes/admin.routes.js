const express = require("express");
const router = express.Router();
const {
  adminLogin,
  createEmployes,
  getAllEmployes,
  modifyEmployes,
  verifyMiddleware,
  removeEmployes,
  employeNumber,
} = require("../controllers/adminController/admin.controller");
const upload = require("./../middlewares/upload");

//route pour le admin login
router.post("/login", adminLogin);

//route pour l' ajout d' un employé
router.post(
  "/add-employe",
  verifyMiddleware,
  upload.array("image", 1),
  createEmployes
);

//route pour la récupération des employés
router.get("/get-employes", getAllEmployes);

//route pour la modifier un employé
router.put("/update-employes/:employeID", modifyEmployes);

//route pour la supression un employé
router.delete("/delete-employes/:employeID", removeEmployes);

//route pour la récupération du nombre d' employé
router.get("/employe-number", employeNumber);

module.exports = router;
