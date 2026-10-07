import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const target = new URL("/demo/fake-bank", url.origin);
  // Return standard HTTP 302 redirect for sandbox hop detection
  return NextResponse.redirect(target, 302);
}
