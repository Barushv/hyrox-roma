// Run: node generate-icons.cjs
const fs = require('fs')
const path = require('path')

function createSVGIcon(size) {
  const r = Math.round(size * 0.15)
  // Diseno: bandera italiana en diagonal (verde-blanco-rojo) + rayo de velocidad
  // Coordenadas en un viewBox fijo 0-100 (escala automaticamente a cualquier size)
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 100 100">
  <defs>
    <clipPath id="rr-${size}"><rect width="100" height="100" rx="15"/></clipPath>
  </defs>
  <g clip-path="url(#rr-${size})">
    <rect width="100" height="100" fill="#FFFFFF"/>
    <g transform="rotate(-45 50 50)">
      <rect x="-80" y="-60" width="220" height="40" fill="#0B6E4F"/>
      <rect x="-80" y="20" width="220" height="40" fill="#CE2B37"/>
    </g>
  </g>
  <path d="M55,14 L41,50 L53,50 L46,86 L73,41 L59,41 Z" fill="#13315C"/>
</svg>`
}

const outDir = path.join(__dirname, 'public', 'icons')
fs.mkdirSync(outDir, { recursive: true })

fs.writeFileSync(path.join(outDir, 'icon-192.svg'), createSVGIcon(192))
fs.writeFileSync(path.join(outDir, 'icon-512.svg'), createSVGIcon(512))
console.log('SVG icons created in public/icons/')
