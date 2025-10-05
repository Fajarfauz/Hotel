import { coerce, object, string, array } from "zod";

export const RoomSchema = object({
  name: string().min(1),
  description: string().min(50),
  capacity: coerce.number().gt(0),
  price: coerce.number().gt(0),
  amenities: array(string()).nonempty(),
});

export const ReserveSchema = object({
  name: string().min(1),
  phone: string().min(10),
});

export const ContactSchema = object({
  name: string().min(6, "Name at least 6 character"),
  email: string()
    .min(6, "Email at least 6 character")
    .email("Please enter a valid email"),
  subject: string().min(6, "Subject at least 6 character"),
  message: string()
    .min(50, "Message at least 50 character")
    .max(200, "Message meximum 200 character"),
});
