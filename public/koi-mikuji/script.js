// ===== 恋みくじ ロジック =====
// 1日1回の判定はブラウザの localStorage に保存しています。
// リセットしたい時: localStorage.removeItem("koimikuji:lastDraw")

const STORAGE_KEY = "koimikuji:lastDraw";

// 運勢データ（ここを編集すれば文言・確率・ラッキー要素を変更できます）
const FORTUNES=[
  {key:"超大吉",icon:"daikichi",accent:"#ff2e93",soft:"#ffd0e6",weight:8,catch:"今日、恋が動く日。",
   no:"一",lines:["今日、","恋が動く日。"],
   body:"好きな人との距離が一気に縮まりそう。なにげない一言が、相手の心に残る予感。LINEは待つより送った方が吉。\"会いたい\"より、\"今日こんなの見つけた\"みたいな自然な会話が◎",
   stats:[["出会い運",5],["LINE運",5],["駆け引き運",4]],lucky:[["ラッキーアイテム","ピンク系リップ"],["ラッキーワード","「ねえ聞いて」"]]},
  {key:"中吉",icon:"chukichi",accent:"#ff7eb6",soft:"#ffdcec",weight:22,catch:"ゆっくり育つ恋の流れ。",
   no:"七",lines:["ゆっくり育つ","恋の流れ。"],
   body:"今は\"追う\"より、\"安心感\"を作る時期。焦るほど空回りしやすいけど、自然体のあなたに惹かれる人がいる。今日は返信速度を気にしすぎないこと。",
   stats:[["出会い運",3],["LINE運",3],["恋の進展",4]],lucky:[["ラッキー行動","夜の散歩"],["ラッキーアイテム","イヤホン"]]},
  {key:"小吉",icon:"shokichi",accent:"#3fb6e6",soft:"#cdeefc",weight:24,catch:"実はモテ期の入口かも。",
   no:"十二",lines:["実はモテ期の","入口かも。"],
   body:"今はまだ気づいてないだけで、あなたを気にしてる人が近くにいる可能性あり。SNSの投稿やストーリー更新が恋のきっかけになる予感。",
   stats:[["出会い運",4],["LINE運",2],["片思い運",4]],lucky:[["ラッキーアイテム","コンパクトミラー"],["ラッキータイム","22:00"]]},
  {key:"末吉",icon:"suekichi",accent:"#b97bf0",soft:"#e7d6fb",weight:23,catch:"考えすぎ注意報。",
   no:"二十",lines:["考えすぎ","注意報。"],
   body:"相手の態度を深読みしすぎると苦しくなりそう。\"嫌われたかも\"と思った時ほど、実は何も起きてないことが多い。今日は恋より自分を甘やかす日に◎",
   stats:[["出会い運",2],["LINE運",2],["恋愛メンタル",1]],lucky:[["ラッキー行動","甘いものを食べる"],["ラッキーアイテム","もこもこ系"]]},
  {key:"凶",icon:"kyo",accent:"#7f95c4",soft:"#d6deef",weight:20,catch:"追いLINE、今日は我慢。",
   no:"十五",lines:["追いLINE、","今日は我慢。"],
   body:"不安から動くと、あとで自分がしんどくなる日。今日は\"恋愛\"より\"自分の機嫌\"を優先すると運気回復。でも安心して。この恋が終わるサインじゃなく、心を休ませる日。",
   stats:[["出会い運",1],["LINE運",1],["空回り注意",5]],lucky:[["ラッキー行動","早寝"],["ラッキーアイテム","あったかい飲み物"]]}
];
// 超激レア（低確率で出る特別枠）
const RARE={key:"超激レア",icon:"rare",accent:"#ff2e93",soft:"#ffd0e6",rare:true,catch:"運命の恋、接近中。",
   no:"八十八",lines:["運命の恋、","接近中。"],
   body:"3日以内に恋が動く可能性。偶然の再会・急なDM・思いがけない連絡に注目して。今までの流れがぜんぶ伏線だったみたいに、一気に物語が動き出すかも。",
   stats:[["出会い運",5],["LINE運",5],["運命力",5]],lucky:[["ラッキーアイテム","運命の赤い糸"],["ラッキーワード","「久しぶり」"]]};
const RARE_RATE=0.03; // 超激レアが出る確率（0〜1）

const LOVE_TYPES=["犬系MAX","猫モード発動中","メンヘラ化注意","塩対応期","愛重めモード","駆け引き封印DAY"];
const LINE_LUCK=["既読爆速デー","返信3時間以内なら脈あり","深夜LINE吉","今送ると空回り率高め","スタンプが救世主"];
const HONNE=["もっと話したい","気になってるけど様子見","あなたから来てほしい","今は余裕ないだけ"];
const AISHO=["犬系のすなおな子","余裕のある年上","幼なじみ系の安心感","クールな塩対応タイプ","よく笑う甘え上手","マイペースな猫系"];
const HITOKOTO=["今日のあなた、いつもよりかわいいよ","あせらなくて大丈夫、ちゃんとモテてるから","自分を大事にできる子がいちばん愛される","深呼吸して、今日のあなたは最強だよ","恋も自分も、まるっと楽しんじゃお〜"];
const LUCKY_NUMBERS=[3,7,11,14,22,27,33,42,55,77,88,99];
const LUCKY_COLORS=[
  {name:"ピンク",hex:"#ff6eb4"},
  {name:"コーラル",hex:"#ff8a80"},
  {name:"ローズ",hex:"#e91e8c"},
  {name:"ラベンダー",hex:"#b97bf0"},
  {name:"水色",hex:"#5ec5e8"},
  {name:"ミント",hex:"#6ee7c8"},
  {name:"レモン",hex:"#ffd84a"},
  {name:"ホワイト",hex:"#fff5f8"}
];

function todayKey(){const d=new Date();return d.getFullYear()+"-"+(d.getMonth()+1)+"-"+d.getDate();}
function rnd(a){return a[Math.floor(Math.random()*a.length)];}
function weighted(){let t=FORTUNES.reduce((s,f)=>s+f.weight,0),r=Math.random()*t;
  for(const f of FORTUNES){if(r<f.weight)return f;r-=f.weight;}return FORTUNES[0];}
function buildDraw(){
  const b=(Math.random()<RARE_RATE)?RARE:weighted();
  const color=rnd(LUCKY_COLORS);
  return{key:b.key,icon:b.icon,accent:b.accent,soft:b.soft,rare:!!b.rare,catch:b.catch,body:b.body,stats:b.stats,lucky:b.lucky,
    luckyNumber:rnd(LUCKY_NUMBERS),luckyColor:color.name,luckyColorHex:color.hex,
    loveType:rnd(LOVE_TYPES),lineLuck:rnd(LINE_LUCK),honne:rnd(HONNE),aisho:rnd(AISHO),hitokoto:rnd(HITOKOTO),date:todayKey()};
}
function starHTML(n){return '<span class="f">'+"★".repeat(n)+'</span><span class="e">'+"☆".repeat(5-n)+'</span>';}
function luckyColorHTML(name,hex){
  return '<span class="lucky-color"><span class="lucky-color__swatch" style="background:'+hex+'"></span>'+name+'</span>';
}
function buildLuckyItems(d){
  const color={name:d.luckyColor||"ピンク",hex:d.luckyColorHex||"#ff6eb4"};
  const number=d.luckyNumber??rnd(LUCKY_NUMBERS);
  const itemEntry=d.lucky.find(l=>l[0]==="ラッキーアイテム")||["ラッキーアイテム","おまもりストラップ"];
  const otherEntries=d.lucky.filter(l=>l[0]!=="ラッキーアイテム"&&l[0]!=="ラッキーカラー");
  const items=[...otherEntries];
  items.push(["ラッキーナンバー",String(number)]);
  items.push(itemEntry);
  items.push(["ラッキーカラー",luckyColorHTML(color.name,color.hex)]);
  return items;
}

let petalsMade=false;
function startSakura(){
  const layer=document.getElementById("sakura");
  if(!petalsMade){
    const cols=["#ffd9e8","#ffc0db","#ffb0d0","#ffe6f0"];
    for(let i=0;i<30;i++){
      const p=document.createElement("span");p.className="petal";
      const s=8+Math.random()*9;
      p.style.left=(Math.random()*100)+"%";
      p.style.width=s+"px";p.style.height=(s*0.82)+"px";
      p.style.background=cols[i%cols.length];
      p.style.animationDuration=(7+Math.random()*7)+"s";
      p.style.animationDelay=(-Math.random()*12)+"s";
      p.style.setProperty("--sway",(Math.random()*60-30)+"px");
      layer.appendChild(p);
    }
    petalsMade=true;
  }
  layer.classList.add("on");
}

// おみくじ札風のキャッチ（番号・改行位置は運勢データの no / lines）
function renderCatch(d){
  const src=[...FORTUNES,RARE].find(f=>f.key===d.key)||{};
  const lines=src.lines||d.catch.split(/(?<=、)/);
  const el=document.getElementById("catch");
  el.setAttribute("aria-label",d.catch);
  el.innerHTML=
    '<div class="omikuji-slip" aria-hidden="true">'+
      '<div class="omikuji-head">'+
        '<span class="omikuji-brand">♡ 恋みくじ</span>'+
        '<span class="omikuji-rank">'+d.key+'</span>'+
        '<span class="omikuji-no">第'+(src.no||"一")+'番</span>'+
      '</div>'+
      '<div class="omikuji-body">'+
        '<p class="omikuji-text">'+lines.map(l=>'<span>'+l+'</span>').join("")+'</p>'+
        '<span class="omikuji-site">koitype.com</span>'+
      '</div>'+
    '</div>';
}

function render(d){
  const root=document.documentElement.style;
  root.setProperty("--accent",d.accent);root.setProperty("--accent-soft",d.soft);
  const res=document.getElementById("result");
  res.classList.toggle("rare",d.rare);
  document.getElementById("ribbon").innerHTML=d.rare?"✦ 超激レア出ちゃった ✦":"今日のあなたの恋愛運は…♡";
  renderCatch(d);
  document.getElementById("body").textContent=d.body;
  document.getElementById("stats").innerHTML=d.stats.map(s=>'<div class="stat"><span class="lab">'+s[0]+'</span><span class="stars">'+starHTML(s[1])+'</span></div>').join("");
  document.getElementById("chips").innerHTML=
    '<div class="chip"><span class="tag">今日の恋愛タイプ</span><span class="val">'+d.loveType+'</span></div>'+
    '<div class="chip"><span class="tag">今日のLINE運</span><span class="val">'+d.lineLuck+'</span></div>'+
    '<div class="chip"><span class="tag">相性がいいタイプ</span><span class="val">'+d.aisho+'</span></div>';
  document.getElementById("honne").innerHTML='<span class="tag">♡ 相手の本音 ♡</span><span class="val">「'+d.honne+'」</span>';
  document.getElementById("lucky").innerHTML=buildLuckyItems(d).map(l=>'<div class="item"><div class="k">'+l[0]+'</div><div class="v">'+l[1]+'</div></div>').join("");
  document.getElementById("hitokoto").innerHTML='<span class="mk">✧</span> '+d.hitokoto+' <span class="mk">✧</span>';
  const nx=new Date();nx.setDate(nx.getDate()+1);
  document.getElementById("nextDate").textContent="つぎは "+(nx.getMonth()+1)+"月"+nx.getDate()+"日 から";
  res.classList.add("show");
  prepareShareImage(d);
  startSakura();
}

const loadingEl=document.getElementById("loading");
const fudaArea=document.getElementById("fudaArea");
const fudaFan=document.getElementById("fudaFan");
const flip=document.getElementById("flip");
let drawing=false;

function makeFuda(){
  for(let i=0;i<10;i++){
    const b=document.createElement("button");
    b.className="fuda";b.setAttribute("aria-label","恋みくじを引く");
    b.innerHTML='<svg class="bow" viewBox="0 0 32 20" aria-hidden="true"><path d="M16 8C12 3 5 1 3.5 4.5S7 12 16 8Z"/><path d="M16 8C20 3 27 1 28.5 4.5S25 12 16 8Z"/><path d="M15 9 10 18M17 9l5 9"/><circle cx="16" cy="8" r="1.6"/></svg><span class="txt">恋みくじ</span>';
    b.addEventListener("click",onPick);
    fudaFan.appendChild(b);
  }
}
function onPick(){
  if(drawing)return;drawing=true;
  const d=buildDraw();
  document.documentElement.style.setProperty("--accent",d.accent);
  [...fudaFan.children].forEach((c,i)=>setTimeout(()=>c.classList.add("scatter"),i*25));
  try{localStorage.setItem(STORAGE_KEY,JSON.stringify(d));}catch(e){}
  setTimeout(()=>{flip.classList.add("on");
    requestAnimationFrame(()=>flip.classList.add("spin"));},260);
  setTimeout(()=>{
    flip.classList.remove("on");
    fudaArea.classList.add("hidden");
    render(d);
  },1500);
}

function init(){
  let saved=null;
  try{const raw=localStorage.getItem(STORAGE_KEY);if(raw)saved=JSON.parse(raw);}catch(e){saved=null;}
  loadingEl.classList.add("hidden");
  if(saved&&saved.date===todayKey()){
    render(saved);
  }else{
    makeFuda();fudaArea.classList.remove("hidden");
  }
}
init();

document.getElementById("shuffleBtn")?.addEventListener("click",function(){
  if(drawing)return;
  const btn=this;
  btn.classList.add("spin");
  btn.disabled=true;
  [...fudaFan.children].forEach(c=>c.classList.add("scatter"));
  setTimeout(()=>{
    fudaFan.innerHTML="";
    makeFuda();
    btn.classList.remove("spin");
    btn.disabled=false;
  },600);
});

// シェア（X・LINE・Instagram・リンクコピー）
// X/LINE は結果ごとのシェアページ /koi-mikuji/r/<icon> を渡し、リンクカードに結果の札（OG画像）を出す。
// Instagram はリンクカードが出ないため、札の画像そのものを共有シートで渡す。
// render() はこの節より先に実行されるので、ここの状態は var（巻き上げ）で持ち、URL は関数で作る。
var shareImage=null,toastTimer;
function topUrl(){return location.origin+"/koi-mikuji";}
function savedDraw(){
  try{return JSON.parse(localStorage.getItem(STORAGE_KEY));}catch(e){return null;}
}
function resultUrl(d){
  return d&&d.icon?topUrl()+"/r/"+d.icon:topUrl();
}
// 共有シートはクリック直後に同期的に呼ばないと弾かれる端末があるため、画像は結果表示時に先読みする
function prepareShareImage(d){
  shareImage=null;
  if(!d||!d.icon||!navigator.canShare)return;
  fetch(topUrl()+"/r/"+d.icon+"/opengraph-image")
    .then(r=>r.ok?r.blob():Promise.reject())
    .then(b=>{
      const f=new File([b],"koimikuji-"+d.icon+".png",{type:"image/png"});
      if(navigator.canShare({files:[f]}))shareImage=f;
    })
    .catch(()=>{});
}
function showToast(msg){
  const t=document.getElementById("toast");
  t.textContent=msg;t.classList.remove("hidden");
  clearTimeout(toastTimer);toastTimer=setTimeout(()=>t.classList.add("hidden"),3000);
}
async function copyText(text){
  try{await navigator.clipboard.writeText(text);return true;}catch(e){}
  // Clipboard API が使えない・拒否された環境向けのフォールバック
  const el=document.createElement("textarea");
  el.value=text;el.setAttribute("readonly","");el.style.cssText="position:fixed;top:0;left:0;opacity:0;pointer-events:none";
  document.body.appendChild(el);el.select();el.setSelectionRange(0,text.length);
  let ok=false;try{ok=document.execCommand("copy");}catch(e){}
  el.remove();return ok;
}
function shareText(d){
  const head=d?"今日の恋愛運は「"+d.key+"」でした♡\n"+d.catch+"\n":"今日の恋愛運を占ってみた♡\n";
  return head+"#恋みくじ #恋愛占い #Koitype";
}
function shareInstagram(d,text,url){
  const caption=text+"\n"+url;
  if(shareImage){
    copyText(caption);
    navigator.share({files:[shareImage],text:caption})
      .then(()=>{},e=>{if(e&&e.name!=="AbortError")showToast("共有できませんでした");});
    return;
  }
  // PCなど画像の共有に対応していない環境：文章とURLをコピー
  copyText(caption).then(ok=>showToast(ok?"コピーしました！ストーリーに貼り付けてね":"コピーに失敗しました"));
}
document.querySelectorAll("[data-share]").forEach(b=>b.addEventListener("click",()=>{
  const d=savedDraw(),text=shareText(d),url=resultUrl(d);
  switch(b.dataset.share){
    case "x":
      window.open("https://twitter.com/intent/tweet?text="+encodeURIComponent(text)+"&url="+encodeURIComponent(url));break;
    case "line":
      window.open("https://social-plugins.line.me/lineit/share?url="+encodeURIComponent(url));break;
    case "instagram":
      shareInstagram(d,text,url);break;
    case "copy":
      copyText(topUrl()).then(ok=>showToast(ok?"リンクをコピーしました":"コピーに失敗しました"));break;
  }
}));
