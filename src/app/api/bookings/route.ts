import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@/generated/prisma';

const prisma = new PrismaClient();

// GET /api/bookings - List all bookings
export async function GET() {
  const bookings = await prisma.booking.findMany({ orderBy: { createdAt: 'desc' } });
  return NextResponse.json(bookings);
}

// POST /api/bookings - Create a new booking
export async function POST(req: NextRequest) {
  const data = await req.json();
  const { name, email, licencePlate, startDate, endDate } = data;
  if (!name || !email || !licencePlate || !startDate || !endDate) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }
  const booking = await prisma.booking.create({
    data: {
      name,
      email,
      licencePlate,
      startDate: new Date(startDate),
      endDate: new Date(endDate),
    },
  });
  return NextResponse.json(booking, { status: 201 });
}
