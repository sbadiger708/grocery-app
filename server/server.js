require('dotenv').config();
const express = require('express');
const cors = require("cors");
const morgan = require('morgan');
const app = express();

const port = process.env.PORT || 5000;

app.use(morgan('dev'));
app.use(cors());
app.use(express.json());

app.use("/api/auth", require("./routes/jwtAuth"));

app.use("/api/user", require("./routes/users"));

app.use("/api/dashboard", require("./routes/dashboard"));

app.use("/api/cart", require("./routes/cart"));

app.use("/api/payment", require("./routes/payments"));
// //ROUTES
// //get all restaurants
// app.get('/api/v1/restaurants', async (req, res) => {
//     try {
//         const restaurants = await db.query('select * from restaurants');
//         res.status(200).json({
//             success: true,
//             data: restaurants.rows
//         });
//     } catch (err) {
//         console.log(err);
//     }
// });

// // get a restaurants
// app.get('/api/v1/restaurants/:id', async (req, res) => {
//     try {
//         const { id } = req.params;
//         console.log(id);
//         const restaurant = await db.query('select * from restaurants where id = $1', [id]);
//         res.status(200).json({
//             success: true,
//             data: restaurant.rows[0]
//         });
//     } catch (err) {
//         res.json({
//             success: false,
//             err: err.message
//         })
//     }
// });

// // post a restaurants
// app.post('/api/v1/restaurants', async (req, res) => {
//     try {
//         const { name, location, price_range } = req.body;
//         const restaurant = await db.query('INSERT INTO restaurants (name, location, price_range) values ($1, $2, $3) RETURNING *', [name, location, price_range]);
//         res.status(200).json({
//             success: true,
//             data: restaurant.rows[0]
//         });
//     } catch (err) {
//         console.log(err);
//     }
// });

// // update a restaurants
// app.put('/api/v1/restaurants/:id', async (req, res) => {
//     try {
//         const { name, location, price_range } = req.body;
//         const { id } = req.params;
//         const restaurant = await db.query('UPDATE restaurants SET name = $1, location = $2, price_range = $3 WHERE id = $4 RETURNING *', [name, location, price_range, id]);
//         res.status(200).json({
//             success: true,
//             data: restaurant.rows[0]
//         });
//     } catch (err) {
//         console.log(err);
//     }
// });

// // get a restaurants
// app.delete('/api/v1/restaurants/:id', async (req, res) => {
//     try {
//         const { id } = req.params;
//         const restaurant = await db.query('DELETE FROM restaurants WHERE id = $1 RETURNING *', [id]);
//         res.status(204).json({
//             success: true,
//             data: restaurant.rows[0]
//         });
//     } catch (err) {
//         console.log(err);
//     }
// });

app.listen(port, () => {
    console.log('Server is listening on PORT', port);
})