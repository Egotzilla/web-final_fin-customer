import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Customer from '@/models/Customer';

// GET - List all customers
export async function GET() {
  try {
    await dbConnect();
    const customers = await Customer.find({}).sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: customers });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

// POST - Add new customer
export async function POST(request) {
  try {
    await dbConnect();
    const body = await request.json();
    const { name, dateOfBirth, memberNumber, interests } = body;

    // Validate required fields
    if (!name || !dateOfBirth || !memberNumber || !interests) {
      return NextResponse.json(
        { success: false, error: 'All fields are required' },
        { status: 400 }
      );
    }

    // Check if member number already exists
    const existingCustomer = await Customer.findOne({ memberNumber });
    if (existingCustomer) {
      return NextResponse.json(
        { success: false, error: 'Member number already exists' },
        { status: 400 }
      );
    }

    const customer = await Customer.create({
      name,
      dateOfBirth: new Date(dateOfBirth),
      memberNumber: Number(memberNumber),
      interests
    });

    return NextResponse.json(
      { success: true, data: customer },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

// DELETE - Delete all customers (for testing purposes)
export async function DELETE() {
  try {
    await dbConnect();
    await Customer.deleteMany({});
    return NextResponse.json({ success: true, message: 'All customers deleted' });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
