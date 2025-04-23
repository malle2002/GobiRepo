import { authOptions } from "@/src/lib/auth";
import { getServerSession, Session } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const session: Session | null = await getServerSession(authOptions);
        const token = session?.user?.accessToken;
        
        if (!token) {
            return new NextResponse(
                JSON.stringify({ message: "Unauthorized" }),
                { status: 401 }
            );
        }

        const response = await fetch('http://localhost:8000/api/create-payment-intent', {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ amount: 5000 }),
        });

        if (!response.ok) {
            const text = await response.text();
            return NextResponse.json({ error: "Upstream API failed" }, { status: 500 });
        }
    
        const data = await response.json();
        return NextResponse.json(data, { status: 200 });
    } catch(error: any) {
        console.error("Internal server error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
  