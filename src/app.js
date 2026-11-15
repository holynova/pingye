'use strict';

const imageSources = /* IMAGES */ {};
const photos = new Map();
const original = [
  {id:'hero', type:'hero', title:'林岑', subtitle:'独立产品设计师', detail:'LIN CEN STUDIO', image:'portrait', tone:'paper', focus:66},
  {id:'lamp', type:'image', title:'余温台灯', subtitle:'AFTERGLOW', image:'lamp', tone:'paper', focus:50},
  {id:'clay', type:'image', title:'苔痕器皿', subtitle:'MOSS SERIES', image:'clay', tone:'paper', focus:50},
  {id:'works', type:'metric', title:'12', unit:'件', subtitle:'量产作品', tone:'accent'},
  {id:'cities', type:'metric', title:'08', unit:'城', subtitle:'展览与陈列', tone:'soft'},
  {id:'quote', type:'quote', title:'让日常用品，\n多一点温度。', subtitle:'设计方向', tone:'paper'},
  {id:'light', type:'image', title:'浮光纸灯', subtitle:'PAPER STUDIES', image:'light', tone:'paper', focus:50},
  {id:'link', type:'link', title:'lincen.example', subtitle:'作品集与合作', tone:'ink'}
];

const themes = {
  clay: {name:'砂岩', bg:'#e8e1d3', paper:'#faf4e7', soft:'#ddd7c4', accent:'#ac3b22', accentInk:'#fff7e9', ink:'#2d2a22', text:'#252119', quiet:'#625747'},
  moss: {name:'苔绿', bg:'#dde4d1', paper:'#f4f4e9', soft:'#c8d4b9', accent:'#3b5237', accentInk:'#f6f9e9', ink:'#273c29', text:'#263128', quiet:'#53664c'},
  ink: {name:'暗夜', bg:'#202723', paper:'#343e37', soft:'#445448', accent:'#e5ce73', accentInk:'#262c22', ink:'#141c17', text:'#fff6e4', quiet:'#d3d9c8'},
  rose: {name:'珊瑚', bg:'#eed5cb', paper:'#fff2e5', soft:'#eed0b8', accent:'#a3312d', accentInk:'#fff4e5', ink:'#562c28', text:'#462722', quiet:'#785148'}
};

const slots = [
  [[3,0,6,6],[0,0,3,4],[9,2,3,4],[9,0,3,2],[0,4,3,2],[0,6,5,2],[5,6,4,2],[9,6,3,2]],
  [[0,0,4,8],[4,0,5,4],[9,0,3,4],[4,4,2,2],[6,4,2,2],[4,6,5,2],[8,4,4,2],[9,6,3,2]],
  [[0,0,12,3],[0,3,4,3],[4,3,4,3],[0,6,2,2],[2,6,2,2],[4,6,5,2],[8,3,4,3],[9,6,3,2]]
];
const free = [
  [[96,100,477,401,-7],[596,46,365,238,7],[671,295,355,269,-5],[917,133,161,163,10],[31,506,153,104,-5],[230,469,427,125,4],[453,298,249,198,8],[807,568,291,62,-3]],
  [[31,29,503,282,0],[30,329,326,290,0],[365,329,245,207,0],[552,29,568,282,0],[790,329,330,111,0],[629,459,491,160,0],[629,329,143,112,0],[365,551,245,68,0]],
  [[39,57,490,456,0],[572,38,526,327,0],[737,389,359,217,0],[409,393,208,158,0],[634,388,171,103,0],[57,528,375,82,0],[936,261,170,163,0],[452,566,259,53,0]]
];
const freeOrder = [
  ['hero','lamp','clay','light','works','cities','quote','link'],
  ['hero','lamp','clay','works','cities','light','quote','link'],
  ['hero','lamp','clay','light','works','cities','quote','link']
];

const glyphs = {
  undo:'<path d="M9 14 4 9l5-5M4 9h10a5 5 0 0 1 0 10h-2"/>',
  redo:'<path d="m15 14 5-5-5-5m5 5H10a5 5 0 0 0 0 10h2"/>',
  download:'<path d="M12 3v12m-4-4 4 4 4-4M5 16v4h14v-4"/>',
  reset:'<path d="M5 10a7 7 0 1 1 1 7M5 5v5h5"/>',
  layers:'<path d="m12 3 9 5-9 5-9-5 9-5Zm-9 9 9 5 9-5m-18 4 9 5 9-5"/>',
  text:'<path d="M5 5h14M12 5v14m-3 0h6"/>',
  number:'<path d="m10 4-3 16m10-16-3 16M4 9h16M3 15h16"/>',
  link:'<path d="m10 13 4-4m-5 6-2 2a3 3 0 0 1-4-4l4-4a3 3 0 0 1 4 0m2 0 2-2a3 3 0 1 1 4 4l-4 4a3 3 0 0 1-4 0"/>',
  close:'<path d="m6 6 12 12M18 6 6 18"/>',
  plus:'<path d="M12 5v14M5 12h14"/>',
  minus:'<path d="M5 12h14"/>',
  grid:'<rect x="4" y="4" width="16" height="16" rx="2"/><path d="M4 10h16m-10 0v10"/>',
  move:'<path d="M12 3v18M3 12h18M9 6l3-3 3 3M9 18l3 3 3-3M6 9l-3 3 3 3m12-6 3 3-3 3"/>',
  swap:'<path d="M3 8h16m-4-4 4 4-4 4M21 16H5m4-4-4 4 4 4"/>',
  up:'<path d="m6 14 6-6 6 6"/>',
  down:'<path d="m6 10 6 6 6-6"/>',
  image:'<rect x="4" y="4" width="16" height="16" rx="2"/><path d="m4 17 5-5 3 3 3-3 5 5"/><circle cx="15" cy="8" r="1"/>',
  copy:'<rect x="8" y="8" width="12" height="12" rx="2"/><path d="M6 16H5a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v1"/>',
  fit:'<path d="M4 9V4h5m6 0h5v5m0 6v5h-5m-6 0H4v-5"/>',
  crop:'<path d="M6 2v13a3 3 0 0 0 3 3h13M2 6h13a3 3 0 0 1 3 3v13"/>',
  check:'<path d="m5 12 5 5 9-10"/>'
};
const icon = (name) => '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">'+glyphs[name]+'</svg>';
const iconButton = (name, action, label, unavailable=false) => '<button type="button" class="icon" data-action="'+action+'" aria-label="'+label+'" title="'+label+'"'+(unavailable?' disabled':'')+'>'+icon(name)+'</button>';
const escapeHTML = (value) => String(value ?? '').replace(/[&<>"']/g, (char) => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
const clamp = (n, min, max) => Math.min(max, Math.max(min, n));
const clone = (val) => JSON.parse(JSON.stringify(val));

const templates = [
  {name:'中央主图', theme:'clay', description:'主卡居中，作品与数字环绕。'},
  {name:'左侧身份', theme:'moss', description:'左侧突出身份，右侧展示作品和成绩。'},
  {name:'顶部横幅', theme:'ink', description:'横幅先交代身份，再看作品与数据。'},
  {name:'叠放拼贴', theme:'rose', description:'相片与便笺带角度叠放。'},
  {name:'数字焦点', theme:'ink', description:'把成果数字放到显眼的位置。'},
  {name:'错位层叠', theme:'moss', description:'作品和数字卡错位叠放。'}
];

const phoneSlots = [
  [[0,3,8,8],[0,0,7,3],[7,0,5,3],[8,3,4,4],[8,7,4,4],[0,11,7,3],[7,11,5,5],[0,14,7,2]],
  [[0,0,7,9],[7,0,5,5],[7,5,5,4],[0,9,3,3],[3,9,3,3],[0,12,7,4],[6,9,6,3],[7,12,5,4]],
  [[0,0,12,5],[0,5,7,4],[7,5,5,4],[0,13,3,3],[3,13,3,3],[6,13,6,3],[0,9,7,4],[7,9,5,4]]
];

const kinds = {
  hero:{name:'身份', symbol:'image', title:'你的名字', subtitle:'职业或身份', detail:'', tone:'paper'},
  image:{name:'图片', symbol:'image', title:'新作品', subtitle:'', tone:'paper'},
  metric:{name:'数字', symbol:'number', title:'0', unit:'', subtitle:'成绩或数据', tone:'accent'},
  quote:{name:'文案', symbol:'text', title:'写下一句介绍。', subtitle:'关于我', tone:'paper'},
  tags:{name:'标签', symbol:'grid', title:'设计、写作、开发', subtitle:'兴趣与技能', tone:'soft'},
  link:{name:'链接', symbol:'link', title:'example.com', subtitle:'作品集与联系', tone:'ink'}
};

const stage = document.querySelector('#stage');
const status = document.querySelector('.status');
const storageKey = 'bento-editor-v2';
const revisions = {undo:[], redo:[]};
let draft = readDraft();
let selected = null;
let zoom = 1;
let viewScale = 1;
let fieldBefore = null;
let saveTimer;
let statusTimer;
let drag;
let menuOpen = false;
let boxesOnScreen = [];
let cropSession = null;
const cropDialog = document.querySelector('.image-crop');
const cropStage = cropDialog.querySelector('.crop-stage');
const cropGhost = cropDialog.querySelector('.crop-ghost');
const cropPreview = cropDialog.querySelector('.crop-preview');
const cropPhoto = cropPreview.querySelector('img');
const cropFrame = cropDialog.querySelector('.crop-frame');
const maxPhotoZoom = 5;

function blankDraft() {
  return {cards:clone(original),template:0,ratio:'wide',themeOverrides:{}};
}

function readDraft() {
  try {
    const stored = JSON.parse(localStorage.getItem(storageKey));
    if (stored && Array.isArray(stored.cards) && templates[stored.template] && stored.themeOverrides &&
        (stored.ratio==='wide' || stored.ratio==='phone')) return stored;
    const legacy = JSON.parse(localStorage.getItem('bento-prototype-v1-0'));
    if (legacy?.cards?.length && legacy.order?.length) {
      const result = blankDraft();
      result.cards = legacy.order.map(id=>legacy.cards.find(card=>card.id===id)).filter(Boolean);
      if (themes[legacy.theme] && legacy.theme!=='clay') result.themeOverrides[0]=legacy.theme;
      if (legacy.ratio==='tall') result.ratio='phone';
      return result;
    }
  } catch {}
  return blankDraft();
}

function current() { return draft.template; }
function activeTheme() { return draft.themeOverrides[current()] || templates[current()].theme; }
function shape() { return draft.ratio==='wide' ? {w:1152,h:648} : {w:648,h:1152}; }
function cardById(id) { return draft.cards.find(card=>card.id===id); }

function flushDraft() {
  clearTimeout(saveTimer);
  try { localStorage.setItem(storageKey,JSON.stringify(draft)); }
  catch { notice('浏览器存储空间不足。当前稿件仍可导出。'); }
}

function saveDraft() {
  clearTimeout(saveTimer);
  saveTimer=setTimeout(flushDraft,140);
}
window.addEventListener('pagehide',flushDraft);

function notice(message) {
  status.textContent=message;
  clearTimeout(statusTimer);
  statusTimer=setTimeout(()=>{status.textContent='';},2200);
}

function createImage(key,source) {
  if (photos.has(key)) return Promise.resolve(photos.get(key));
  return new Promise(resolve=>{
    const image=new Image();
    image.onload=()=>{photos.set(key,image); resolve(image);};
    image.onerror=()=>resolve(null);
    image.src=source;
  });
}

function restoreImages() {
  return Promise.all([
    ...Object.entries(imageSources).map(([key,source])=>createImage(key,source)),
    ...draft.cards.filter(card=>card.upload && card.image).map(card=>createImage(card.image,card.upload))
  ]);
}

function remember(before) {
  if (JSON.stringify(before)===JSON.stringify(draft)) return;
  revisions.undo.push(before);
  if (revisions.undo.length>32) revisions.undo.shift();
  revisions.redo.length=0;
  renderControls();
  saveDraft();
}

function finishField() {
  if (!fieldBefore) return;
  const before=fieldBefore;
  fieldBefore=null;
  remember(before);
}

function change(edit) {
  finishField();
  const before=clone(draft);
  edit();
  remember(before);
  refresh();
}

function travel(direction) {
  finishField();
  const source=revisions[direction];
  if (!source.length) return;
  revisions[direction==='undo'?'redo':'undo'].push(clone(draft));
  draft=source.pop();
  if (!cardById(selected)) selected=null;
  refresh();
  saveDraft();
}

function slotBox(slot,w,h,rows) {
  const [col,row,cols,tall]=slot;
  const padding=16, gap=11;
  const cellW=(w-padding*2-gap*11)/12;
  const cellH=(h-padding*2-gap*(rows-1))/rows;
  return {x:padding+col*(cellW+gap),y:padding+row*(cellH+gap),
          w:cols*(cellW+gap)-gap,h:tall*(cellH+gap)-gap,r:0,z:0};
}

function divided(rect,axis,ratio,gap) {
  const extent=axis==='w'?rect.w:rect.h;
  const first=Math.max(0,(extent-gap)*ratio);
  if (axis==='w') {
    return [{...rect,w:first},{...rect,x:rect.x+first+gap,w:extent-first-gap}];
  }
  return [{...rect,h:first},{...rect,y:rect.y+first+gap,h:extent-first-gap}];
}

function pack(output, indexes, rect, gap) {
  if (indexes.length===1) {
    output[indexes[0]]={...rect,r:0,z:0};
    return;
  }
  if (!indexes.length) return;
  const mid=Math.ceil(indexes.length/2);
  const axis=rect.w/rect.h>=1.13?'w':'h';
  const gapHere=Math.min(gap,(axis==='w'?rect.w:rect.h)*.06);
  const ratio=clamp(mid/indexes.length,.43,.65);
  const [a,b]=divided(rect,axis,ratio,gapHere);
  pack(output,indexes.slice(0,mid),a,gap);
  pack(output,indexes.slice(mid),b,gap);
}

function centerGrid(output, rest, region, gap, portrait) {
  if (portrait && rest.length>=4) {
    const topCount=rest.length>=6?2:1;
    const bottomCount=rest.length>=6?2:1;
    const [top,middleAndBottom]=divided(region,'h',.21,gap);
    const [middle,bottom]=divided(middleAndBottom,'h',.72,gap);
    const [center,aside]=divided(middle,'w',.66,gap);
    pack(output,rest.slice(0,topCount),top,gap);
    pack(output,[0],center,gap);
    pack(output,rest.slice(topCount,-bottomCount),aside,gap);
    pack(output,rest.slice(-bottomCount),bottom,gap);
  } else if (!portrait && rest.length>=3) {
    const bottomCount=rest.length>=5?Math.min(4,Math.floor(rest.length/3)):0;
    const [top,bottom]=bottomCount?divided(region,'h',.77,gap):[region,null];
    const above=rest.slice(0,rest.length-bottomCount);
    const sideCount=Math.floor(above.length/2);
    const [left,remaining]=divided(top,'w',.25,gap);
    const [center,right]=divided(remaining,'w',.66,gap);
    pack(output,above.slice(0,sideCount),left,gap);
    pack(output,[0],center,gap);
    pack(output,above.slice(sideCount),right,gap);
    if (bottom) pack(output,rest.slice(-bottomCount),bottom,gap);
  } else {
    const [anchor,other]=divided(region,portrait?'h':'w',.58,gap);
    pack(output,[0],anchor,gap);
    pack(output,rest,other,gap);
  }
}

function leftGrid(output, rest, region, gap, portrait) {
  if (portrait && rest.length>=3) {
    const [upper,lower]=divided(region,'h',.63,gap);
    const [anchor,aside]=divided(upper,'w',.57,gap);
    const asideCount=rest.length>=5?Math.max(2,Math.floor(rest.length*.36)):1;
    pack(output,[0],anchor,gap);
    pack(output,rest.slice(0,asideCount),aside,gap);
    pack(output,rest.slice(asideCount),lower,gap);
  } else {
    const [anchor,other]=divided(region,portrait?'h':'w',portrait?.53:rest.length===1?.54:.38,gap);
    pack(output,[0],anchor,gap);
    pack(output,rest,other,gap);
  }
}

function metricGrid(output,rest,region,gap,portrait) {
  const metric=rest.find(index=>draft.cards[index].type==='metric');
  if (metric===undefined) {
    leftGrid(output,rest,region,gap,portrait);
    return;
  }
  const support=rest.filter(index=>index!==metric);
  const [header,body]=support.length?divided(region,'h',portrait?.59:.52,gap):[region,null];
  const [anchor,number]=divided(header,portrait?'h':'w',portrait?.57:.48,gap);
  pack(output,[0],anchor,gap);
  pack(output,[metric],number,gap);
  if (body) pack(output,support,body,gap);
}

function styleCollage(output,index,portrait) {
  const angles=[-5,4,-3,6,-3,3,5,-2];
  output.forEach((rect,i)=>{
    if (index===3) {
      const preferred=angles[i%angles.length]*(portrait?.64:1);
      const cap=Math.atan2(42,Math.max(rect.w,rect.h))*180/Math.PI;
      const angle=clamp(preferred,-cap,cap);
      const bleed=Math.min(12,Math.min(rect.w,rect.h)*.048);
      const sin=Math.sin(angle*Math.PI/180), cos=Math.cos(angle*Math.PI/180);
      rect.w-=bleed*2; rect.h-=bleed*2;
      rect.x+=bleed+((1-cos)*rect.w+sin*rect.h)/2;
      rect.y+=bleed+((1-cos)*rect.h-sin*rect.w)/2;
      rect.r=angle;
      rect.z=draft.cards[i].type==='metric'?2:i===0?0:1;
    } else if (index===5 && i>0 && i%3===0) {
      const bleed=Math.min(10,Math.min(rect.w,rect.h)*.055);
      rect.x-=bleed; rect.y-=bleed;
      rect.w+=bleed; rect.h+=bleed;
      rect.z=2;
    }
  });
}

function layoutPoster() {
  const {w,h}=shape();
  const count=draft.cards.length;
  const index=current();
  const portrait=draft.ratio==='phone';
  if (!count) return [];
  if (count===8 && index<3) {
    return (portrait?phoneSlots:slots)[index].map(slot=>slotBox(slot,w,h,portrait?16:8));
  }
  if (count===8 && !portrait && index>=3 && (index!==4 || draft.cards[3].type==='metric')) {
    const sequence=freeOrder[index-3];
    return free[index-3].map(([x,y,width,height,r],i)=>({x,y,w:width,h:height,r,z:sequence.indexOf(original[i].id)}));
  }
  const padding=index===3?29:index===5?24:16;
  const gap=clamp(12-Math.floor(count/8),5,11);
  const region={x:padding,y:padding,w:w-padding*2,h:h-padding*2};
  const output=[];
  const rest=draft.cards.slice(1).map((_,i)=>i+1);
  if (!rest.length) {
    pack(output,[0],region,gap);
  } else if (index===0) {
    centerGrid(output,rest,region,gap,portrait);
  } else if (index===2) {
    const [banner,other]=divided(region,'h',rest.length===1?.51:portrait?.31:.38,gap);
    pack(output,[0],banner,gap);
    pack(output,rest,other,gap);
  } else if (index===4) {
    metricGrid(output,rest,region,gap,portrait);
  } else {
    leftGrid(output,rest,region,gap,portrait);
  }
  if (index===3 || index===5) styleCollage(output,index,portrait);
  return output;
}
function text(ctx, content, x, y, limit, opt) {
  const {size, weight=500, color, lines=1, spacing=1.14, serif=false} = opt;
  ctx.font = weight+' '+size+'px '+(serif ? '"Instrument Serif", Georgia, "PingFang SC", serif' : 'Geist, "PingFang SC", "Microsoft YaHei", sans-serif');
  ctx.fillStyle = color;
  ctx.textBaseline = 'top';
  const wrapped = [];
  for (const para of String(content ?? '').split('\n')) {
    if (!para) { wrapped.push(''); continue; }
    const tokens = para.match(/[A-Za-z0-9@._+/-]+|[\s\S]/gu) || [];
    let row = '';
    for (const token of tokens) {
      if (ctx.measureText(row + token).width > limit && row) {
        wrapped.push(row.trimEnd());
        row = '';
      }
      for (const char of [...token]) {
        if (ctx.measureText(row + char).width > limit && row) {
          wrapped.push(row.trimEnd());
          row = '';
        }
        row += char;
      }
    }
    wrapped.push(row.trimEnd());
  }
  let displayed = wrapped.slice(0, lines);
  if (wrapped.length > lines) {
    const suffix = '…';
    let last = displayed.at(-1) || '';
    while (last && ctx.measureText(last + suffix).width > limit) last = last.slice(0,-1);
    displayed[displayed.length-1] = last + suffix;
  }
  displayed.forEach((line, i) => ctx.fillText(line,x,y+i*size*spacing,limit));
}

function photoFrame(w,h,index) {
  const edge=index===3?Math.min(w*.16,Math.max(5,Math.min(12,h*.048))):0;
  const caption=index===3?Math.min(33,h*.17):0;
  return {x:edge,y:edge,w:w-edge*2,h:h-edge*2-caption,caption};
}

function defaultPhotoView(card,frame,index) {
  const sample=original.find(item=>item.id===card.id && item.image===card.image);
  return {
    fit:'cover',zoom:1,x:sample?.focus??50,
    y:index===2 && card.type==='hero' && frame.w>frame.h*1.8?18:50
  };
}

function photoView(card,frame,index) {
  const fallback=defaultPhotoView(card,frame,index);
  const percent=(value,otherwise)=>Number.isFinite(value)?clamp(value,0,100):otherwise;
  return {
    fit:card.imageFit==='contain'?'contain':'cover',
    zoom:Number.isFinite(card.imageZoom)?clamp(card.imageZoom,1,maxPhotoZoom):1,
    x:percent(card.focus,fallback.x),y:percent(card.focusY,fallback.y)
  };
}

function photoPlacement(image,frame,view) {
  const scales=[frame.w/image.width,frame.h/image.height];
  const scale=(view.fit==='contain'?Math.min(...scales):Math.max(...scales))*view.zoom;
  const w=image.width*scale,h=image.height*scale;
  const x=frame.x+(frame.w-w)*(w>frame.w?view.x:50)/100;
  const y=frame.y+(frame.h-h)*(h>frame.h?view.y:50)/100;
  return {x,y,w,h};
}

function surface(ctx, bg, w,h, pattern) {
  ctx.fillStyle = bg;
  ctx.fillRect(0,0,w,h);
  if (!pattern) return;
  ctx.fillStyle = '#8d44331c';
  for (let x=10; x<w; x+=18) for (let y=10; y<h; y+=18) {
    ctx.beginPath();
    ctx.arc(x,y,.85,0,Math.PI*2);
    ctx.fill();
  }
}

function paint(ctx, card, w, h, palette, i) {
  const compact = h < 96;
  const collage = i === 3;
  const radius = collage ? 6 : i === 4 ? 6 : i === 5 ? 18 : 15;
  const pad = clamp(Math.min(w,h)*.12,9,25);
  const bw = w-pad*2;
  const base = palette[card.tone] || palette.paper;
  const ink = card.tone === 'accent' ? palette.accentInk : card.tone === 'ink' ? '#fff6e7' : palette.text;
  const secondary = card.tone === 'accent' || card.tone === 'ink' ? ink : palette.quiet;
  const photo = photos.get(card.image);
  ctx.save();
  ctx.beginPath();
  ctx.roundRect(0,0,w,h,Math.min(radius,w/2,h/2));
  ctx.clip();
  ctx.fillStyle = base;
  ctx.fillRect(0,0,w,h);

  if (card.type === 'hero' || card.type === 'image') {
    const frame=photoFrame(w,h,i);
    const mat=frame.caption;
    if (collage) {
      ctx.fillStyle = '#fff1db';
      ctx.fillRect(0,0,w,h);
    }
    if (photo && frame.w>0 && frame.h>0) {
      ctx.save();
      ctx.beginPath();
      ctx.rect(frame.x,frame.y,frame.w,frame.h);
      ctx.clip();
      const box=photoPlacement(photo,frame,photoView(card,frame,i));
      ctx.drawImage(photo,box.x,box.y,box.w,box.h);
      if (card.type === 'hero' || !collage) {
        const shade = ctx.createLinearGradient(0,h*.2,0,h-mat);
        shade.addColorStop(0,'#18150b00');
        shade.addColorStop(1,card.type === 'hero'?'#20190dd9':'#141611de');
        ctx.fillStyle=shade;
        ctx.fillRect(0,0,w,h);
      }
      if (card.type === 'hero' && w>h*1.8) {
        const shade=ctx.createLinearGradient(0,0,w*.72,0);
        shade.addColorStop(0,'#211b16aa');
        shade.addColorStop(1,'#211b1600');
        ctx.fillStyle=shade;
        ctx.fillRect(0,0,w,h);
      }
      ctx.restore();
    }

    if (card.type === 'hero') {
      const big = clamp(Math.min(w*.24,h*.40),23,106);
      const small = clamp(Math.min(w*.07,h*.10),11,26);
      const label = clamp(Math.min(w*.06,h*.072),9,14);
      const titleY = h-mat-pad-small-big-7;
      const onPhoto = photo ? '#fff5e5' : ink;
      text(ctx,card.detail,pad,titleY-label-10,bw,{size:label,weight:600,color:onPhoto});
      text(ctx,card.title,pad,titleY,bw,{size:big,weight:750,color:onPhoto});
      text(ctx,card.subtitle,pad,h-mat-pad-small,bw,{size:small,weight:500,color:onPhoto});
    } else {
      const title = clamp(Math.min(w*.10,h*.20),11,25);
      const caption = clamp(Math.min(w*.055,h*.11),8,12);
      if (collage) {
        text(ctx,card.title,frame.x+4,h-mat-frame.x*.24,Math.max(1,frame.w-8),{size:Math.min(title,mat*.67),weight:700,color:'#432a23'});
      } else {
        text(ctx,card.title,pad,h-pad-title,bw,{size:title,weight:700,color:photo?'#fff6e8':ink});
        if (h>104) text(ctx,card.subtitle,pad,h-pad-title-caption-5,bw,{size:caption,weight:530,color:photo?'#fff6e8':secondary});
      }
    }
  } else if (card.type === 'metric') {
    const label = clamp(Math.min(w*.105,h*.19),11,24);
    const available = h-pad*2-label-5;
    let big = clamp(Math.min(w*.52,available),17,i===4?204:120);
    const measure = (content,size,weight) => {
      ctx.font=weight+' '+size+'px Geist, "PingFang SC", "Microsoft YaHei", sans-serif';
      return ctx.measureText(content).width;
    };
    const gap = card.unit ? 7 : 0;
    let unit = card.unit ? clamp(big*.27,10,28) : 0;
    let unitWidth = card.unit ? measure(card.unit,unit,650) : 0;
    if (unitWidth > bw*.42) {
      unit *= bw*.42/unitWidth;
      unitWidth=measure(card.unit,unit,650);
    }
    const room = Math.max(12,bw-unitWidth-gap-2);
    const natural = measure(card.title,big,750);
    if (natural>room) big=Math.max(7,big*room/natural);
    const width=Math.min(room,measure(card.title,big,750));
    const metricY = Math.max(pad,(h-big-label-4)/2);
    text(ctx,card.title,pad,metricY,room+1,{size:big,weight:750,color:ink});
    if (card.unit) text(ctx,card.unit,pad+width+gap,metricY+big*.84-unit*.80,unitWidth+1,{size:unit,weight:650,color:ink});
    text(ctx,card.subtitle,pad,h-pad-label,bw,{size:label,weight:580,color:secondary});
  } else if (card.type === 'quote') {
    const label = clamp(Math.min(w*.06,h*.15),10,15);
    const size = clamp(Math.min(w*.095,(h-pad*2-label-9)/2.2),11,44);
    text(ctx,card.subtitle,pad,pad,bw,{size:label,weight:580,color:secondary});
    text(ctx,card.title,pad,pad+label+7,bw,{size,weight:680,color:ink,lines:2,spacing:1.12});
  } else if (card.type === 'tags') {
    const label = clamp(Math.min(w*.07,h*.18),10,17);
    text(ctx,card.subtitle,pad,pad,bw,{size:label,weight:580,color:secondary});
    let x=pad, y=pad+label+8;
    const tagSize=clamp(Math.min(w*.079,(h-y-pad)*.32),10,22);
    ctx.font='630 '+tagSize+'px Geist, "PingFang SC", sans-serif';
    for (const tag of card.title.split(/[、，,\n]+/).map(item=>item.trim()).filter(Boolean)) {
      const chip=Math.min(bw,ctx.measureText(tag).width+16);
      if (x+chip>w-pad) { x=pad; y+=tagSize+16; }
      if (y+tagSize+8>h-5) break;
      ctx.globalAlpha=.13;
      ctx.fillStyle=ink;
      ctx.beginPath();
      ctx.roundRect(x,y,chip,tagSize+8,5);
      ctx.fill();
      ctx.globalAlpha=1;
      text(ctx,tag,x+8,y+4,chip-16,{size:tagSize,weight:630,color:ink});
      x+=chip+5;
    }
  } else {
    const label = clamp(Math.min(w*.063,h*.21),9,15);
    const title = clamp(Math.min(w*.10,h*.26),11,27);
    const groupHeight = title + label + 3;
    const y = Math.max(5,(h-groupHeight)/2);
    text(ctx,card.subtitle,pad,y,bw,{size:label,weight:500,color:secondary});
    text(ctx,card.title,pad,y+label+3,bw,{size:title,weight:660,color:ink});
    if (!compact && bw>190) text(ctx,'↗',w-pad-25,pad,25,{size:21,weight:550,color:ink});
  }
  ctx.restore();
}

function cardBitmap(card, w, h, scale) {
  const canvas = document.createElement('canvas');
  canvas.width = Math.max(1,Math.ceil(w*scale));
  canvas.height = Math.max(1,Math.ceil(h*scale));
  const ctx = canvas.getContext('2d');
  ctx.scale(scale,scale);
  paint(ctx,card,w,h,themes[activeTheme()],current());
  return canvas;
}


function cardName(card) {
  if (['metric','quote','link','tags'].includes(card.type)) return card.subtitle || card.title || kinds[card.type].name;
  return card.title || kinds[card.type].name;
}

function renderPoster() {
  const artboard=stage.querySelector('.artboard');
  const wrap=stage.querySelector('.poster-wrap');
  if (!artboard || !wrap.clientWidth) return;
  const {w,h}=shape();
  const desk=stage.querySelector('.desk');
  const maxHeight=Math.max(245,desk.clientHeight-(innerWidth<=600?115:155));
  viewScale=Math.min(wrap.clientWidth/w,maxHeight/h)*zoom;
  artboard.style.width=w*viewScale+'px';
  artboard.style.height=h*viewScale+'px';
  artboard.style.background=themes[activeTheme()].bg;
  if (current()===3) {
    artboard.style.backgroundImage='radial-gradient(#8d44331c .75px,transparent .75px)';
    artboard.style.backgroundSize=18*viewScale+'px '+18*viewScale+'px';
    artboard.style.backgroundPosition=viewScale+'px '+viewScale+'px';
  }
  const content=document.createDocumentFragment();
  boxesOnScreen=layoutPoster();
  boxesOnScreen.forEach((box,index)=>{
    const card=draft.cards[index];
    const tile=document.createElement('button');
    tile.type='button';
    tile.className='tile'+(selected===card.id?' selected':'')+(current()===3?' collage-tile':'');
    tile.dataset.tile=card.id;
    tile.setAttribute('aria-label',cardName(card));
    tile.setAttribute('aria-pressed',String(selected===card.id));
    const {style}=tile;
    style.left=box.x*viewScale+'px';
    style.top=box.y*viewScale+'px';
    style.width=box.w*viewScale+'px';
    style.height=box.h*viewScale+'px';
    style.zIndex=box.z+1;
    if (box.r) style.transform='rotate('+box.r+'deg)';
    tile.append(cardBitmap(card,box.w,box.h,Math.max(.56,viewScale*Math.min(devicePixelRatio,2))));
    content.append(tile);
  });
  if (!draft.cards.length) {
    const empty=document.createElement('div');
    empty.className='empty-board';
    empty.innerHTML='<button class="action" data-action="add-first">'+icon('plus')+'添加第一张卡片</button>';
    content.append(empty);
  }
  artboard.replaceChildren(content);
  renderCropLauncher();
  const meta=stage.querySelector('.canvas-meta');
  meta.style.width=Math.min(wrap.clientWidth,w*viewScale)+'px';
  meta.firstElementChild.textContent=w+' × '+h+' px';
  meta.lastElementChild.textContent=draft.cards.length>1?'拖动换位 · 增删后自动排版':'';
  stage.querySelector('.zoom-value').textContent=Math.round(zoom*100)+'%';
}

function renderList() {
  const side=stage.querySelector('.left');
  const list=side.querySelector('.list');
  const scroll=list.scrollLeft;
  list.innerHTML=draft.cards.map(card=>{
    const photo=photos.get(card.image);
    const thumb='<span class="thumbnail"'+(photo?' style="background-image:url('+photo.src+')"':'')+'>'+
      (photo?'':icon(kinds[card.type].symbol))+'</span>';
    return '<div class="row'+(selected===card.id?' active':'')+'"><button type="button" class="row-select" aria-pressed="'+
      (selected===card.id)+'" data-select="'+escapeHTML(card.id)+'">'+thumb+'<span>'+escapeHTML(cardName(card))+'</span></button></div>';
  }).join('');
  list.scrollLeft=scroll;
  side.querySelector('.card-count').textContent=draft.cards.length;
}

function field(label,type,key,value,options='') {
  return '<label class="field"><span>'+label+'</span><input type="'+type+'" data-field="'+key+
    '" value="'+escapeHTML(value)+'" '+options+'></label>';
}

function panelButton(action,label,glyph,extra='') {
  return '<button type="button" class="panel-btn '+extra+'" data-action="'+action+'">'+icon(glyph)+label+'</button>';
}

function renderPanel() {
  const side=stage.querySelector('.right');
  const card=cardById(selected);
  if (!card) {
    const choices=Object.entries(themes).map(([name,t])=>'<button type="button" class="preset" data-theme="'+name+'" aria-pressed="'+
      (activeTheme()===name)+'"><span class="swatches">'+[t.ink,t.soft,t.accent,t.paper].map(color=>'<i style="background:'+color+'"></i>').join('')+
      '</span><span>'+t.name+'</span></button>').join('');
    side.innerHTML='<div class="rail-title"><h2>画布设置</h2></div><span class="setting-title">配色</span><div class="presets">'+choices+
      '</div><div class="rail-section"><span class="setting-title">'+templates[current()].name+'</span><p class="quiet">'+
      templates[current()].description+'</p></div>';
    return;
  }
  let html='<div class="rail-title"><h2>编辑'+kinds[card.type].name+'卡</h2>'+iconButton('close','deselect','返回画布设置')+'</div>';
  if (card.type==='metric') {
    html+='<div class="form-row">'+field('数值','text','title',card.title,'maxlength="14"')+
      field('单位','text','unit',card.unit,'maxlength="8"')+'</div>';
  } else if (card.type==='quote' || card.type==='tags') {
    html+='<label class="field"><span>'+(card.type==='tags'?'标签（用顿号分隔）':'文案')+
      '</span><textarea data-field="title" maxlength="100">'+escapeHTML(card.title)+'</textarea></label>';
  } else {
    html+=field(card.type==='hero'?'姓名':card.type==='link'?'地址':'标题','text','title',card.title,'maxlength="48"');
  }
  html+=field(card.type==='hero'?'身份':'说明','text','subtitle',card.subtitle,'maxlength="52"');
  if (card.type==='hero') html+=field('工作室名','text','detail',card.detail,'maxlength="36"');
  const canUpload=card.type==='image' || card.type==='hero';
  if (canUpload) {
    if (photos.has(card.image)) html+=panelButton('crop','裁剪图片','crop','photo-action');
    html+=panelButton('upload',card.image?'替换图片':'上传图片','image');
  } else {
    const tones=Object.entries({paper:'浅色',soft:'柔和',accent:'主题色',ink:'深色'});
    html+='<label class="field"><span>底色</span><select data-field="tone">'+tones.map(([key,label])=>
      '<option value="'+key+'"'+(card.tone===key?' selected':'')+'>'+label+'</option>').join('')+'</select></label>';
  }
  html+='<div class="rail-section">';
  const choices=draft.cards.filter(other=>other.id!==card.id);
  if (choices.length) {
    html+='<label class="field"><span>交换位置</span><select data-swap><option value="">选择一张卡片</option>'+
      choices.map(other=>'<option value="'+escapeHTML(other.id)+'">'+escapeHTML(cardName(other))+'</option>').join('')+'</select></label>';
  }
  html+=panelButton('remove','删除卡片','close','danger')+'</div>';
  side.innerHTML=html;
}

function renderChrome() {
  const buttons=templates.map((template,index)=>'<button type="button" data-template="'+index+'" title="'+
    template.description+'">'+template.name+'</button>').join('');
  const menu=Object.entries(kinds).map(([type,kind])=>'<button type="button" data-kind="'+type+'">'+
    icon(kind.symbol)+kind.name+'</button>').join('');
  stage.innerHTML='<header class="top"><div class="brand"><div class="logo" aria-hidden="true"><i></i><i></i><i></i><i></i></div><b>拼页</b></div>'+
    '<div class="project">个人介绍 <span class="app-version">v__APP_VERSION__</span></div><div class="top-actions"><a class="plain repo-link" href="https://github.com/holynova/pingye" aria-label="GitHub 仓库">'+icon('link')+'<span>GitHub</span></a>'+iconButton('undo','undo','撤销')+iconButton('redo','redo','重做')+
    '<button class="action" data-action="export">'+icon('download')+'导出 PNG</button></div></header>'+
    '<main class="shell"><aside class="left" aria-label="卡片"><div class="rail-title"><h2>卡片 <span class="card-count"></span></h2></div>'+
    '<div class="add-wrap"><button class="panel-btn add-card" data-action="add" aria-expanded="false" aria-controls="card-types">'+icon('plus')+
    '添加卡片</button><div class="add-menu" id="card-types" hidden>'+menu+'</div></div><div class="list"></div></aside>'+
    '<section class="workspace" aria-label="海报画布"><div class="canvas-bar"><span class="bar-label">版式</span>'+
    '<div class="template-tabs" aria-label="版式">'+buttons+'</div><div class="segment" aria-label="画幅">'+
    '<button data-ratio="wide" title="横屏 16:9">'+icon('fit')+'16:9</button><button data-ratio="phone" title="手机竖屏 9:16">9:16</button></div></div>'+
    '<div class="desk"><div class="poster-wrap"><div class="artboard" id="artboard" aria-label="海报内容"></div>'+
    '<div class="canvas-meta"><span></span><span></span></div></div><div class="toolbar" aria-label="画布工具">'+
    iconButton('minus','zoom-out','缩小')+'<span class="zoom-value">100%</span>'+
    iconButton('plus','zoom-in','放大')+iconButton('fit','fit','适合窗口')+'</div></div></section>'+
    '<aside class="right" aria-label="属性面板"></aside></main>';
  const resize=new ResizeObserver(renderPoster);
  resize.observe(stage.querySelector('.poster-wrap'));
  resize.observe(stage.querySelector('.desk'));
}

function renderControls() {
  stage.dataset.ratio=draft.ratio;
  stage.querySelectorAll('[data-template]').forEach(button=>{
    button.setAttribute('aria-pressed',String(Number(button.dataset.template)===current()));
  });
  stage.querySelectorAll('[data-ratio]').forEach(button=>{
    button.setAttribute('aria-pressed',String(button.dataset.ratio===draft.ratio));
  });
  const disabled={
    undo:!revisions.undo.length, redo:!revisions.redo.length, export:!draft.cards.length,
    'zoom-in':zoom>=1.25,'zoom-out':zoom<=.55,fit:zoom===1
  };
  for (const [action,value] of Object.entries(disabled)) stage.querySelector('[data-action="'+action+'"]').disabled=value;
}

function refresh() {
  renderControls();
  renderList();
  renderPoster();
  renderPanel();
}

function selectCard(id) {
  if (selected===id) return;
  finishField();
  selected=id;
  renderList();
  renderPanel();
  stage.querySelectorAll('.tile').forEach(tile=>{
    const active=tile.dataset.tile===id;
    tile.classList.toggle('selected',active);
    tile.setAttribute('aria-pressed',String(active));
  });
  renderCropLauncher();
}

function swapWith(first,second) {
  if (first===second) return;
  const a=draft.cards.findIndex(card=>card.id===first);
  const b=draft.cards.findIndex(card=>card.id===second);
  if (a<0 || b<0) return;
  change(()=>{[draft.cards[a],draft.cards[b]]=[draft.cards[b],draft.cards[a]];});
  notice('已交换位置');
}

function openAddMenu(value,focus=false) {
  menuOpen=value;
  const menu=stage.querySelector('#card-types');
  menu.hidden=!value;
  const button=stage.querySelector('[data-action="add"]');
  button.setAttribute('aria-expanded',String(value));
  if (focus) (value?menu.querySelector('button'):button).focus();
}

function addCard(type) {
  const {name,symbol,...defaults}=kinds[type];
  const id='c-'+Date.now().toString(36)+'-'+Math.random().toString(36).slice(2,7);
  openAddMenu(false);
  change(()=>{
    draft.cards.push({id,type,...defaults});
    selected=id;
  });
  const field=stage.querySelector('[data-field="title"]');
  field?.focus({preventScroll:true});
  field?.select();
  if (innerWidth<=600) stage.querySelector('.right').scrollIntoView({block:'nearest'});
  notice('已添加 · '+draft.cards.length+' 张卡片');
}

function removeCard() {
  if (!cardById(selected)) return;
  change(()=>{
    draft.cards=draft.cards.filter(card=>card.id!==selected);
    selected=null;
  });
  notice('已删除 · '+draft.cards.length+' 张卡片');
}

function replaceImage() {
  const input=document.createElement('input');
  const id=selected;
  input.type='file';
  input.accept='image/png,image/jpeg,image/webp,image/gif,image/avif';
  input.addEventListener('change',async ()=>{
    const file=input.files[0];
    if (!file) return;
    const objectURL=URL.createObjectURL(file);
    const key='upload-'+Date.now()+'-'+Math.random().toString(36).slice(2,6);
    try {
      const image=await createImage(key+'-source',objectURL);
      if (!image) { notice('浏览器无法打开这张图片'); return; }
      const scale=Math.min(1,1600/Math.max(image.width,image.height));
      const canvas=document.createElement('canvas');
      canvas.width=Math.max(1,Math.round(image.width*scale));
      canvas.height=Math.max(1,Math.round(image.height*scale));
      canvas.getContext('2d').drawImage(image,0,0,canvas.width,canvas.height);
      const source=canvas.toDataURL('image/webp',.85);
      await createImage(key,source);
      if (!cardById(id)) return;
      change(()=>Object.assign(cardById(id),{image:key,upload:source,focus:50,focusY:50,imageFit:'cover',imageZoom:1}));
    } finally {
      URL.revokeObjectURL(objectURL);
      photos.delete(key+'-source');
    }
  },{once:true});
  input.click();
}

function exportPoster() {
  if (!draft.cards.length) return;
  const {w,h}=shape();
  const scale=2;
  const index=current();
  const palette=themes[activeTheme()];
  const canvas=document.createElement('canvas');
  canvas.width=w*scale;
  canvas.height=h*scale;
  const ctx=canvas.getContext('2d');
  ctx.scale(scale,scale);
  surface(ctx,palette.bg,w,h,index===3);
  const composition=layoutPoster().map((box,i)=>({box,card:draft.cards[i]})).sort((a,b)=>a.box.z-b.box.z);
  for (const {box,card} of composition) {
    ctx.save();
    ctx.translate(box.x,box.y);
    ctx.rotate(box.r*Math.PI/180);
    if (index===3) {
      ctx.shadowColor='#2818113d';
      ctx.shadowBlur=24;
      ctx.shadowOffsetX=6;
      ctx.shadowOffsetY=10;
      ctx.drawImage(cardBitmap(card,box.w,box.h,scale),0,0,box.w,box.h);
    } else paint(ctx,card,box.w,box.h,palette,index);
    ctx.restore();
  }
  const name='拼页-'+templates[index].name+'-'+(draft.ratio==='wide'?'16x9':'9x16')+'.png';
  canvas.toBlob(blob=>{
    if (!blob) { notice('导出失败，请重试'); return; }
    const url=URL.createObjectURL(blob);
    const anchor=document.createElement('a');
    anchor.href=url;
    anchor.download=name;
    anchor.click();
    setTimeout(()=>URL.revokeObjectURL(url),15000);
    notice('已导出 '+canvas.width+' × '+canvas.height+' px');
  },'image/png');
}

function chooseTemplate(index) {
  if (!templates[index] || index===current()) return;
  change(()=>{draft.template=index;});
}

function perform(action) {
  finishField();
  switch (action) {
    case 'undo': case 'redo': travel(action); break;
    case 'deselect': selectCard(null); break;
    case 'export': exportPoster(); break;
    case 'add': openAddMenu(!menuOpen,!menuOpen); break;
    case 'add-first': openAddMenu(true,true); break;
    case 'remove': removeCard(); break;
    case 'upload': replaceImage(); break;
    case 'crop': openCrop(); break;
    case 'zoom-in': case 'zoom-out': case 'fit':
      zoom=action==='fit'?1:clamp(Math.round((zoom+(action==='zoom-in'?.15:-.15))*100)/100,.55,1.25);
      renderControls();
      renderPoster();
      break;
  }
}

stage.addEventListener('click',event=>{
  const button=event.target.closest('button');
  if (button?.disabled) return;
  if (button?.dataset.action) perform(button.dataset.action);
  else if (button?.dataset.kind) addCard(button.dataset.kind);
  else if (button?.dataset.select) selectCard(button.dataset.select);
  else if (button?.dataset.tile) selectCard(button.dataset.tile);
  else if (button?.dataset.template!==undefined) chooseTemplate(Number(button.dataset.template));
  else if (button?.dataset.theme) change(()=>{draft.themeOverrides[current()]=button.dataset.theme;});
  else if (button?.dataset.ratio && button.dataset.ratio!==draft.ratio) {
    zoom=1;
    change(()=>{draft.ratio=button.dataset.ratio;});
  } else if (event.target.closest('.artboard')) selectCard(null);
});

stage.addEventListener('dblclick',event=>{
  const tile=event.target.closest('.tile');
  if (tile && photos.has(cardById(tile.dataset.tile)?.image)) {
    selectCard(tile.dataset.tile);
    openCrop();
  }
});

document.addEventListener('click',event=>{
  if (menuOpen && !event.target.closest('.add-wrap,[data-action="add-first"]') && !event.target.closest('[data-kind]')) {
    openAddMenu(false);
  }
});

stage.addEventListener('focusin',event=>{
  if (event.target.dataset.field) fieldBefore=clone(draft);
});
stage.addEventListener('focusout',event=>{
  if (event.target.dataset.field) finishField();
});
stage.addEventListener('input',event=>{
  const input=event.target;
  const card=cardById(selected);
  if (!input.dataset.field || !card) return;
  if (!fieldBefore) fieldBefore=clone(draft);
  card[input.dataset.field]=input.value;
  renderPoster();
  renderList();
  saveDraft();
});
stage.addEventListener('change',event=>{
  const input=event.target;
  if (input.dataset.swap!==undefined && input.value) swapWith(selected,input.value);
  if (input.dataset.field && input.tagName==='SELECT') finishField();
});

stage.addEventListener('pointerdown',event=>{
  const tile=event.target.closest('.tile');
  if (!tile || event.button!==0) return;
  drag={source:tile,x:event.clientX,y:event.clientY,pointer:event.pointerId,target:null};
  tile.setPointerCapture(event.pointerId);
});
stage.addEventListener('pointermove',event=>{
  if (!drag || drag.pointer!==event.pointerId) return;
  if (!drag.moving && Math.hypot(event.clientX-drag.x,event.clientY-drag.y)<6) return;
  drag.moving=true;
  drag.source.classList.add('dragging');
  const next=document.elementFromPoint(event.clientX,event.clientY)?.closest('.tile');
  drag.target?.classList.remove('drop');
  drag.target=next!==drag.source?next:null;
  drag.target?.classList.add('drop');
});
function finishDrag(event,canceled) {
  if (!drag || drag.pointer!==event.pointerId) return;
  const {source,target,moving}=drag;
  drag=null;
  source.classList.remove('dragging');
  target?.classList.remove('drop');
  if (moving && target && !canceled) {
    selected=source.dataset.tile;
    swapWith(selected,target.dataset.tile);
  }
}
stage.addEventListener('pointerup',event=>finishDrag(event,false));
stage.addEventListener('pointercancel',event=>finishDrag(event,true));

document.addEventListener('keydown',event=>{
  if (cropSession) return;
  if (event.key==='Escape' && menuOpen) { openAddMenu(false,true); return; }
  if (/^(INPUT|TEXTAREA|SELECT)$/.test(event.target.tagName) || event.target.isContentEditable) return;
  if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase()==='z') {
    event.preventDefault();
    travel(event.shiftKey?'redo':'undo');
    return;
  }
  if (event.metaKey || event.ctrlKey || event.altKey) return;
  if (/^[1-6]$/.test(event.key)) chooseTemplate(Number(event.key)-1);
  else if (event.key==='Escape') selectCard(null);
  else if ((event.key==='Delete' || event.key==='Backspace') && event.target.closest('.tile,.row-select')) {
    event.preventDefault();
    selectCard(event.target.dataset.tile || event.target.dataset.select);
    removeCard();
  }
});

function renderCropLauncher() {
  const artboard=stage.querySelector('.artboard');
  artboard?.querySelector('.crop-launch')?.remove();
  const card=cardById(selected);
  const box=boxesOnScreen[draft.cards.indexOf(card)];
  if (!artboard || !box || !photos.has(card?.image)) return;

  const radians=box.r*Math.PI/180;
  const right=(box.x+box.w*Math.cos(radians))*viewScale;
  const top=(box.y+box.w*Math.sin(radians))*viewScale;
  const compact=box.w*viewScale<105;
  const width=compact?31:62;
  const button=document.createElement('button');
  button.type='button';
  button.className='crop-launch';
  button.dataset.action='crop';
  button.setAttribute('aria-label','在画布上裁剪图片');
  button.title='裁剪图片';
  button.style.width=width+'px';
  button.style.left=clamp(right-width-7,3,artboard.clientWidth-width-3)+'px';
  button.style.top=clamp(top+7,3,artboard.clientHeight-34)+'px';
  button.innerHTML=icon('crop')+(compact?'':'<span>裁剪</span>');
  artboard.append(button);
}

function openCrop() {
  const card=cardById(selected);
  const image=photos.get(card?.image);
  const box=boxesOnScreen[draft.cards.indexOf(card)];
  if (!image || !box || cropSession) return;

  const frame=photoFrame(box.w,box.h,current());
  if (frame.w<=0 || frame.h<=0) return;
  const palette=themes[activeTheme()];
  const view=photoView(card,frame,current());
  const imageAspect=image.width/image.height;
  const frameAspect=frame.w/frame.h;
  cropSession={
    id:card.id, image, frame, view, initial:{...view},
    fallback:defaultPhotoView(card,frame,current()),
    recommended:card.type!=='hero' && Math.min(frameAspect/imageAspect,imageAspect/frameAspect)<.72?'contain':'cover',
    opener:document.activeElement
  };
  cropPreview.style.background=current()===3?'#fff1db':palette[card.tone]||palette.paper;
  cropPhoto.src=image.src;
  cropGhost.src=image.src;
  cropDialog.showModal();
  measureCrop();
  cropFrame.focus({preventScroll:true});
}

function closeCrop(apply=false) {
  if (!cropSession) return;
  const {id,view,initial,opener}=cropSession;
  const card=cardById(id);
  cropSession=null;
  delete cropStage.dataset.gesture;
  cropDialog.close();
  if (apply && card && Object.keys(view).some(key=>view[key]!==initial[key])) {
    change(()=>Object.assign(card,{
      imageFit:view.fit,imageZoom:view.zoom,focus:view.x,focusY:view.y
    }));
  }
  const focusTarget=opener?.isConnected && opener!==document.body ? opener :
    stage.querySelector('[data-action="crop"]');
  focusTarget?.focus({preventScroll:true});
}

function measureCrop() {
  if (!cropSession || !cropStage.clientWidth) return;
  const {frame}=cropSession;
  const w=cropStage.clientWidth,h=cropStage.clientHeight;
  const scale=Math.min((w-52)/frame.w,(h-50)/frame.h);
  const width=frame.w*scale,height=frame.h*scale;
  cropSession.bounds={x:(w-width)/2,y:(h-height)/2,w:width,h:height};
  cropSession.gesture=null;
  delete cropStage.dataset.gesture;
  renderCrop();
}

function setCropRect(element,rect) {
  const {x,y,w,h}=rect;
  Object.assign(element.style,{left:x+'px',top:y+'px',width:w+'px',height:h+'px'});
}

function renderCrop() {
  const {bounds,view,image,gesture,recommended}=cropSession;
  const crop=gesture?.trimmed||bounds;
  const placement=photoPlacement(image,bounds,view);
  setCropRect(cropGhost,placement);
  setCropRect(cropPreview,crop);
  setCropRect(cropPhoto,{...placement,x:placement.x-crop.x,y:placement.y-crop.y});
  setCropRect(cropFrame,crop);

  cropDialog.querySelector('.crop-zoom-value').value=Math.round(view.zoom*100)+'%';
  cropDialog.querySelector('[data-crop="minus"]').disabled=view.zoom<=1;
  cropDialog.querySelector('[data-crop="plus"]').disabled=view.zoom>=maxPhotoZoom;
  for (const button of cropDialog.querySelectorAll('.crop-modes button')) {
    const mode=button.dataset.crop;
    button.classList.toggle('suggested',mode===recommended);
    button.setAttribute('aria-pressed',String(view.fit===mode && (mode!=='contain' || view.zoom<=1)));
    button.setAttribute('aria-label',button.textContent+(mode===recommended?'，建议':''));
  }
}

function translatedCrop(view,placement,bounds,x,y) {
  const focus=(start,offset,extent,otherwise)=>extent>0.01?clamp((start-offset)/extent*100,0,100):otherwise;
  return {
    ...view,
    x:focus(bounds.x,x,placement.w-bounds.w,view.x),
    y:focus(bounds.y,y,placement.h-bounds.h,view.y)
  };
}

function zoomCrop(zoom,pivotX,pivotY) {
  const {view,image,bounds}=cropSession;
  const level=clamp(zoom,1,maxPhotoZoom);
  if (level===view.zoom) return;
  const before=photoPlacement(image,bounds,view);
  const after=photoPlacement(image,bounds,{...view,zoom:level});
  const x=pivotX??bounds.x+bounds.w/2,y=pivotY??bounds.y+bounds.h/2;
  cropSession.view=translatedCrop(
    {...view,zoom:level},after,bounds,
    x-(x-before.x)*after.w/before.w,y-(y-before.y)*after.h/before.h
  );
  renderCrop();
}

function panCrop(view,placement,dx,dy) {
  cropSession.view=translatedCrop(view,placement,cropSession.bounds,placement.x+dx,placement.y+dy);
  renderCrop();
}

function trimFrame(corner,dx,dy) {
  const {bounds,view}=cropSession;
  const horizontal=corner.endsWith('e')?1:-1;
  const vertical=corner.startsWith('s')?1:-1;
  const projection=(dx*horizontal*bounds.w+dy*vertical*bounds.h)/
    (bounds.w*bounds.w+bounds.h*bounds.h);
  const scale=clamp(1+projection,Math.max(view.zoom/maxPhotoZoom,Math.min(1,28/Math.min(bounds.w,bounds.h))),1);
  const w=bounds.w*scale,h=bounds.h*scale;
  return {
    x:bounds.x+(horizontal<0?bounds.w-w:0),
    y:bounds.y+(vertical<0?bounds.h-h:0),w,h
  };
}

function applyTrim(trimmed) {
  const {bounds,view,image}=cropSession;
  if (Math.abs(trimmed.w-bounds.w)<.5) { renderCrop(); return; }
  const before=photoPlacement(image,bounds,view);
  const next={...view,zoom:clamp(view.zoom*bounds.w/trimmed.w,1,maxPhotoZoom)};
  const after=photoPlacement(image,bounds,next);
  const u=(trimmed.x+trimmed.w/2-before.x)/before.w;
  const v=(trimmed.y+trimmed.h/2-before.y)/before.h;
  cropSession.view=translatedCrop(next,after,bounds,
    bounds.x+bounds.w/2-u*after.w,bounds.y+bounds.h/2-v*after.h);
  renderCrop();
}

cropStage.addEventListener('pointerdown',event=>{
  if (!cropSession || !event.isPrimary || event.button!==0 || !event.target.closest('.crop-frame')) return;
  event.preventDefault();
  const {bounds,view,image}=cropSession;
  const corner=event.target.closest('[data-corner]')?.dataset.corner;
  cropSession.gesture={
    pointer:event.pointerId,x:event.clientX,y:event.clientY,corner,
    view:{...view},placement:photoPlacement(image,bounds,view)
  };
  cropStage.dataset.gesture=corner?'trim':'pan';
  cropStage.setPointerCapture(event.pointerId);
});

cropStage.addEventListener('pointermove',event=>{
  const gesture=cropSession?.gesture;
  if (!gesture || event.pointerId!==gesture.pointer) return;
  const dx=event.clientX-gesture.x,dy=event.clientY-gesture.y;
  if (gesture.corner) {
    gesture.trimmed=trimFrame(gesture.corner,dx,dy);
    renderCrop();
  } else panCrop(gesture.view,gesture.placement,dx,dy);
});

function finishCropGesture(event,cancel) {
  const gesture=cropSession?.gesture;
  if (!gesture || event.pointerId!==gesture.pointer) return;
  cropSession.gesture=null;
  delete cropStage.dataset.gesture;
  if (cancel) cropSession.view=gesture.view;
  if (!cancel && gesture.trimmed) applyTrim(gesture.trimmed);
  else renderCrop();
}

cropStage.addEventListener('pointerup',event=>finishCropGesture(event,false));
cropStage.addEventListener('pointercancel',event=>finishCropGesture(event,true));
cropStage.addEventListener('lostpointercapture',event=>finishCropGesture(event,true));

cropStage.addEventListener('wheel',event=>{
  if (!cropSession || cropSession.gesture || !event.target.closest('.crop-frame')) return;
  event.preventDefault();
  const rect=cropStage.getBoundingClientRect();
  const factor=event.deltaMode===1?18:event.deltaMode===2?160:1;
  zoomCrop(cropSession.view.zoom*Math.exp(clamp(-event.deltaY*factor*.002,-.4,.4)),
    event.clientX-rect.left,event.clientY-rect.top);
},{passive:false});

cropFrame.addEventListener('keydown',event=>{
  if (!cropSession) return;
  const delta={ArrowLeft:[-1,0],ArrowRight:[1,0],ArrowUp:[0,-1],ArrowDown:[0,1]}[event.key];
  if (!delta) return;
  event.preventDefault();
  const {view,image,bounds}=cropSession;
  const amount=event.shiftKey?18:5;
  const [dx,dy]=delta.map(value=>value*amount);
  const corner=event.target.closest('[data-corner]')?.dataset.corner;
  if (corner) {
    const inward=(corner.endsWith('e')?-dx:dx)+(corner.startsWith('s')?-dy:dy)>0;
    if (inward) applyTrim(trimFrame(corner,dx,dy));
    else zoomCrop(view.zoom/1.04);
  } else panCrop(view,photoPlacement(image,bounds,view),dx,dy);
});

cropDialog.addEventListener('click',event=>{
  const action=event.target.closest('[data-crop]')?.dataset.crop;
  if (!cropSession || !action) return;
  const {view,fallback}=cropSession;
  switch (action) {
    case 'cancel': closeCrop(); return;
    case 'apply': closeCrop(true); return;
    case 'plus': zoomCrop(view.zoom*1.17); return;
    case 'minus': zoomCrop(view.zoom/1.17); return;
    case 'center': cropSession.view={...view,x:50,y:50}; break;
    case 'reset': cropSession.view={...fallback}; break;
    case 'cover': case 'contain': cropSession.view={fit:action,zoom:1,x:50,y:50}; break;
  }
  renderCrop();
});

cropDialog.addEventListener('cancel',event=>{
  event.preventDefault();
  closeCrop();
});
new ResizeObserver(measureCrop).observe(cropStage);

async function init() {
  await Promise.all([restoreImages(),document.fonts.load('750 24px Geist').catch(()=>{})]);
  renderChrome();
  refresh();
  const url=new URL(location);
  if (url.searchParams.has('v')) {
    url.searchParams.delete('v');
    try { window.history.replaceState(null,'',url); } catch {}
  }
}
void init();
