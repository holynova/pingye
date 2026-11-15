import { mkdir, readFile, writeFile } from 'node:fs/promises';

const root = new URL('../', import.meta.url);
const read = (path, encoding) => readFile(new URL(path, root), encoding);
const asDataUrl = (mime, buffer) => 'data:' + mime + ';base64,' + buffer.toString('base64');

const packageInfo = JSON.parse(await read('package.json', 'utf8'));
const images = await Promise.all(['portrait', 'lamp', 'clay', 'light'].map(async (name) => [
  name,
  asDataUrl('image/webp', await read('src/demo/' + name + '.webp')),
]));
const font = asDataUrl('font/woff2', await read('src/fonts/geist-latin.woff2'));
const face = '@font-face{font-family:Geist;font-style:normal;font-weight:400 900;font-display:swap;src:url(' +
  font + ') format("woff2")}';
const fontLicense = await read('src/fonts/OFL.txt', 'utf8');
const app = (await read('src/app.js', 'utf8'))
  .replace('/* IMAGES */ {}', () => JSON.stringify(Object.fromEntries(images)))
  .replace('__APP_VERSION__', packageInfo.version);
const html = (await read('src/index.html', 'utf8'))
  .replace('/* FONTS */', () => face)
  .replace('/* APP */', () => app)
  .replace('/* ANALYTICS */', '<script defer src="https://cloud.umami.is/script.js" data-website-id="e01c9f78-4607-4e60-b01c-77c8190b12b4" data-domains="pingye.xiaosang.cc,xiaosang.cc"></script>')
  .replace('</body>', '<script type="text/plain" id="font-license">\n' + fontLicense + '\n</script>\n</body>');

await mkdir(new URL('dist/', root), { recursive: true });
await writeFile(new URL('dist/index.html', root), html);
