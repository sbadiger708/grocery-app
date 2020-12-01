const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const pool = require("../db");
const validInfo = require("../middleware/validInfo");
const jwtGenerator = require("../utils/jwtGenerator");
const authorize = require("../middleware/authorize");

//authorizeentication

router.post("/register", validInfo, async (req, res) => {
  try {
    const { email, name, password } = req.body;
    const user = await pool.query("SELECT * FROM users WHERE user_email = $1", [
      email
    ]);
    
    if (user.rows.length > 0) {
      return res.json({
          success: false,
          message: "User already exist!"
      });
    }else {
        const salt = await bcrypt.genSalt(10);
        const bcryptPassword = await bcrypt.hash(password, salt);
    
        let newUser = await pool.query(
          "INSERT INTO users (user_name, user_email, user_password) VALUES ($1, $2, $3) RETURNING *",
          [name, email, bcryptPassword]
        );
    
        const jwtToken = jwtGenerator(newUser.rows[0].id);
    
        return res.json({ 
            success: true,
            jwtToken
         });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

router.post("/login", validInfo, async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await pool.query("SELECT * FROM users WHERE user_email = $1", [
      email
    ]);

    if (user.rows.length === 0) {
      return res.json({
          success: false,
          message: "Invalid Credential"
      });
    }

    const validPassword = await bcrypt.compare(
      password,
      user.rows[0].user_password
    );

    if (!validPassword) {
      return res.json({
        success: false,
        message: "Invalid Credential"
      });
    }
    const jwtToken = jwtGenerator(user.rows[0].id, user.rows[0].user_email, user.rows[0].user_name);
    return res.json({ 
        success: true,
        jwtToken
     });
  } catch (err) {
    console.error(err.message);
    res.send({
        success: false,
        message: err.message
    });
  }
});

router.post("/verify", authorize, (req, res) => {
  try {
    res.json(true);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
