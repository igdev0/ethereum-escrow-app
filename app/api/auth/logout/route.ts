import {NextApiRequest, NextApiResponse} from 'next';
import {serialize} from 'cookie';

export function POST(req: NextApiRequest, res: NextApiResponse) {
  const cookie = serialize('session', '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 0,
  });

  res.setHeader('Set-Cookie', cookie);
  res.status(200).json({ success: true });
}