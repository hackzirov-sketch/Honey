import { z } from "zod";

const privacyVisibilityValues = ["everyone", "contacts", "nobody"] as const;
const profileVisibilityValues = ["public", "contacts", "private"] as const;

export const updatePrivacyDtoSchema = z.object({
  whoCanMessage: z.enum(privacyVisibilityValues).optional(),
  whoCanSeeLastSeen: z.enum(privacyVisibilityValues).optional(),
  whoCanSeeOnline: z.enum(privacyVisibilityValues).optional(),
  whoCanAddToGroups: z.enum(privacyVisibilityValues).optional(),
  profileVisibility: z.enum(profileVisibilityValues).optional(),
  readReceiptsEnabled: z.boolean().optional(),
});

export type UpdatePrivacyDto = z.infer<typeof updatePrivacyDtoSchema>;

export type PrivacyVisibilityLevel = (typeof privacyVisibilityValues)[number];
export type ProfileVisibilityLevel = (typeof profileVisibilityValues)[number];
