const router = require("express").Router();
const authorize = require("../middleware/authorize");
const pool = require("../db");

// get all a Payments
router.get("/", authorize, async (req, res) => {
    try {
    const payments = await pool.query(`
    SELECT 
        grocery.name, grocery.description, grocery.price, grocery.id, 
        payment.user_id, payment.grocery_id, payment.id, payment.completed, payment.purchased_at
    FROM 
        grocery
    INNER JOIN 
        payment 
    ON
        grocery.id=payment.grocery_id
    WHERE 
        payment.user_id=$1`,[req.user.id]);

    res.json(payments.rows);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
});

// add a payment
router.post("/add", authorize, async (req, res) => {
    try {
    const { grocery_id } = req.body;
    const user_id = req.user.id;
    const cart = await pool.query('INSERT INTO payment (user_id, grocery_id, purchased_at, completed) VALUES ($1, $2, $3, $4) RETURNING *',[
        user_id, grocery_id, new Date(), true
    ]);
    res.json({
        success: true,
        data: cart.rows[0]
    });
    } catch (err) {
      res.send({
          success: false,
          message: err.message
      });
    }
});

// delete payment
router.delete("/delete/:id", authorize, async (req, res) => {
    try {
    const { id } = req.params;
    const grocery = await pool.query('DELETE FROM cart WHERE id = $1 RETURNING *',[
        id
    ]);
    res.json(grocery.rows[0]);
    } catch (err) {
      res.status(500).send(err.message);
    }
});

module.exports = router;
