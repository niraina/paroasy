import { NextResponse } from "next/server";

export async function POST() {
  const response = NextResponse.json({ message: "Login successful" });
  response.cookies.set("token", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 24 * 60 * 60,
    path: "/",
  });

  return response;
}
