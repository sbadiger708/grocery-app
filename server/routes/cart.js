const router = require("express").Router();
const authorize = require("../middleware/authorize");
const pool = require("../db");

// get all a cart items
router.get("/", authorize, async (req, res) => {
    try {
    // const cart = await pool.query('SELECT * FROM CART WHERE user_id=$1',[req.user.id]);
    const cart = await pool.query(`
        SELECT 
            grocery.name, grocery.description, grocery.price, grocery.image, grocery.id, cart.user_id, cart.grocery_id, cart.id
        FROM 
            grocery
        INNER JOIN 
            cart 
        ON
            grocery.id=cart.grocery_id
        WHERE 
            cart.user_id=$1`,[req.user.id]);
    res.json(cart.rows);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
});

// add a grocery
router.post("/add", authorize, async (req, res) => {
    try {
    const { grocery_id } = req.body;
    const user_id = req.user.id;
    const itemExist = await pool.query('SELECT * FROM cart WHERE user_id = $1 and grocery_id = $2',[user_id, grocery_id]);
    console.log(itemExist);
    if(itemExist.rows.length > 0) {
        res.json({
            success: false,
            message: "Already Exist in cart!"
        });
    }else {
        const cart = await pool.query('INSERT INTO cart (user_id, grocery_id) VALUES ($1, $2) RETURNING *',[
            user_id, grocery_id
        ]);
        res.json({
            success: true,
            data: cart.rows[0]
        });
    }
    } catch (err) {
      res.json({
          success: false,
          message: err.message
      });
    }
});

// add a grocery
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
