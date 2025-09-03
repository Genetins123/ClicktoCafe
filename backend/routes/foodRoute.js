const express = require("express");
const {
  getFoods,
  getFoodById,
  addFood,
  updateFood,
  deleteFood,
  getFoodsByRestaurant, // 🔥 new controller
} = require("../controllers/foodController");

const router = express.Router();

router.get("/", getFoods);                         // GET all foods
router.get("/:id", getFoodById);                   // GET food by id
router.get("/restaurant/:store", getFoodsByRestaurant); // ✅ GET foods by restaurant
router.post("/", addFood);                         // ADD food
router.put("/:id", updateFood);                    // UPDATE food
router.delete("/:id", deleteFood);                 // DELETE food

module.exports = router;
