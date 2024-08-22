import connectDB from "@/config/database";
import User from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";

connectDB();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { username, email, password } = reqBody;

    // Remove input validation using validateEmail and validatePassword

    const user = await User.findOne({ email });
    if (user) {
      return NextResponse.json(
        {
          error: "User already exists.",
        },
        { status: 400 }
      );
    }

    const salt = await bcryptjs.genSalt(10);
    const hashPassword = await bcryptjs.hash(password, salt);

    const newUser = new User({
      username,
      email,
      password: hashPassword,
    });

    const saved = await newUser.save();

    return NextResponse.json(
      {
        message: "User created successfully.",
        success: true,
        data: saved,
      },
      { status: 201 }
    );
  } catch (error: any) {
    // Provide more specific error messages based on the error type
    if (error.name === "ValidationError") {
      return NextResponse.json(
        {
          error: "Invalid input data.",
          message: error.message,
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        error: "Internal server error.",
        message: error.message,
      },
      { status: 500 }
    );
  }
}