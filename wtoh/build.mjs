// 把 index-src.html「壓縮」成 index.html（舊方法：html-minifier-terser）
//   - collapseWhitespace / removeComments：去空白換行、移除 HTML 與 JS 註解(含 EDITMODE 標記)
//   - minifyJS (terser 預設)：壓縮內嵌 JS，mangle 區域變數但保留 top-level 名稱
//   - caseSensitive + keepClosingSlash：保留內嵌 SVG 的 viewBox 等大小寫與自閉合標籤
//   不加密、不混淆 top-level，輸出與先前的 index.html 同風格。
// 用法：cd apps/linein-onepage/wtoh && npm run build   (或 node build.mjs)
import { minify } from 'html-minifier-terser';
import { readFile, writeFile } from 'node:fs/promises';

const SRC = 'index-src.html';
const OUT = 'index.html';

const src = await readFile(SRC, 'utf8');
const out = await minify(src, {
  collapseWhitespace: true,
  removeComments: true,
  minifyJS: true,
  minifyCSS: true,
  caseSensitive: true,      // 保留 SVG 屬性大小寫 (viewBox, preserveAspectRatio…)
  keepClosingSlash: true,   // 保留 <rect .../> 等自閉合（SVG 需要）
  html5: true,
});

await writeFile(OUT, out, 'utf8');
console.log(`build: ${SRC} (${src.length}) → ${OUT} (${out.length} bytes)`);
