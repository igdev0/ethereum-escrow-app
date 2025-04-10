import {NextResponse} from 'next/server';

export async function POST(request: Request) {
  request.body;
  const {address}: {address: string} = await request.json();
  if (!address) {
    return NextResponse.json({message: "Missing or invalid address"},{status: 400});
  }

  const nonce = Math.floor(Math.random() * 1e6);
  const message = `You will log onto the website with this nonce:${nonce} and this address:${address}`;
  NextResponse.json({message, nonce})
}