import { getDatafromToken } from "@/utils/getDataFromToken";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/user.model";
import connectDB from "@/config/database";

connectDB();

export async function GET(request: NextRequest) {
  try {
    const userId = await getDatafromToken(request);
    const user = await User.findOne({ _id: userId }).select("-password");
    return NextResponse.json({
      user: user,
      message: "User found",
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
