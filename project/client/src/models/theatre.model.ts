import type { User } from "./user.model";

export interface Theatre {
  _id: string;
  name: string;
  address: string;
  email: string;
  phone: number;
  owner: User["_id"];
}