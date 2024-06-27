import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
  publicRoutes: ["/", "/search", "/api/uploadthing", "/api/webhook(.*)", "/api/stripe", "/api/resource/delete"],
  ignoredRoutes: ["/api/uploadthing/core.ts", "/api/webhook(.*)", "/api/stripe", "/api/resource/delete"],
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
