import { prisma } from "@/src/lib/prisma";
import { NextApiRequest } from "next";
import { NextResponse } from "next/server";

export const dynamic = 'force-static';

export async function GET(req: NextApiRequest) {
  try {
    const species = await prisma.pets.findMany({
      select: { species: true },
      distinct: ["species"],
    });

    const breeds = await prisma.pets.findMany({
      select: { breed: true },
      distinct: ["breed"],
      where: { breed: { not: null } },
    });

    const locations = await prisma.pets.findMany({
      select: { location: true },
      distinct: ["location"],
      where: { location: { not: null } },
    });

    return NextResponse.json(
      {
        species: species.map((s) => s.species),
        breeds: breeds.map((b) => b.breed),
        locations: locations.map((l) => l.location),
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch options" }, { status: 400 });
  }
}
