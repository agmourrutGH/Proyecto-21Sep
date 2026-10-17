import fs from 'node:fs';
import path from 'node:path';

// Expone `virtual:cibeles-media`: la lista de fotos (y audio opcional) que
// realmente existen en /public. Así la página nunca pide un archivo que no
// está (sin 404 ni íconos de imagen rota) y en `npm run dev` se recarga sola
// cuando agregás o quitás una foto de la carpeta.

const VIRTUAL_ID = 'virtual:cibeles-media';
const RESOLVED_ID = '\0' + VIRTUAL_ID;

const PHOTO_DIR = 'images/cibeles';
const PHOTO_NAMES = ['foto1', 'foto2', 'foto3', 'foto4', 'foto5'];
const IMAGE_EXTS = ['.jpg', '.jpeg', '.png', '.webp'];

const MUSIC_DIR = 'audio';
const MUSIC_NAME = 'cumple';
const MUSIC_EXTS = ['.mp3', '.m4a', '.ogg'];

function findFile(publicDir, dir, base, exts) {
  let entries;
  try {
    entries = fs.readdirSync(path.join(publicDir, dir));
  } catch {
    return null;
  }
  for (const ext of exts) {
    const match = entries.find((e) => e.toLowerCase() === base + ext);
    if (!match) continue;
    const stat = fs.statSync(path.join(publicDir, dir, match));
    if (!stat.isFile() || stat.size === 0) continue;
    // ?v= evita que el navegador muestre una versión vieja si reemplazás la foto
    return `${dir}/${match}?v=${Math.round(stat.mtimeMs).toString(36)}`;
  }
  return null;
}

function scan(publicDir) {
  const photos = {};
  for (const name of PHOTO_NAMES) {
    photos[name] = findFile(publicDir, PHOTO_DIR, name, IMAGE_EXTS);
  }
  return { photos, music: findFile(publicDir, MUSIC_DIR, MUSIC_NAME, MUSIC_EXTS) };
}

// /cumple → /cumple/ (sin la barra final Vite mostraría la página principal)
function redirectToSlash(req, res, next) {
  const [pathname, query] = req.url.split('?');
  if (pathname !== '/cumple') return next();
  res.statusCode = 301;
  res.setHeader('Location', '/cumple/' + (query ? '?' + query : ''));
  res.end();
}

export default function cibelesMedia() {
  let publicDir = '';

  return {
    name: 'cibeles-media',
    configResolved(config) {
      publicDir = config.publicDir;
    },
    resolveId(id) {
      if (id === VIRTUAL_ID) return RESOLVED_ID;
    },
    load(id) {
      if (id === RESOLVED_ID) return `export default ${JSON.stringify(scan(publicDir))};`;
    },
    configurePreviewServer(server) {
      server.middlewares.use(redirectToSlash);
    },
    configureServer(server) {
      server.middlewares.use(redirectToSlash);
      const watched = [PHOTO_DIR, MUSIC_DIR].map((d) => path.join(publicDir, d));
      server.watcher.add(watched);
      const onChange = (file) => {
        if (!watched.some((d) => path.resolve(file).startsWith(d))) return;
        const mod = server.moduleGraph.getModuleById(RESOLVED_ID);
        if (mod) server.moduleGraph.invalidateModule(mod);
        server.ws.send({ type: 'full-reload' });
      };
      server.watcher.on('add', onChange);
      server.watcher.on('unlink', onChange);
      server.watcher.on('change', onChange);
    },
  };
}
