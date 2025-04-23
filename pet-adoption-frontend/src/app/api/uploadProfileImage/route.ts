import { authOptions } from "@/src/lib/auth";
import { getServerSession, Session } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest, res:NextResponse) {
    const session: Session | null = await getServerSession(authOptions);
    const token = session?.user?.accessToken;
    
    if (!token) {
      return new NextResponse(
          JSON.stringify({ message: "Unauthorized" }),
          { status: 401 }
      );
    }

    const formData = await req.formData();
    const image = formData.get("image");

    if (!image || !(image instanceof Blob)) {
      return new NextResponse(
          JSON.stringify({ error: "Invalid image file" }),
          { status: 400 }
      );
    }

    const backendFormData = new FormData();
    backendFormData.append("image", image);
    
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/update-profile-image`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });
      if (!response.ok) {
        const errorText = await response.text(); // Capture backend error response
        console.error("Server Error Response:", errorText);
        return new NextResponse(JSON.stringify({ error: "Failed to upload image", details: errorText }), { status: response.status });
      }
      const data = await response.json();
      return new NextResponse(JSON.stringify(data));
    } catch (error) {
      console.error("Error:", error);
      return new NextResponse(
        JSON.stringify({ error: "Server Error" }),
        { status: 500 }
      );
    }
  }
  