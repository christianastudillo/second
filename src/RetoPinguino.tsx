import { useEffect, useRef, useState } from 'react';

const meta = 400;
const mensaje = 'Weno pes, chaparrita, yo ni a los 400 llegaba y tú como si nada jajajaja 🐧';
const inicio = { altura: 0, velocidad: 0, hielo: 105, puntos: 0 };
type Fase = 'lista' | 'jugando' | 'pausa' | 'perdio' | 'gano';

export function RetoPinguino() {
  const [fase, setFase] = useState<Fase>('lista');
  const [partida, setPartida] = useState(inicio);
  const [verMensaje, setVerMensaje] = useState(false);
  const mundo = useRef(inicio);

  useEffect(() => {
    if (fase !== 'jugando') return;
    let frame = 0;
    let anterior = performance.now();
    function avanzar(ahora: number) {
      const dt = Math.min((ahora - anterior) / 1000, .034);
      anterior = ahora;
      const previo = mundo.current;
      const altura = Math.max(0, previo.altura + previo.velocidad * dt);
      const velocidad = altura === 0 ? 0 : previo.velocidad - 340 * dt;
      let hielo = previo.hielo - 42 * dt;
      let puntos = previo.puntos;
      const choco = hielo < 21 && hielo > 11 && altura < 13;
      if (hielo < 8) {
        hielo = 105;
        puntos += 100;
      }
      mundo.current = { altura, velocidad, hielo, puntos };
      setPartida(mundo.current);
      if (choco) setFase('perdio');
      else if (puntos === meta) { setFase('gano'); setVerMensaje(true); }
      else frame = requestAnimationFrame(avanzar);
    }
    frame = requestAnimationFrame(avanzar);
    return () => cancelAnimationFrame(frame);
  }, [fase]);

  function saltar() {
    if (fase !== 'jugando') {
      if (fase !== 'pausa') { mundo.current = inicio; setPartida(inicio); }
      setFase('jugando');
      return;
    }
    if (mundo.current.altura === 0) mundo.current = { ...mundo.current, velocidad: 150 };
  }

  const accion = fase === 'jugando' ? 'Saltar' : fase === 'pausa' ? 'Continuar' : fase === 'lista' ? 'Empezar' : 'Jugar otra vez';
  return <article className="game penguin-game">
    <p className="eyebrow">RETO ESPECIAL · 400 PUNTOS</p>
    <h3>El reto de los 400</h3>
    <p>Salta sobre cuatro hielitos. Cada uno trae una monedita de 100 puntos. Puedes tocar el botón o usar Espacio cuando esté enfocado.</p>
    <div className="penguin-track" aria-hidden="true">
      <span className="penguin-runner" style={{bottom: 14 + partida.altura}}>🐧</span>
      <span className="penguin-ice" style={{left: partida.hielo + '%'}}>🪙<br/>🧊</span>
    </div>
    <p className="penguin-status" role="status">{partida.puntos}/{meta} puntos{fase === 'gano' ? ' · ¡Coyale, llegaste!' : fase === 'perdio' ? ' · ¡Uy, un hielito!' : fase === 'pausa' ? ' · En pausa' : ''}</p>
    <div className="flex flex-wrap gap-2">
      <button className="chip" type="button" onClick={saltar}>{accion}</button>
      {fase === 'jugando' && <button className="chip" type="button" onClick={() => setFase('pausa')}>Pausar</button>}
      <button className="text-button" type="button" aria-expanded={verMensaje} aria-controls="mensaje-pinguino" onClick={() => setVerMensaje(!verMensaje)}>{verMensaje ? 'Guardar mensajito' : 'Leer mensajito'}</button>
    </div>
    <p id="mensaje-pinguino" hidden={!verMensaje}>«{mensaje}»</p>
  </article>;
}
