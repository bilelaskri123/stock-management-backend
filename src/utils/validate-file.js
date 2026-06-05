const validateFile = (schema) => (req, res, next) => {
  const file = req.file;
  const validationResult = schema.safeParse({ excelFile: file });
  console.log("Validation result:", validationResult);
  if (!validationResult.success) {
    const errorMessages = validationResult.error.errors
      .map((err) => err.message)
      .join(", ");
    return res.status(400).json({ success: false, error: errorMessages });
  }
  next();
};

module.exports = validateFile;
