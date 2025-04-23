"use server"

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/src/lib/prisma";
import { getServerSession } from "next-auth";
import axios from "@/src/lib/axios";
import { authOptions } from "@/src/lib/auth";

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const species = url.searchParams.get("species");
    const breeds = url.searchParams.get("breeds")?.split(',');
    const location = url.searchParams.get("location");
    const age = url.searchParams.get("age");
    const gender = url.searchParams.get("gender");
    const page = parseInt(url.searchParams.get("page") || "1");
    const limit = parseInt(url.searchParams.get("limit") || "12");

    const offset = (page - 1) * limit;

    const where = {
      species: species || undefined,
      breed: Array.isArray(breeds) && breeds.length > 0 ? { in: breeds.filter(b => b !== '') } : undefined,
      location: location || undefined,
      age: age ? { lte: parseInt(age) } : undefined,
      gender: gender || undefined,
    };

    const pets = await prisma.pets.findMany({
      where,
      include: {
        users: {
          select: {
            id: true,
            name: true,
            email: true,
            avatar: true,
          },
        },
      },
      skip: offset,
      take: limit,
    });

    const totalPets = await prisma.pets.count({where});

    const locations = await prisma.pets.findMany({
      select: { location: true },
      distinct: ["location"],
    });

    const response = NextResponse.json({
      data: pets,
      total: totalPets,
      hasMore: offset + pets.length < totalPets,
      locations: locations.map((l) => l.location),
    });

    response.headers.set("Cache-Control", "public, max-age=60, stale-while-revalidate=30");

    return response;
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
        const token = session?.user?.accessToken;

        const formData = await req.formData();

        await axios.get("/sanctum/csrf-cookie").then( async () => {
          const response = 
            await axios.post('/api/pets', formData, { headers: { Authorization: `Bearer ${token}`}})

          const responseData = response.data

          if (response.status<300) {
            return NextResponse.json({ pet: responseData });
          } else {
            throw new Error('Failed to create pet', response.data.message);
          }

        })
      } catch (error: any) {
        let errorMessage = error.response.data.message
    
        console.error("Error creating pet:", errorMessage);
        return NextResponse.json({ error: errorMessage }, { status: 500 });
    }    
}
