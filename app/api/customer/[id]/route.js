import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Customer from '@/models/Customer';

// GET - Get single customer by ID
export async function GET(request, { params }) {
  try {
    await dbConnect();
    const customer = await Customer.findById(params.id);
    
    if (!customer) {
      return NextResponse.json(
        { success: false, error: 'Customer not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: customer });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

// PUT - Update customer
export async function PUT(request, { params }) {
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

    // Check if member number already exists for other customers
    const existingCustomer = await Customer.findOne({ 
      memberNumber, 
      _id: { $ne: params.id } 
    });
    
    if (existingCustomer) {
      return NextResponse.json(
        { success: false, error: 'Member number already exists' },
        { status: 400 }
      );
    }

    const customer = await Customer.findByIdAndUpdate(
      params.id,
      {
        name,
        dateOfBirth: new Date(dateOfBirth),
        memberNumber: Number(memberNumber),
        interests
      },
      { new: true, runValidators: true }
    );

    if (!customer) {
      return NextResponse.json(
        { success: false, error: 'Customer not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: customer });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

// DELETE - Delete single customer
export async function DELETE(request, { params }) {
  try {
    await dbConnect();
    const customer = await Customer.findByIdAndDelete(params.id);
    
    if (!customer) {
      return NextResponse.json(
        { success: false, error: 'Customer not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ 
      success: true, 
      message: 'Customer deleted successfully' 
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}