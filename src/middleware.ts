// Without a defined matcher, this one line applies
// next-auth to the entire project
export { default } from "next-auth/middleware";

// https://nextjs.org/docs/app/building-your-application/routing/middleware
export const config = { matcher: ["/rr-stream"] };
