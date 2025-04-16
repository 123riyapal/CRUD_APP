const User = require('../models/user.model');
const Marks = require('../models/file.model');
const xlsx = require('xlsx');
const fs = require('fs');
const PDFDocument = require('pdfkit');
const errorMessages = require('../utils/errorMessages');

const uploadMarksheet = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: errorMessages.NO_FILE_UPLOADED });
    }

    const filePath = req.file.path;
    const workbook = xlsx.readFile(filePath);
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const data = xlsx.utils.sheet_to_json(sheet);

    if (!data.length) {
      return res.status(400).json({ error: errorMessages.EMPTY_FILE });
    }

    const marksData = [];

    for (const row of data) {
      const { UserID, Mathematics, Hindi, English, Physics, Chemistry } = row;

      if (!UserID || !Mathematics || !Hindi || !English || !Physics || !Chemistry) {
        return res.status(400).json({ error: errorMessages.MISSING_FILE_FIELDS });
      }

      const user = await User.findById(UserID);
      if (!user) {
        return res.status(404).json({ error: errorMessages.USER_ID_NOT_FOUND(UserID) });
      }

      const existingMarks = await Marks.findOne({ userId: UserID });
      if (existingMarks) {
        const updatedMarks = await Marks.findOneAndUpdate(
          { userId: UserID },
          { Mathematics, Hindi, English, Physics, Chemistry },
          { new: true }
        );
        marksData.push(updatedMarks);
      } else {
        const newMarks = await Marks.create({
          userId: UserID,
          Mathematics,
          Hindi,
          English,
          Physics,
          Chemistry,
        });

        user.marksheets.push(newMarks._id);
        await user.save();
        marksData.push(newMarks);
      }
    }

    res.status(200).json({
      message: 'Marks processed successfully!',
      marks: marksData,
    });
  } catch (error) {
    res.status(500).json({ error: errorMessages.SERVER_ERROR(error.message) });
  } finally {
    if (req.file && req.file.path) {
      fs.unlinkSync(req.file.path);
    }
  }
};

const pdfMarksheet = async (req, res) => {
    try {
      const user = await User.findById(req.user.id).populate('marksheets');
      if (!user) {
        return res.status(404).json({ message: errorMessages.USER_NOT_FOUND });
      }
      console.log(user);
      const marks = user.marksheets[0];
      if (!marks) {
        return res.status(404).json({ message: errorMessages.MARKS_NOT_FOUND });
      }
  
      const doc = new PDFDocument({ margin: 50 });
  
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', `attachment; filename=${user.name}_marksheet.pdf`);
  
      doc.pipe(res);
  
      doc.fontSize(20).text('Marksheet', { align: 'center' });
      doc.fontSize(16).text(`${user.name}`, { align: 'center' });
      doc.moveDown(2);
  
      doc.fontSize(12);
      const tableTop = 150;
      const itemHeight = 20;
  
      doc.text('Subject', 50, tableTop);
      doc.text('Marks', 300, tableTop);
      doc.moveTo(50, tableTop + 15).lineTo(500, tableTop + 15).stroke();
  
      const subjects = [
        ['Mathematics', marks.Mathematics],
        ['Hindi', marks.Hindi],
        ['English', marks.English],
        ['Physics', marks.Physics],
        ['Chemistry', marks.Chemistry],
      ];
  
      subjects.forEach(([subject, mark], index) => {
        const y = tableTop + 20 + (index * itemHeight);
        doc.text(subject, 50, y);
        doc.text(mark.toString(), 300, y);
      });
  
      doc.end();
    } catch (err) {
      res.status(500).json({ error: errorMessages.PDF_GENERATION_ERROR });
    }
  };
const studentMarksheet = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).lean();
    if (!user) {
      return res.status(404).json({ message: errorMessages.USER_NOT_FOUND });
    }

    const marks = await Marks.findOne({ userId: user._id }).lean();

    const result = {
      user_id: user._id,
      name: user.name,
      email: user.email,
      marks: marks ? {
        Mathematics: marks.Mathematics,
        Hindi: marks.Hindi,
        English: marks.English,
        Physics: marks.Physics,
        Chemistry: marks.Chemistry
      } : {}
    };

    res.json(result);
  } catch (err) {
    res.status(500).json({ error: errorMessages.SERVER_ERROR(err.message) });
  }
};

module.exports = { 
  uploadMarksheet, 
  studentMarksheet, 
  pdfMarksheet 
};