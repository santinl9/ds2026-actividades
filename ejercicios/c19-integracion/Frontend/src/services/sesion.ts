export function guardarToken(token: string): void {
  localStorage.setItem('token', token);
}

export function obtenerToken(): string | null {
  return localStorage.getItem('token');
}

export function borrarToken(): void {
  localStorage.removeItem('token');
}
