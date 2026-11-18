import type { Access, FieldAccess } from "payload";

/** Anyone — including logged-out visitors — can read. Used for public marketing content. */
export const anyone: Access = () => true;

/** Only requests from a logged-in user are allowed. */
export const authenticated: Access = ({ req: { user } }) => Boolean(user);

/** True when the given user has the `admin` role. */
export const userIsAdmin = (user: unknown): boolean =>
  (user as { role?: string } | null | undefined)?.role === "admin";

/** True when the given user has the `admin` or `editor` role (i.e. any authenticated CMS user). */
export const userIsEditor = (user: unknown): boolean => {
  const role = (user as { role?: string } | null | undefined)?.role;
  return role === "admin" || role === "editor";
};

/** Access control gate — only admins. */
export const isAdmin: Access = ({ req: { user } }) => userIsAdmin(user);

/** Access control gate — admins or editors. */
export const isEditor: Access = ({ req: { user } }) => userIsEditor(user);

/** Field-level gate — only admins may read/update this field. */
export const isAdminField: FieldAccess = ({ req: { user } }) => userIsAdmin(user);
