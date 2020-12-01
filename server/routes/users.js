const router = require("express").Router();
const authorize = require("../middleware/authorize");
const pool = require("../db");

router.get("/", async (req, res) => {
    try {
      const user = await pool.query("SELECT * FROM users"); 
      res.json(user.rows);
    } catch (err) {
      console.error(err.message);
      res.status(500).send(err.message);
    }
  });

router.get("/userContext", authorize, async (req, res) => {
  try {
    const user = await pool.query(
      "SELECT user_name, user_email, id FROM users WHERE id = $1",
      [req.user.id] 
    ); 
    
    res.json(user.rows[0]);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

module.exports = router;
