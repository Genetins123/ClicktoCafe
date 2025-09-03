const express = require("express");
const {
  getRestaurants,
  createRestaurant,
  deleteRestaurant,
  updateRestaurant,
} = require("../controllers/restaurantController");

const { getFoodsByRestaurant } = require("../controllers/foodController"); // 👈 Correct place

const router = express.Router();

// Restaurants
router.get("/", getRestaurants);
router.post("/", createRestaurant);
router.put("/:id", updateRestaurant);
router.delete("/:id", deleteRestaurant);

// Foods by restaurant
router.get("/:id/foods", getFoodsByRestaurant);

module.exports = router;
