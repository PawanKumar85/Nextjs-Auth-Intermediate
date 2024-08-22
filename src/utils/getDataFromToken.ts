import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export const getDatafromToken = (req: NextRequest) => {
  try {
    const token = req.cookies.get("token")?.value || "";
    const data:any = jwt.verify(token,process.env.TOKEN_SECRET!);
    return data.id;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
