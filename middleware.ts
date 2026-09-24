
import * as jose from "jose";
import { NextResponse } from "next/server";
import type { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";
import type { NextRequest } from "next/server";
//import { Group } from "@prisma/client";

// TODO: Fix duplicated code
const KEY = new TextEncoder().encode(process.env.JWT_SECRET);

const getSession = async (token: RequestCookie | undefined) => {
  if (!token) return null;
  try {
    const { payload } = await jose.jwtVerify(token.value, KEY);
    return payload;
  } catch (e) {
    return null;
  }
};

export const getUserRole = async (token: RequestCookie | undefined) => {
  const session = await getSession(token);
  if (!session) return null;
  return session.role;
};

// export const getUserGroups = async (
//   token: RequestCookie | undefined,
// ): Promise<Group[] | null> => {
//   const session = await getSession(token);
//   if (!session) return null;
//   return session.groups as Group[];
// };

export async function middleware(request: NextRequest) {
  const token = request.cookies.get("_USER_SESSION")
 // const groups = await getUserGroups(token);

  if (token && request.nextUrl.pathname.startsWith("/auth/login")) {
    return NextResponse.redirect(new URL("/", request.url));
  }


  if (!token && request.nextUrl.pathname.startsWith("/auth") ) {
    return NextResponse.next();
  }



  // Gérer explicitement l'accès à la route racine "/"
  if (!token && request.nextUrl.pathname === "/") {
    const response = NextResponse.next();
    response.cookies.set("_NEXT_AUTH_URL", request.nextUrl.pathname);
    return response;
  }

    // Redirect to login page if user is not logged in\
    // if (!token) {
    //   const response = NextResponse.redirect(new URL("/auth/login", request.url));
    //   response.cookies.set("_NEXT_AUTH_URL", request.nextUrl.pathname);
    //   return response;
    // }
  

    return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - auth/logout
     * - up (health check)
     * - file (pdf files)
     */
    "/",
    "/auth/logout",
    "/((?!api|_next/static|_next/image|favicon.ico|file|up|.*\\.pdf).*)",
  ],
};
