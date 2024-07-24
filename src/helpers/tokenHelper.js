const jwt = require("jsonwebtoken");

class TokenHelper {
  constructor(secretKey) {
    this.secretKey = secretKey;
  }

  generateTokenAdmin(id) {
    try {
      const token = jwt.sign({ adminId: `${id}` }, this.secretKey, {
        expiresIn: "365d",
      });
      console.log("Token généré pour admin:", this.secretKey);
      return token;
    } catch (err) {
      console.error(err);
    }
  }

  generateToken(user) {
    try {
      const { _id } = user;
      const userId = _id;
      const token = jwt.sign({ userId: `${userId}` }, this.secretKey, {
        expiresIn: "365d",
      });
      console.log("Token généré pour utilisateur:", token);
      return token;
    } catch (err) {
      console.error(err);
    }
  }

  verifyToken(token) {
    try {
      const decoded = jwt.verify(token, this.secretKey);
      return decoded;
    } catch (err) {
      console.error(err);
    }
  }
}

module.exports = TokenHelper;
