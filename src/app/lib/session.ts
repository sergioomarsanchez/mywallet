import { NextApiRequest, NextApiResponse } from "next";
import { User, getServerSession } from "next-auth";
import { authOption } from "./auth";

export const getUserSession = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<User | null> => {
  const session = await getServerSession(req, res, authOption);
  if (!session) return null;
  return session.user as User;
};

export function auth(req: NextApiRequest, res: NextApiResponse) {
  return getServerSession(req, res, authOption);
}
