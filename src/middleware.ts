// Without a defined matcher, this one line applies
// next-auth to the entire project
export { default } from "next-auth/middleware";

// https://nextjs.org/docs/app/building-your-application/routing/middleware
// matcher example to just apply next-auth to the /game route
// export const config = { matcher: ["/game"] };
