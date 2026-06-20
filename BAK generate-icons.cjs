// Run: node generate-icons.cjs
const fs = require('fs')
const path = require('path')

function createSVGIcon(size) {
  const r = Math.round(size * 0.15)
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
  <rect width="${size}" height="${size}" rx="${r}" ry="${r}" fill="#185FA5"/>
  <text x="${size/2}" y="${size*0.57}" font-family="Arial,sans-serif" font-size="${Math.round(size*0.52)}" font-weight="bold" fill="white" text-anchor="middle">H</text>
</svg>`
}

const outDir = path.join(__dirname, 'public', 'icons')
fs.mkdirSync(outDir, { recursive: true })

fs.writeFileSync(path.join(outDir, 'icon-192.svg'), createSVGIcon(192))
fs.writeFileSync(path.join(outDir, 'icon-512.svg'), createSVGIcon(512))
console.log('SVG icons created in public/icons/')
