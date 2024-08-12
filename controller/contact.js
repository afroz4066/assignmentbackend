const express = require("express");
const router = express.Router();
const ContactSchema = require("../model/contact"); // Import the correct model

// GET all contacts
router.get("/get-contact", async (req, res) => {
  try {
    const contact = await ContactSchema.find();
    if (!contact.length) {
      return res.status(404).json({ message: "No contacts found." });
    }
    res.status(200).json({
      success: true,
      contact,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST a new contact
router.post("/add-contact", async (req, res) => {
  try {
    const { name, email, mobile, message } = req.body;

    const newContact = new ContactSchema({
      name,
      email,
      mobile,
      message,
    });

    const savedContact = await newContact.save();

    res.status(201).json({
      success: true,
      contact: savedContact,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
