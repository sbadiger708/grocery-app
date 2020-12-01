const router = require("express").Router();
const authorize = require("../middleware/authorize");
const pool = require("../db");

// add a grocery
router.get("/grocery", authorize, async (req, res) => {
    try {
    const grocery = await pool.query('SELECT * FROM GROCERY');
    res.json(grocery.rows);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
});

// add a grocery
router.post("/grocery", authorize, async (req, res) => {
    try {
        const { name, description, image, price } = req.body;
    const grocery = await pool.query('INSERT INTO grocery (name, description, image, price) VALUES ($1, $2, $3, $4) RETURNING *',[
        name,description,image,price
    ]);
    console.log(grocery.rows[0]);
    res.json(grocery.rows[0]);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
});

// add a grocery
router.put("/grocery/:id", authorize, async (req, res) => {
    try {
        const { name, description, image, price } = req.body;
        const { id } = req.params;
    const grocery = await pool.query('UPDATE grocery SET name=$1, description=$2, image=$3, price=$4 WHERE id = $5 RETURNING *',[
        name,description,image,price,id
    ]);
    res.json(grocery.rows[0]);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
});

// add a grocery
router.delete("/grocery/:id", authorize, async (req, res) => {
    try {
        const { id } = req.params;
    const grocery = await pool.query('DELETE FROM grocery WHERE id = $1 RETURNING *',[
        id
    ]);
    res.json(grocery.rows[0]);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
});

module.exports = router;
