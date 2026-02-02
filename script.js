"use strict";

/* =====================
   Settings
===================== */
const STORE_NAME = "Zex7 Store";
const WHATSAPP_NUMBER = "213779263115";
const INSTAGRAM_USERNAME = "zex7store";
const USDT_RATE = 280;              // 1$ = 280 DZD
const STARS_100_PRICE = 560;        // 100 نجمة = 560 DZD

const WHATSAPP_BASE = `https://wa.me/${WHATSAPP_NUMBER}?text=`;

const LS_FAV = "zex7_favorites_v1";
const LS_HIS = "zex7_history_v1";

const waUrl = (msg) => WHATSAPP_BASE + encodeURIComponent(msg);
const dzd = (n) => `${Number(n).toLocaleString("fr-DZ")} دج`;
const clamp = (v, min, max) => Math.max(min, Math.min(max, v));

function escapeHtml(str) {
  return String(str)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}
function loadJSON(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}
function saveJSON(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}
function toast(title, msg) {
  const wrap = document.getElementById("toastWrap");
  const el = document.createElement("div");
  el.className = "toast";
  el.innerHTML =
    `<div class="toastTitle">${escapeHtml(title)}</div>` +
    `<div class="toastMsg">${escapeHtml(msg)}</div>`;
  wrap.appendChild(el);
  setTimeout(() => el.remove(), 1700);
}

/* =====================
   Data
===================== */

/** HOME sections (same look as screenshot) */
const HOME_SECTIONS = [
  {
    id: "giftcards",
    type: "section",
    name: "بطاقات هدايا",
    desc: "Binance • Razer • iTunes",
    img: "images/cards.png",
    group: "giftcards",
  },
  {
    id: "games",
    type: "section",
    name: "شحن الألعاب",
    desc: "Free Fire • PUBG • Yalla Ludo",
    img: "images/games.png",
    group: "games",
  },
  {
    id: "videogames",
    type: "section",
    name: "ألعاب الفيديو",
    desc: "PSN • Xbox",
    img: "images/videogame.png",
    group: "videogames",
  },
  {
    id: "subs",
    type: "section",
    name: "اشتراكات تطبيقات",
    desc: "Netflix • Canva • CapCut • ChatGPT",
    img: "images/app.png",
    group: "subs",
  },
];

/** Sub categories */
const CATEGORIES = {
  games: [
    { id: "freefire", name: "Free Fire", desc: "", img: "images/games.png" },
    { id: "pubg", name: "PUBG", desc: "", img: "images/pubg.jpg" },
    { id: "yalaludo", name: "Yalla Ludo", desc: "", img: "images/yalaludo.jpg" },
    { id: "roblox", name: "Roblox", desc: "", img: "images/roblox.jpg" },
    { id: "mobilelegend", name: "Mobile Legend", desc: "", img: "images/mobilelegand.png" },
    { id: "pubgnew", name: "PUBG New State", desc: "", img: "images/pubgnew.png" },
    { id: "delta", name: "Delta Force", desc: "", img: "images/delta.png" },
  ],

  giftcards: [
    { id: "binance", name: "Binance Card", desc: "", img: "images/binance.png" },
    { id: "razer", name: "Razer Gold", desc: "", img: "images/razer.jpg" },
    { id: "itunes", name: "iTunes USA", desc: "", img: "images/itunes.jpg" },
  ],

  subs: [
    { id: "netflix", name: "Netflix", desc: "", img: "images/netflix.jpg" },
    { id: "chatgpt", name: "ChatGPT Plus", desc: "", img: "images/chat.png", type:"drill", to:"chatgpt_plus" },
    { id: "canva", name: "Canva Pro", desc: "", img: "images/canva.png" },
    { id: "capcut", name: "CapCut Pro", desc: "", img: "images/capcut.png" },
    { id: "snap", name: "Snap Chat Plus +", desc: "", img: "images/snap.jpg" },
    { id: "shahid", name: "SHAHID VIP", desc: "", img: "images/shahid.png" },
    { id: "spotify", name: "Spotifay", desc: "", img: "images/spotifay.png" },
    { id: "telegram", name: "Telgram", desc: "", img: "images/telgram.png" },
    { id: "youtube", name: "Youtube premium", desc: "", img: "images/youtube.png" },
  ],

  videogames: [
    { id: "psn", name: "PSN", desc: "", img: "images/psn.jpg" },
    { id: "xbox", name: "Xbox", desc: "", img: "images/xbox.jpg" },
  ],
};

/** Products */
const PRODUCTS = {
  /* Games */
  freefire: [
    { id:"ff110", name:"100+10 💎 جوهرة فري فاير", price:280, img:"images/freefire110.png", desc:"شحن عن طريق ايدي" , need:"id" },
    { id:"ff21021", name:"210+21 💎 جوهرة فري فاير", price:550, img:"images/freefire210.png", desc:"شحن عن طريق ايدي" , need:"id" },
    { id:"ff53053", name:"530+53 💎 جوهرة فري فاير", price:1300, img:"images/freefire530.png", desc:"شحن عن طريق ايدي" , need:"id" },
    { id:"ff1080108", name:"1080+108 💎 جوهرة فري فاير", price:2600, img:"images/freefire1080.png", desc:"شحن عن طريق ايدي" , need:"id" },
    { id:"ff2200220", name:"2200+220 💎 جوهرة فري فاير", price:5300, img:"images/freefire2200.png", desc:"شحن عن طريق ايدي" , need:"id" },
    { id:"ffweekly", name:"عضوية اسبوعية فري فاير", price:600, img:"images/weekly.png", desc:"شحن عن طريق ايدي", need:"id" },
    { id:"ffmonthly", name:"عضوية شهرية فري فاير", price:2900, img:"images/monthly.png", desc:"شحن عن طريق ايدي", need:"id" },
    { id:"ffbooyah", name:"تصريح بوياه باص فري فاير", price:550, img:"images/booyahpass.png", desc:"شحن عن طريق ايدي", need:"id" },
  ],
  pubg: [
    { id:"pubg60", name:"60 شدة ببجي", price:270, img:"images/pubg60.png" },
    { id:"pubg325", name:"325 شدة ببجي", price:1250, img:"images/pubg325.png" },
    { id:"pubg660", name:"660 شدة ببجي", price:2400, img:"images/pubg660.png" },
    { id:"pubg1800", name:"1800 شدة ببجي", price:5900, img:"images/pubg1800.png" },
    { id:"pubg3850", name:"3850 شدة ببجي", price:11750, img:"images/pubg3850.png" },
    { id:"pubg8100", name:"8100 شدة ببجي", price:23500, img:"images/pubg8100.png" },
    { id:"pubg16200", name:"16200 شدة ببجي", price:46000, img:"images/pubg16200.png" },
    { id:"pubg24300", name:"24300 شدة ببجي", price:69100, img:"images/pubg24300.png" },
    { id:"pubg34200", name:"34200 شدة ببجي", price:92000, img:"images/pubg34200.png" },
    { id:"pubg40500", name:"40500 شدة ببجي", price:116000, img:"images/pubg40500.png" },
  ],
  yalaludo: [
    { id:"ludo830", name:"830 ألماس", price:550, img:"images/ludo830.png", desc:"شحن عن طريق ايدي", need:"id" },
    { id:"ludo2320", name:"2320 ألماس", price:1300, img:"images/ludo2320.png", desc:"شحن عن طريق ايدي", need:"id" },
    { id:"ludo5150", name:"5150 ألماس", price:2550, img:"images/ludo5150.png", desc:"شحن عن طريق ايدي", need:"id" },
    { id:"ludo13580", name:"13580 ألماس", price:6500, img:"images/ludo13580.png", desc:"شحن عن طريق ايدي", need:"id" },
    { id:"ludo27640", name:"27640 ألماس", price:12750, img:"images/ludo27640.png", desc:"شحن عن طريق ايدي", need:"id" },
    { id:"ludo55800", name:"55800 ألماس", price:25200, img:"images/ludo55800.png", desc:"شحن عن طريق ايدي", need:"id" },
    { id:"ludo168860", name:"168860 ألماس", price:75000, img:"images/ludo168860.png", desc:"شحن عن طريق ايدي", need:"id" },
    { id:"ludo283460", name:"283460 ألماس", price:125000, img:"images/ludo168860.png", desc:"شحن عن طريق ايدي", need:"id" },

    { id:"gold68500", name:"68,500 ذهب", price:550, img:"images/gold2.png", desc:"شحن عن طريق ايدي", need:"id" },
    { id:"gold223700", name:"223,700 ذهب", price:1300, img:"images/gold5.png", desc:"شحن عن طريق ايدي", need:"id" },
    { id:"gold1463320", name:"1,463,320 ذهب", price:2550, img:"images/gold10.png", desc:"شحن عن طريق ايدي", need:"id" },
    { id:"gold3666470", name:"3,666,470 ذهب", price:6500, img:"images/gold25.png", desc:"شحن عن طريق ايدي", need:"id" },
    { id:"gold9973990", name:"9,973,990 ذهب", price:12750, img:"images/gold50.com", desc:"شحن عن طريق ايدي", need:"id" },
    { id:"gold25236460", name:"25,236,460 ذهب", price:25200, img:"images/gold100.png", desc:"شحن عن طريق ايدي", need:"id" },
    { id:"gold76000860", name:"76,000,860 ذهب", price:75000, img:"images/gold300.png", desc:"شحن عن طريق ايدي", need:"id" },
    { id:"gold126910990", name:"126,910,990 ذهب", price:125000, img:"images/gold500.png", desc:"شحن عن طريق ايدي", need:"id" },
  ],
  roblox: [
    { id:"rb800", name:"800 Robux", price:2750, img:"images/roblox800.png" },
    { id:"rb2000", name:"2000 Robux", price:6850, img:"images/roblox2000.png" },
    { id:"rb4500", name:"4500 Robux", price:13500, img:"images/roblox4500.png" },
    { id:"rb10000", name:"10000 Robux", price:26800, img:"images/roblox10000.png" },
  ],
  mobilelegend: [
    { id:"ml56", name:"Mobile Legend 56 ألماس 💎", price:280, img:"images/mobile56.png" },
    { id:"ml278", name:"Mobile Legend 278 ألماس 💎", price:1380, img:"images/mobile278.png" },
    { id:"ml571", name:"Mobile Legend 571 ألماس 💎", price:2700, img:"images/mobile571.png" },
    { id:"ml1167", name:"Mobile Legend 1167 ألماس 💎", price:5350, img:"images/mobile1167.png" },
    { id:"ml1783", name:"Mobile Legend 1783 ألماس 💎", price:8000, img:"images/mobile1783.png" },
    { id:"ml3005", name:"Mobile Legend 3005 ألماس 💎", price:13350, img:"images/mobile3005.png" },
    { id:"ml4770", name:"Mobile Legend 4770 ألماس 💎", price:21300, img:"images/mobile4770.png" },
    { id:"ml6012", name:"Mobile Legend 6012 ألماس 💎", price:27600, img:"images/mobile6012.png" },
  ],
  pubgnew: [
    { id:"ns300", name:"300 NC", price:280, img:"images/new300.png" },
    { id:"ns1500", name:"1500 NC + 80 Bonus", price:1250, img:"images/new1500.png" },
    { id:"ns3600", name:"3600 NC + 250 Bonus", price:2990, img:"images/new3600.png" },
    { id:"ns9300", name:"9300 NC + 930 Bonus", price:7700, img:"images/new9300.png" },
    { id:"ns15000", name:"15000 NC + 1800 Bonus", price:11900, img:"images/new15000.png" },
    { id:"ns30000", name:"30000 NC + 5000 Bonus", price:23950, img:"images/new30000.png" },
  ],
  delta: [
    { id:"d60", name:"60 Coin + 3 Bonus", price:280, img:"images/delta60.png", desc:"شحن عن طريق ايدي", need:"id" },
    { id:"d300", name:"300 Coin + 36 Bonus", price:1350, img:"images/delta300.png", desc:"شحن عن طريق ايدي", need:"id" },
    { id:"d420", name:"420 Coin + 62 Bonus", price:1900, img:"images/delta420.png", desc:"شحن عن طريق ايدي", need:"id" },
    { id:"d680", name:"680 Coin + 105 Bonus", price:2750, img:"images/delta680.png", desc:"شحن عن طريق ايدي", need:"id" },
    { id:"d1280", name:"1280 Coin + 264 Bonus", price:5200, img:"images/delta1280.png", desc:"شحن عن طريق ايدي", need:"id" },
    { id:"d1680", name:"1680 Coin + 385 Bonus", price:6500, img:"images/delta1680.png", desc:"شحن عن طريق ايدي", need:"id" },
    { id:"d3280", name:"3280 Coin + 834 Bonus", price:12900, img:"images/delta3280.png", desc:"شحن عن طريق ايدي", need:"id" },
    { id:"d6480", name:"6480 Coin + 1944 Bonus", price:26000, img:"images/delta6480.png", desc:"شحن عن طريق ايدي", need:"id" },
    { id:"d12960", name:"12960 Coin + 3888 Bonus", price:52100, img:"images/delta12960.png", desc:"شحن عن طريق ايدي", need:"id" },
    { id:"d19440", name:"19440 Coin + 5832 Bonus", price:78100, img:"images/delta19440.png", desc:"شحن عن طريق ايدي", need:"id" },
  ],

  /* Gift Cards */
  binance: [
    { id:"binance_usdt", name:"Binance USDT", price:USDT_RATE, img:"images/binanceusdt.jpg", type:"binance", desc:"" },
  ],
  razer: [
    { id:"rz1", name:"Razer Gold 1$", price:280, img:"images/razer1.png", desc:"كود رقمي — قم باستبداله داخل المنصة" },
    { id:"rz2", name:"Razer Gold 2$", price:540, img:"images/razer2.png", desc:"كود رقمي — قم باستبداله داخل المنصة" },
    { id:"rz5", name:"Razer Gold 5$", price:1350, img:"images/razer5.png", desc:"كود رقمي — قم باستبداله داخل المنصة" },
    { id:"rz10", name:"Razer Gold 10$", price:2650, img:"images/razer10.png", desc:"كود رقمي — قم باستبداله داخل المنصة" },
    { id:"rz20", name:"Razer Gold 20$", price:5250, img:"images/razer20.png", desc:"كود رقمي — قم باستبداله داخل المنصة" },
    { id:"rz25", name:"Razer Gold 25$", price:6600, img:"images/razer25.png", desc:"كود رقمي — قم باستبداله داخل المنصة" },
    { id:"rz50", name:"Razer Gold 50$", price:13250, img:"images/razer50.png", desc:"كود رقمي — قم باستبداله داخل المنصة" },
    { id:"rz100", name:"Razer Gold 100$", price:25500, img:"images/razer100.png", desc:"كود رقمي — قم باستبداله داخل المنصة" },
  ],
  itunes: [
    { id:"it2", name:"iTunes USA 2$", price:540, img:"images/itunes2.png", desc:"كود رقمي — قم باستبداله داخل Apple ID" },
    { id:"it5", name:"iTunes USA 5$", price:1350, img:"images/itunes5.png", desc:"كود رقمي — قم باستبداله داخل Apple ID" },
    { id:"it10", name:"iTunes USA 10$", price:2600, img:"images/itunes10.png", desc:"كود رقمي — قم باستبداله داخل Apple ID" },
    { id:"it25", name:"iTunes USA 25$", price:6500, img:"images/itunes25.png", desc:"كود رقمي — قم باستبداله داخل Apple ID" },
    { id:"it50", name:"iTunes USA 50$", price:13000, img:"images/itunes50.png", desc:"كود رقمي — قم باستبداله داخل Apple ID" },
    { id:"it100", name:"iTunes USA 100$", price:25000, img:"images/itunes100.png", desc:"كود رقمي — قم باستبداله داخل Apple ID" },
    { id:"it250", name:"iTunes USA 250$", price:63750, img:"images/itunes250.png", desc:"كود رقمي — قم باستبداله داخل Apple ID" },
    { id:"it500", name:"iTunes USA 500$", price:127500, img:"images/itunes500.png", desc:"كود رقمي — قم باستبداله داخل Apple ID" },
  ],

  /* Subs */
  netflix: [
    { id:"nx_profile", name:"بروفايل Netflix لمدة شهر", price:800, img:"images/netflix.jpg" },
    { id:"nx_personal", name:"حساب Netflix شخصي لمدة شهر", price:3000, img:"images/netflix.jpg" },
  ],
  chatgpt_plus: [
    { id:"chat_personal", name:"حساب ChatGPT Plus شخصي (شهر)", price:5200, img:"images/chat52.png" },
    { id:"chat_shared", name:"حساب ChatGPT Plus مشترك (شهر)", price:1500, img:"images/chat15.png" },
  ],
  canva: [
    { id:"cv1y", name:"Canva Pro 1 ans", price:500, img:"images/canva.png" },
  ],
  capcut: [
    { id:"cc1m", name:"CapCut Pro 1 mois", price:700, img:"images/capcut.png" },
  ],
  snap: [
    { id:"snap3", name:"Snap chat plus 3 mois", price:2850, img:"images/snap3.png" },
    { id:"snap6", name:"Snap chat plus 6 mois", price:5600, img:"images/snap6.png" },
    { id:"snap12", name:"Snap chat plus 12 mois", price:8500, img:"images/snap12.png" },
  ],
  shahid: [
    { id:"sh3", name:"Shahid Vip 3 mois", price:1200, img:"images/shahid3.png" },
    { id:"sh12", name:"Shahid Vip 12 mois", price:4200, img:"images/shahid12.png" },
  ],
  spotify: [
    { id:"sp1500", name:"اشتراك شهري Spotifay premium", price:1500, img:"images/sp150.png" },
    { id:"sp1900", name:"اشتراك شهري ثنائي Spotifay premium", price:1900, img:"images/sp1900.png" },
    { id:"sp2400", name:"اشتراك شهري عائلي Spotifay premium", price:2400, img:"images/sp2400.png" },
  ],

  /* ✅✅✅ FIX: Telegram هنا لازم يكون "دخول" فقط (drill) */
  telegram: [
    { id:"tg_premium", name:"Telegram Premium", img:"images/telgram.png", price:0, type:"drill", to:"telegram_premium" },
    { id:"tg_stars",   name:"Telegram Stars",   img:"images/telgrams.png", price:0, type:"drill", to:"telegram_stars" },
  ],

  telegram_premium: [
    { id:"tgp3", name:"Telgram premium 3 mois", price:4200, img:"images/telgram3.png" },
    { id:"tgp6", name:"Telgram premium 6 mois", price:5600, img:"images/telgram6.png" },
    { id:"tgp12", name:"Telgram premium 12 mois", price:9950, img:"images/telgram12.png" },
  ],
  youtube: [
    { id:"yt1", name:"حساب يوتيوب بريميوم شخصي لمدة شهر", price:0, img:"images/youtubep.png" },
  ],

  /* Video Games */
  psn: [
    { id:"psnfr10", name:"PSN FR 🇫🇷 10€", price:3150, img:"images/psn10.png" },
    { id:"psnfr25", name:"PSN FR 🇫🇷 25€", price:7600, img:"images/psn25.png" },
    { id:"psnfr50", name:"PSN FR 🇫🇷 50€", price:15250, img:"images/psn50.png" },
    { id:"psnfr100", name:"PSN FR 🇫🇷 100€", price:30500, img:"images/psn100.png" },

    { id:"psnusa10", name:"PSN USA 🇺🇸 10$", price:2600, img:"images/usa10.png" },
    { id:"psnusa25", name:"PSN USA 🇺🇸 25$", price:6500, img:"images/usa25.png" },
    { id:"psnusa50", name:"PSN USA 🇺🇸 50$", price:13000, img:"images/usa50.png" },
    { id:"psnusa100", name:"PSN USA 🇺🇸 100$", price:25800, img:"images/usa100.png" },

    { id:"psnksa10", name:"PSN KSA 🇸🇦 10$", price:2600, img:"images/ksa10.png" },
    { id:"psnksa20", name:"PSN KSA 🇸🇦 20$", price:5200, img:"images/ksa20.png" },
    { id:"psnksa50", name:"PSN KSA 🇸🇦 50$", price:12900, img:"images/ksa50.png" },
    { id:"psnksa100", name:"PSN KSA 🇸🇦 100$", price:25800, img:"images/ksa100.png" },
  ],
  xbox: [
    { id:"xfr10", name:"Xbox FR 🇫🇷 10€", price:2950, img:"images/xfr10.png" },
    { id:"xfr25", name:"Xbox FR 🇫🇷 25€", price:7400, img:"images/xfr25.png" },
    { id:"xfr50", name:"Xbox FR 🇫🇷 50€", price:14700, img:"images/xfr50.png" },
    { id:"xfr100", name:"Xbox FR 🇫🇷 100€", price:29300, img:"images/xfr100.png" },

    { id:"xusa10", name:"Xbox USA 🇺🇸 10$", price:2600, img:"images/xusa10.png" },
    { id:"xusa25", name:"Xbox USA 🇺🇸 25$", price:6500, img:"images/xusa25.png" },
    { id:"xusa50", name:"Xbox USA 🇺🇸 50$", price:12900, img:"images/xusa50.png" },
    { id:"xusa100", name:"Xbox USA 🇺🇸 100$", price:25700, img:"images/xusa100.png" },

    { id:"xksa50", name:"Xbox KSA 🇸🇦 50 ﷼", price:3350, img:"images/xksa50.png" },
    { id:"xksa100", name:"Xbox KSA 🇸🇦 100 ﷼", price:6750, img:"images/xksa100.png" },
    { id:"xksa200", name:"Xbox KSA 🇸🇦 200 ﷼", price:13400, img:"images/xksa200.png" },
    { id:"xksa300", name:"Xbox KSA 🇸🇦 300 ﷼", price:20000, img:"images/xksa300.png" },
  ],
};

/* Telegram Stars products from list */
const STARS_LIST = [100,150,200,250,300,350,400,450,500,600,700,800,900,1000,1200,1500,2000,2500,3000,3500,4000,4500,5000];
PRODUCTS.telegram_stars = STARS_LIST.map((stars) => ({
  id:`stars_${stars}`,
  name:`Telegram Stars ⭐ ${stars}`,
  price: Math.round((stars/100) * STARS_100_PRICE),
  img:"images/telgrams.png",
  type:"stars",
  need:"user", // telegram username
}));

/* =====================
   State
===================== */
let favorites = new Set(loadJSON(LS_FAV, []));
let history = loadJSON(LS_HIS, []);

const qtyMap = new Map(); // productId => qty

let navStack = [];
let currentContext = { kind:"home", id:"home", title:"الأقسام" };

/* =====================
   Elements
===================== */
const sideMenu = document.getElementById("sideMenu");
const backdrop = document.getElementById("backdrop");

const viewHome = document.getElementById("viewHome");
const viewCategory = document.getElementById("viewCategory");
const viewProducts = document.getElementById("viewProducts");
const viewFavorites = document.getElementById("viewFavorites");
const viewHistory = document.getElementById("viewHistory");

const homeGrid = document.getElementById("homeGrid");
const categoryGrid = document.getElementById("categoryGrid");
const productsGrid = document.getElementById("productsGrid");
const favoritesGrid = document.getElementById("favoritesGrid");
const historyList = document.getElementById("historyList");

const homeEmpty = document.getElementById("homeEmpty");
const categoryEmpty = document.getElementById("categoryEmpty");
const productsEmpty = document.getElementById("productsEmpty");
const favEmpty = document.getElementById("favEmpty");
const hisEmpty = document.getElementById("hisEmpty");

const categoryTitle = document.getElementById("categoryTitle");
const categorySub = document.getElementById("categorySub");
const productsTitle = document.getElementById("productsTitle");
const productsSub = document.getElementById("productsSub");
const productsCount = document.getElementById("productsCount");

const searchInput = document.getElementById("searchInput");
const filterSelect = document.getElementById("filterSelect");

document.getElementById("btnMenu").addEventListener("click", openMenu);
document.getElementById("btnCloseMenu").addEventListener("click", closeMenu);
document.getElementById("btnHome").addEventListener("click", () => goHome());
document.getElementById("btnBackCat").addEventListener("click", () => goBack());
document.getElementById("btnBackProducts").addEventListener("click", () => goBack());
document.getElementById("btnBackFav").addEventListener("click", () => goBack());
document.getElementById("btnBackHis").addEventListener("click", () => goBack());
backdrop.addEventListener("click", closeMenu);

document.querySelectorAll(".sideLink").forEach((b) => {
  b.addEventListener("click", () => {
    const nav = b.getAttribute("data-nav");
    if (nav === "home") goHome();
    if (nav === "favorites") showFavorites();
    if (nav === "history") showHistory();
  });
});

/* Side links */
document.getElementById("sideWhats").href = waUrl(`سلام، حاب نستفسر على منتجات ${STORE_NAME}`);
document.getElementById("sideInsta").href = `https://instagram.com/${INSTAGRAM_USERNAME}`;

/* Search + filter */
function normalize(s){ return String(s||"").toLowerCase().trim(); }
searchInput.addEventListener("input", () => renderByContext(true));
filterSelect.addEventListener("change", () => renderByContext(true));

/* =====================
   Navigation
===================== */
function showView(name){
  [viewHome, viewCategory, viewProducts, viewFavorites, viewHistory].forEach(v => v.classList.add("hidden"));
  if (name === "home") viewHome.classList.remove("hidden");
  if (name === "category") viewCategory.classList.remove("hidden");
  if (name === "products") viewProducts.classList.remove("hidden");
  if (name === "favorites") viewFavorites.classList.remove("hidden");
  if (name === "history") viewHistory.classList.remove("hidden");
  closeMenu();
}
function pushNav(ctx){
  navStack.push(JSON.parse(JSON.stringify(currentContext)));
  currentContext = ctx;
}
function goBack(){
  const prev = navStack.pop();
  if (!prev) return goHome();
  currentContext = prev;
  renderByContext();
}
function goHome(){
  navStack = [];
  currentContext = { kind:"home", id:"home", title:"الأقسام" };
  renderByContext();
}

/* =====================
   Menu
===================== */
function openMenu(){
  sideMenu.classList.remove("hidden");
  sideMenu.setAttribute("aria-hidden","false");
  backdrop.classList.remove("hidden");
}
function closeMenu(){
  sideMenu.classList.add("hidden");
  sideMenu.setAttribute("aria-hidden","true");
  backdrop.classList.add("hidden");
}

/* =====================
   Favorites + History
===================== */
function toggleFav(id){
  if (favorites.has(id)) favorites.delete(id);
  else favorites.add(id);
  saveJSON(LS_FAV, Array.from(favorites));
}
function addToHistory(item){
  history.unshift(item);
  history = history.slice(0, 80);
  saveJSON(LS_HIS, history);
}
function findProductById(pid){
  for (const k of Object.keys(PRODUCTS)) {
    const hit = (PRODUCTS[k]||[]).find(p => p.id === pid);
    if (hit) return hit;
  }
  return null;
}

/* =====================
   Rendering helpers
===================== */
function applySearchAndFilter(list){
  const q = normalize(searchInput.value);
  const f = filterSelect.value;

  let out = list;

  if (currentContext.kind === "home" && f !== "all") {
    out = out.filter(x => x.group === f);
  }

  if (q) {
    out = out.filter(x =>
      normalize(x.name).includes(q) ||
      normalize(x.desc).includes(q) ||
      normalize(x.id).includes(q)
    );
  }
  return out;
}

function renderCard(item, onClick){
  const el = document.createElement("div");
  el.className = "card";
  el.innerHTML = `
    <div class="cardMedia">
      <img src="${escapeHtml(item.img)}" alt="${escapeHtml(item.name)}"/>
    </div>
    <div class="cardBody">
      <h3 class="cardTitle">${escapeHtml(item.name)}</h3>
      ${item.desc ? `<div class="cardDesc">${escapeHtml(item.desc)}</div>` : ``}
      <button class="btnPrimary">دخول</button>
    </div>
  `;
  el.querySelector(".btnPrimary").addEventListener("click", (e) => {
    e.stopPropagation();
    onClick();
  });
  el.addEventListener("click", onClick);
  return el;
}

function ensureQty(pid){
  if (!qtyMap.has(pid)) qtyMap.set(pid, 1);
  return qtyMap.get(pid);
}

function buildOrderMsg(product, qty, extra){
  const total = calcTotal(product, qty, extra).total;
  const lines = [
    `طلب جديد من ${STORE_NAME}`,
    `المنتج: ${product.name}`,
    `الكمية: ${qty}`,
  ];

  if (product.type === "binance") {
    lines.push(`المبلغ بالدولار: ${extra.usd}`);
  }
  if (product.type === "stars") {
    lines.push(`اسم حساب تيليغرام: ${extra.user}`);
    lines.push(`النجوم: ${extra.stars}`);
  }
  if (product.need === "id") {
    lines.push(`ID: ${extra.id}`);
  }
  if (product.need === "user" && !product.type) {
    lines.push(`اسم الحساب: ${extra.user}`);
  }

  lines.push(`المجموع: ${dzd(total)}`);
  return lines.join("\n");
}

function calcTotal(product, qty, extra){
  let unit = Number(product.price)||0;

  if (product.type === "binance") {
    const usd = Number(extra.usd || 0);
    unit = Math.round(usd * USDT_RATE);
    qty = 1;
  }
  if (product.type === "stars") {
    unit = Number(product.price)||0;
    qty = 1;
  }

  const total = Math.round(unit * qty);
  return { unit, total };
}

/* ✅ helper: drill products (مثل Telegram Stars/Premium بوابات دخول) */
function isDrillProduct(p){
  return p && p.type === "drill" && p.to;
}

function renderProductCard(p){
  /* ✅✅✅ FIX: إذا كان drill => بطاقة "دخول" فقط بدون سعر/كمية */
  if (isDrillProduct(p)) {
    const el = document.createElement("div");
    el.className = "card";

    const pid = p.id;
    const favOn = favorites.has(pid);

    el.innerHTML = `
      <button class="favBtn ${favOn ? "on":""}" title="مفضلة" aria-label="مفضلة">${favOn ? "❤️":"♡"}</button>
      <div class="cardMedia">
        <img src="${escapeHtml(p.img)}" alt="${escapeHtml(p.name)}"/>
      </div>
      <div class="cardBody">
        <h3 class="cardTitle">${escapeHtml(p.name)}</h3>
        <button class="btnPrimary">دخول</button>
      </div>
    `;

    el.querySelector(".favBtn").addEventListener("click", (e) => {
      e.stopPropagation();
      toggleFav(pid);
      e.currentTarget.classList.toggle("on");
      e.currentTarget.textContent = favorites.has(pid) ? "❤️" : "♡";
      toast("تم", favorites.has(pid) ? "أضفناه للمفضلة" : "نحّيناه من المفضلة");
    });

    const go = () => {
      pushNav({ kind:"products", id: p.to, title: p.name });
      renderByContext();
    };

    el.querySelector(".btnPrimary").addEventListener("click", (e) => { e.stopPropagation(); go(); });
    el.addEventListener("click", go);

    return el;
  }

  const pid = p.id;
  const qty = ensureQty(pid);

  const el = document.createElement("div");
  el.className = "card";

  const favOn = favorites.has(pid);

  el.innerHTML = `
    <button class="favBtn ${favOn ? "on":""}" title="مفضلة" aria-label="مفضلة">${favOn ? "❤️":"♡"}</button>
    <div class="cardMedia">
      <img src="${escapeHtml(p.img)}" alt="${escapeHtml(p.name)}"/>
    </div>
    <div class="cardBody">
      <h3 class="cardTitle">${escapeHtml(p.name)}</h3>

      ${p.desc ? `<div class="cardDesc">${escapeHtml(p.desc)}</div>` : ``}

      <div class="pRow">
        <div class="small">السعر:</div>
        <div class="price" data-price="${pid}">${dzd(p.price || 0)}</div>
      </div>

      <div class="pRow">
        <div class="small">المجموع:</div>
        <div class="price" data-total="${pid}">${dzd((p.price||0) * qty)}</div>
      </div>

      ${p.type === "binance" ? `
        <input class="input" data-usd="${pid}" inputmode="decimal" placeholder="أدخل المبلغ بالدولار (0 إلى 30) مثال: 2.5" />
        <div class="small" style="margin-top:6px;">1 دولار = ${USDT_RATE} دج</div>
      ` : ""}

      ${p.type === "stars" ? `
        <input class="input" data-user="${pid}" placeholder="اكتب اسم حساب تيليغرام" />
        <div class="small" style="margin-top:6px;">سعر 100 نجمة = ${STARS_100_PRICE} دج</div>
      ` : ""}

      ${p.need === "id" ? `
        <input class="input" data-id="${pid}" inputmode="numeric" placeholder="اكتب ID للشحن" />
      ` : ""}

      ${p.type !== "binance" && p.type !== "stars" ? `
        <div class="qtyRow">
          <button class="qtyBtn" data-minus="${pid}">-</button>
          <div class="qtyNum" data-qty="${pid}">${qty}</div>
          <button class="qtyBtn" data-plus="${pid}">+</button>
        </div>
      ` : ""}

      <button class="btnPrimary" data-order="${pid}">اطلب عبر واتساب</button>
    </div>
  `;

  /* Fav */
  el.querySelector(".favBtn").addEventListener("click", (e) => {
    e.stopPropagation();
    toggleFav(pid);
    e.currentTarget.classList.toggle("on");
    e.currentTarget.textContent = favorites.has(pid) ? "❤️" : "♡";
    toast("تم", favorites.has(pid) ? "أضفناه للمفضلة" : "نحّيناه من المفضلة");
  });

  /* Qty */
  const minus = el.querySelector(`[data-minus="${pid}"]`);
  const plus  = el.querySelector(`[data-plus="${pid}"]`);
  if (minus && plus) {
    minus.addEventListener("click", () => {
      const q = clamp((qtyMap.get(pid)||1) - 1, 1, 99);
      qtyMap.set(pid, q);
      updateTotalsForCard(el, p);
    });
    plus.addEventListener("click", () => {
      const q = clamp((qtyMap.get(pid)||1) + 1, 1, 99);
      qtyMap.set(pid, q);
      updateTotalsForCard(el, p);
    });
  }

  /* Binance USD input */
  const usdInput = el.querySelector(`[data-usd="${pid}"]`);
  if (usdInput) {
    usdInput.addEventListener("input", () => {
      let v = String(usdInput.value || "").replace(",", ".");
      let num = Number(v);
      if (!Number.isFinite(num)) num = 0;
      num = clamp(num, 0, 30);
      const { unit, total } = calcTotal(p, 1, { usd: num });
      el.querySelector(`[data-price="${pid}"]`).textContent = dzd(unit);
      el.querySelector(`[data-total="${pid}"]`).textContent = dzd(total);
    });
  }

  /* Order */
  el.querySelector(`[data-order="${pid}"]`).addEventListener("click", () => {
    const q = qtyMap.get(pid) || 1;

    let extra = {};
    if (p.type === "binance") {
      const v = String(usdInput?.value || "").replace(",", ".");
      let usd = Number(v);
      if (!Number.isFinite(usd)) usd = 0;
      usd = clamp(usd, 0, 30);
      if (!usd || usd <= 0) return toast("تنبيه", "أدخل مبلغ بالدولار (0 إلى 30).");
      extra.usd = usd;
    }
    if (p.type === "stars") {
      const user = (el.querySelector(`[data-user="${pid}"]`)?.value || "").trim();
      if (!user) return toast("تنبيه", "أدخل اسم حساب تيليغرام.");
      extra.user = user;
      const stars = Number(pid.replace("stars_", ""));
      extra.stars = stars;
    }
    if (p.need === "id") {
      const idVal = (el.querySelector(`[data-id="${pid}"]`)?.value || "").trim();
      if (!idVal) return toast("تنبيه", "أدخل ID للشحن.");
      extra.id = idVal;
    }

    const msg = buildOrderMsg(p, q, extra);
    addToHistory({ kind:"product", id: pid, name: p.name, at: Date.now() });
    window.open(waUrl(msg), "_blank");
  });

  return el;
}

function updateTotalsForCard(cardEl, product){
  const pid = product.id;
  const q = qtyMap.get(pid) || 1;
  const qtyEl = cardEl.querySelector(`[data-qty="${pid}"]`);
  if (qtyEl) qtyEl.textContent = String(q);

  const { unit, total } = calcTotal(product, q, {});
  const priceEl = cardEl.querySelector(`[data-price="${pid}"]`);
  const totalEl = cardEl.querySelector(`[data-total="${pid}"]`);
  if (priceEl) priceEl.textContent = dzd(unit);
  if (totalEl) totalEl.textContent = dzd(total);
}

/* =====================
   Render by context
===================== */
function renderByContext(fromSearch=false){
  // HOME
  if (currentContext.kind === "home"){
    showView("home");
    const list = applySearchAndFilter(HOME_SECTIONS);
    homeGrid.innerHTML = "";
    list.forEach(item => {
      homeGrid.appendChild(renderCard(item, () => {
        pushNav({ kind:"category", id:item.id, title:item.name, group:item.group });
        renderByContext();
      }));
    });
    homeEmpty.classList.toggle("hidden", list.length !== 0);
    return;
  }

  // CATEGORY (subcategories)
  if (currentContext.kind === "category"){
    showView("category");
    categoryTitle.textContent = currentContext.title || "القسم";
    categorySub.textContent = "اختر قسم للدخول";

    const cats = CATEGORIES[currentContext.id] || [];
    const q = normalize(searchInput.value);
    const out = q ? cats.filter(c => normalize(c.name).includes(q) || normalize(c.id).includes(q)) : cats;

    categoryGrid.innerHTML = "";
    out.forEach(c => {
      categoryGrid.appendChild(renderCard(c, () => {
        if (c.type === "drill") {
          pushNav({ kind:"products", id: c.to, title: c.name });
        } else {
          pushNav({ kind:"products", id: c.id, title: c.name });
        }
        renderByContext();
      }));
    });

    categoryEmpty.classList.toggle("hidden", out.length !== 0);
    return;
  }

  // PRODUCTS
  if (currentContext.kind === "products"){
    showView("products");
    productsTitle.textContent = currentContext.title || "المنتجات";
    productsSub.textContent = "اختر العرض المناسب";

    let list = PRODUCTS[currentContext.id] || [];
    const q = normalize(searchInput.value);
    if (q){
      list = list.filter(p =>
        normalize(p.name).includes(q) ||
        normalize(p.id).includes(q)
      );
    }

    productsCount.textContent = `${list.length} منتج`;

    productsGrid.innerHTML = "";
    list.forEach(p => productsGrid.appendChild(renderProductCard(p)));

    productsEmpty.classList.toggle("hidden", list.length !== 0);
    return;
  }
}

/* =====================
   Favorites View
===================== */
function showFavorites(){
  pushNav({ kind:"favorites", id:"favorites", title:"المفضلة" });
  showView("favorites");

  const ids = Array.from(favorites);
  const items = ids.map(findProductById).filter(Boolean);

  favoritesGrid.innerHTML = "";
  items.forEach(p => favoritesGrid.appendChild(renderProductCard(p)));

  favEmpty.classList.toggle("hidden", items.length !== 0);
}

/* =====================
   History View
===================== */
function showHistory(){
  pushNav({ kind:"history", id:"history", title:"السجل" });
  showView("history");

  historyList.innerHTML = "";

  if (!history.length){
    hisEmpty.classList.remove("hidden");
    return;
  }
  hisEmpty.classList.add("hidden");

  history.forEach(h => {
    const row = document.createElement("div");
    row.className = "hItem";
    const date = new Date(h.at || Date.now());
    row.innerHTML = `
      <div>
        <div class="hName">${escapeHtml(h.name || "عنصر")}</div>
        <div class="hMeta">${date.toLocaleString("fr-DZ")}</div>
      </div>
      <button class="ghostBtn">فتح</button>
    `;
    row.querySelector("button").addEventListener("click", () => {
      const p = findProductById(h.id);
      if (!p) return toast("تنبيه", "العنصر لم يعد موجود.");
      const parentKey = findParentListKey(h.id);
      if (!parentKey) return toast("تنبيه", "تعذر فتح المنتج.");
      currentContext = { kind:"products", id: parentKey, title: currentContext.title };
      navStack = [];
      renderByContext();
      window.scrollTo({ top:0, behavior:"smooth" });
    });
    historyList.appendChild(row);
  });
}

function findParentListKey(pid){
  for (const k of Object.keys(PRODUCTS)){
    if ((PRODUCTS[k]||[]).some(p => p.id === pid)) return k;
  }
  return null;
}

/* =====================
   Init
===================== */
goHome();