const express = require("express");
const router = express.Router();
const bookController = require("../controllers/bookController");
const jwtmiddleware  = require("../middlewares/auth");

router.post("/books", jwtmiddleware.authenticate, bookController.createBook);
router.get("/books", jwtmiddleware.authenticate, bookController.getBooks);
router.get("/books/:id", jwtmiddleware.authenticate, bookController.getBook);
router.put("/books/:id", jwtmiddleware.authenticate, bookController.updateBook);
router.delete("/books/:id", jwtmiddleware.authenticate, bookController.deleteBook);

module.exports = router;
