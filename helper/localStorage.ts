export function getToken(): string | null {
  if (typeof window !== "undefined") {
    return window.localStorage.getItem("token");
  }
  return null;
}

export function setToken(token: string) {
  localStorage.setItem("token", token);
}
