import {NextResponse} from 'next/server';

export function GET() {
  const res = NextResponse.json({message: "success", status: 200});
  res.cookies.delete("session");
  return res;
}