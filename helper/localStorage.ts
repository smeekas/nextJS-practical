export function getToken(): string | null {
  if (typeof window !== "undefined") {
    return window.localStorage.getItem("zitter-token");
  }
  return null;
}

export function setToken(token: string) {
  localStorage.setItem("zitter-token", token);
}
