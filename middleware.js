import { getToken } from "next-auth/jwt";
import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default async function middleware(req, event) {
  const token = await getToken({ req });
  const isAuthenticated = !!token;
  
  if (req.nextUrl.pathname.startsWith("/signIn") && isAuthenticated) {
    return NextResponse.redirect(new URL("/", req.url));
  }
  if (
    (req.nextUrl.pathname.startsWith("/admin") && token?.role !== "admin") ||
    (req.nextUrl.pathname.startsWith("/api/admin") &&
      token?.role !== "admin") ||
    (req.nextUrl.pathname.startsWith("/form") && token?.role !== "admin")
  ) {
    return NextResponse.rewrite(new URL("/denied", req.url));
  }
  const authMiddleware = await withAuth({
    pages: {
      signIn: `/signIn`,
    },
  });

  // @ts-expect-error
  return authMiddleware(req, event);
}
// export default withAuth(
//   async function middleware(req) {
//     const token = await getToken({ req });
//     const isAuthenticated = !!token;
//     if (req.nextUrl.pathname.startsWith("/signIn")) {
//       if (isAuthenticated) {
//         return NextResponse.redirect(new URL("/", req.url));
//       }
//     }
//     if (
//       (req.nextUrl.pathname.startsWith("/admin") &&
//         req.nextauth.token.role !== "admin") ||
//       (req.nextUrl.pathname.startsWith("/api/admin") &&
//         req.nextauth.token.role !== "admin") ||
//       (req.nextUrl.pathname.startsWith("/form") &&
//         req.nextauth.token.role !== "admin")
//     ) {
//       return NextResponse.rewrite(new URL("/denied", req.url));
//     }
//   },
//   {
//     callbacks: {
//       authorized: ({ token }) => !!token,
//     },
//   }
// );

export const config = {
  matcher: [
    "/admin/:path*",
    "/form/:path*",
    "/signIn:path*",
    "/api/admin/:path*",
  ],
};
// import { NextResponse } from "next/server";

// export function middleware(request) {
//   const authToken = request.cookies.get("token")?.value || "";

//   const isAccessingNotSecuredPaths =
//     request.nextUrl.pathname === "/login/LoginPage" ||
//     request.nextUrl.pathname === "/signup/signuppage" ||
//     request.nextUrl.pathname === "/Admin/:path*";

//   if (isAccessingNotSecuredPaths && authToken) {
//     // User is trying to access non-secured paths, redirect to home
//     return NextResponse.redirect(new URL("/", request.url));
//   } else if (!isAccessingNotSecuredPaths && !authToken) {
//     // User is trying to access secured paths without authentication, redirect to login
//     return NextResponse.redirect(new URL("/login/LoginPage", request.url));
//   }

//   // Continue to the requested route
//   return NextResponse.next();
// }

// export const config = {
//   // Add the routes you want to apply the middleware to
//   matcher: ["/login/:path*", "/signup/:path*", "/Admin/:path*"],
// };
