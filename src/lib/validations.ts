import { z } from "zod";
import { isValidPhoneNumber } from "libphonenumber-js";

export const phoneSchema = z
  .string()
  .trim()
  .min(1, "Phone number is required")
  .refine((v) => isValidPhoneNumber(v, "IN"), "Enter a valid phone number (include country code if outside India)");

export const propertyTypes = ["Independent hotel", "Boutique inn", "Luxury hotel / resort", "Homestay / serviced apartment", "Hotel group / chain"] as const;
export const contactMethods = ["Email", "Phone", "WhatsApp"] as const;

export const leadSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name"),
  email: z.string().trim().email("Enter a valid work email"),
  phone: phoneSchema,
  property: z.string().trim().min(2, "Property name is required"),
  propertyType: z.enum(propertyTypes, { message: "Select a property type" }),
  rooms: z.coerce.number<string>().int().min(1, "At least 1 room").max(5000, "That seems too high"),
  properties: z.coerce.number<string>().int().min(1, "At least 1 property").max(500),
  contactMethod: z.enum(contactMethods),
  message: z.string().trim().max(1000, "Keep it under 1000 characters").optional(),
});
export type LeadInput = z.input<typeof leadSchema>;
export type LeadValues = z.output<typeof leadSchema>;

export const guestDetailsSchema = z.object({
  name: z.string().trim().min(2, "Enter the guest's full name"),
  email: z.string().trim().email("Enter a valid email"),
  phone: phoneSchema,
  requests: z.string().trim().max(500).optional(),
  consent: z.boolean().optional(),
});
export type GuestDetailsValues = z.infer<typeof guestDetailsSchema>;
