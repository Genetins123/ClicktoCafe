const express = require("express");
const {
  getRestaurants,
  getFoodsByRestaurant,
  createRestaurant,
   deleteRestaurant,
  updateRestaurant

} = require("../controllers/restaurantController");

const router = express.Router();

router.get("/", getRestaurants);
router.get("/:id/foods", getFoodsByRestaurant);
router.post("/", createRestaurant);
// Delete restaurant
router.delete("/:id", deleteRestaurant);
// Update restaurant
router.put("/:id", updateRestaurant);


module.exports = router;
