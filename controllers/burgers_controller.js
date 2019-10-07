var express = require("express");
var burger = require("../models/burger");
var router = express.Router();

// Create all our routes and set up logic within those routes where required.
router.get("/", function(req, res) {
  burger.selectBurger(function(data) {
    var hbsObject = {
      burgers: data
    };
    console.log(hbsObject);
    res.render("index", hbsObject);
  });
});

router.post("/api/burgers", function(req, res) {
  burger.insertBurger([ "burger_name", "devoured"  ], 
   [req.body.burger_name, req.body.devoured],
   function(result) {
    // Send back the ID of the burger
    res.json({ id: result.insertId });
  });
});

router.put("/api/burgers/:id", function(req, res) {
  var condition = "id = " + req.params.id;

  console.log("condition", condition);

  burger.updateBurger({
    devoured: req.body.devoured
  }, condition, function(result) {
    if (result.changedRows === 0) {
      // If no rows were changed, then the ID must not exist, so 404
      return res.status(404).end();
    } else {
      res.status(200).end();
    }
  });
});

router.delete("/api/burgers/:id", function(req, res) {
  var condition = "id = " + req.params.id;

  burger.deleteBurger(condition, function(result) {
    if (result.affectedRows == 0) {
      // If no rows were changed, send out 404
      return res.status(404).end();
    } else {
      res.status(200).end();
    }
  });
});

// Export for server.js to use.
module.exports = router;
