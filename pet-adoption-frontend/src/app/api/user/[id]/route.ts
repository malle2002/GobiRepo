import axios from "@/src/lib/axios";
import { prisma } from "@/src/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  try {
    const user = await prisma.users.findUnique({
      where: { id },
      omit: {
        password: true,
        created_at: true,
        email_verified_at: true,
        remember_token: true,
        updated_at: true
      },
      include: {
        pets: {
          select: {
            id: true,
            name: true,
            species: true,
            breed: true,
            age: true,
            description: true,
            gender: true,
            vaccinations: true,
            allergies: true,
            location: true,
            images: true,
          }
        }
      }
    }); 

    if (!user) {
      return new Response(JSON.stringify({ error: "User not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify(user), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching pet:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
