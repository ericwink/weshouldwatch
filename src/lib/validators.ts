import { z } from "zod";

export const stringValidator = z.string();

export const mediaPayloadValidator = z.object({
  tmdb_id: z.number(),
  title: z.string(),
  poster_path: z.string(),
  genres: z.string().array(),
  media_type: z.string(),
});

export const editMediaValidator = z.object({
  columnToUpdate: z.enum(["added_reason", "watched"]),
  newValue: z.string().or(z.boolean()),
  rowId: z.number(),
});

export const invitationValidator = z.object({
  group_id: z.string(),
  email: z.string().email(),
});

export const deleteAccountValidator = z.object({
  userId: z.string(),
  stripeId: z.string(),
});
