// ===== 恋みくじ ロジック =====
// 1日1回の判定はブラウザの localStorage に保存しています。
// リセットしたい時: localStorage.removeItem("koimikuji:lastDraw")

const STORAGE_KEY = "koimikuji:lastDraw";

const HEART="M50 84 C24 63 12 46 12 31 C12 19 21 11 31 11 C40 11 47 17 50 25 C53 17 60 11 69 11 C79 11 88 19 88 31 C88 46 76 63 50 84 Z";
const ICONS={
  daikichi:`<svg viewBox="0 0 100 100"><g stroke="currentColor" stroke-width="4" stroke-linecap="round"><line x1="50" y1="1" x2="50" y2="11"/><line x1="93" y1="18" x2="85" y2="26"/><line x1="7" y1="18" x2="15" y2="26"/></g><path d="${HEART}" fill="currentColor"/><circle cx="38" cy="34" r="5" fill="#fff" opacity=".85"/></svg>`,
  chukichi:`<svg viewBox="0 0 100 100"><g fill="currentColor"><g transform="rotate(0 50 50)"><path d="M50 50 C43 28 47 12 50 6 C53 12 57 28 50 50 Z"/></g><g transform="rotate(72 50 50)"><path d="M50 50 C43 28 47 12 50 6 C53 12 57 28 50 50 Z"/></g><g transform="rotate(144 50 50)"><path d="M50 50 C43 28 47 12 50 6 C53 12 57 28 50 50 Z"/></g><g transform="rotate(216 50 50)"><path d="M50 50 C43 28 47 12 50 6 C53 12 57 28 50 50 Z"/></g><g transform="rotate(288 50 50)"><path d="M50 50 C43 28 47 12 50 6 C53 12 57 28 50 50 Z"/></g></g><circle cx="50" cy="50" r="8" fill="#fff"/></svg>`,
  shokichi:`<svg viewBox="0 0 100 100"><circle cx="50" cy="54" r="28" fill="currentColor" opacity=".3"/><circle cx="50" cy="54" r="28" fill="none" stroke="currentColor" stroke-width="3"/><circle cx="40" cy="44" r="7" fill="#fff" opacity=".85"/><circle cx="80" cy="28" r="11" fill="currentColor" opacity=".25" stroke="currentColor" stroke-width="2.5"/><circle cx="20" cy="76" r="8" fill="currentColor" opacity=".25" stroke="currentColor" stroke-width="2.5"/></svg>`,
  suekichi:`<svg viewBox="0 0 100 100"><path d="${HEART}" fill="currentColor" opacity=".6"/><circle cx="36" cy="38" r="4.5" fill="#fff" opacity=".85"/><path d="M64 64 C64 58 70 58 70 64 C70 70 67 76 67 76 C67 76 64 70 64 64 Z" fill="#7fa8d6"/></svg>`,
  kyo:`<svg viewBox="0 0 100 100"><path d="${HEART}" fill="currentColor"/><path d="M50 22 L43 44 L56 51 L46 70 L50 84" fill="none" stroke="#fff" stroke-width="5" stroke-linejoin="round" stroke-linecap="round"/></svg>`,
  rare:`<svg viewBox="0 0 100 100"><g fill="none" stroke-width="6" stroke-linecap="round"><path d="M12 74 A38 38 0 0 1 88 74" stroke="#ff5e8a"/><path d="M22 74 A28 28 0 0 1 78 74" stroke="#ffb340"/><path d="M32 74 A18 18 0 0 1 68 74" stroke="#5ec5e8"/></g><path d="M50 92 C38 82 30 74 30 67 C30 61 35 57 41 57 C45 57 48 60 50 64 C52 60 55 57 59 57 C65 57 70 61 70 67 C70 74 62 82 50 92 Z" fill="#ff2e93"/><g stroke="#ffd84a" stroke-width="3" stroke-linecap="round"><line x1="16" y1="20" x2="16" y2="30"/><line x1="11" y1="25" x2="21" y2="25"/><line x1="86" y1="14" x2="86" y2="24"/><line x1="81" y1="19" x2="91" y2="19"/></g></svg>`
};

// 運勢データ（ここを編集すれば文言・確率・ラッキー要素を変更できます）
const FORTUNES=[
  {key:"超大吉",icon:"daikichi",accent:"#ff2e93",soft:"#ffd0e6",weight:8,catch:"今日、恋が動く日。",
   body:"好きな人との距離が一気に縮まりそう。なにげない一言が、相手の心に残る予感。LINEは待つより送った方が吉。\"会いたい\"より、\"今日こんなの見つけた\"みたいな自然な会話が◎",
   stats:[["出会い運",5],["LINE運",5],["駆け引き運",4]],lucky:[["ラッキーアイテム","ピンク系リップ"],["ラッキーワード","「ねえ聞いて」"]]},
  {key:"中吉",icon:"chukichi",accent:"#ff7eb6",soft:"#ffdcec",weight:22,catch:"ゆっくり育つ恋の流れ。",
   body:"今は\"追う\"より、\"安心感\"を作る時期。焦るほど空回りしやすいけど、自然体のあなたに惹かれる人がいる。今日は返信速度を気にしすぎないこと。",
   stats:[["出会い運",3],["LINE運",3],["恋の進展",4]],lucky:[["ラッキー行動","夜の散歩"],["ラッキーアイテム","イヤホン"]]},
  {key:"小吉",icon:"shokichi",accent:"#3fb6e6",soft:"#cdeefc",weight:24,catch:"実はモテ期の入口かも。",
   body:"今はまだ気づいてないだけで、あなたを気にしてる人が近くにいる可能性あり。SNSの投稿やストーリー更新が恋のきっかけになる予感。",
   stats:[["出会い運",4],["LINE運",2],["片思い運",4]],lucky:[["ラッキーカラー","水色"],["ラッキータイム","22:00"]]},
  {key:"末吉",icon:"suekichi",accent:"#b97bf0",soft:"#e7d6fb",weight:23,catch:"考えすぎ注意報。",
   body:"相手の態度を深読みしすぎると苦しくなりそう。\"嫌われたかも\"と思った時ほど、実は何も起きてないことが多い。今日は恋より自分を甘やかす日に◎",
   stats:[["出会い運",2],["LINE運",2],["恋愛メンタル",1]],lucky:[["ラッキー行動","甘いものを食べる"],["ラッキーアイテム","もこもこ系"]]},
  {key:"凶",icon:"kyo",accent:"#7f95c4",soft:"#d6deef",weight:20,catch:"追いLINE、今日は我慢。",
   body:"不安から動くと、あとで自分がしんどくなる日。今日は\"恋愛\"より\"自分の機嫌\"を優先すると運気回復。でも安心して。この恋が終わるサインじゃなく、心を休ませる日。",
   stats:[["出会い運",1],["LINE運",1],["空回り注意",5]],lucky:[["ラッキー行動","早寝"],["ラッキーアイテム","あったかい飲み物"]]}
];
// 超激レア（低確率で出る特別枠）
const RARE={key:"超激レア",icon:"rare",accent:"#ff2e93",soft:"#ffd0e6",rare:true,catch:"運命の恋、接近中。",
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
  const items=d.lucky.filter(l=>l[0]!=="ラッキーカラー");
  items.push(["ラッキーナンバー",String(number)]);
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

function render(d){
  const root=document.documentElement.style;
  root.setProperty("--accent",d.accent);root.setProperty("--accent-soft",d.soft);
  const res=document.getElementById("result");
  res.classList.toggle("rare",d.rare);
  document.getElementById("ribbon").innerHTML=d.rare?"✦ 超激レア出ちゃった ✦":"今日のあなたの恋愛運は…♡";
  document.getElementById("icon").innerHTML=ICONS[d.icon];
  document.getElementById("rank").textContent=d.key;
  document.getElementById("catch").textContent="「"+d.catch+"」";
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
    b.innerHTML='<span class="txt">恋みくじ</span>';
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
