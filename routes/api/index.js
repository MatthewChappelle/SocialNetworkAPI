const router = require("express").Router();
const userRoutes = require("./userRoutes");
const thoughtRoutes = require("./thoughtRoutes");

// add prefix of `/users` and `/thoughts` to routes created in `user-routes.js` and `thought-routes.js`
router.use("/users", userRoutes);
router.use("/thoughts", thoughtRoutes);

module.exports = router