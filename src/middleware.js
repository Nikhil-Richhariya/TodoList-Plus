import { NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

export async function middleware(request) {
  const token = request.cookies.get('token');
  const url = request.nextUrl;

  try {
    if (token) {
      // Verify the token using `jose`
      const secret = new TextEncoder().encode(process.env.TOKEN_SECRET);
      const { payload } = await jwtVerify(token.value, secret);

      // If user is authenticated and trying to access sign-in, sign-up, or verify pages, redirect to home
      if (
        url.pathname.startsWith('/sign-in') ||
        url.pathname.startsWith('/sign-up') ||
        url.pathname.startsWith('/') ||
        url.pathname.startsWith('/verify')
      ) {
        return NextResponse.redirect(new URL('/home', request.url));
      }
    } else {
      // If no token and trying to access a protected page like /home, redirect to sign-in
      if (url.pathname.startsWith('/home')) {
        return NextResponse.redirect(new URL('/sign-in', request.url));
      }
    }

  } catch (error) {
    console.error('Token verification failed:', error);

    // If token verification fails, redirect to sign-in
    if (url.pathname.startsWith('/home')) {
      return NextResponse.redirect(new URL('/sign-in', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/sign-in',
    '/sign-up',
    '/home/:path*',
    '/verify/:path*',
  ],
};


// import { NextResponse } from 'next/server';
// import jwt from 'jsonwebtoken';

// export async function middleware(request) {
//   const token = request.cookies.get('token');
//   const url = request.nextUrl;

//   try {
//     if (token) {
//       const decoded = jwt.verify(token.value, process.env.TOKEN_SECRET);

//       // If user is authenticated and trying to access sign-in, sign-up, or verify pages, redirect to home
//       if (
//         url.pathname.startsWith('/sign-in') ||
//         url.pathname.startsWith('/sign-up') ||
//         url.pathname.startsWith('/') ||
//         url.pathname.startsWith('/verify')
//       ) {
//         return NextResponse.redirect(new URL('/home', request.url));
//       }
//     } else {
//       // If no token and trying to access a protected page like /home, redirect to sign-in
//       if (url.pathname.startsWith('/home')) {
//         return NextResponse.redirect(new URL('/sign-in', request.url));
//       }
//     }

//   } catch (error) {
//     console.error('Token verification failed:', error);

//     // If token verification fails, redirect to sign-in
//     if (url.pathname.startsWith('/home')) {
//       return NextResponse.redirect(new URL('/sign-in', request.url));
//     }
//   }

//   return NextResponse.next();
// }

// export const config = {
//   matcher: [
//     '/sign-in',
//     '/sign-up',
//     '/home/:path*',
//     '/verify/:path*',
//   ],
// };
