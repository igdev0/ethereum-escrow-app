import {verifyMessage} from 'ethers';
import {NextResponse} from 'next/server';

export async function POST(req: Request) {
  const {message, signature, address} = await req.json();

  if (!message || !signature || !address) {

    return NextResponse.json({message: "Missing fields", status: 400});
  }

  try {
    const recoveredAddress = verifyMessage(message, signature);

    if (recoveredAddress.toLowerCase() !== address.toLowerCase()) {
      return NextResponse.json({message: "Verification failed", status: 401});
    }

    const maxAge = 60 * 60 * 24;
    const rs = NextResponse.json({authenticated: true, address, message: "Success"});
    rs.cookies.set("session", address, {httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: 'lax', path: '/', maxAge});
    return rs;
  } catch (err) {
    console.error(err);
    return NextResponse.json({message: err, status: 500});
  }
}