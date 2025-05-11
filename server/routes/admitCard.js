
const express = require("express");
const router = express.Router();
const PDFDocument = require("pdfkit");
const fs = require("fs");
const path = require("path");

router.post("/generate", (req, res) => {
  const { name, id, applicationNumber } = req.body;

  const doc = new PDFDocument();

  // Set response headers
  res.setHeader("Content-Type", "application/pdf");
  res.setHeader("Content-Disposition", "attachment; filename=admit-card.pdf");

  // Pipe PDF to response
  doc.pipe(res);

  // === ADD LOGO ===
  const logoPath = path.join(__dirname, "../assets/pup.png"); // Make sure logo.png exists here
  if (fs.existsSync(logoPath)) {
    doc.image(logoPath, 50, 30, { width: 80 }); // Position at top-left
  }
  console.log("Looking for logo at:", logoPath);
  // === Admit Card Content ===

// Institution Name
doc.fontSize(24).font('Times-Bold').text("Punjabi University, Patiala", { align: "center" });
doc.moveDown(0.5);

// Admit Card Title
doc.fontSize(20).font('Times-Roman').text("Examination Admit Card", { align: "center", underline: true });
doc.moveDown(2);

// Draw a Rectangle for Exam Details
doc.rect(50, doc.y, 500, 150).stroke();
doc.moveDown();

// Inside the Rectangle: Student Details
doc.fontSize(14).font('Times-Roman').text(`Name: ${name}`, 60, doc.y + 10);
doc.text(`ID / Roll No: ${id}`, 60, doc.y + 10);
doc.text(`Application Number: ${applicationNumber}`, 60, doc.y + 10);
doc.text(`Exam Center: Room 203, Block B`, 60, doc.y + 10);
doc.moveDown(5);

// Important Instructions
doc.fontSize(16).font('Times-Bold').text("Important Instructions:", { underline: true });
doc.moveDown(0.5);
doc.fontSize(12).font('Times-Roman');
doc.list([
  "Please carry this Admit Card along with a valid ID proof.",
  "Report to the examination center 30 minutes before the start time.",
  "Electronic gadgets like mobile phones, smart watches, calculators are prohibited.",
  "Follow all COVID-19 safety protocols (mask, sanitizer, social distancing)."
], { bulletRadius: 2 });
doc.moveDown(2);

// Footer
doc.fontSize(12).text("Authorized Signature", 400, doc.y + 30);
doc.moveTo(400, doc.y + 10).lineTo(550, doc.y + 10).stroke();

doc.end();

});

module.exports = router;
