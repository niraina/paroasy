import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

export async function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value;
  // console.log('Token from Cookie:', token); // Log le token pour déboguer

  if (!token) {
    const url = new URL('/login', request.url);
    console.log('Redirecting to Login - No Token');
    return NextResponse.redirect(url);
  }

  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    await jwtVerify(token, secret);
    console.log('Token Verified Successfully');
    return NextResponse.next();
  } catch (error: any) {
    console.log('Token Verification Failed:', error?.message);
    const url = new URL('/login', request.url);
    return NextResponse.redirect(url);
  }
}

export const config = {
  matcher: ['/dashboard/:param*', '/autre-route'] // Ajouter toutes les routes protégées ici
};
