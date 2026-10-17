import media from 'virtual:cibeles-media';
import { PHOTOS } from './content.js';

const withBase = (p) => (p ? import.meta.env.BASE_URL + p : null);

// PHOTOS de content.js + la ruta real del archivo (o null si todavía no existe)
export const photos = PHOTOS.map((p) => ({ ...p, src: withBase(media.photos[p.name]) }));

export const musicSrc = withBase(media.music);
