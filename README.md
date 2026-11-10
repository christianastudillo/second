# Nuestro pequeño universo

Experiencia de Christian para Naye. Usa Node.js 22.12+ o 24. 

- `npm ci` instala las dependencias del proyecto.
- `npm run dev` abre el entorno de desarrollo. Visita la dirección local que imprime Vite.
- `npm test` prueba la lógica de los juegos.
- `npm run build` valida TypeScript y genera `dist/`.
- `npm run preview` sirve la compilación para revisarla localmente.

## Personalización

Coloca las fotos en `public/fotos/` y edita `src/contenido.ts`. Para cada recuerdo puedes definir `foto: 'fotos/recuerdo-1.jpg'`, un texto alternativo `alt`, una fecha visible, la anécdota y el papelito escondido. El álbum y la línea del tiempo siguen el orden de la lista. En el mismo archivo están el diccionario y los párrafos de la carta.

La melodía incluida es un bucle instrumental sintetizado. Para usar otra pista, sustituye `public/musica.wav` o ajusta el nombre del recurso en el componente `Musica`. La reproducción empieza cuando la visitante la activa.

## Despliegue

Configura `npm ci && npm run build` como comando de compilación y `dist` como directorio de publicación, o sube directamente el contenido de `dist` a un alojamiento estático. Las rutas de recursos son relativas para que el sitio también funcione en una subcarpeta. Para mantener privado el álbum, habilita el control de acceso del alojamiento antes de subir fotos.

Las respuestas y el progreso de los juegos se mantienen en memoria durante la visita. No hay servidor de respuestas ni analítica.

En Windows, haz doble clic en **Abrir sitio.cmd** para servir la página y abrirla en tu navegador. Mantén abierta la consola mientras la visitas. El ZIP de despliegue contiene la versión estática para alojamiento web.
