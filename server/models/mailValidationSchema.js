const z = require('zod');

const mailValidationSchema = z.object({
  to: z.union([z.string().email(), z.array(z.string().email())]),
  subject: z.string().optional(),
  text: z.string().optional()
});

module.exports = mailValidationSchema;