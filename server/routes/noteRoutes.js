
const express = require("express");
const router = express.Router();

const {
  createNote,
  getNotes,
  updateNote,
  deleteNote,
} = require("../controllers/noteController");

const authMiddleware = require("../middleware/authMiddleware");

// All note routes require authentication
router.use(authMiddleware);

// GET all notes and CREATE a note
router.route("/")
  .get(getNotes)
  .post(createNote);

// UPDATE and DELETE a specific note
router.route("/:id")
  .put(updateNote)
  .delete(deleteNote);

module.exports = router;
