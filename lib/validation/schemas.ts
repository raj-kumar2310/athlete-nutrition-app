import { z } from 'zod';

/**
 * User signup validation schema.
 * Fields: email, password, full_name, age, weight_kg, height_cm, sport_type, goal, activity_level
 */
export const signupSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  full_name: z.string().min(1),
  age: z.coerce.number().int().nonnegative(),
  weight_kg: z.coerce.number().positive(),
  height_cm: z.coerce.number().positive(),
  sport_type: z.enum(['cricket', 'kabaddi', 'athletics', 'football']),
  goal: z.enum(['muscle_gain', 'fat_loss', 'performance', 'maintenance']),
  activity_level: z.enum(['sedentary', 'moderate', 'active', 'very_active']),
});

/**
 * Meal log schema.
 * Fields: food_id, quantity, meal_type, notes (optional)
 */
export const mealLogSchema = z.object({
  food_id: z.string().uuid(),
  quantity: z.coerce.number().positive(),
  meal_type: z.enum(['breakfast', 'lunch', 'dinner', 'snack', 'pre_workout', 'post_workout']),
  notes: z.string().max(200).optional(),
});

/**
 * Profile update schema – all fields optional but validated if present.
 */
export const profileUpdateSchema = z.object({
  full_name: z.string().optional(),
  age: z.coerce.number().int().nonnegative().optional(),
  weight_kg: z.coerce.number().positive().optional(),
  height_cm: z.coerce.number().positive().optional(),
  sport_type: z.enum(['cricket', 'kabaddi', 'athletics', 'football']).optional(),
  goal: z.enum(['muscle_gain', 'fat_loss', 'performance', 'maintenance']).optional(),
  activity_level: z.enum(['sedentary', 'moderate', 'active', 'very_active']).optional(),
});

/**
 * Training session schema.
 */
export const trainingSessionSchema = z.object({
  sport: z.string().optional(),
  duration_minutes: z.coerce.number().int().positive(),
  intensity: z.enum(['low', 'medium', 'high']),
  calories_burned: z.coerce.number().nonnegative().optional(),
  session_date: z.string().optional().refine((d) => d === undefined || !isNaN(Date.parse(d)), {
    message: 'Invalid date format',
  }),
});

/**
 * Helper to parse and validate request bodies in API routes.
 * Usage example in a route handler:
 *   const result = signupSchema.safeParse(await req.json());
 *   if (!result.success) return NextResponse.json({ error: result.error.format() }, { status: 400 });
 */
export const validators = {
  signupSchema,
  mealLogSchema,
  profileUpdateSchema,
  trainingSessionSchema,
};
