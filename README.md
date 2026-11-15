# El Prócer Oculto — sitio web

Sitio estático (HTML + CSS + JS, sin dependencias) armado a partir del prototipo de Figma "Editorial – Prócer oculto".

- `index.html` — landing (portada, apertura, las voces, cierre)
- `capitulos.html` — los siete capítulos + archivo sonoro
- `entrevistas.html` — entrevistas a Alfredo Rosso y Sergio Marchi, pregunta por pregunta
- `css/styles.css` — estilos compartidos
- `js/main.js` — menú móvil, índice de capítulos, espacio reservado de fotos
- `assets/fonts/` — Anton, Arimo, Special Elite, Inria Serif
- `assets/img/` — imágenes

## Publicar con GitHub Pages

1. Subir todo el contenido de esta carpeta a la raíz del repositorio.
2. En el repositorio: Settings → Pages → "Deploy from a branch" → rama `main`, carpeta `/ (root)`.

## Imágenes pendientes

Exportar desde Figma y guardar en `assets/img/` con estos nombres exactos (JPG):

| Archivo | Qué es | Medida sugerida |
|---|---|---|
| `02-banda.jpg` … `06-banda.jpg` | Banda de cada capítulo, **sin** el número ni el título | 1440 × 866 o el doble |
| `02-foto.jpg` … `06-foto.jpg` | Foto de archivo para el recorte de cada capítulo | 560 × 700 (vertical 4:5) |
| `voz-marchi.jpg`, `voz-rosso.jpg`, `voz-provendola.jpg`, `voz-pujol.jpg` | Retratos de "Las voces" | 920 × 1570 |
| `cierre-charly-bn.jpg` | Foto en blanco y negro del cierre | 2880 de ancho |

Las bandas 02 a 06 hoy son manchas de color provisorias; al reemplazarlas, quitar la clase
`banda--provisoria` del `<header class="banda">` correspondiente en `capitulos.html`.
Los retratos y la foto del cierre están en baja resolución.
