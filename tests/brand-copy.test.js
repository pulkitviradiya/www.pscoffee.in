import test from 'node:test';
import assert from 'node:assert/strict';
import { readdirSync, readFileSync } from 'node:fs';
const nonPublicBackups = new Set([
  'home-legacy.html',
  'home-letter.html',
  'about-legacy.html',
  'pods-legacy.html',
  'app-legacy.html'
]);
const files = [...readdirSync('.').filter(f=>f.endsWith('.html')&&!nonPublicBackups.has(f)), ...readdirSync('blog').filter(f=>f.endsWith('.html')).map(f=>'blog/'+f)];
const retired = /\b(?:arabica|robusta|perfectly sourced|proudly specialty|precisely steeped|pour slowly|three taps|3 taps|abcoffee|luckin|blue tokai|starbucks)\b/i;
function strings(value, key='') {
  if (typeof value==='string') return /^(url|@id|item|image|mainEntityOfPage)$/.test(key)||/^(https?:|\.\.\/)/.test(value) ? [] : [value];
  if (Array.isArray(value)) return value.flatMap(x=>strings(x));
  return value && typeof value==='object' ? Object.entries(value).flatMap(([k,v])=>strings(v,k)) : [];
}
test('retired positioning is absent from public copy, accessible labels and search metadata',()=>{
  for(const file of files){
    const source=readFileSync(file,'utf8');
    const prose=source.replace(/<script\b[^>]*>[\s\S]*?<\/script>|<style\b[^>]*>[\s\S]*?<\/style>|<!--[\s\S]*?-->/gi,'').replace(/<[^>]+>/g,' ');
    const labels=[...source.matchAll(/\b(?:alt|placeholder|aria-label|content)="([^"]*)"/g)].map(m=>m[1]).filter(v=>!v.includes('://')&&!v.includes('url='));
    const schema=[...source.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].flatMap(m=>strings(JSON.parse(m[1])));
    assert.doesNotMatch([prose,...labels,...schema].join(' '),retired,file);
    if(!source.includes('class="faq-item"')) assert.doesNotMatch(source,/"@type"\s*:\s*"FAQPage"/,file+' has an invisible FAQ');
  }
});
test('retired artwork stays removed except the user-approved original app prototypes',()=>{
 const old=/assets\/photos\/(?:app-hero-desktop|onboarding-row|order-loop-row|home-p-s-coffee-app-desktop|caffeine-tracker-flow)\.gif|(?:app-hero|app-card-1|home-cat-app|matcha-split-app|menu-pod-panel|story-split-partner|pillar-pricing|pillar-reachability|story-cup-not-broken|app-card-5-caffeine-tracker|what-is-arabica-coffee-india-body-01|india-coffee-market-2030-opportunity-body-01|why-specialty-coffee-costs-300-rupees-india-body-0[12]|building-specialty-coffee-brand-without-cafe-body-0[12])-(?:desktop|mobile)\.webp/;
 for(const file of files) {
  let source=readFileSync(file,'utf8');
  // User explicitly requested original prototype media on App and Home.
  if(file==='app.html'||file==='app-letter.html') source=source.replace(/assets\/photos\/(?:app-hero-desktop|onboarding-row|order-loop-row|home-p-s-coffee-app-desktop|caffeine-tracker-flow)\.gif/g,'approved-prototype').replace(/(?:app-hero|app-card-1|app-card-5-caffeine-tracker|home-cat-app)-(?:desktop|mobile)\.webp/g,'approved-prototype');
  if(file==='index.html') source=source.replace(/assets\/photos\/home-p-s-coffee-app-desktop\.gif|home-cat-app-desktop\.webp/g,'approved-prototype');
  assert.doesNotMatch(source,old,file);
 }
});

test('all 43 existing menu names and price markup are preserved',()=>{
 const expected=[["Americano.", "<span>Menu price</span><strong><span class=\"ps-price-currency\">\u20b9</span>119</strong>"], ["Butter Croissant.", "<span>Menu price</span><strong><span class=\"ps-price-currency\">\u20b9</span>99</strong>"], ["Cafe Latte.", "<span>Menu price</span><strong><span class=\"ps-price-currency\">\u20b9</span>139</strong>"], ["Cappuccino.", "<span>Menu price</span><strong><span class=\"ps-price-currency\">\u20b9</span>89</strong>"], ["Caramel Cappuccino.", "<span>Menu price</span><strong><span class=\"ps-price-currency\">\u20b9</span>169</strong>"], ["Caramel Macchiato.", "<span>Menu price</span><strong><span class=\"ps-price-currency\">\u20b9</span>189</strong>"], ["Choc Chip Cookie.", "<span>Menu price</span><strong><span class=\"ps-price-currency\">\u20b9</span>89</strong>"], ["Cloud Foam Matcha.", "<span>Menu price</span><strong><span class=\"ps-price-currency\">\u20b9</span>189</strong>"], ["Cola Coffee.", "<span>Menu price</span><strong><span class=\"ps-price-currency\">\u20b9</span>169</strong>"], ["Cold Brew Tonic.", "<span>Menu price</span><strong><span class=\"ps-price-currency\">\u20b9</span>229</strong>"], ["Cold Brew.", "<span>Menu price</span><strong><span class=\"ps-price-currency\">\u20b9</span>169</strong>"], ["Cold Coffee.", "<span>Menu price</span><strong><span class=\"ps-price-currency\">\u20b9</span>149</strong>"], ["Core Protein.", "<span>Menu price</span><strong><span class=\"ps-price-currency\">\u20b9</span>189</strong>"], ["Cortado.", "<span>Menu price</span><strong><span class=\"ps-price-currency\">\u20b9</span>139</strong>"], ["Cranberry Iced Matcha.", "<span>Menu price</span><strong><span class=\"ps-price-currency\">\u20b9</span>239</strong>"], ["Dirty Matcha.", "<span>Menu price</span><strong><span class=\"ps-price-currency\">\u20b9</span>219</strong>"], ["Espresso Tonic.", "<span>Menu price</span><strong><span class=\"ps-price-currency\">\u20b9</span>189</strong>"], ["Espresso/Doppio.", "<span>Menu price</span><strong><span class=\"ps-price-currency\">\u20b9</span>99</strong>"], ["Flat White.", "<span>Menu price</span><strong><span class=\"ps-price-currency\">\u20b9</span>149</strong>"], ["Hazelnut Latte.", "<span>Menu price</span><strong><span class=\"ps-price-currency\">\u20b9</span>169</strong>"], ["Hot Matcha Latte.", "<span>Menu price</span><strong><span class=\"ps-price-currency\">\u20b9</span>199</strong>"], ["Iced Americano.", "<span>Menu price</span><strong><span class=\"ps-price-currency\">\u20b9</span>129</strong>"], ["Iced Cappuccino.", "<span>Menu price</span><strong><span class=\"ps-price-currency\">\u20b9</span>129</strong>"], ["Iced Latte.", "<span>Menu price</span><strong><span class=\"ps-price-currency\">\u20b9</span>149</strong>"], ["Iced Matcha.", "<span>Menu price</span><strong><span class=\"ps-price-currency\">\u20b9</span>189</strong>"], ["Irish Cappuccino.", "<span>Menu price</span><strong><span class=\"ps-price-currency\">\u20b9</span>169</strong>"], ["Macchiato.", "<span>Menu price</span><strong><span class=\"ps-price-currency\">\u20b9</span>139</strong>"], ["Matcha Americano.", "<span>Menu price</span><strong><span class=\"ps-price-currency\">\u20b9</span>189</strong>"], ["Mini Croissants.", "<span>Menu price</span><strong><span class=\"ps-price-currency\">\u20b9</span>159</strong>"], ["Mocha.", "<span>Menu price</span><strong><span class=\"ps-price-currency\">\u20b9</span>179</strong>"], ["Nut Cookie.", "<span>Menu price</span><strong><span class=\"ps-price-currency\">\u20b9</span>89</strong>"], ["Oats and Raisin Cookie.", "<span>Menu price</span><strong><span class=\"ps-price-currency\">\u20b9</span>89</strong>"], ["Orangicano.", "<span>Menu price</span><strong><span class=\"ps-price-currency\">\u20b9</span>189</strong>"], ["Osaka Matcha Tonic.", "<span>Menu price</span><strong><span class=\"ps-price-currency\">\u20b9</span>279</strong>"], ["Protein Cold Coffee.", "<span>Menu price</span><strong><span class=\"ps-price-currency\">\u20b9</span>269</strong>"], ["Salted Caramel Iced Latte.", "<span>Menu price</span><strong><span class=\"ps-price-currency\">\u20b9</span>189</strong>"], ["Sea Salted Cookie.", "<span>Menu price</span><strong><span class=\"ps-price-currency\">\u20b9</span>89</strong>"], ["Signature Hot Chocolate.", "<span>Menu price</span><strong><span class=\"ps-price-currency\">\u20b9</span>229</strong>"], ["Strawberry Iced Matcha.", "<span>Menu price</span><strong><span class=\"ps-price-currency\">\u20b9</span>229</strong>"], ["Sugar Free Protein Milkshake.", "<span>Menu price</span><strong><span class=\"ps-price-currency\">\u20b9</span>289</strong>"], ["Vanilla Cinnamon Iced Matcha.", "<span>Menu price</span><strong><span class=\"ps-price-currency\">\u20b9</span>239</strong>"], ["Vanilla Oat Milk Iced Matcha.", "<span>Menu price</span><strong><span class=\"ps-price-currency\">\u20b9</span>259</strong>"], ["Vietnamese Iced Coffee.", "<span>Menu price</span><strong><span class=\"ps-price-currency\">\u20b9</span>209</strong>"]];
 const actual=[...readFileSync('menu.html','utf8').matchAll(/<h3>(.*?)<\/h3>[\s\S]*?<div class="menu-product-price">([\s\S]*?)<\/div>/g)].map(m=>[m[1],m[2]]).sort((a,b)=>a[0]<b[0]?-1:a[0]>b[0]?1:0);
 assert.deepEqual(actual,expected);
});

test('Pass preview retains its complete structure and proposed pricing',()=>{
 const source=readFileSync('pack.html','utf8');
 assert.match(source,/<h1>Still taking shape\.<\/h1>/);
 assert.equal((source.match(/data-pack-pass-category>/g)||[]).length,4);
 assert.equal((source.match(/data-pack-pass-card>/g)||[]).length,12);
 assert.equal((source.match(/<details class="ps-pack-pass-detail-row">/g)||[]).length,48);
 assert.deepEqual([...source.matchAll(/<div class="ps-pack-pass-card-bottom">\s*<em>(.*?)<\/em>/g)].map(m=>m[1]),['₹749','₹1,099','₹1,899','₹2,899','₹1,299','₹2,499','₹599','₹549','₹1,399','₹14,999','Custom','₹899']);
 const enquiry=readFileSync('pack-enquiry.html','utf8');
 assert.match(enquiry,/data-ps-form="pack-enquiry"/);
 for(const slug of ['black','starter','habit','full-pour','daily','open-tab','first-sip','week','green','team','office-tab','ps-note']){
  assert.ok(source.includes('pack='+slug));
  assert.ok(enquiry.includes('value="'+slug+'"'));
 }
});

test('original App and landing-page prototype media remain present',()=>{
 const app=readFileSync('app.html','utf8'),home=readFileSync('index.html','utf8');
 for(const file of ['app-hero-desktop.gif','money-and-places-row.gif','onboarding-row.gif','order-loop-row.gif','home-p-s-coffee-app-desktop.gif','caffeine-tracker-flow.gif','app-hero-desktop.webp','app-card-1-desktop.webp','app-card-5-caffeine-tracker-desktop.webp','app-card-5-caffeine-tracker-mobile.webp','app-range-panel-desktop.webp']) assert.ok(app.includes(file),file);
 assert.ok(home.includes('assets/photos/home-p-s-coffee-app-desktop.gif'));
 assert.ok(home.includes('home-cat-app-desktop.webp'));
 assert.doesNotMatch(app+home,/class="ps-concept-phone"/);
});
