const COMPANY="アシスト株式会社";
const NAV=[["index.html","ホーム"],["news.html","ニュース"],["members.html","選手名鑑"],["stats.html","個人成績"],["ranking.html","ランキング"],["shop.html","グッズ"],["tryout.html","トライアウト"],["contact.html","お問い合わせ"]];
let MEMBERS=[],GAMES=[],RECORD=null,TRYOUT=null;
const STATIC=!!window.STATIC_TRYOUT;
const READY=STATIC?Promise.resolve().then(()=>{TRYOUT=window.STATIC_TRYOUT}):fetch("/api/data").then(r=>r.json()).then(d=>{MEMBERS=d.members;GAMES=d.games;RECORD=d.record;TRYOUT=d.tryout||null;if(d.products&&d.products.length)PRODUCTS=d.products;if(d.news)NEWS=d.news}).catch(()=>{});
const CATS=["すべて","アパレル","バッグ","カード","グラブ","バット","バッティング手袋","雑貨"];
let PRODUCTS=[
{id:1,name:"アシスト 紙コップ（キャプテン）20個セット",price:1500,cat:"雑貨",pop:6,new:9,free:1},
{id:2,name:"アシスト ベースボールキャップ AS-BC01",price:6600,cat:"アパレル",pop:9,new:8},
{id:3,name:"アシスト投手用グローブ AS-GP01",price:45100,cat:"グラブ",pop:5,new:3},
{id:4,name:"アシストファーストミット AS-GF01",price:46200,cat:"グラブ",pop:3,new:2},
{id:5,name:"アシスト内野手用グローブ AS-GI01",price:45100,cat:"グラブ",pop:4,new:1},
{id:6,name:"アシスト外野手用グローブ AS-GO01",price:45100,cat:"グラブ",pop:2,new:4},
{id:7,name:"アシスト プラクティスTシャツ",price:5500,cat:"アパレル",pop:10,new:7},
{id:8,name:"アシスト チャージトップ ASCT01",price:11000,cat:"アパレル",pop:7,new:6},
{id:9,name:"アシスト トートバッグ",price:2800,cat:"バッグ",pop:8,new:5},
{id:10,name:"選手カード 2026 ボックス（20パック）",price:6000,cat:"カード",pop:1,new:10,free:1},
{id:11,name:"アシスト バッティング手袋 AS-BG01",price:3300,cat:"バッティング手袋",pop:4,new:2},
{id:12,name:"アシスト 木製バット AS-BT01",price:18700,cat:"バット",pop:2,new:1}];
let NEWS=[
{d:"2026.10.09",t:"グッズ第二弾の予約を開始しました",b:"キャップとトートバッグを追加。10月末より順次発送します。全国送料無料です。"},
{d:"2026.09.30",t:"シーズン終盤戦のお知らせ",b:"今シーズンの試合結果と個人成績を更新しました。ご声援ありがとうございます。"},
{d:"2026.09.01",t:"協賛企業募集のご案内",b:"来シーズンのユニフォーム・ホームページへの広告掲載をご検討の企業様は、お問い合わせフォームからご連絡ください。"},
{d:"2026.07.20",t:"新メンバー3名が加入しました",b:"投手1名、野手2名が加わりました。選手名鑑で紹介しています。"}];
const yen=n=>"¥"+n.toLocaleString();
const face=m=>`assets/player_${m.id}.jpg`;
const faceFallback=m=>playerIll(m);
/* ---- 野球名鑑ふうイラスト（手描きSVG・人ごとに別の顔） ---- */
function playerSvg(m,bg=true){
 const pk=(arr,k)=>arr[(m.id*k+3)%arr.length];
 const skin=pk(["#f6d3b3","#eab88f","#dba27a","#f9dcc2"],5),hair=pk(["#2a1d17","#4a3226","#1f1f24","#6b4a2f","#3b2a1e"],7),sh=pk(["#ecc19c","#dfa57d","#cf8f68","#efc9a8"],5);
 const gl=m.id%3===0,beard=m.id%5===1,pony=m.id%4===2,mouth=m.id%3,thick=m.id%2?3.4:2.4,brow=m.id%4===0?-2:0;
 const cap=m.id%6===4?"#e9dfc6":"#2a5fd8",brim=m.id%6===4?"#2a5fd8":"#efe3c8";
 const o='stroke="#3a2a20" stroke-width="2" stroke-linejoin="round"';
 const mouths=[`<path d="M116,160 Q129,172 142,160" fill="none" stroke="#7a3a30" stroke-width="3" stroke-linecap="round"/>`,
  `<path d="M114,158 Q129,180 144,158 Z" fill="#8a2f2f" ${o}/><path d="M118,159 Q129,165 140,159 L140,162 Q129,168 118,162Z" fill="#fff"/>`,
  `<path d="M120,162 Q129,166 138,162" fill="none" stroke="#7a3a30" stroke-width="3" stroke-linecap="round"/>`][mouth];
 return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 258 320">${bg?`<rect width="258" height="320" fill="#cdd1dc"/><rect y="236" width="258" height="84" fill="#b9bfcf"/>`:""}
 ${pony?`<path d="M168,108 Q214,108 208,170 Q198,140 172,138Z" fill="${hair}" ${o}/>`:""}
 <path d="M30,320 L30,262 Q36,212 102,198 L129,214 L156,198 Q222,212 228,262 L228,320Z" fill="#3f74ea" ${o}/>
 <path d="M36,248 Q60,214 104,204 M222,248 Q198,214 154,204" fill="none" stroke="#f1e7cf" stroke-width="5"/>
 <rect x="113" y="160" width="32" height="42" rx="8" fill="${sh}" ${o}/>
 <path d="M102,198 Q129,228 156,198 L148,192 Q129,210 110,192Z" fill="#f1e7cf" ${o}/>
 <circle cx="84" cy="130" r="9" fill="${skin}" ${o}/><circle cx="174" cy="130" r="9" fill="${skin}" ${o}/>
 <ellipse cx="129" cy="128" rx="45" ry="50" fill="${skin}" ${o}/>
 ${beard?`<path d="M86,138 Q90,176 129,178 Q168,176 172,138 Q150,160 129,160 Q108,160 86,138Z" fill="rgba(40,30,22,.22)"/>`:""}
 <path d="M84,100 L84,134 L92,132 L94,108Z M174,100 L174,134 L166,132 L164,108Z" fill="${hair}"/>
 <ellipse cx="108" cy="150" rx="8" ry="5" fill="#ff8a7a" opacity=".22"/><ellipse cx="150" cy="150" rx="8" ry="5" fill="#ff8a7a" opacity=".22"/>
 <path d="M100,${124+brow} L121,${121+brow}M137,${121+brow} L158,${124+brow}" stroke="${hair}" stroke-width="${thick}" stroke-linecap="round"/>
 <ellipse cx="111" cy="136" rx="4.4" ry="5.6" fill="#2b1d17"/><ellipse cx="147" cy="136" rx="4.4" ry="5.6" fill="#2b1d17"/>
 <circle cx="112.6" cy="134" r="1.5" fill="#fff"/><circle cx="148.6" cy="134" r="1.5" fill="#fff"/>
 ${gl?`<circle cx="111" cy="136" r="14" fill="rgba(255,255,255,.18)" stroke="#2a2a30" stroke-width="2.4"/><circle cx="147" cy="136" r="14" fill="rgba(255,255,255,.18)" stroke="#2a2a30" stroke-width="2.4"/><path d="M125,136 L133,136" stroke="#2a2a30" stroke-width="2.4"/>`:""}
 <path d="M129,140 Q124,152 130,154" fill="none" stroke="#b9805c" stroke-width="2.2" stroke-linecap="round"/>
 ${mouths}
 <path d="M80,108 Q80,56 129,54 Q178,56 178,108 Q129,98 80,108Z" fill="${cap}" ${o}/>
 <path d="M129,56 L129,100" stroke="rgba(0,0,0,.12)" stroke-width="2"/>
 <circle cx="129" cy="82" r="13" fill="#f1e7cf" ${o}/><text x="129" y="89" text-anchor="middle" font-family="Audiowide,sans-serif" font-size="19" fill="#4a2c18">A</text>
 <path d="M74,106 Q129,92 184,106 Q186,124 129,126 Q72,124 74,106Z" fill="${brim}" ${o}/>
</svg>`}
const playerIll=(m,bg=true)=>"data:image/svg+xml;utf8,"+encodeURIComponent(playerSvg(m,bg));

const goodsImg=p=>`https://picsum.photos/seed/assist-goods${p.id}/600/600`;
const newsImg=i=>`https://picsum.photos/seed/assist-news${i}/640/400`;
const imgTag=(src,fb,alt="")=>`<img src="${src}" alt="${alt}" loading="lazy" onerror="this.onerror=null;this.src='${fb}'">`;
const phTag=(src,label)=>`<img src="${src}" alt="" loading="lazy" onerror="this.parentNode.classList.add('empty');this.remove()">`;
const cart=()=>{try{return JSON.parse(localStorage.getItem("cart")||"{}")}catch(e){return{}}};
const saveCart=c=>{try{localStorage.setItem("cart",JSON.stringify(c))}catch(e){}};
const cartCount=()=>Object.values(cart()).reduce((a,b)=>a+b,0);
function addCart(id){const c=cart();c[id]=(c[id]||0)+1;saveCart(c);location.href="cart.html"}
const r3=v=>v===null||v===undefined?"-":(v>=1?v.toFixed(3):v.toFixed(3).slice(1));
const q=k=>new URLSearchParams(location.search).get(k);
const ng=()=>GAMES.length,qual=()=>Math.floor(ng()*2);

function header(page){if(STATIC)return `<header class="site"><a class="logo" href="./"><img src="assets/logo.png" alt="アシスト株式会社"></a><nav></nav></header>`;return `<header class="site"><a class="logo" href="index.html"><img src="assets/logo.png" alt="アシスト株式会社" onerror="this.replaceWith(document.createTextNode('ASSIST'))"></a><nav>${NAV.map(([h,l])=>`<a href="${h}" class="${h===page?"on":""}">${l}</a>`).join("")}</nav><div class="acct"><a href="#" onclick="alert('会員ログインは準備中です');return false">LOGIN</a><a href="cart.html">カート<span class="badge">${cartCount()}</span></a></div></header>`}
function footer(){if(STATIC)return `<footer class="site"><img src="assets/logo_mark_text_white.png" alt="アシスト株式会社" style="height:90px;width:auto;margin-bottom:10px"><p><a href="privacy.html">プライバシーポリシー</a></p><p>© ${COMPANY}</p></footer>`;return `<footer class="site"><img src="assets/logo_mark_text_white.png" alt="アシスト株式会社" style="height:110px;width:auto;margin-bottom:12px" onerror="this.remove()"><div class="au">ASSIST CO., LTD.</div><p><a href="contact.html">お問い合わせ</a><a href="tokushoho.html">特定商取引法に基づく表記</a><a href="privacy.html">プライバシーポリシー</a></p><p>© ${COMPANY}</p></footer>`}
function playerCard(m){return `<a class="pc" href="member.html?id=${m.id}"><div class="nm">${m.en||m.name}</div><div class="pic">${imgTag(face(m),faceFallback(m),m.name)}<div class="lg"><img class="em" src="assets/emblem.png" alt=""><span>ASSIST<br>CO.</span></div></div></a>`}
function productCard(p){return `<div class="pd">${p.free?'<div class="rb">送料<br>無料</div>':""}<div class="pic" data-l="商品写真 ${String(p.id).padStart(2,"0")}">${phTag(`assets/goods_${p.id}.jpg`)}</div><div class="nm">${p.name}</div><div class="pr">${yen(p.price)}</div><button onclick="addCart(${p.id})">カートに入れる</button></div>`}
function newsCard(n,i){return `<a class="nc" href="news.html"><div class="pic" data-l="記事画像 ${i+1}">${phTag(`assets/news_${i+1}.jpg`)}</div><time>${n.d}</time><h3>${n.t}</h3><p>${n.b}</p></a>`}
const CHEV=()=>{let p="";for(let i=0;i<4;i++){const y=i*128;p+=`<polyline points="-60,${-40+y} 330,${400+y} 720,${-40+y}" stroke="${i%2?"#2f6df0":"#e2b53c"}" class="${i%2?"b":"g"}" />`;}return `<svg class="chev" viewBox="-80 0 840 640" fill="none" stroke-width="66" stroke-linejoin="miter">${p}</svg>`};
const SPONSORS=Array.from({length:6},(_,i)=>`<div>SPONSOR LOGO ${i+1}</div>`).join("");

function sideMenu(active){const it=[["members.html","選手紹介ページ"],["stats.html?tab=bat","打者 個人成績一覧"],["ranking.html?tab=bat","打者 ランキング"],["stats.html?tab=pit","投手 個人成績一覧"],["ranking.html?tab=pit","投手 ランキング"],["results.html","試合結果"]];
 return `<aside><div class="menu"><h4>MENU</h4>${it.map(([h,l])=>`<a href="${h}" class="${h===active?"on":""}">${l}</a>`).join("")}</div><a class="side-ad" style="background:var(--brown)" href="contact.html">個人スポンサー<br>募集中<small>お問い合わせはこちら</small></a><a class="side-ad ad2 au" style="background:var(--navy);font-size:18px;line-height:1.5" href="shop.html">ONLINE<br>STORE<small>オンラインショップはこちら</small></a></aside>`}
const rightAd=()=>`<aside><a class="side-ad au" style="background:var(--navy);margin:0;font-size:20px;line-height:1.5" href="shop.html">ONLINE<br>STORE<small class="">オンラインショップはこちら</small></a></aside>`;
const three=(active,body)=>`<div class="page"><div class="cols">${sideMenu(active)}<main>${body}</main></div></div>`;

const BAT=[["name","選手"],["avg","打率"],["g","試合"],["pa","打席"],["ab","打数"],["h","安打"],["d2","二塁打"],["hr","本塁打"],["rbi","打点"],["r","得点"],["so","三振"],["bb","四球"],["sb","盗塁"],["obp","出塁率"],["slg","長打率"],["ops","OPS"],["e","失策"]];
const PIT=[["name","選手"],["era","防御率"],["pg","登板"],["w","勝"],["l","敗"],["ip","投球回"],["pso","奪三振"],["pbb","四球"],["ph","被安打"],["er","自責点"]];
function cellv(m,k){if(k==="name")return `<small>#${m.no}</small><a href="member.html?id=${m.id}">${m.name}</a>`;if(["avg","obp","slg","ops"].includes(k))return r3(m[k]);if(k==="era")return m.era===null?"-":m.era.toFixed(2);if(k==="ip")return m.ip;return m[k]}
function recordText(){if(!RECORD)return "";const t=RECORD.w+RECORD.l;return `${ng()}試合　${RECORD.w}勝${RECORD.l}敗${RECORD.d?RECORD.d+"分":""}　勝率 ${t?(RECORD.w/t).toFixed(3).slice(1):"-"}　総得点 ${RECORD.rs}　総失点 ${RECORD.ra}（得失点差 ${RECORD.rs-RECORD.ra>0?"+":""}${RECORD.rs-RECORD.ra}）　チーム失策 ${RECORD.e}`}
let sortKey=null,sortAsc=false;
function statsBody(){
 const bat=(q("tab")||"bat")==="bat",cols=bat?BAT:PIT;
 const key=sortKey||(bat?"avg":"era"),asc=sortKey?sortAsc:!bat;
 const num=(m,k)=>k==="ip"?m.outs:(m[k]===null?999:m[k]);
 const rows=MEMBERS.filter(m=>bat?m.ab>0:m.outs>0).sort((x,y)=>asc?num(x,key)-num(y,key):num(y,key)-num(x,key));
 return `<div class="tabs"><a class="${bat?"on":""}" href="stats.html?tab=bat">打者</a><a class="${bat?"":"on"}" href="stats.html?tab=pit">投手</a></div><h1 class="ptitle">アシスト${bat?"打者":"投手"} 個人成績一覧</h1><p class="sub-s">2026年シーズン　${recordText()}</p><div class="tw"><table class="st" ><tr>${cols.map(([k,l])=>`<th onclick="sortBy('${k}')" ${k==="name"?"style='min-width:120px'":""}>${l}${key===k?(asc?" ▲":" ▼"):""}</th>`).join("")}</tr>${rows.map(m=>`<tr>${cols.map(([k])=>`<td>${cellv(m,k)}</td>`).join("")}</tr>`).join("")}</table></div>`}
function sortBy(k){sortAsc=sortKey===k?!sortAsc:false;sortKey=k;draw()}
function rankingBody(){
 const bat=(q("tab")||"bat")==="bat";
 const top=(rows,k,l,fmt,asc)=>`<div><h3>${l}</h3><ol>${[...rows].sort((a,b)=>asc?a[k]-b[k]:b[k]-a[k]).slice(0,5).map((m,i)=>`<li><b>${i+1}</b><a href="member.html?id=${m.id}">${m.name}</a><span>${fmt(m[k])}</span></li>`).join("")}</ol></div>`;
 const bats=MEMBERS.filter(m=>m.pa>=qual()),pits=MEMBERS.filter(m=>m.outs>=ng()*3);
 const body=bat?`${top(bats,"avg","打率",r3)}${top(bats,"hr","本塁打",v=>v)}${top(bats,"rbi","打点",v=>v)}${top(bats,"ops","OPS",r3)}${top(bats,"sb","盗塁",v=>v)}${top(MEMBERS,"h","安打",v=>v)}`:`${top(pits,"era","防御率",v=>v.toFixed(2),true)}${top(MEMBERS,"w","勝利",v=>v)}${top(MEMBERS,"pso","奪三振",v=>v)}`;
 return `<div class="tabs"><a class="${bat?"on":""}" href="ranking.html?tab=bat">打者</a><a class="${bat?"":"on"}" href="ranking.html?tab=pit">投手</a></div><h1 class="ptitle">アシスト${bat?"打者":"投手"} ランキング</h1><p class="lead">${bat?`規定打席（${qual()}打席）以上が対象です。`:`規定投球回（${ng()}回）以上が対象です。`}</p><div class="rk">${body}</div>`}
function resultsBody(){
 const row=g=>{const w=g.us>g.them?"○":g.us<g.them?"●":"△";const wp=(g.pitch||[]).find(p=>p.dec==="W"),lp=(g.pitch||[]).find(p=>p.dec==="L");return `<tr><td>${g.date.replace(/-/g,"/")}</td><td style="text-align:left;padding-left:10px">${g.opp}</td><td>${g.us} - ${g.them}</td><td>${w}</td><td>${wp?wp.name:"-"}</td><td>${lp?lp.name:"-"}</td></tr>`};
 return `<h1 class="ptitle">アシスト試合結果</h1><p class="sub-s">2026年シーズン　${recordText()}</p><div class="tw"><table class="st"><tr><th>日付</th><th>対戦相手</th><th>スコア</th><th>勝敗</th><th>勝利投手</th><th>敗戦投手</th></tr>${GAMES.map(row).join("")}</table></div>`}
function memberBody(){
 const m=MEMBERS.find(x=>x.id==q("id"))||MEMBERS[0];if(!m)return "";
 const logs=GAMES.map(g=>({g,l:g.lines.find(x=>x.name===m.name),p:(g.pitch||[]).find(x=>x.name===m.name)})).filter(x=>x.l||x.p);
 return `<div class="mhead"><div class="pc"><div class="nm">${m.en||m.name}</div><div class="pic">${imgTag(face(m),faceFallback(m))}<div class="lg"><img class="em" src="assets/emblem.png" alt=""><span>ASSIST<br>CO.</span></div></div></div><div><p class="au" style="color:var(--brown);margin:0">No.${m.no}</p><h1 class="ptitle" style="margin:0">${m.name}</h1><p style="margin:0 0 14px">${m.pos}</p><table class="dl" style="width:100%;border-collapse:collapse"><tr><td>投打</td><td>${m.bt}</td></tr><tr><td>身長 / 体重</td><td>${m.ht}cm / ${m.wt}kg</td></tr><tr><td>出身</td><td>${m.from}</td></tr>${m.pit?`<tr><td>防御率</td><td><b>${m.era===null?"-":m.era.toFixed(2)}</b>　${m.w}勝${m.l}敗　${m.ip}回　奪三振 ${m.pso}</td></tr>`:`<tr><td>打率</td><td><b>${r3(m.avg)}</b>　OPS ${r3(m.ops)}　${m.g}試合　${m.h}安打　${m.hr}本塁打　${m.rbi}打点　${m.sb}盗塁</td></tr>`}</table></div></div>
 <h2 style="margin:48px 0 14px">試合別成績</h2><div class="tw"><table class="st"><tr><th>日付</th><th>相手</th><th>結果</th><th>${m.pit?"投球回 / 自責点 / 奪三振":"打数-安打 / 本塁打 / 打点"}</th></tr>${logs.slice(0,15).map(({g,l,p})=>`<tr><td>${g.date.slice(5).replace("-","/")}</td><td style="text-align:left;padding-left:10px">${g.opp}</td><td>${g.us}-${g.them}</td><td>${p?`${Math.floor(p.outs/3)}${p.outs%3?"."+p.outs%3:""}回 / ${p.er} / ${p.so}${p.dec?"　"+p.dec:""}`:`${l.ab}-${l.h} / ${l.hr} / ${l.rbi}`}</td></tr>`).join("")}</table></div><a class="btn fill" href="members.html">選手一覧へ戻る</a>`}
let shopCat="すべて",shopSort="rec",shopQ="";
function shopBody(){
 const s={rec:(x,y)=>x.id-y.id,new:(x,y)=>y.new-x.new,pop:(x,y)=>y.pop-x.pop,lo:(x,y)=>x.price-y.price,hi:(x,y)=>y.price-x.price}[shopSort];
 const list=PRODUCTS.filter(p=>(shopCat==="すべて"||p.cat===shopCat)&&p.name.includes(shopQ)).sort(s);
 return `<h1 class="ptitle" style="font-size:30px">アシストオンラインストア</h1><div class="search"><input id="sq" placeholder="商品を検索" value="${shopQ}" onkeydown="if(event.key==='Enter'){shopQ=this.value;draw()}"><button class="btn fill" style="margin:0;padding:0 22px" onclick="shopQ=document.getElementById('sq').value;draw()">検索</button></div><div style="display:flex;justify-content:space-between;flex-wrap:wrap;gap:8px"><div>${CATS.map(c=>`<span class="pill ${c===shopCat?"on":""}" onclick="shopCat='${c}';draw()">${c}</span>`).join("")}</div><div>${[["rec","おすすめ"],["new","新着"],["pop","人気"],["lo","価格が安い"],["hi","価格が高い"]].map(([v,l])=>`<span class="pill ${v===shopSort?"on":""}" onclick="shopSort='${v}';draw()">${l}</span>`).join("")}</div></div><div class="pdgrid" style="margin-top:24px">${list.map(productCard).join("")||"<p>該当する商品がありません。</p>"}</div>`}
function cartBody(){
 const c=cart(),ids=Object.keys(c);let total=0;
 const rows=ids.map(id=>{const p=PRODUCTS.find(x=>x.id==id);if(!p)return "";total+=p.price*c[id];return `<tr><td style="text-align:left;padding-left:10px">${p.name}</td><td>${yen(p.price)}</td><td>× ${c[id]}</td><td><button class="pill" onclick="rmCart(${id})">削除</button></td></tr>`}).join("");
 return `<h1 class="ptitle">カート</h1>${ids.length?`<table class="st">${rows}</table><p style="text-align:right;font-size:20px">合計　<b>${yen(total)}</b>（税込・送料無料）</p><div class="notice">決済は未接続です（Stripe等を接続予定）。</div><p style="text-align:right"><button class="btn fill" style="margin:0 0 0 auto;opacity:.45" disabled>注文手続きへ（準備中）</button></p>`:"<p>カートは空です。</p><a class='btn fill' href='shop.html'>グッズを見る</a>"}`}
function rmCart(id){const c=cart();delete c[id];saveCart(c);draw()}
const contactBody=()=>`<h1 class="ptitle">お問い合わせ</h1><form onsubmit="event.preventDefault();document.getElementById('done').hidden=false;this.reset()" style="max-width:600px"><label>お名前<span class="req">必須</span></label><input required><label>会社・団体名</label><input><label>メールアドレス<span class="req">必須</span></label><input type="email" required><label>電話番号</label><input type="tel"><label>お問い合わせ種別</label><select><option>通常のお問い合わせ（商品・ご注文・チームに関するご質問など）</option><option>協賛・タイアップ（スポンサー協賛、コラボ、取材のご相談など）</option></select><label>お問い合わせ内容<span class="req">必須</span></label><textarea rows="7" required></textarea><p style="font-size:13px;color:#666">ご入力いただいた個人情報は<a href="privacy.html" style="text-decoration:underline">プライバシーポリシー</a>に基づいて取り扱います。</p><button class="btn fill" style="margin:0">送信する</button><div class="notice" id="done" hidden>送信ありがとうございました（試作のため実際には送信されません）。</div></form>`;
const legalBody=()=>`<h1 class="ptitle">特定商取引法に基づく表記</h1><div class="notice">記入待ちの雛形です。実際の内容を確認のうえ入力してください。</div><table class="st">${[["販売業者","アシスト株式会社"],["運営責任者","（記入）"],["所在地","（記入）"],["連絡先","（記入）"],["販売価格","各商品ページに税込で表示"],["送料","全国無料"],["支払方法","（決済接続後に記入）"],["返品・交換","（記入）"]].map(([a,b])=>`<tr><td style="width:160px;background:var(--gray)">${a}</td><td style="text-align:left;padding-left:12px">${b}</td></tr>`).join("")}</table>`;
const privacyBody=()=>STATIC?`<h1 class="ptitle">プライバシーポリシー</h1><p>アシスト株式会社（以下「当社」）は、トライアウトのお申し込みで取得する個人情報を、次のとおり取り扱います。</p><h3>取得する情報</h3><p>お名前、年齢、お住まいの都道府県、ポジション、野球の経験、連絡先（メールアドレスまたは電話番号）、ご質問など、お申し込みフォームに入力いただいた内容。</p><h3>利用目的</h3><p>トライアウトの開催に関するご連絡、参加の受付と運営、参加人数の把握のためにのみ利用します。</p><h3>第三者提供</h3><p>法令に基づく場合を除き、ご本人の同意なく第三者へ提供しません。お申し込みの内容は、Googleフォーム（Google LLC）のサービス上で保管されます。</p><h3>アクセス状況の把握</h3><p>当ページでは、閲覧状況を把握するためにアクセス解析（Googleアナリティクス等）を利用することがあります。個人を特定する情報は取得しません。</p><h3>開示・訂正・削除のご請求</h3><p>ご自身の情報の開示・訂正・削除をご希望の場合は、お申し込み時にご案内する連絡先までご連絡ください。</p><p style="margin-top:28px"><a class="ty-btn gold" style="border-color:var(--navy);color:#111" href="./">トライアウトのページへ戻る</a></p>`:`<h1 class="ptitle">プライバシーポリシー</h1><div class="notice">雛形です。内容を確認のうえ確定してください。</div><p>アシスト株式会社は、お問い合わせ・ご注文で取得した個人情報を、ご連絡と商品の発送の目的に限って利用し、法令に基づく場合を除いて第三者へ提供しません。</p>`;
const newsBody=()=>`<h1 class="ptitle">ニュース</h1><div class="ngrid">${NEWS.map(newsCard).join("")}</div>`;

function indexBody(){
 const pick=MEMBERS.slice(0,6);
 return `<section class="hero"><div class="tex"></div><video autoplay muted loop playsinline poster="" onerror="this.remove()"><source src="assets/hero.mp4" type="video/mp4"></video><div class="cut"><i></i></div><canvas id="ball3d" aria-label="3D野球ボール：ドラッグで回転"></canvas><div class="mark"><h1>2026<br>ASSIST<br>CO.</h1><div class="sub">支える、が、前に出る。</div></div><div class="hint au">DRAG TO ROTATE ▸ 360°</div><div class="chips">${[["#1f5ce6",0],["#b3202a",140],["#0b8a55",-100],["#6a2fb8",55],["#e07a12",170]].map(([c,d])=>`<button style="background:${c}" aria-label="色" onclick="setBaseHue(${d})"></button>`).join("")}</div></section>
 <div class="navy"><div class="sec"><h2 class="h-gold">ABOUT</h2><p>私たちについて</p><div class="concept">アシスト株式会社は、現場を支える人たちと一緒に走る会社です。<br>主役を支える側が、いちばん前に立つ。そんな逆転が、新しい価値を生むと信じています。</div></div>
 <div class="sec" style="padding-top:20px"><h2 class="h-gold">SPONSOR</h2><p>スポンサー</p><div class="logos">${SPONSORS}</div></div>
 <div class="sec"><h2 class="h-gold">PICK UP PLAYER</h2><p>注目の選手</p><div class="pgrid" style="grid-template-columns:repeat(3,1fr)">${pick.map(playerCard).join("")}</div><a class="btn" href="members.html">選手リストを見る</a></div></div>
 <div class="light"><div class="sec"><h2 class="h-gold h-ink" style="color:var(--navy)">ONLINE STORE</h2><p>オンラインストア</p><div class="pdgrid">${PRODUCTS.slice(0,4).map(productCard).join("")}</div><a class="btn" href="shop.html">すべての商品を見る</a></div>
 <div class="sec" style="padding-top:0"><h2 class="h-gold" style="color:var(--navy)">NEWS</h2><p>ニュース</p><div class="ngrid">${NEWS.slice(0,3).map(newsCard).join("")}</div><a class="btn" href="news.html">MORE</a></div>
 <div class="sec" style="padding-top:0"><h2 class="h-gold" style="color:var(--navy)">PARTNER</h2><p>パートナー</p><div class="logos">${SPONSORS}</div></div></div>`}
function membersBody(){return `<div class="navy" style="min-height:70vh"><div class="sec" style="padding-top:56px"><h2 class="h-gold">PLAYERS</h2><p>プレーヤー紹介</p><div class="pgrid">${MEMBERS.map(playerCard).join("")}</div></div></div>`}


/* ---------------- トライアウトLP（2026-12-25） ---------------- */
const esc2=s=>String(s??"").replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const nl=s=>esc2(s).replace(/\n/g,"<br>");

/* 流入元（?src=〇〇）を覚え、閲覧数を1回だけ記録し、Googleフォームの「どこで知りましたか」へ引き継ぐ */
function tySrc(){let s="";try{const p=new URLSearchParams(location.search);const v=p.get("src")||p.get("utm_source");if(v&&/^[A-Za-z0-9_-]{1,30}$/.test(v)){s=v;localStorage.setItem("ty_src",v)}else s=localStorage.getItem("ty_src")||""}catch(e){}return s}
function tyHit(){if(STATIC)return;try{if(sessionStorage.getItem("ty_hit"))return;sessionStorage.setItem("ty_hit","1")}catch(e){}
 fetch("/api/hit",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({src:tySrc()}),keepalive:true}).catch(()=>{})}
function tyFormUrl(t,embed){const u=t.form_url||"";const src=tySrc();let out=u;
 if(src&&t.form_src_entry&&/^https:\/\/docs\.google\.com\/forms\/.+\/viewform/.test(u)){const b=u.split("#")[0].split("?")[0];out=`${b}?usp=pp_url&${t.form_src_entry}=${encodeURIComponent(src)}`}
 else if(embed)out=u.split("?")[0];
 if(embed&&/viewform/.test(out))out+=(out.includes("?")?"&":"?")+"embedded=true";return out}
function tryoutBody(){
 const t=TRYOUT||{date:"2026-12-25",time:"調整中",venue:"調整中",fee:"調整中",deadline:"調整中",target:"調整中",age:"調整中",area:"調整中",content:"",perks:[],schedule:[],faq:[],youtube:[],news:[]};
 const dt=new Date(t.date+"T00:00:00"),wd="日月火水木金土"[dt.getDay()],ymd=t.date.replace(/-/g,".");
 const days=Math.ceil((dt-new Date(new Date().toDateString()))/86400000);
 const cta=t.line_url?`<a class="ty-btn gold" href="${esc2(t.line_url)}" target="_blank" rel="noopener">LINEで相談する</a>`:"";
 const rows=[["種目","軟式野球"],["開催日",`${ymd}（${wd}）`],["時間",t.time],["会場",t.venue],["対象",t.target],["年齢",t.age],["活動エリア",t.area],["参加費",t.fee],["内容",t.content],["申込締切",t.deadline]].filter(([k,v])=>v);
 const vids=(t.youtube||[]).map(v=>`<div class="ty-vid"><div class="ty-frame"><iframe src="https://www.youtube-nocookie.com/embed/${v.id}" title="${esc2(v.title||"動画")}" loading="lazy" allow="accelerometer;encrypted-media;picture-in-picture" allowfullscreen></iframe></div>${v.title?`<p>${esc2(v.title)}</p>`:""}</div>`).join("");
 return `<section class="ty-hero hero"><div class="tex"></div><div class="cut r"><i></i></div><div class="ty-photo" aria-hidden="true"><img src="assets/ty_hero.jpg" alt=""></div><div class="ty-ghost au" aria-hidden="true">12<br>.25</div>
  <div class="ty-hero-in"><p class="au ty-eyebrow">ASSIST BASEBALL CLUB</p><h1 class="au">TRYOUT<br><span>2026</span></h1>
  <div class="ty-date"><b class="au">${ymd}</b><i>${wd}</i><em class="ty-tag">軟式野球</em></div>
  <p class="ty-copy">野球人生に、<br class="sp">第二章があってもいいじゃないか。</p><p class="ty-lead">経験者も、ブランクのある人も。まずはグラウンドへ。</p>
  <div class="ty-cta"><a class="ty-btn gold" href="${t.form_url?esc2(tyFormUrl(t)):"#entry"}" ${t.form_url?'target="_blank" rel="noopener"':""}>トライアウトにエントリーする</a>${cta}</div>
  ${days>0?`<p class="ty-count">開催まで あと <b class="au">${days}</b> 日</p>`:days===0?`<p class="ty-count"><b class="au">本日開催</b></p>`:""}</div></section>
 <section class="ty-sec" id="thoughts"><div class="ty-w"><h2 class="ty-h au">THOUGHTS<small>こんな思いはありませんか</small></h2>
  <ul class="ty-th">${["仕事や学業の合間でも、白球を追いかけたい","ブランクがあって、最初の一歩が踏み出せない","仲間と本気で勝ちを目指せる場所がほしい","もう一度、グラウンドに立ちたい"].map(x=>`<li>${x}</li>`).join("")}</ul>
  <p class="ty-c">その思い、ここで<b>第二章</b>にしませんか。</p></div></section>
 <section class="ty-sec blue" id="vision"><div class="ty-w"><h2 class="ty-h au">VISION<small>私たちの目指すもの</small></h2>
  <div class="ty-vs"><figure class="ty-fig"><img src="assets/ty_vision.jpg" alt="甲子園球場の全景" loading="lazy"><figcaption>仮の写真（差し替え予定）</figcaption></figure>
  <div class="ty-vt"><p class="ty-big">第二章は<br>ここから始まる</p>
  <p class="ty-body">白球を追いかけた日々があった。<br>仕事や家庭に追われて<br>グラウンドから遠ざかっていた日々もあった。</p>
   <p class="ty-body">それでも野球が好きな気持ちは<br>全然消えてない。</p>
   <p class="ty-body">アシストは軟式野球を<br>もう一度楽しめる仲間と<br>場所を作ります！</p>
   <p class="ty-body">経験もブランクも一切関係ありません。<br>必要なのは、もう一度やってみようという、<br>その熱い気持ちだけ。</p>
   <p class="ty-body">主役だった人も、支える側だった人も、<br>ここでは全員がチームを勝たせる一員です。</p></div></div></div></section>
 <section class="ty-band" aria-hidden="true"><img src="assets/ty_band.jpg" alt="" loading="lazy"><div class="ty-band-t au">PLAY BALL<small>白球を追う時間は まだ終わっていない</small></div></section>
 <section class="ty-sec" id="overview"><div class="ty-w"><h2 class="ty-h au">OVERVIEW<small>開催概要</small></h2>
  <table class="ty-tb">${rows.map(([k,v])=>`<tr><th>${k}</th><td>${nl(v)}</td></tr>`).join("")}</table>
  ${(t.perks||[]).length?`<h3 class="ty-h3">参加特典</h3><ul class="ty-pk">${t.perks.map(p=>`<li>${esc2(p)}</li>`).join("")}</ul>`:""}</div></section>
 ${(t.schedule||[]).length?`<section class="ty-sec gray" id="flow"><div class="ty-w"><h2 class="ty-h au">FLOW<small>当日の流れ</small></h2><ol class="ty-fl">${t.schedule.map((r,i)=>`<li><span class="au">${String(i+1).padStart(2,"0")}</span><div><b>${esc2(r.x)}</b><i>${esc2(r.t)}</i></div></li>`).join("")}</ol></div></section>`:""}
 ${STATIC&&!vids?"":`<section class="ty-sec" id="movie"><div class="ty-w"><h2 class="ty-h au">MOVIE<small>動画</small></h2>${vids?`<div class="ty-vids">${vids}</div>`:`<div class="ty-soon">動画は近日公開予定です</div>`}</div></section>`}
 ${STATIC&&!(t.news||[]).length?"":`<section class="ty-sec gray" id="news"><div class="ty-w"><h2 class="ty-h au">NEWS<small>お知らせ</small></h2>
  ${(t.news||[]).length?`<ul class="list ty-nw">${t.news.map(n=>`<li><span class="d au">${esc2(n.d)}</span><span><b>${esc2(n.t)}</b>${n.b?`<br><span class="ty-nb">${nl(n.b)}</span>`:""}</span></li>`).join("")}</ul>`:`<div class="ty-soon">現在、お知らせはありません</div>`}</div></section>`}
 ${STATIC?"":`<section class="ty-sec" id="sponsor"><div class="ty-w"><h2 class="ty-h au">SPONSOR<small>スポンサー</small></h2><div class="logos">${SPONSORS}</div></div></section>`}
 ${t.message?`<section class="ty-sec blue" id="message"><div class="ty-w"><h2 class="ty-h au">MESSAGE<small>メッセージ</small></h2><p class="ty-msg">${nl(t.message)}</p>${t.message_name?`<p class="ty-by">${esc2(t.message_name)}</p>`:""}</div></section>`:""}
 ${(t.faq||[]).length?`<section class="ty-sec" id="faq"><div class="ty-w"><h2 class="ty-h au">FAQ<small>よくある質問</small></h2>${t.faq.map(f=>`<details class="ty-q"><summary>${esc2(f.q)}</summary><p>${nl(f.a)}</p></details>`).join("")}</div></section>`:""}
 <section class="ty-sec blue" id="entry"><div class="ty-w narrow"><h2 class="ty-h au">ENTRY<small>エントリー</small></h2>
  ${t.form_url?`<p class="ty-c">お申し込みは<br class="m">エントリーフォームからお願いいたします。<br>担当者から折り返しご連絡いたします。</p><p class="ty-c"><a class="ty-btn gold" href="${esc2(tyFormUrl(t))}" target="_blank" rel="noopener">エントリーフォームを開く</a></p>${gform(t)}`:`<div class="ty-soon" style="border-color:#6f93ee;color:#dbe6ff">エントリーフォームは準備中です</div>`}
  ${cta?`<p class="ty-c" style="margin-top:24px">${cta}</p>`:""}<p class="ty-pp" style="text-align:center;margin-top:22px">いただいた情報は、<a href="privacy.html">プライバシーポリシー</a>に基づきトライアウトのご連絡にのみ使用します。</p></div></section>
 <div class="ty-credit-w"><p class="ty-credit">写真（仮）：甲子園球場＝百楽兎／Wikimedia Commons（<a href="https://creativecommons.org/licenses/by-sa/3.0/deed.ja" target="_blank" rel="noopener">CC BY-SA 3.0</a>）・打者＝U.S. Marine Corps photo by Cpl. Stephen Campbell・練習風景＝U.S. Air Force photo by Nacho Anazawa（ともにパブリックドメイン）。トライアウト当日の写真ができ次第、差し替えます。</p></div>
 <a class="ty-float" href="${t.form_url?esc2(tyFormUrl(t)):"#entry"}" ${t.form_url?'target="_blank" rel="noopener"':""}>エントリー</a>`}
function gform(t){const u=tyFormUrl(t,true);if(!/^https:\/\/docs\.google\.com\/forms\//.test(u))return "";   // 短縮URL(forms.gle)は埋め込めないのでボタンのみ
 return `<div class="ty-gf"><iframe src="${esc2(u)}" title="エントリーフォーム" loading="lazy">読み込んでいます…</iframe></div>`}

const PAGES={
 tryout:{b:tryoutBody},
 index:{b:indexBody},members:{b:membersBody},
 news:{w:1,b:()=>`<div class="page">${newsBody()}</div>`},
 stats:{b:()=>three("stats.html?tab="+(q("tab")||"bat"),statsBody())},
 ranking:{b:()=>three("ranking.html?tab="+(q("tab")||"bat"),rankingBody())},
 results:{b:()=>three("results.html",resultsBody())},
 member:{b:()=>`<div class="page">${memberBody()}</div>`},
 shop:{b:()=>`<div class="page">${shopBody()}</div>`},
 cart:{b:()=>`<div class="page" style="max-width:860px">${cartBody()}</div>`},
 contact:{b:()=>`<div class="page" style="max-width:860px">${contactBody()}</div>`},
 tokushoho:{b:()=>`<div class="page" style="max-width:860px">${legalBody()}</div>`},
 privacy:{b:()=>`<div class="page" style="max-width:860px">${privacyBody()}</div>`}};
function draw(){const p=document.body.dataset.page,f=location.pathname.split("/").pop()||"index.html";
 document.getElementById("app").innerHTML=header(f)+PAGES[p].b()+footer()}
READY.then(()=>{draw();if(document.body.dataset.page==="index")initBall();if(document.body.dataset.page==="tryout")tyHit()});

/* ---- ヒーロー：ドラッグで回せる3D野球ボール／回転角で全体の色が360°変わる ---- */
let baseHue=+(new URLSearchParams(location.search).get('hue')||0);function setBaseHue(d){baseHue=d}
function initBall(){
 const cv=document.getElementById("ball3d");if(!cv||!window.THREE)return;
 const T=THREE,hero=cv.closest(".hero");
 let renderer;try{renderer=new T.WebGLRenderer({canvas:cv,antialias:true,alpha:true})}catch(e){return}
 renderer.setPixelRatio(Math.min(devicePixelRatio,2));
 const scene=new T.Scene(),cam=new T.PerspectiveCamera(30,1,.1,100);cam.position.set(0,0,10);
 const ball=new T.Group();scene.add(ball);
 // 革のきめ（凹凸）
 const g=document.createElement("canvas");g.width=g.height=256;const x=g.getContext("2d");x.fillStyle="#808080";x.fillRect(0,0,256,256);
 for(let i=0;i<2600;i++){const v=118+Math.random()*20;x.fillStyle=`rgb(${v},${v},${v})`;x.fillRect(Math.random()*256,Math.random()*256,2,2)}
 const bump=new T.CanvasTexture(g);bump.wrapS=bump.wrapT=T.RepeatWrapping;bump.repeat.set(3,2);
 const R=2;
 ball.add(new T.Mesh(new T.SphereGeometry(R,96,64),new T.MeshStandardMaterial({color:0xe4dccb,roughness:.7,metalness:0,bumpMap:bump,bumpScale:.035})));
 // 縫い目：野球ボールの曲線
 const pts=[],b=.36,A=R*.93;
 for(let i=0;i<=400;i++){const t=i/400*Math.PI*2;
  const p=new T.Vector3(A*((1-b)*Math.cos(t)+b*Math.cos(3*t)),A*((1-b)*Math.sin(t)-b*Math.sin(3*t)),2*A*Math.sqrt(b*(1-b))*Math.cos(2*t));
  pts.push(p.normalize().multiplyScalar(R*1.004))}
 const curve=new T.CatmullRomCurve3(pts,true);
 const red=new T.MeshStandardMaterial({color:0xb3202a,roughness:.5});
 ball.add(new T.Mesh(new T.TubeGeometry(curve,400,.02,6,true),red));
 const sg=new T.BoxGeometry(.1,.02,.02);
 for(let i=0;i<88;i++){const u=i/88,p=curve.getPointAt(u),tg=curve.getTangentAt(u),n=p.clone().normalize(),sd=new T.Vector3().crossVectors(n,tg).normalize();
  for(const s of[-1,1]){const dir=sd.clone().multiplyScalar(s*.8).add(tg.clone().multiplyScalar(.6)).normalize();
   const m=new T.Mesh(sg,red);m.position.copy(p).addScaledVector(sd,s*.05).normalize().multiplyScalar(R*1.006);
   const z=new T.Vector3().crossVectors(dir,n).normalize();m.setRotationFromMatrix(new T.Matrix4().makeBasis(dir,n,z));ball.add(m)}}
 // 光
 scene.add(new T.AmbientLight(0xffffff,.32));
 const key=new T.DirectionalLight(0xffffff,.8);key.position.set(4,5,6);scene.add(key);
 const tint=new T.PointLight(0x4a7bff,1.6,40);tint.position.set(-6,-2,5);scene.add(tint);
 const rim=new T.PointLight(0xffd9a0,1.1,40);rim.position.set(5,3,-5);scene.add(rim);
 let rx=.35,ry=0,vx=0,vy=.006,drag=false,lx=0,ly=0;
 const calm=matchMedia("(prefers-reduced-motion:reduce)").matches;
 cv.addEventListener("pointerdown",e=>{drag=true;lx=e.clientX;ly=e.clientY;cv.setPointerCapture(e.pointerId);cv.style.cursor="grabbing"});
 cv.addEventListener("pointermove",e=>{if(!drag)return;vy=(e.clientX-lx)*.011;vx=(e.clientY-ly)*.011;ry+=vy;rx=Math.max(-1.3,Math.min(1.3,rx+vx));lx=e.clientX;ly=e.clientY});
 const up=()=>{drag=false;cv.style.cursor="grab"};cv.addEventListener("pointerup",up);cv.addEventListener("pointercancel",up);
 function size(){const w=cv.clientWidth,h=cv.clientHeight;renderer.setSize(w,h,false);cam.aspect=w/h;cam.updateProjectionMatrix()}
 addEventListener("resize",size);size();
 let hueCur=0;
 (function loop(){
  if(!drag){ry+=vy;vy+=((calm?0:.0045)-vy)*.02;vx*=.92;rx+=vx*.2}
  ball.rotation.set(rx,ry,0);
  const spin=((ry*180/Math.PI)%360+360)%360,tgt=spin+baseHue;
  hueCur+=((tgt-hueCur+540)%360-180)*.2;  // 最短方向でなめらかに追従
  hero.style.setProperty("--h",hueCur.toFixed(1)+"deg");
  tint.color.setHSL(((225+hueCur)%360)/360,.9,.55);
  renderer.render(scene,cam);requestAnimationFrame(loop)})();
}
