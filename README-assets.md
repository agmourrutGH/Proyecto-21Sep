# Assets nuevos — 21 de Septiembre

## Qué hay en esta carpeta

- `favicon.svg` / `favicon.ico` / `favicon-32.png` / `favicon-180.png` / `favicon-512.png`
  → íconos del sitio en distintos tamaños (pestaña del navegador, ícono al agregar a
  pantalla de inicio en iOS/Android, etc.)
- `og-image.png` (1200×630) → la imagen que aparece cuando se comparte el link por
  WhatsApp, Instagram, Twitter/X, etc.
- Este archivo, con el código SVG listo para pegar en `FlowerDefs.jsx` y en
  `PetalsFalling`, más el prompt para Claude Code.

---

## 1. Dónde poner los archivos de imagen

En un proyecto Vite, todo lo que va suelto (no procesado por el bundler) se pone en
`public/`. Copiá ahí:

```
public/favicon.ico
public/favicon.svg
public/favicon-32.png
public/favicon-180.png
public/favicon-512.png
public/og-image.png
```

Y en el `<head>` de `index.html` (el de la raíz del proyecto Vite, no el que ya no se
usa si migraste a React):

```html
<link rel="icon" type="image/svg+xml" href="/favicon.svg">
<link rel="icon" type="image/x-icon" href="/favicon.ico">
<link rel="apple-touch-icon" href="/favicon-180.png">

<meta property="og:title" content="21 de Septiembre">
<meta property="og:description" content="Algo floreció para vos">
<meta property="og:image" content="https://TU-DOMINIO.vercel.app/og-image.png">
<meta property="og:type" content="website">
<meta name="twitter:card" content="summary_large_image">
```

(Reemplazá `TU-DOMINIO` por la URL real una vez que esté deployado — la og:image
necesita ser una URL absoluta para que WhatsApp/Instagram la puedan leer.)

---

## 2. Dos flores nuevas para `FlowerDefs.jsx`

Pegar estos dos `<symbol>` DENTRO del mismo `<defs>` donde ya está `flowerShape`
(no lo borres, se sigue usando). También hace falta agregar los gradientes/pattern
nuevos que usan estos symbols.

```html
<!-- agregar junto a centerGrad, dentro de <defs> -->
<radialGradient id="sunflowerCenterGrad" cx="35%" cy="35%" r="70%">
  <stop offset="0%" stop-color="#9a6a2e"/>
  <stop offset="100%" stop-color="#4a2f12"/>
</radialGradient>
<pattern id="seedPattern" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(20)">
  <rect width="6" height="6" fill="#5c3a16"/>
  <circle cx="3" cy="3" r="1.3" fill="#2e1c0a"/>
</pattern>

<!-- VARIANTE A: girasol, dos capas de petalos + centro con textura de semillas -->
<symbol id="flowerShapeSunflower" viewBox="0 0 120 120">
  <g fill="currentColor" opacity=".55">
    <path d="M60,60 C50,46 49,22 60,10 C71,22 70,46 60,60 Z"/>
    <path d="M60,60 C50,46 49,22 60,10 C71,22 70,46 60,60 Z" transform="rotate(45 60 60)"/>
    <path d="M60,60 C50,46 49,22 60,10 C71,22 70,46 60,60 Z" transform="rotate(90 60 60)"/>
    <path d="M60,60 C50,46 49,22 60,10 C71,22 70,46 60,60 Z" transform="rotate(135 60 60)"/>
    <path d="M60,60 C50,46 49,22 60,10 C71,22 70,46 60,60 Z" transform="rotate(180 60 60)"/>
    <path d="M60,60 C50,46 49,22 60,10 C71,22 70,46 60,60 Z" transform="rotate(225 60 60)"/>
    <path d="M60,60 C50,46 49,22 60,10 C71,22 70,46 60,60 Z" transform="rotate(270 60 60)"/>
    <path d="M60,60 C50,46 49,22 60,10 C71,22 70,46 60,60 Z" transform="rotate(315 60 60)"/>
  </g>
  <g fill="currentColor" stroke="rgba(0,0,0,.1)" stroke-width="1">
    <path d="M60,60 C53,44 51,15 60,2 C69,15 67,44 60,60 Z" transform="rotate(22.5 60 60)"/>
    <path d="M60,60 C53,44 51,15 60,2 C69,15 67,44 60,60 Z" transform="rotate(67.5 60 60)"/>
    <path d="M60,60 C53,44 51,15 60,2 C69,15 67,44 60,60 Z" transform="rotate(112.5 60 60)"/>
    <path d="M60,60 C53,44 51,15 60,2 C69,15 67,44 60,60 Z" transform="rotate(157.5 60 60)"/>
    <path d="M60,60 C53,44 51,15 60,2 C69,15 67,44 60,60 Z" transform="rotate(202.5 60 60)"/>
    <path d="M60,60 C53,44 51,15 60,2 C69,15 67,44 60,60 Z" transform="rotate(247.5 60 60)"/>
    <path d="M60,60 C53,44 51,15 60,2 C69,15 67,44 60,60 Z" transform="rotate(292.5 60 60)"/>
    <path d="M60,60 C53,44 51,15 60,2 C69,15 67,44 60,60 Z" transform="rotate(337.5 60 60)"/>
  </g>
  <circle cx="60" cy="60" r="18" fill="url(#sunflowerCenterGrad)"/>
  <circle cx="60" cy="60" r="16" fill="url(#seedPattern)"/>
</symbol>

<!-- VARIANTE B: margarita asimetrica, 7 petalos con variacion + veta -->
<symbol id="flowerShapeAsymmetric" viewBox="0 0 120 120">
  <g transform="rotate(0 60 60) translate(60 60) scale(1.00) translate(-60 -60)">
    <path d="M60,60 C51,46 49,20 60,6 C71,20 69,46 60,60 Z" fill="currentColor"/>
    <line x1="60" y1="54" x2="60" y2="11" stroke="rgba(50,32,8,.25)" stroke-width="1"/>
  </g>
  <g transform="rotate(50 60 60) translate(60 60) scale(0.93) translate(-60 -60)">
    <path d="M60,60 C51,46 49,20 60,6 C71,20 69,46 60,60 Z" fill="currentColor"/>
    <line x1="60" y1="54" x2="60" y2="11" stroke="rgba(50,32,8,.25)" stroke-width="1"/>
  </g>
  <g transform="rotate(107 60 60) translate(60 60) scale(1.05) translate(-60 -60)">
    <path d="M60,60 C51,46 49,20 60,6 C71,20 69,46 60,60 Z" fill="currentColor"/>
    <line x1="60" y1="54" x2="60" y2="11" stroke="rgba(50,32,8,.25)" stroke-width="1"/>
  </g>
  <g transform="rotate(154 60 60) translate(60 60) scale(0.96) translate(-60 -60)">
    <path d="M60,60 C51,46 49,20 60,6 C71,20 69,46 60,60 Z" fill="currentColor"/>
    <line x1="60" y1="54" x2="60" y2="11" stroke="rgba(50,32,8,.25)" stroke-width="1"/>
  </g>
  <g transform="rotate(206 60 60) translate(60 60) scale(1.03) translate(-60 -60)">
    <path d="M60,60 C51,46 49,20 60,6 C71,20 69,46 60,60 Z" fill="currentColor"/>
    <line x1="60" y1="54" x2="60" y2="11" stroke="rgba(50,32,8,.25)" stroke-width="1"/>
  </g>
  <g transform="rotate(252 60 60) translate(60 60) scale(0.90) translate(-60 -60)">
    <path d="M60,60 C51,46 49,20 60,6 C71,20 69,46 60,60 Z" fill="currentColor"/>
    <line x1="60" y1="54" x2="60" y2="11" stroke="rgba(50,32,8,.25)" stroke-width="1"/>
  </g>
  <g transform="rotate(309 60 60) translate(60 60) scale(1.06) translate(-60 -60)">
    <path d="M60,60 C51,46 49,20 60,6 C71,20 69,46 60,60 Z" fill="currentColor"/>
    <line x1="60" y1="54" x2="60" y2="11" stroke="rgba(50,32,8,.25)" stroke-width="1"/>
  </g>
  <circle cx="60" cy="60" r="15" fill="url(#centerGrad)"/>
</symbol>
```

Las tres flores (`flowerShape`, `flowerShapeSunflower`, `flowerShapeAsymmetric`) usan
el mismo `viewBox="0 0 120 120"` y el mismo mecanismo de `currentColor`, así que el
componente `Flower` existente no necesita cambios de lógica — solo hay que elegir cuál
`href` usar por instancia (random o fijo) al armar el ramo/campo.

## 3. Tres siluetas para los pétalos que caen

Reemplazá la única clase `.petal-fall` por estas tres, y elegí una al azar por cada
pétalo que se genera:

```css
.petal-fall-a{ width:10px; height:14px; background:var(--yellow-deep); border-radius:50% 50% 50% 50% / 60% 60% 40% 40%; }
.petal-fall-b{ width:8px;  height:16px; background:var(--yellow-deep); border-radius:60% 40% 60% 40% / 50% 60% 40% 50%; }
.petal-fall-c{ width:12px; height:11px; background:var(--yellow-deep); border-radius:50% 50% 20% 50% / 60% 60% 30% 60%; }
```
