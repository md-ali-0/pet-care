export type TSession = {
  user: string | null;
  name: string | null;
  email: string | null;
  phone: string | null;
  avatar: string | null;
  isAuth: boolean;
  role: "admin" | "user" | "guest";
  status: "active" | "blocked" | "guest";
  iat?: number;
  exp?: number;
};
