
const Note = require("../models/Note");

// Map Mongoose errors to proper status codes
const handleError = (res, error) => {
  if (error.name === "ValidationError") {
    const message = Object.values(error.errors).map((e) => e.message).join(", ");
    return res.status(400).json({ success: false, message });
  }
  if (error.name === "CastError") {
    return res.status(404).json({ success: false, message: "Note not found" });
  }
  console.error("Note Error:", error.message);
  return res.status(500).json({ success: false, message: "Server error" });
};

// CREATE a new note
const createNote = async (req, res) => {
  try {
    const { title, content } = req.body;

    const note = await Note.create({
      title,
      content,
      userId: req.user.id,
    });

    res.status(201).json({
      success: true,
      message: "Note created successfully",
      note,
    });
  } catch (error) {
    handleError(res, error);
  }
};

// GET all notes belonging to the logged-in user

const getNotes = async (req, res) => {
  try {
    const notes = await Note.find({
      userId: req.user.id,
    }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      notes,
    });
  } catch (error) {
    handleError(res, error);
  }
};


// UPDATE a note
const updateNote = async (req, res) => {
  try {
    const note = await Note.findOneAndUpdate(
      {
        _id: req.params.id,
        userId: req.user.id
      },
      { title: req.body.title, content: req.body.content },
      { new: true, runValidators: true }
    );

    if (!note) {
      return res.status(404).json({
        success: false,
        message: "Note not found"
      });
    }

    res.status(200).json({
      success: true,
      note
    });

  } catch (error) {
    handleError(res, error);
  }
};

// DELETE a note
const deleteNote = async (req, res) => {
  try {
    const note = await Note.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.id
    });

    if (!note) {
      return res.status(404).json({
        success: false,
        message: "Note not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Note deleted successfully"
    });

  } catch (error) {
    handleError(res, error);
  }
};

module.exports = {
  createNote,
  getNotes,
  updateNote,
  deleteNote,
};
