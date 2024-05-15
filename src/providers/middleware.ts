import {clerkMiddleware, createRouteMatcher} from "@clerk/nextjs/server";

// *************************************************************
// Deprecated way of using Middleware for Clerk Auth.
// *************************************************************
/* import {authMiddleware} from "@clerk/nextjs/server";
export default authMiddleware({
  publicRoutes: ['/site', '/api/uploadthing']
})*/
// ***************************************************************
const isProtectedRoute = createRouteMatcher([
  '/dashboard(.*)',
  '/forum(.*)',
]);
export default clerkMiddleware((auth, req) => {
  if (isProtectedRoute(req)) auth().protect();
});
export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};
