import { useEffect, useState } from 'react';
import { crearBaraja, estrellas } from './juegos';
export function Memoria() {
  const [baraja, setBaraja] = useState(crearBaraja);
  const [abiertas, setAbiertas] = useState<number[]>([]);
  const [pares, setPares] = useState<number[]>([]);
  const [intentos, setIntentos] = useState(0);
  useEffect(() => {
    if (abiertas.length !== 2) return;
    const [a, b] = abiertas;
    const coincide = baraja[a] === baraja[b];
    const timer = window.setTimeout(() => {
      if (coincide) setPares(prev => [...prev, a, b]);
      setAbiertas([]);
    }, coincide ? 300 : 750);
    return () => window.clearTimeout(timer);
  }, [abiertas, baraja]);
  return <article className="game">
    <p className="eyebrow">JUEGO 01</p><h3>Parejas en órbita</h3><p>Encuentra las cuatro parejas.</p>
    <div className="tiles grid grid-cols-4 gap-2">
      {baraja.map((figura, i) => {
        const visible = abiertas.includes(i) || pares.includes(i);
        return <button className={visible ? 'tile lit' : 'tile'} key={i}
          aria-label={visible ? 'Carta ' + (i + 1) + ': ' + figura : 'Voltear carta ' + (i + 1)}
          aria-disabled={visible || abiertas.length === 2} onClick={() => {
            if (visible || abiertas.length === 2) return;
            setAbiertas([...abiertas, i]);
            if (abiertas.length === 1) setIntentos(intentos + 1);
          }}>{visible ? figura : '·'}</button>;
      })}
    </div>
    <p className="status" role="status">{pares.length === baraja.length ? '¡Encontraste todas las parejas! ' : pares.length / 2 + '/4 parejas · '}{intentos} intentos</p>
    <button className="text-button" onClick={() => { setBaraja(crearBaraja()); setAbiertas([]); setPares([]); setIntentos(0); }}>Barajar de nuevo ↻</button>
  </article>;
}

export function Constelacion() {
  const [encontradas, setEncontradas] = useState<number[]>([]);
  const [mensaje, setMensaje] = useState('Cinco estrellas se esconden en el tablero.');
  return <article className="game">
    <p className="eyebrow">JUEGO 02</p><h3>Cazadora de estrellas</h3><p>Toca el cielo para descubrir la constelación.</p>
    <div className="tiles grid grid-cols-5 gap-2">
      {Array.from({ length: 15 }, (_, i) => {
        const hallada = encontradas.includes(i);
        return <button key={i} className={hallada ? 'tile lit' : 'tile'} aria-label={'Punto ' + (i + 1) + (hallada ? ', estrella encontrada' : '')}
          aria-pressed={hallada} onClick={() => {
            if (hallada) return;
            if (!estrellas.includes(i)) { setMensaje('Por aquí solo pasó una nubecita.'); return; }
            setEncontradas([...encontradas, i]); setMensaje('¡Una estrella más!');
          }}>{hallada ? '✦' : '·'}</button>;
      })}
    </div>
    <p className="status" role="status">{encontradas.length === estrellas.length ? '¡Constelación completa, coyale!' : encontradas.length + '/5 · ' + mensaje}</p>
    <button className="text-button" onClick={() => { setEncontradas([]); setMensaje('Cinco estrellas se esconden en el tablero.'); }}>Volver a mirar ↻</button>
  </article>;
}


