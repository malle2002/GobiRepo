import { NextResponse } from "next/server";
import axios from "axios";

export async function POST(req: Request) {
  const body = await req.json();
  
  try {
    await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/messages/send`, body);
    return NextResponse.json({ success: true });
  } catch (error : any) {
    return NextResponse.json({ error: error?.response?.data || "Failed to send message" }, { status: 500 });
  }
}

export async function GET(req: Request, { params }: { params: { userId: string } }) {
  try {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/messages/${params.userId}`);
    return NextResponse.json(res.data);
  } catch (error : any) {
    return NextResponse.json({ error: error.response?.data || "Failed to fetch messages" }, { status: 500 });
  }
}
