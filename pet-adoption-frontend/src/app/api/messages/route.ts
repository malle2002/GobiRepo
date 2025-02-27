import axios from "@/src/lib/axios";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();
  
  try {
    await axios.post(`/messages/send`, body);
    return NextResponse.json({ success: true });
  } catch (error : any) {
    return NextResponse.json({ error: error?.response?.data || "Failed to send message" }, { status: 500 });
  }
}

export async function GET(req: Request, { params }: { params: { userId: string } }) {
  try {
    const res = await axios.get(`/messages/${params.userId}`);
    return NextResponse.json(res.data);
  } catch (error : any) {
    return NextResponse.json({ error: error.response?.data || "Failed to fetch messages" }, { status: 500 });
  }
}
