import {verifyMessage} from 'ethers';
import {serialize} from 'cookie';
import {NextApiResponse} from 'next';
import {NextResponse} from 'next/server';

export async function POST(req: Request, res: NextApiResponse) {
  const {message, signature, address} = await req.json();

  if (!message || !signature || !address) {

    return NextResponse.json({message: "Missing fields", status: 400});
  }

  try {
    const recoveredAddress = verifyMessage(message, signature);

    if (recoveredAddress.toLowerCase() !== address.toLowerCase()) {
      return NextResponse.json({message: "Verification failed", status: 401});
    }

    // Auth success! Set session cookie (simplified, no JWT)
    const cookie = serialize('session', address, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24, // 1 day
    });
    const rs = NextResponse.json({authenticated: true, address, message: "Success"});
    rs.cookies.set("Set-Cookie", cookie);
    return rs;
  } catch (err) {
    console.error(err);
    return NextResponse.json({message: err, status: 500});
  }
}