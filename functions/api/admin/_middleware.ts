import { json, type Env } from "../../_lib/types";

/**
 * Cloudflare Access sits in front of /admin and /api/admin and injects this header
 * once the viewer has signed in. Refusing requests without it keeps the data closed
 * even if the Access application is missing or misconfigured.
 */
export const onRequest: PagesFunction<Env> = async ({ request, next }) => {
  if (!request.headers.get("cf-access-authenticated-user-email")) {
    return json({ error: "Unauthorized" }, 401);
  }
  return next();
};
