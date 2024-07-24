// génération de id unique via uuid v4
const { v4: uuidv4 } = require("uuid");

//générer l' id unique par uuid
let adminId = uuidv4();

module.exports = adminId
