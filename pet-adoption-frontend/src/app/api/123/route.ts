import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function GET(req: NextRequest, res: NextResponse) {
    const cookieStore = await cookies();
    const token = cookieStore.get('next-auth.session-token');
    const token2 = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
    
    return NextResponse.json({ token, token2 }, { status: 200 });
}
  
