import { useEffect, useRef, useState, type ReactNode } from 'react';
import { motion, MotionConfig, useReducedMotion } from 'motion/react';
import { Heart, Mail, Music2, Sparkles, VolumeX, X } from 'lucide-react';
import { createRoot } from 'react-dom/client';
import { carta, recuerdos } from './contenido';
import './style.css';

const capitulos = [['recuerdos','Recuerdos'], ['carta','Carta'], ['pregunta','Pregunta']];
const opciones = ['Sí, quiero ❤️', 'Necesito pensarlo', 'No'] as const;
const base = import.meta.env.BASE_URL;

function Capitulo({id, numero, titulo, children}: {id: string; numero: string; titulo: string; children: ReactNode}) {
  return <section className="shell chapter" id={id} aria-labelledby={id + '-titulo'}>
    <div className="chapter-head"><span className="eyebrow">{numero}</span><h2 id={id + '-titulo'}>{titulo}</h2></div>
    {children}
  </section>;
}

function Musica() {
  const audio = useRef<HTMLAudioElement>(null);
  const [suena, setSuena] = useState(false);
  const [error, setError] = useState(false);
  async function alternar() {
    if (!audio.current) return;
    if (!audio.current.paused) { audio.current.pause(); return; }
    try { await audio.current.play(); setError(false); }
    catch { setError(true); }
  }
  return <div className="music">
    <audio ref={audio} src={base + 'the-first-time.mp3'} preload="none" loop onPlay={() => setSuena(true)} onPause={() => setSuena(false)}/>
    <button className="icon-button" onClick={alternar} aria-label="Música ambiental" aria-pressed={suena}>{suena ? <Music2/> : <VolumeX/>}</button>
    {error && <span className="music-error" role="status">No se pudo reproducir el audio.</span>}
  </div>;
}

function Fiesta({ vuelta }: { vuelta: number }) {
  const reduce = useReducedMotion();
  if (reduce) return <div className="static-hearts" aria-hidden="true">✦ ♡ 🐧 ♡ ✦</div>;
  return <div className="confetti" key={vuelta} aria-hidden="true">{Array.from({length: 22}, (_, i) =>
    <motion.span key={i} initial={{x:0,y:0,opacity:1,scale:.5}} animate={{x:Math.cos(i*2.4)*(45+i*5),y:Math.sin(i*2.4)*(40+i*4),opacity:0,scale:1.4}} transition={{duration:1.3,delay:(i%5)*.07}}>{['♡','✦','🐧'][i%3]}</motion.span>
  )}</div>;
}

function App() {
  const [abierto, setAbierto] = useState(false);
  const [recuerdo, setRecuerdo] = useState<number | null>(null);
  const [respuesta, setRespuesta] = useState<typeof opciones[number]>();
  const [fiesta, setFiesta] = useState(0);
  const dialogo = useRef<HTMLDialogElement>(null);
  const saludo = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (abierto) saludo.current?.focus({preventScroll:true});
  }, [abierto]);
  useEffect(() => {
    if (recuerdo !== null && !dialogo.current?.open) dialogo.current?.showModal();
  }, [recuerdo]);
  return <MotionConfig reducedMotion="user">
    <a className="skip" href="#principal">Saltar al contenido</a>
    <header className="masthead shell">
      <a href="#inicio" className="wordmark"><Heart size={16}/> <span>C <i>&</i> N</span></a>
      {abierto && <nav aria-label="Capítulos">{capitulos.map(([id,titulo]) => <a key={id} href={'#'+id}>{titulo}</a>)}</nav>}
      <Musica/>
    </header>
    <main id="principal" tabIndex={-1}>
      <section id="inicio" className="hero shell" aria-labelledby="hero-titulo">
        <div className="hero-copy">
          <p className="eyebrow"><span className="dot"/> CORREO PRIVADO · 01/04</p>
          <h1 id="hero-titulo">Una cosita<br/><em>para ti.</em></h1>
          <p className="hero-description">Naye, hay un pedacito de universo escondido en este sobre. Lo hice pensando en ti, mi chaparrita.</p>
          {!abierto && <button className="pill" onClick={() => setAbierto(true)}>Abrir mi sobre <Mail size={17}/></button>}
          <p className="byline">Con cariño, Christian <Heart size={13}/></p>
        </div>
        <div className="mail-scene">
          <span className="scene-spark" aria-hidden="true">✧</span>
          {abierto ? <motion.div className="envelope opened" initial={{rotate:-5,scale:.95}} animate={{rotate:0,scale:1}}><div className="envelope-fold"/><motion.div ref={saludo} tabIndex={-1} className="note" initial={{y:20,opacity:0}} animate={{y:-38,opacity:1}}><strong>Wenas Chaparrita bella</strong></motion.div></motion.div> :
          <motion.button type="button" aria-label="Abrir el sobre para Naye" className="envelope" whileHover={{rotate:0,scale:1.035}} whileTap={{scale:.98}} onClick={() => setAbierto(true)}>
            <div className="envelope-fold"/><span className="wax"><Heart size={24}/></span><span className="address">Para Naye</span>
          </motion.button>}
        </div>
      </section>
      {abierto && <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{duration:.45}}>
        <Capitulo id="recuerdos" numero="02 / EL ÁLBUM" titulo="Nuestros recuerdos">
          <p className="intro">Un lugar para las fotos, las historias y los papelitos que merecen guardarse.</p>
          <div className="album grid gap-5 md:grid-cols-3">
            {recuerdos.map((item,i) => item.foto && <button type="button" className="polaroid" key={item.titulo} onClick={() => setRecuerdo(i)}>
              <img src={base + item.foto} alt={item.alt} loading="lazy"/>
              <span className="photo-title">{item.titulo}</span><small>ABRIR RECUERDO ↗</small>
            </button>)}
          </div>
          <dialog ref={dialogo} aria-labelledby="titulo-recuerdo" onClose={() => setRecuerdo(null)} onClick={e => { if (e.target === e.currentTarget) dialogo.current?.close(); }}>
            {recuerdo !== null && <div className="letter"><button className="close icon-button" aria-label="Cerrar recuerdo" onClick={() => dialogo.current?.close()}><X/></button>
              <p className="eyebrow">DEL ÁLBUM</p><h3 id="titulo-recuerdo">{recuerdos[recuerdo].titulo}</h3>
              {recuerdos[recuerdo].detalle && <p>{recuerdos[recuerdo].detalle}</p>}
              {recuerdos[recuerdo].secreto && <details><summary>Leer el papelito escondido</summary><p>{recuerdos[recuerdo].secreto}</p></details>}
            </div>}
          </dialog>
        </Capitulo>
        <Capitulo id="carta" numero="03 / DE CHRISTIAN A NAYE" titulo="Lo que quiero decirte">
          <article className="letter-page">
            <Mail size={25} aria-hidden="true"/>
            {carta.map(parrafo => {
              const [, destacado, resto] = parrafo.match(/^\*\*(.+?)\*\*(.*)$/) ?? [];
              return <p key={parrafo}>{destacado ? <><strong>{destacado}</strong>{resto}</> : parrafo}</p>;
            })}
            <p className="signature">Con cariño,<br/><em>Christian</em></p>
          </article>
        </Capitulo>
        <section id="pregunta" className="shell finale" aria-labelledby="pregunta-titulo">
          <div className="final-seal"><Heart aria-hidden="true"/>{respuesta === opciones[0] && <Fiesta vuelta={fiesta}/>}</div>
          <p className="eyebrow">04 / A CORAZÓN ABIERTO</p>
          <h2 id="pregunta-titulo">¿Y si lo volvemos a intentar?<br/><em>¿Quieres volver a ser mi novia? ❤️</em></h2>
          <div className="answers flex flex-wrap justify-center gap-3" role="group" aria-label="Tu respuesta">
            {opciones.map(opcion => <button key={opcion} className="chip" aria-pressed={respuesta === opcion} onClick={() => { setRespuesta(opcion); if (opcion === opciones[0]) setFiesta(prev => prev+1); }}>{opcion}</button>)}
          </div>
          <p className="reply" role="status">{respuesta === opciones[0] ? '¡Coyale! Me hace ilusión que lo hablemos y que vayamos a nuestro ritmo. 🐧' : respuesta === opciones[1] ? 'Tómate el tiempo que necesites. Gracias por leerme.' : respuesta === opciones[2] ? 'Gracias por decírmelo, Naye. Respeto tu decisión.' : ''}</p>
          {respuesta === opciones[0] && <button className="text-button" onClick={() => setFiesta(prev => prev+1)}><Sparkles size={16}/> Otra lluvia de corazones</button>}
        </section>
      </motion.div>}
    </main>
    <footer className="shell"><a href="#inicio">Volver al sobre ↑</a><span>CHRISTIAN PARA NAYE ♡</span></footer>
  </MotionConfig>;
}
createRoot(document.getElementById('root')!).render(<App/>);



