export const figuras = ['☾', '♡', '✷', '☄'];
export const estrellas = [1, 4, 8, 11, 14];
export function barajar<T>(items: readonly T[], azar = Math.random): T[] {
  const copia = [...items];
  for (let i = copia.length - 1; i > 0; i--) {
    const j = Math.floor(azar() * (i + 1));
    [copia[i], copia[j]] = [copia[j], copia[i]];
  }
  return copia;
}
export function crearBaraja(azar = Math.random) {
  return barajar([...figuras, ...figuras], azar);
}
export const ordenPostal = ['🐧', '✦', '♡', '✉'];
export function intercambiar<T>(items: readonly T[], primero: number, segundo: number) {
  const copia = [...items];
  [copia[primero], copia[segundo]] = [copia[segundo], copia[primero]];
  return copia;
}
export const postalCompleta = (items: readonly string[]) =>
  items.length === ordenPostal.length && items.every((item, i) => item === ordenPostal[i]);
