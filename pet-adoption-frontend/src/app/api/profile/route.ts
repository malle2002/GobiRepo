import { authOptions } from "@/src/lib/auth";
import axios from "@/src/lib/axios";
import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession, Session } from "next-auth";

export async function GET(req: NextApiRequest, res: NextApiResponse) {
  try {
    const session: Session | null = await getServerSession(authOptions);
    const token = session?.user?.accessToken;

    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const petsResponse = await axios.get('/api/pets', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const userResponse = await axios.get('/api/user', {
      headers: {
        Authorization: `Bearer ${token}`,
      }    
    });

    return Response.json({
      pets: petsResponse.data.data,
      user: userResponse.data.data,
    });
  } catch (error: any) {
    return Response.error();
  }
}
