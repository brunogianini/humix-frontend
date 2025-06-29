import { jwtDecode } from "jwt-decode";

export function getUserIdFromSession(session: any): string | undefined {
  if (!session?.accessToken) return undefined;
  try {
    const decoded: any = jwtDecode(session.accessToken);
    return decoded.id;
  } catch (e) {
    return undefined;
  }
}
