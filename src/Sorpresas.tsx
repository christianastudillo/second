import { useState } from 'react';
import { Gift, Heart, Sparkles } from 'lucide-react';
import { intercambiar, ordenPostal, postalCompleta } from './juegos';

const desorden = ['✉', '🐧', '♡', '✦'];

export function Postal() {
  const [piezas, setPiezas] = useState(desorden);
  const [seleccion, setSeleccion] = useState<number | null>(null);
  const completa = postalCompleta(piezas);
  const nombres: Record<string,string> = {'🐧':'pingüino','✦':'estrella','♡':'corazón','✉':'sobre'};
  return <article className="game"><p className="eyebrow">JUEGO 03</p><h3>La postal desordenada</h3>
    <p>Intercambia dos piezas para copiar este orden: {ordenPostal.join(' ')}</p>
    <div className="tiles grid grid-cols-4 gap-2">{piezas.map((pieza, i) => <button className="tile" key={i} aria-label={nombres[pieza] + ', posición ' + (i + 1)} aria-pressed={seleccion === i} onClick={() => {
      if (seleccion === null) { setSeleccion(i); return; }
      setPiezas(intercambiar(piezas, seleccion, i));
      setSeleccion(null);
    }}>{pieza}</button>)}</div>
    <p className="status" role="status">{completa ? '¡Postal lista! El correo pingüino ya salió.' : seleccion === null ? 'Elige una pieza.' : 'Elige la otra pieza.'}</p>
    <button className="text-button" onClick={() => { setPiezas(desorden); setSeleccion(null); }}>Desordenar ↻</button>
  </article>;
}

export function Raspa() {
  const [marcas, setMarcas] = useState<number[]>([]);
  const revelada = marcas.length >= 8;
  function raspar(i: number) {
    setMarcas(prev => prev.includes(i) || prev.length >= 8 ? prev : [...prev, i]);
  }
  return <article className="game"><p className="eyebrow">JUEGO 04</p><h3>Raspa y descubre</h3>
    <p>Desliza el dedo o toca ocho casillas.</p>
    <div className="scratch grid grid-cols-4" onPointerDown={event => {
      if (event.target instanceof HTMLElement && event.target.hasPointerCapture(event.pointerId)) event.target.releasePointerCapture(event.pointerId);
    }} onPointerMove={event => {
      if (!event.buttons || revelada) return;
      const celda = document.elementFromPoint(event.clientX, event.clientY)?.closest<HTMLElement>('[data-scratch]');
      if (celda && event.currentTarget.contains(celda)) raspar(Number(celda.dataset.scratch));
    }}>{Array.from({length: 12}, (_, i) => <button key={i} data-scratch={i} className={marcas.includes(i) || revelada ? 'scratched' : ''} aria-label={'Raspar casilla ' + (i + 1)} aria-pressed={marcas.includes(i) || revelada} onClick={() => raspar(i)}>{marcas.includes(i) || revelada ? '♡' : '✦'}</button>)}</div>
    <p className="status" role="status">{revelada ? 'Vale por una sonrisa, cortesía del club de pingüinitos.' : marcas.length + '/8 casillas'}</p>
    <button className="text-button" onClick={() => setMarcas([])}>Reiniciar ↻</button>
  </article>;
}

export function Cajitas({ corazones }: { corazones: number }) {
  return <div className="extras grid gap-4 md:grid-cols-3">
    <details><summary><Gift/> Cajita sorpresa</summary><p>🐧 Dentro venía un pingüinito. Dice «weno pes» y se queda a hacer compañía.</p></details>
    <details><summary><Sparkles/> Mensaje diminuto</summary><p>Si hoy te ríes un poquito, este universo ya hizo algo bonito.</p></details>
    <div className="heart-count"><Heart/><p role="status">{corazones}/2 corazones encontrados</p><p>{corazones === 2 ? '¡Club de los pingüinitos desbloqueado! Membresía vitalicia por ternura.' : 'Pista: busca en el álbum y el recreo.'}</p></div>
  </div>;
}
