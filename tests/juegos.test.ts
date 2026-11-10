import { test } from 'node:test';
import assert from 'node:assert/strict';
import { barajar, crearBaraja, estrellas, figuras, intercambiar, postalCompleta } from '../src/juegos.ts';

test('la baraja contiene cuatro parejas y permite distintos órdenes', () => {
  const original = crearBaraja(() => .999);
  const mezclada = crearBaraja(() => 0);
  assert.notDeepEqual(original, mezclada);
  for (const figura of figuras) {
    assert.equal(mezclada.filter(item => item === figura).length, 2);
  }
});
test('barajar conserva la colección original y admite una lista vacía', () => {
  const items = [1, 2, 3];
  assert.deepEqual(barajar(items, () => 0), [2, 3, 1]);
  assert.deepEqual(items, [1, 2, 3]);
  assert.deepEqual(barajar([]), []);
});
test('la constelación tiene cinco posiciones distintas dentro del tablero', () => {
  assert.equal(estrellas.length, 5);
  assert.equal(new Set(estrellas).size, 5);
  assert.ok(estrellas.every(pos => Number.isInteger(pos) && pos >= 0 && pos < 15));
});


test('la postal reconoce el orden exacto después de intercambiar piezas', () => {
  const inicial = ['✉', '🐧', '♡', '✦'];
  const paso = intercambiar(inicial, 0, 1);
  assert.deepEqual(inicial, ['✉', '🐧', '♡', '✦']);
  assert.equal(postalCompleta(paso), false);
  assert.equal(postalCompleta(intercambiar(paso, 1, 3)), true);
  assert.equal(postalCompleta(['🐧', '✦', '♡']), false);
});
