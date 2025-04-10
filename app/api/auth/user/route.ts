import {NextApiRequest} from 'next';
import {NextResponse} from 'next/server';
import {RequestCookies} from 'next/dist/compiled/@edge-runtime/cookies';

export function GET(req: NextApiRequest) {
  let cookie = req.cookies as unknown as RequestCookies;
  const session = cookie.get('session');

  if (!session?.value) {
    return NextResponse.json({authenticated: false, address: session?.value}, {status: 401});
  }
  return NextResponse.json({authenticated: true, address: session.value}, {status: 200});
}