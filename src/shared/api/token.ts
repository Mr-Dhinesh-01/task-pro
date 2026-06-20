// a stand-in for a real JWT (json-server does not issue tokens)
// every id in this app is a string (seeded ids like "u1", signup ids from json-server)
export type UserId = string;

export function createMockToken(userId: UserId, name: string, minutes = 60): string {
  const payload = {
    sub: userId,
    name,
    exp: Date.now() + minutes * 60 * 1000,
  };
  return btoa(JSON.stringify(payload));
}

// read a token back; returns null if missing or expired
export function readMockToken(token: string | null): { sub: UserId; name: string } | null {
  if (!token) return null;
  try {
    const payload = JSON.parse(atob(token)) as { sub: UserId; name: string; exp: number };
    if (payload.exp < Date.now()) return null;
    return { sub: payload.sub, name: payload.name };
  } catch {
    return null;
  }
}