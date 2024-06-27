import { UserRole } from "@prisma/client";

export type User = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: UserRole;
  avatar: string | null;
  createdAt: Date;
  updatedAt: Date;
};
