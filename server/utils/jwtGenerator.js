const jwt = require("jsonwebtoken");
require("dotenv").config();

function jwtGenerator(id, user_name, user_email) {
  const payload = {
    user: {
      id,
      user_name,
      user_email
    }
  };

  return jwt.sign(payload, process.env.jwtSecret, { expiresIn: "24h" });
}

module.exports = jwtGenerator;
