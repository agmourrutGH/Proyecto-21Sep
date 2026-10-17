// ─────────────────────────────────────────────────────────────
//  TODOS LOS TEXTOS DEL REGALO SE EDITAN ACÁ ⬇️
//  (no hace falta tocar ningún componente)
// ─────────────────────────────────────────────────────────────

export const TEXTS = {
  // Pantalla inicial (regalo cerrado)
  invitation: 'Hay un regalito especial para vos, Cibe ❤️',
  hint: 'Tocá el regalo para abrirlo ✨',
  giftLabel: 'Abrir el regalo',

  // Aparece cuando se abre la caja
  title: '¡Feliz cumpleaños, Cibe! ❤️',
  scrollHint: 'Seguí bajando, hay más',

  // Carta
  letter: {
    eyebrow: 'Para Cibe',
    paragraphs: [
      'Hoy es un día especial, porque es el día en que nació una persona que merece un montón de cosas lindas. Espero que este nuevo año de vida te regale muchas sonrisas, momentos hermosos, sueños cumplidos y razones para ser feliz.',
      'Preparé este pequeño regalito para vos, con algunos recuerdos y unas palabras que quería dedicarte. Ojalá te saque una sonrisa y haga que tu día sea un poquito más especial.',
    ],
    // Firma opcional al pie de la carta. Dejala vacía ('') para no mostrarla.
    signature: '',
  },

  // Galería
  gallery: {
    eyebrow: 'Algunos recuerdos',
    title: 'Un pequeño álbum para vos',
    // Se muestra solo si todavía falta alguna foto en public/images/cibeles/
    placeholder: 'Un lugarcito guardado para una foto',
    openLabel: 'Ver foto en grande',
  },

  // Tarjeta final
  final: {
    eyebrow: 'Una última cosita',
    text: 'Te deseo de corazón un cumpleaños hermoso y que la vida te traiga muchas cosas lindas. Que nunca te falten motivos para sonreír. ❤️',
    seePhotos: 'Volver a ver las fotos',
    replay: 'Abrir el regalo otra vez',
  },

  // Botón de música (solo aparece si existe public/audio/cumple.mp3)
  music: { play: 'Reproducir música', pause: 'Pausar música' },
};

// ─────────────────────────────────────────────────────────────
//  LAS CINCO FOTOS
//  Archivos: public/images/cibeles/foto1.jpg … foto5.jpg
//  - caption: texto corto debajo de la foto (opcional, '' = sin texto)
//  - alt: descripción para lectores de pantalla
//  - focus: qué parte de la foto se ve en el marco ('horizontal vertical',
//    '50% 0%' = arriba, '50% 100%' = abajo). En grande se ve la foto entera.
//  La primera es la foto destacada del álbum.
// ─────────────────────────────────────────────────────────────

export const PHOTOS = [
  { name: 'foto1', caption: '', alt: 'Foto 1', focus: '50% 40%' },
  { name: 'foto2', caption: '', alt: 'Foto 2', focus: '60% 50%' },
  { name: 'foto3', caption: '', alt: 'Foto 3', focus: '50% 55%' },
  { name: 'foto4', caption: '', alt: 'Foto 4', focus: '50% 18%' },
  { name: 'foto5', caption: '', alt: 'Foto 5', focus: '50% 42%' },
];
