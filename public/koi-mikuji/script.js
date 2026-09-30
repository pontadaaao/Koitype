// ===== 恋みくじ ロジック =====
// 1日1回の判定はブラウザの localStorage に保存しています。
// リセットしたい時: localStorage.removeItem("koimikuji:lastDraw")

const STORAGE_KEY = "koimikuji:lastDraw";
const PROFILE_KEY = "koimikuji:profile";

// 運勢データ（ここを編集すれば文言・確率・ラッキー要素を変更できます）
// body は関係性ごと（REL_KEYS）。{p} は相手の呼び方（partnerWord）に置き換わります。
// stats は運勢ステータスのハートの数（ラベルは関係性ごとの REL.stats）。
// lucky の "ラッキーアイテム" は {f:女性,m:男性,o:その他} で自分の性別ごとに出し分けできます。
const FORTUNES=[
  {key:"超大吉",icon:"daikichi",accent:"#ff2e93",soft:"#ffd0e6",weight:8,catch:"今日、恋が動く日。",
   no:"一",lines:["今日、","恋が動く日。"],
   body:{
     crush:"{p}との距離が一気に縮まりそう。なにげない一言が、{p}の心に残る予感。LINEは待つより送った方が吉。\"会いたい\"より、\"今日こんなの見つけた\"みたいな自然な会話が◎",
     interest:"気になる{p}と、ぐっと近づけるチャンスの日。目が合ったら笑顔でひと言、それだけで印象が大きく変わりそう。共通の話題を見つけたら、迷わず話しかけてみて。",
     lover:"{p}とのラブラブ度が最高潮。いつもより素直な気持ちが伝わりやすい日だから、\"ありがとう\"や\"好き\"を言葉にしてみて。ふたりの次の予定を決めるのにもぴったり。",
     married:"{p}との絆がいっそう深まる日。なにげない会話の中に、あらためて惹かれる瞬間がありそう。\"いつもありがとう\"をひと言添えるだけで、家の空気がぐっとあたたかくなる◎",
     ex:"{p}との関係に、うれしい変化の予感。思い出話や近況報告から、自然に会話が弾みそう。連絡するなら今日が吉。昔のことは責めずに、\"今のあなた\"を見せるのがコツ。"},
   stats:[5,5,4],lucky:[["ラッキーアイテム",{f:"ピンク系リップ",m:"爽やか系の香水",o:"お気に入りの香り"}],["ラッキーワード","「ねえ聞いて」"]]},
  {key:"中吉",icon:"chukichi",accent:"#ff7eb6",soft:"#ffdcec",weight:22,catch:"ゆっくり育つ恋の流れ。",
   no:"七",lines:["ゆっくり育つ","恋の流れ。"],
   body:{
     crush:"今は\"追う\"より、{p}に\"安心感\"をあげる時期。焦るほど空回りしやすいけど、自然体のあなたにちゃんと惹かれてる。今日は返信速度を気にしすぎないこと。",
     interest:"{p}との関係は、ゆっくり育てるほど実を結ぶタイプ。いきなり距離を詰めるより、あいさつや小さな会話を重ねるのが近道。\"また話したいな\"と思わせたら大成功。",
     lover:"{p}との関係は、穏やかに深まっていく流れ。特別なことをしなくても、一緒にいる時間そのものが愛を育ててる。今日は小さな\"おつかれさま\"が効きそう。",
     married:"大きなイベントはなくても、{p}との暮らしが静かに満たされていく日。いつもの食卓、いつもの会話が幸せの土台。今日は相手の話を最後まで聞いてあげて◎",
     ex:"{p}との関係は、焦らず時間をかけるのが吉。今すぐ答えを求めるより、自分の毎日を楽しむ姿がいちばんの近道に。ふとした時に思い出してもらえる存在を目指して。"},
   stats:[3,3,4],lucky:[["ラッキー行動","夜の散歩"],["ラッキーアイテム","イヤホン"]]},
  {key:"小吉",icon:"shokichi",accent:"#3fb6e6",soft:"#cdeefc",weight:24,catch:"実はモテ期の入口かも。",
   no:"十二",lines:["実はモテ期の","入口かも。"],
   body:{
     crush:"今はまだ気づいてないだけで、{p}もあなたを気にしている可能性あり。SNSの投稿やストーリー更新が、恋のきっかけになる予感。",
     interest:"気になる{p}はもちろん、ほかにもあなたを見ている人がいるかも。視野を少し広げると、恋のチャンスが増える日。SNSのストーリー更新がきっかけに。",
     lover:"今日のあなたは、いつもより魅力が増してる日。{p}も改めて\"やっぱりいいな\"と感じていそう。ちょっとおしゃれして会うと、ときめきが復活する予感。",
     married:"今日のあなたは、いつもより輝いて見える日。{p}が思わず見とれてしまうかも。少しだけ身だしなみを整えるだけで、新婚気分がよみがえりそう。",
     ex:"{p}があなたのSNSをこっそりチェックしている可能性あり。今は充実した毎日を発信するのが吉。一方で、新しい出会いの扉も開き始めているかも。"},
   stats:[4,2,4],lucky:[["ラッキーアイテム",{f:"コンパクトミラー",m:"ハンカチ",o:"コンパクトミラー"}],["ラッキータイム","22:00"]]},
  {key:"末吉",icon:"suekichi",accent:"#b97bf0",soft:"#e7d6fb",weight:23,catch:"考えすぎ注意報。",
   no:"二十",lines:["考えすぎ","注意報。"],
   body:{
     crush:"{p}の態度を深読みしすぎると苦しくなりそう。\"嫌われたかも\"と思った時ほど、実は何も起きてないことが多い。今日は恋より自分を甘やかす日に◎",
     interest:"{p}のちょっとした反応に一喜一憂しがちな日。まだ関係は始まったばかりだから、白黒つけなくて大丈夫。今日は自分の好きなことで心を満たして◎",
     lover:"{p}の返信の遅さや態度を深読みしすぎると苦しくなりそう。不安な時ほど、実は何も起きていないことが多い。今日は責めるより、自分を甘やかす日に◎",
     married:"{p}のなにげないひと言が引っかかりやすい日。でもそれはたぶん、お互いちょっと疲れているだけ。今日は完璧を目指さず、家事も気持ちもゆるめに過ごして◎",
     ex:"{p}の近況や言葉の意味を深読みしすぎると、心が疲れてしまいそう。過去の答え合わせより、今の自分を大切にする日。甘いものでも食べてひと休みを◎"},
   stats:[2,2,1],lucky:[["ラッキー行動","甘いものを食べる"],["ラッキーアイテム","もこもこ系"]]},
  {key:"凶",icon:"kyo",accent:"#7f95c4",soft:"#d6deef",weight:20,catch:"追いLINE、今日は我慢。",
   no:"十五",lines:["追いLINE、","今日は我慢。"],
   body:{
     crush:"不安から動くと、あとで自分がしんどくなる日。今日は\"恋愛\"より\"自分の機嫌\"を優先すると運気回復。でも安心して。{p}との恋が終わるサインじゃなく、心を休ませる日。",
     interest:"{p}に早く近づきたい気持ちが空回りしやすい日。今日は無理にアプローチせず、\"自分の機嫌\"を優先すると運気回復。チャンスはまたすぐにやってくるから安心して。",
     lover:"不安からの追いLINEや問い詰めは、今日は我慢。{p}にも余裕がない日かも。\"自分の機嫌\"を優先すると運気回復。ふたりの関係が悪いサインじゃなく、心を休ませる日。",
     married:"ちょっとしたすれ違いが起きやすい日。{p}に言いたいことがあっても、今日はひと晩寝かせてから伝えるのが吉。早めに休んで、明日の笑顔を大切に。",
     ex:"寂しさから{p}に連絡したくなっても、今日はぐっと我慢。勢いで送ったメッセージは後悔のもとに。今は\"自分の機嫌\"を優先して、心を休ませる日。"},
   stats:[1,1,2],lucky:[["ラッキー行動","早寝"],["ラッキーアイテム","あったかい飲み物"]]}
];
// 超激レア（低確率で出る特別枠）
const RARE={key:"超激レア",icon:"rare",accent:"#ff2e93",soft:"#ffd0e6",rare:true,catch:"運命の恋、接近中。",
   no:"八十八",lines:["運命の恋、","接近中。"],
   body:{
     crush:"3日以内に{p}との恋が動く可能性。偶然の出会い・急なDM・思いがけない連絡に注目して。今までの流れがぜんぶ伏線だったみたいに、一気に物語が動き出すかも。",
     interest:"{p}との間に、運命的なつながりの予感。3日以内に偶然のきっかけが訪れるかも。今までの流れがぜんぶ伏線だったみたいに、一気に物語が動き出しそう。",
     lover:"{p}こそ運命の相手かも。3日以内に、ふたりの未来につながるうれしい出来事がありそう。将来の話をするなら今がチャンス。",
     married:"{p}と出会ったのは、やっぱり運命だった——そう感じる出来事が起こりそう。思い出の場所や写真を一緒に見返すと、ふたりの絆がさらに強くなる予感。",
     ex:"{p}との縁が、もう一度つながる可能性。3日以内の偶然の再会や、急な連絡に注目して。今までの時間がぜんぶ伏線だったみたいに、物語が動き出すかも。"},
   stats:[5,5,5],lucky:[["ラッキーアイテム","運命の赤い糸"],["ラッキーワード","「久しぶり」"]]};
const RARE_RATE=0.03; // 超激レアが出る確率（0〜1）

// 設定画面の選択肢
const GENDERS=[["f","女性"],["m","男性"],["o","その他"]];
const REL_KEYS=["lover","crush","married","ex","interest"];
// 関係性ごとの設定。partner は相手の呼び方（相手の性別 f/m/o ごと）、stats は運勢ステータスのラベル、
// line は2つ目のチップ、pick は3つ目のチップ、honne は「相手の本音」の候補
const REL={
  lover:{label:"恋人あり",partner:{f:"彼女",m:"彼",o:"恋人"},stats:["ラブラブ度","LINE運","絆の深まり"],
    line:["今日のLINE運",["既読爆速デー","夜の電話が吉","スタンプ多めで甘えて◎","返信は急かさないのが吉","写真付きLINEが効く"]],
    pick:["おすすめデート",["カフェめぐり","おうち映画","夜景ドライブ","水族館","散歩しながらテイクアウト"]],
    honne:["今日も会いたいな","本当はもっと甘えたい","いつもありがとうって思ってる","最近忙しくてごめんね"]},
  crush:{label:"片思い",partner:{f:"彼女",m:"彼",o:"あの人"},stats:["片思い運","LINE運","恋の進展"],
    line:["今日のLINE運",["既読爆速デー","返信3時間以内なら脈あり","深夜LINE吉","今送ると空回り率高め","スタンプが救世主"]],
    pick:["効くアプローチ",["名前を呼んで話しかける","ちょっとした相談をする","笑顔であいさつ","共通の話題をふる","ストーリーにリアクション"]],
    honne:["もっと話したい","気になってるけど様子見","あなたから来てほしい","今は余裕ないだけ"]},
  married:{label:"夫婦",partner:{f:"奥さん",m:"旦那さん",o:"パートナー"},stats:["夫婦円満運","会話運","思いやり度"],
    line:["今日の会話運",["\"ありがとう\"が倍返しの日","夕飯どきの会話が吉","聞き役に回ると◎","昔話で盛り上がる","短いLINEがうれしい日"]],
    pick:["ふたりの過ごし方",["一緒に料理","近所をのんびり散歩","思い出の写真を見返す","ちょっといいお惣菜で晩酌","早寝して朝カフェ"]],
    honne:["いつもありがとう、ちゃんと伝えたい","たまにはふたりで出かけたい","一緒にいると安心する","実は今でも大好き"]},
  ex:{label:"元恋人",partner:{f:"元カノ",m:"元カレ",o:"元恋人"},stats:["復縁運","連絡運","心の整理度"],
    line:["今日の連絡運",["今日は見るだけが吉","近況報告なら自然に届く","夜の連絡は控えめに","誕生日や記念日がきっかけに","共通の友達経由が吉"]],
    pick:["今日のおすすめ行動",["新しい趣味を始める","髪型を変えてみる","友達とごはん","部屋の模様替え","近況をさりげなく投稿"]],
    honne:["元気にしてるかな","あの頃が懐かしい","連絡したいけど勇気が出ない","今のあなた、ちょっと気になる"]},
  interest:{label:"気になる人",partner:{f:"彼女",m:"彼",o:"あの人"},stats:["出会い運","LINE運","急接近度"],
    line:["今日のLINE運",["最初のひと言が吉","質問系LINEが盛り上がる","スタンプが救世主","朝のあいさつLINEが◎","今日は既読だけでもOK"]],
    pick:["距離が縮まるきっかけ",["趣味の話","おすすめを聞いてみる","目が合ったら笑顔","ちょっとした差し入れ","SNSをフォロー"]],
    honne:["話しかけてくれたらうれしい","なんとなく目で追ってる","もっとあなたのことを知りたい","印象、けっこういいかも"]}
};

const LOVE_TYPES=["犬系MAX","猫モード発動中","甘えたがりモード","塩対応期","愛重めモード","駆け引き封印DAY"];
// ひとこと（自分の性別ごと）
const HITOKOTO={
  f:["今日のあなた、いつもよりかわいいよ","あせらなくて大丈夫、ちゃんとモテてるから","自分を大事にできる子がいちばん愛される","深呼吸して、今日のあなたは最強だよ","恋も自分も、まるっと楽しんじゃお〜"],
  m:["今日のあなた、いつもよりかっこいいよ","あせらなくて大丈夫、ちゃんと魅力は伝わってる","自分を大事にできる人がいちばん愛される","深呼吸して、今日のあなたは最強だよ","恋も自分も、まるっと楽しんじゃお〜"],
  o:["今日のあなた、いつもより素敵だよ","あせらなくて大丈夫、あなたらしさがいちばんの魅力","自分を大事にできる人がいちばん愛される","深呼吸して、今日のあなたは最強だよ","恋も自分も、まるっと楽しんじゃお〜"]
};
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
function esc(s){return String(s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[c]);}
function weighted(){let t=FORTUNES.reduce((s,f)=>s+f.weight,0),r=Math.random()*t;
  for(const f of FORTUNES){if(r<f.weight)return f;r-=f.weight;}return FORTUNES[0];}
// 設定（ニックネーム・性別・関係性）から結果を組み立てる。表示に必要な文言はすべてここで確定させて保存する
function buildDraw(profile){
  const b=(Math.random()<RARE_RATE)?RARE:weighted();
  const rel=REL[profile.rel]||REL.crush;
  const p=rel.partner[profile.partner]||rel.partner.o;
  const self=HITOKOTO[profile.self]?profile.self:"o";
  const fill=t=>t.replace(/\{p\}/g,p);
  const color=rnd(LUCKY_COLORS);
  return{key:b.key,icon:b.icon,accent:b.accent,soft:b.soft,rare:!!b.rare,catch:b.catch,
    body:fill(b.body[profile.rel]||b.body.crush),
    stats:rel.stats.map((l,i)=>[l,b.stats[i]]),
    lucky:b.lucky.map(l=>[l[0],typeof l[1]==="string"?l[1]:(l[1][self]||l[1].o)]),
    luckyNumber:rnd(LUCKY_NUMBERS),luckyColor:color.name,luckyColorHex:color.hex,
    chips:[["今日の恋愛タイプ",rnd(LOVE_TYPES)],[rel.line[0],rnd(rel.line[1])],[rel.pick[0],rnd(rel.pick[1])]],
    honneLabel:p+"の本音",honne:rnd(rel.honne),
    hitokoto:rnd(HITOKOTO[self]),name:profile.name,date:todayKey()};
}
// 運勢ステータスのハート（5段階）。絵文字化を避けるため文字ではなくSVGで描く
const HEART_SVG='<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 21s-7.5-4.6-9.6-9.2C.9 8.4 3 4.5 6.8 4.5c2.2 0 3.8 1.2 5.2 3 1.4-1.8 3-3 5.2-3 3.8 0 5.9 3.9 4.4 7.3C19.5 16.4 12 21 12 21z"/></svg>';
function heartHTML(n){
  let h="";for(let i=0;i<5;i++)h+='<span class="'+(i<n?"f":"e")+'">'+HEART_SVG+'</span>';
  return h;
}
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
  const who=d.name?esc(d.name)+"さんの":"今日のあなたの";
  res.classList.toggle("rare",d.rare);
  document.getElementById("ribbon").innerHTML=d.rare?"✦ 超激レア出ちゃった ✦":who+(d.name?"今日の":"")+"恋愛運は…♡";
  renderCatch(d);
  document.getElementById("body").textContent=d.body;
  document.getElementById("stats").innerHTML=d.stats.map(s=>'<div class="stat"><span class="lab">'+s[0]+'</span><span class="hearts" role="img" aria-label="5段階中'+s[1]+'">'+heartHTML(s[1])+'</span></div>').join("");
  // 旧形式（設定画面の追加前）の保存データにも対応
  const chips=d.chips||[["今日の恋愛タイプ",d.loveType],["今日のLINE運",d.lineLuck],["相性がいいタイプ",d.aisho]];
  document.getElementById("chips").innerHTML=chips.map(c=>'<div class="chip"><span class="tag">'+c[0]+'</span><span class="val">'+c[1]+'</span></div>').join("");
  document.getElementById("honne").innerHTML='<span class="tag">♡ '+esc(d.honneLabel||"相手の本音")+' ♡</span><span class="val">「'+d.honne+'」</span>';
  document.getElementById("lucky").innerHTML=buildLuckyItems(d).map(l=>'<div class="item"><div class="k">'+l[0]+'</div><div class="v">'+l[1]+'</div></div>').join("");
  document.getElementById("hitokoto").innerHTML='<span class="mk">✧</span> '+(d.name?esc(d.name)+"さん、":"")+d.hitokoto+' <span class="mk">✧</span>';
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
const profileForm=document.getElementById("profileForm");
const drawBtn=document.getElementById("drawBtn");
let drawing=false,picked=null;

// 設定は次回のために保存しておく（リセット: localStorage.removeItem("koimikuji:profile")）
function loadProfile(){
  try{return JSON.parse(localStorage.getItem(PROFILE_KEY))||{};}catch(e){return {};}
}
function readProfile(){
  const f=profileForm.elements;
  return{name:f.nickname.value.trim(),self:f.self.value,partner:f.partner.value,rel:f.rel.value};
}
function profileReady(p){return !!(p.name&&p.self&&p.partner&&REL[p.rel]);}
function updateDrawBtn(){drawBtn.disabled=!(picked&&profileReady(readProfile()));}
function makeOptions(id,name,opts){
  document.getElementById(id).innerHTML=opts.map(o=>
    '<label class="opt"><input type="radio" name="'+name+'" value="'+o[0]+'"><span>'+o[1]+'</span></label>').join("");
}
function initProfileForm(){
  makeOptions("selfOpts","self",GENDERS);
  makeOptions("partnerOpts","partner",GENDERS);
  makeOptions("relOpts","rel",REL_KEYS.map(k=>[k,REL[k].label]));
  const saved=loadProfile(),f=profileForm.elements;
  if(saved.name)f.nickname.value=saved.name;
  ["self","partner","rel"].forEach(n=>{
    const r=profileForm.querySelector('input[name="'+n+'"][value="'+saved[n]+'"]');
    if(r)r.checked=true;
  });
  profileForm.addEventListener("input",updateDrawBtn);
  profileForm.addEventListener("change",updateDrawBtn);
  profileForm.addEventListener("submit",e=>{e.preventDefault();startDraw();});
}

function makeFuda(){
  for(let i=0;i<10;i++){
    const b=document.createElement("button");
    b.type="button";b.className="fuda";b.setAttribute("aria-label","この恋みくじを選ぶ");
    b.innerHTML='<svg class="bow" viewBox="0 0 32 20" aria-hidden="true"><path d="M16 8C12 3 5 1 3.5 4.5S7 12 16 8Z"/><path d="M16 8C20 3 27 1 28.5 4.5S25 12 16 8Z"/><path d="M15 9 10 18M17 9l5 9"/><circle cx="16" cy="8" r="1.6"/></svg><span class="txt">恋みくじ</span>';
    b.addEventListener("click",onPick);
    fudaFan.appendChild(b);
  }
}
// 札を選ぶ → 同じ画面に設定フォームを出す（札は選び直し可）
function onPick(e){
  if(drawing)return;
  const first=!picked;
  if(picked)picked.classList.remove("picked");
  picked=e.currentTarget;picked.classList.add("picked");
  picked.setAttribute("aria-pressed","true");
  fudaFan.classList.add("has-pick");
  profileForm.classList.remove("hidden");
  updateDrawBtn();
  if(first)profileForm.scrollIntoView({behavior:"smooth",block:"start"});
}
function clearPick(){
  picked=null;fudaFan.classList.remove("has-pick");
  profileForm.classList.add("hidden");
  updateDrawBtn();
}
function startDraw(){
  const profile=readProfile();
  if(drawing||!picked||!profileReady(profile))return;
  drawing=true;
  try{localStorage.setItem(PROFILE_KEY,JSON.stringify(profile));}catch(e){}
  const d=buildDraw(profile);
  document.documentElement.style.setProperty("--accent",d.accent);
  window.scrollTo({top:0,behavior:"smooth"});
  profileForm.classList.add("hidden");
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
    initProfileForm();
    makeFuda();fudaArea.classList.remove("hidden");
  }
}
init();

document.getElementById("shuffleBtn")?.addEventListener("click",function(){
  if(drawing)return;
  const btn=this;
  btn.classList.add("spin");
  btn.disabled=true;
  clearPick();
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
