const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_FILE_TYPES = [
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  "application/vnd.ms-excel",
];

const fileUploadSchema = z.object({
  excelFile: z.object({
    originalname: z.string(),
    mimetype: z.string().refine((mime) => ACCEPTED_FILE_TYPES.includes(mime), {
      message: "Invalid file type. Only Excel files are allowed.",
    }),
    size: z.number().refine((size) => size <= MAX_FILE_SIZE, {
      message: "File size exceeds the maximum limit of 5MB.",
    }),
  }),
});

module.exports = {
  fileUploadSchema,
};
