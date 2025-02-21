import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/src/lib/prisma";
import { getServerSession } from "next-auth";
import axios from "@/src/lib/axios";
import { authOptions } from "@/src/lib/auth";

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const species = url.searchParams.get("species");
    const breed = url.searchParams.get("breed");
    const age = url.searchParams.get("age");
    const gender = url.searchParams.get("gender");

    const pets = await prisma.pets.findMany({
      where: {
        species: species || undefined,
        breed: breed || undefined,
        age: age ? { lte: parseInt(age) } : undefined,
        gender: gender || undefined,
      },
      include: {
        users: {
          select: {
            name: true,
            email: true,
            avatar: true,
          }
        }
      }
    });

    return NextResponse.json({ data: pets });
  } catch (error) {
    console.error("Error fetching pets:", error);
    return NextResponse.json({ error: "Failed to fetch pets" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
    try {
        const session = await getServerSession(authOptions);
        if (!session || !session.user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const formData = await req.formData();

        const response = await axios.post('/api/pets', 
            formData,
            { 
                headers: {
                    'Authorization': `Bearer ${session.user.accessToken}`,
                },
            }
        );

        const responseData = await response.data;

        if (response.status<300) {
            return NextResponse.json({ pet: responseData });
        } else {
            throw new Error('Failed to create pet');
        }
      } catch (error: unknown) {
        let errorMessage = "An unknown error occurred";
    
        if (error instanceof Error) {
            errorMessage = error.message;
        }
    
        console.error("Error creating pet:", errorMessage);
        return NextResponse.json({ error: errorMessage }, { status: 500 });
    }    
}
