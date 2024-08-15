const z = require('zod');

const userValidationSchema = z.object({
  auth0Id: z.string(),
  name: z.string().optional(),
  email: z.string().optional().or(z.literal('')),
  description: z.string().max(500).optional(),
  profileCompleted: z.boolean().optional(),
  isHacker: z.boolean().optional(),
  isDeveloper: z.boolean().optional(),
  isResearcher: z.boolean().optional(),
  timezone: z.string().optional(),
  location: z.object({
    type: z.literal("Point"),
    coordinates: z.tuple([z.number(), z.number()])
  }).optional(),
  previousHackathons: z.array(z.string()).optional(),
  devpostProfile: z.string().optional().or(z.literal('')),
  researchProfile: z.string().optional().or(z.literal('')),
  githubUsername: z.string().optional().or(z.literal(''))
});

module.exports = userValidationSchema;