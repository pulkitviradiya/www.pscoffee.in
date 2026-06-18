/* ============================================================
   P.S. Coffee — Shared behaviour  ·  v5
   ============================================================ */
(function(){
  "use strict";

  var GS_URL = 'https://script.google.com/macros/s/AKfycbwdB2ntsyFrSQXECHMIKER6P9ipGHWvZ0-CB-KaZj7e0A0M6sV2Vl-coKbvDEbMO1G6/exec';

  var PAGES = [
    {href:"pack.html",        label:"Subscribe",   n:"01", primary:true, cls:"pack-link"},
    {href:"menu.html",        label:"Menu",        n:"02", primary:true},
    {href:"pods.html#pods",   label:"Visit us",    n:"03", primary:true},
    {href:"app.html",         label:"App",         n:"04", primary:true},
    {href:"events.html",      label:"Events",      n:"05", primary:true},
    {href:"blogs.html",       label:"Blogs",     n:"06", primary:true},
    {href:"about.html",       label:"About",       n:"07", primary:true},
    {href:"partnership.html", label:"Partner",     n:"07", primary:false},
    {href:"pods.html",        label:"Pods",        n:"08", primary:true},
    {href:"join.html",        label:"Join us",     n:"09", primary:false}
  ];
  var here = (location.pathname.split("/").pop() || "index.html").toLowerCase();
  var assetDepth = location.pathname.indexOf("/blog/") !== -1 ? "../" : "";

  function localHref(href){
    if(!href || href.indexOf("http") === 0 || href.indexOf("mailto:") === 0 || href.charAt(0) === "#") return href;
    return assetDepth + href;
  }


  function navHTML(){
    var links = PAGES.filter(function(p){return p.primary;}).map(function(p){
      var act = (p.href === here) ? " active" : "";
      var cls = p.cls ? (" "+p.cls) : "";
      return '<a href="'+localHref(p.href)+'" class="'+(act+cls).trim()+'">'+p.label+'.</a>';
    }).join("");
    return '<div class="wh-announce">'+
        '<span>○ 100% Arabica. From ₹89. Your coffee is ready before you arrive.</span>'+
        '<span class="wh-region">₹ INR&nbsp;&nbsp;|&nbsp;&nbsp;India</span>'+
      '</div>'+
      '<nav class="nav" id="psNav">'+
        '<a href="'+localHref("index.html")+'" class="nav-logo" aria-label="P.S. Coffee home"><img class="ps-logo-img ps-logo-nav" src="'+localHref("assets/icons/ps-logo-2026.png")+'" alt="P.S. Coffee"></a>'+
        '<div class="nav-links">'+links+'</div>'+
        '<div class="nav-tools">'+
          '<a href="'+localHref("join.html")+'" class="ntool ntool-text'+(here==='join.html'?' active':'')+'" title="Join us">Join us.</a>'+
          '<a href="'+localHref("partnership.html")+'" class="ntool ntool-text'+(here==='partnership.html'?' active':'')+'" title="Partner">Partner.</a>'+
          '<button class="nav-burger" id="psBurger" aria-label="Menu"><span></span><span></span><span></span></button>'+
        '</div>'+
      '</nav>'+
      '<div class="drawer" id="psDrawer">'+
        PAGES.map(function(p){return '<a href="'+localHref(p.href)+'"><span>'+p.label+'.</span><span class="n">'+p.n+'</span></a>';}).join("")+
      '</div>';
  }

  function footHTML(){
    return '<footer class="footer">'+
      '<div class="wrap">'+
        '<div class="f-top">'+
          '<div class="f-col f-brand">'+
            '<div class="display ps-wordmark"><img class="ps-logo-img ps-logo-footer" src="'+localHref("assets/icons/ps-logo-2026.png")+'" alt="P.S. Coffee"></div>'+
            '<a href="'+localHref("about.html")+'">Story</a><a href="'+localHref("blogs.html")+'">Blogs</a><a href="'+localHref("events.html")+'">Events</a><a href="'+localHref("join.html")+'">Join Us</a><a href="'+localHref("partnership.html")+'">Partner</a>'+
            '<a href="https://www.thebarista.school" target="_blank" rel="noopener">Barista School ↗</a>'+
          '</div>'+
          '<div class="f-col"><h4>Pods.</h4>'+
            '<a href="'+localHref("pods.html#pods")+'">Visit us</a><a href="'+localHref("app.html")+'">Order ahead</a><a href="'+localHref("partnership.html#host")+'">Host a Pod</a>'+
          '</div>'+
          '<div class="f-col"><h4>Help & Info.</h4>'+
            '<a href="'+localHref("faq.html")+'">FAQ</a><a href="mailto:hello@pscoffee.in">Contact</a><a href="'+localHref("terms.html")+'">Terms of Use</a><a href="'+localHref("privacy.html")+'">Privacy Policy</a><a href="'+localHref("disclaimer.html")+'">General Disclaimer</a><a href="'+localHref("survey-disclosure.html")+'">Survey Notice</a><a href="'+localHref("copyright.html")+'">Copyright</a>'+
          '</div>'+
          '<div class="f-col f-mosaic" aria-label="P.S. Coffee imagery">'+
            '<span></span><span></span><span></span><span></span>'+
            '<small>@pscoffee</small>'+
          '</div>'+
          '<div class="f-col f-email"><h4>P.S. See you in the morning.</h4>'+
            '<p>New Pods. Usual orders. Pack reminders. No theatre, no daily friction.</p>'+
            '<form class="news" data-ps-form="newsletter">'+
              '<input name="email" type="email" required placeholder="Email address">'+
              '<button class="btn accent sm" type="submit">&rarr;</button>'+
            '</form>'+
          '</div>'+
        '</div>'+
        '<div class="f-radhe">|| राधे राधे ||</div>'+
        '<div class="f-bot">'+
          '<span>&copy; P.S. Coffee 2026</span>'+
          '<span><a href="'+localHref("faq.html")+'">FAQ</a>&nbsp;&nbsp;&nbsp;<a href="'+localHref("terms.html")+'">Terms</a>&nbsp;&nbsp;&nbsp;<a href="'+localHref("privacy.html")+'">Privacy</a>&nbsp;&nbsp;&nbsp;<a href="'+localHref("disclaimer.html")+'">Disclaimer</a>&nbsp;&nbsp;&nbsp;<a href="'+localHref("survey-disclosure.html")+'">Survey</a>&nbsp;&nbsp;&nbsp;<a href="'+localHref("copyright.html")+'">Copyright</a></span>'+
          '<span class="f-socials">'+
            '<a href="https://www.facebook.com/pscoffee" target="_blank" rel="noopener" aria-label="Facebook"><svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.07C24 5.41 18.63 0 12 0S0 5.4 0 12.07C0 18.1 4.39 23.1 10.13 24v-8.44H7.08v-3.49h3.04V9.41c0-3.02 1.8-4.7 4.54-4.7 1.31 0 2.68.24 2.68.24v2.97h-1.5c-1.5 0-1.96.93-1.96 1.89v2.26h3.32l-.53 3.5h-2.8V24C19.62 23.1 24 18.1 24 12.07"/></svg></a>'+
            '<a href="https://www.instagram.com/pscoffee_pods" target="_blank" rel="noopener" aria-label="Instagram"><svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg></a>'+
            '<a href="https://www.linkedin.com/company/pscoffee" target="_blank" rel="noopener" aria-label="LinkedIn"><svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg></a>'+
          '</span>'+
        '</div>'+
      '</div>'+
    '</footer>';
  }

  function inject(){
    var navMount = document.getElementById("ps-nav");
    if(navMount) navMount.innerHTML = navHTML();
    var footMount = document.getElementById("ps-footer");
    if(footMount) footMount.innerHTML = footHTML();
  }

  /* ---------- nav behaviour ---------- */
  function navBehaviour(){
    var nav = document.getElementById("psNav");
    var wrap = document.getElementById("ps-nav");
    var burger = document.getElementById("psBurger");
    var drawer = document.getElementById("psDrawer");
    if(burger && drawer){
      burger.addEventListener("click", function(){
        var open = drawer.classList.toggle("open");
        burger.classList.toggle("open", open);
        document.body.style.overflow = open ? "hidden" : "";
      });
      drawer.querySelectorAll("a").forEach(function(a){
        a.addEventListener("click", function(){
          drawer.classList.remove("open"); burger.classList.remove("open"); document.body.style.overflow="";
        });
      });
    }
    if(nav && wrap){
      var last = 0;
      window.addEventListener("scroll", function(){
        var y = window.scrollY;
        if(y > last && y > 260){ wrap.classList.add("hide"); } else { wrap.classList.remove("hide"); }
        last = y;
      }, {passive:true});
    }
  }

  /* ---------- loading reveal (CRAV-style brand moment) ---------- */
  function loader(){
    try{ if(sessionStorage.getItem("ps-loaded")) return; }catch(e){}
    if(window.matchMedia && window.matchMedia("(prefers-reduced-motion:reduce)").matches){
      try{ sessionStorage.setItem("ps-loaded","1"); }catch(e){}
      return;
    }
    var o = document.createElement("div");
    o.id = "ps-loader";
    o.innerHTML = '<div class="psl-mark">P.<span class="tc">S.</span></div>'+
                  '<div class="psl-line"><span></span></div>'+
                  '<div class="psl-cap">Your coffee is almost ready.</div>';
    document.body.appendChild(o);
    document.body.style.overflow = "hidden";
    requestAnimationFrame(function(){ o.classList.add("go"); });
    setTimeout(function(){
      o.classList.add("done");
      document.body.style.overflow = "";
      try{ sessionStorage.setItem("ps-loaded","1"); }catch(e){}
      setTimeout(function(){ if(o.parentNode) o.parentNode.removeChild(o); }, 700);
    }, 1550);
  }

  /* ---------- hero slider ---------- */
  function heroSlider(){
    var slider = document.querySelector("[data-hero-slider]");
    if(!slider) return;
    var slides = Array.prototype.slice.call(slider.querySelectorAll(".hero-slide"));
    var dots = slider.querySelector(".hero-dots");
    if(slides.length < 2){ if(dots) dots.style.display="none"; return; }
    var i = 0, timer;
    if(dots){
      slides.forEach(function(_,idx){
        var b=document.createElement("button");
        b.className = idx===0?"on":""; b.setAttribute("aria-label","Slide "+(idx+1));
        b.addEventListener("click", function(){ go(idx); restart(); });
        dots.appendChild(b);
      });
    }
    function go(n){
      slides[i].classList.remove("on");
      if(dots) dots.children[i].classList.remove("on");
      i = (n+slides.length)%slides.length;
      slides[i].classList.add("on");
      if(dots) dots.children[i].classList.add("on");
    }
    function restart(){ clearInterval(timer); timer=setInterval(function(){go(i+1);},6000); }
    restart();
  }

  /* ---------- FAQ accordion ---------- */
  function faq(){
    document.querySelectorAll(".faq-item").forEach(function(item){
      var q = item.querySelector(".faq-q");
      if(!q) return;
      q.addEventListener("click", function(){
        item.classList.toggle("open");
      });
    });
  }

  /* ---------- scroll reveal ---------- */
  function reveal(){
    var els = document.querySelectorAll(".reveal");
    if(!("IntersectionObserver" in window)){ els.forEach(function(e){e.classList.add("in");}); return; }
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(en){ if(en.isIntersecting){ en.target.classList.add("in"); io.unobserve(en.target); } });
    }, {threshold:.12, rootMargin:"0px 0px -8% 0px"});
    els.forEach(function(e){ io.observe(e); });
  }

  /* ---------- menu filter tabs ---------- */
  function filters(){
    document.querySelectorAll("[data-filter-tabs]").forEach(function(tabs){
      var targetSel = tabs.getAttribute("data-target");
      var target = targetSel ? document.querySelector(targetSel) : tabs.nextElementSibling;
      if(!target) return;
      var items = target.querySelectorAll("[data-cat]");
      function applyFilter(f){
        f = f || "all";
        tabs.querySelectorAll("[data-filter]").forEach(function(p){
          p.classList.toggle("active", p.getAttribute("data-filter")===f);
        });
        items.forEach(function(it){
          var show = (f==="all") || it.getAttribute("data-cat")===f;
          it.style.display = show ? "" : "none";
        });
      }
      tabs.querySelectorAll("[data-filter]").forEach(function(pill){
        pill.addEventListener("click", function(){
          var f = pill.getAttribute("data-filter");
          applyFilter(f);
          if(history.replaceState){
            var url = new URL(location.href);
            url.searchParams.set("cat", f);
            history.replaceState(null, "", url.pathname + url.search + location.hash);
          }
        });
      });
      var requested = new URLSearchParams(location.search).get("cat");
      if(!requested && location.hash){
        var h = location.hash.replace("#menu-","");
        if(h==="coffee" || h==="matcha" || h==="food") requested = h;
      }
      if(requested) applyFilter(requested);
    });
    document.querySelectorAll("[data-menu-link]").forEach(function(card){
      card.addEventListener("click", function(e){
        if(e.target.closest("button,a")) return;
        location.href = card.getAttribute("data-menu-link");
      });
    });
  }

  /* ---------- chips (multi-select) ---------- */
  function chips(){
    document.querySelectorAll(".chip").forEach(function(c){
      c.addEventListener("click", function(){ c.classList.toggle("on"); });
    });
  }

  /* ---------- add to cart (visual) ---------- */
  var cartN = 0;
  function ensureToast(){
    var t = document.getElementById("ps-toast");
    if(!t){
      t = document.createElement("div"); t.id="ps-toast";
      t.innerHTML = '<span class="t-ico"><svg class="i" viewBox="0 0 24 24" style="width:18px;height:18px;stroke:#fff"><path d="M20 6L9 17l-5-5"/></svg></span><span id="ps-toast-msg"></span>';
      document.body.appendChild(t);
    }
    return t;
  }
  function showToast(msg){
    var t = ensureToast();
    t.querySelector("#ps-toast-msg").innerHTML = msg;
    t.classList.add("show");
    clearTimeout(t._tm); t._tm = setTimeout(function(){ t.classList.remove("show"); }, 2600);
  }
  function cart(){
    var count = document.getElementById("psCartCount");
    document.querySelectorAll("[data-add]").forEach(function(btn){
      btn.addEventListener("click", function(e){
        e.preventDefault();
        cartN++;
        if(count){ count.textContent = cartN; count.classList.add("show"); }
        var name = btn.getAttribute("data-add") || "Item";
        showToast('<span><b>'+name+'</b> added — <span style="opacity:.7">visual demo, not live yet</span></span>');
      });
    });
  }

  /* ---------- forms ---------- */
  function forms(){
    document.querySelectorAll("form[data-ps-form]").forEach(function(form){
      form.setAttribute("novalidate","");
      form.addEventListener("submit", function(e){
        e.preventDefault();
        var ok = true;
        form.querySelectorAll("[required]").forEach(function(input){
          var field = input.closest(".field");
          var val = (input.value||"").trim();
          var good = !!val;
          if(input.type==="email"){ good = good && /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(val); }
          if(field){ field.classList.toggle("invalid", !good); }
          if(!good) ok = false;
        });
        if(!ok){ var bad = form.querySelector(".field.invalid input,.field.invalid textarea,.field.invalid select"); if(bad) bad.focus(); return; }
        if(form.getAttribute('data-ps-form')==='newsletter'){
          var emailInput = form.querySelector('input[name="email"]');
          if(emailInput) window.location.href='mailto:hello@pscoffee.in?subject=Subscribe&body='+encodeURIComponent(emailInput.value);
          form.reset();
          return;
        }
                // Save to localStorage as before
        try{
          var key="ps-submissions";
          var arr=JSON.parse(localStorage.getItem(key)||"[]");
          arr.push({form:form.getAttribute("data-ps-form")||"form",t:Date.now()});
          localStorage.setItem(key,JSON.stringify(arr));
        }catch(err){}
        // POST to Google Sheets
        try{
          var payload = { form_name: form.getAttribute('data-ps-form') || 'form' };
          new FormData(form).forEach(function(val, key){
            if(typeof val === 'string') payload[key] = val; // skip file inputs
          });
          fetch(GS_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
          });
        }catch(err){}
        var wrap = form.closest("[data-form-wrap]");
        var success = wrap ? wrap.querySelector(".form-success") : null;
        if(success){ form.style.display="none"; success.classList.add("show"); }
        else { showToast('<span><b>Thank you.</b> Noted — genuinely.</span>'); form.reset(); }
      });
      form.querySelectorAll("input,textarea,select").forEach(function(input){
        input.addEventListener("input", function(){ var f=input.closest(".field"); if(f) f.classList.remove("invalid"); });
        input.addEventListener("change", function(){ var f=input.closest(".field"); if(f) f.classList.remove("invalid"); });
      });
    });
  }

  /* ---------- smooth in-page anchors ---------- */
  function anchors(){
    document.querySelectorAll('a[href^="#"]').forEach(function(a){
      a.addEventListener("click", function(e){
        var id = a.getAttribute("href").slice(1);
        if(!id) return;
        var el = document.getElementById(id);
        if(!el) return;
        e.preventDefault();
        var y = el.getBoundingClientRect().top + window.scrollY - 90;
        window.scrollTo({top:y, behavior:"smooth"});
      });
    });
  }

  /* ============================================================
     TWEAKS PANEL (vanilla) — host protocol + localStorage
     ============================================================ */
  var TW_KEY = "ps-tweaks";
  var TW_DEFAULT = { tc:"#E8400C", paper:"#F4EEE3", scale:1, btn:"10px" };
  var ACCENTS = [
    {v:"#E8400C", name:"Electric Terracotta"},
    {v:"#C8431F", name:"Burnt Clay"},
    {v:"#B8300A", name:"Brick Deep"},
    {v:"#2F6B43", name:"Deep Matcha"}
  ];
  var CANVAS = [
    {v:"#FAF6EE", label:"Steam"},
    {v:"#F2EBD9", label:"Oat"},
    {v:"#E8DCC8", label:"Linen"}
  ];
  var SHAPES = [
    {v:"4px", label:"Sharp"},
    {v:"10px", label:"Soft"},
    {v:"999px", label:"Pill"}
  ];

  function twRead(){ try{ return Object.assign({}, TW_DEFAULT, JSON.parse(localStorage.getItem(TW_KEY)||"{}")); }catch(e){ return Object.assign({},TW_DEFAULT);} }
  function twApply(t){
    var r=document.documentElement;
    r.style.setProperty("--tc", t.tc);
    r.style.setProperty("--wh-tc", t.tc);
    r.style.setProperty("--tc-deep", shade(t.tc,-14));
    r.style.setProperty("--tc-tint", tint(t.tc));
    r.style.setProperty("--paper", t.paper);
    r.style.setProperty("--type-scale", t.scale);
    r.style.setProperty("--btn-radius", t.btn);
  }
  function twSave(t){ try{ localStorage.setItem(TW_KEY, JSON.stringify(t)); }catch(e){} }
  function hex2rgb(h){h=h.replace('#','');if(h.length===3)h=h.split('').map(function(c){return c+c;}).join('');return [parseInt(h.slice(0,2),16),parseInt(h.slice(2,4),16),parseInt(h.slice(4,6),16)];}
  function shade(h,p){var c=hex2rgb(h);var f=1+p/100;return '#'+c.map(function(x){var v=Math.max(0,Math.min(255,Math.round(x*f)));return ('0'+v.toString(16)).slice(-2);}).join('');}
  function tint(h){var c=hex2rgb(h);return 'rgba('+c[0]+','+c[1]+','+c[2]+',0.10)';}

  function buildPanel(){
    var t = twRead();
    var panel = document.createElement("div");
    panel.id="ps-tweaks";
    panel.innerHTML =
      '<div class="tw-head"><span class="t">Tweaks</span><button class="tw-x" aria-label="Close">✕</button></div>'+
      '<div class="tw-body">'+
        '<div class="tw-row"><label>Accent</label><div class="tw-swatches" id="tw-accent"></div></div>'+
        '<div class="tw-row"><label>Canvas tone</label><div class="tw-seg" id="tw-canvas"></div></div>'+
        '<div class="tw-row"><label>Button shape</label><div class="tw-seg" id="tw-shape"></div></div>'+
        '<div class="tw-row"><label>Type scale · <span id="tw-scaleval">100%</span></label><input type="range" id="tw-scale" min="0.9" max="1.15" step="0.01"></div>'+
        '<div class="tw-note">P.S. — applies across every page.</div>'+
      '</div>';
    document.body.appendChild(panel);

    var accWrap = panel.querySelector("#tw-accent");
    ACCENTS.forEach(function(a){
      var b=document.createElement("button");
      b.className="sw"+(a.v.toLowerCase()===t.tc.toLowerCase()?" on":""); b.style.background=a.v; b.title=a.name;
      b.addEventListener("click", function(){ t.tc=a.v; twApply(t); twSave(t); accWrap.querySelectorAll(".sw").forEach(function(x){x.classList.remove("on");}); b.classList.add("on"); });
      accWrap.appendChild(b);
    });
    seg(panel.querySelector("#tw-canvas"), CANVAS, "paper", t);
    seg(panel.querySelector("#tw-shape"), SHAPES, "btn", t);

    var scale=panel.querySelector("#tw-scale"), sv=panel.querySelector("#tw-scaleval");
    scale.value=t.scale; sv.textContent=Math.round(t.scale*100)+"%";
    scale.addEventListener("input", function(){ t.scale=parseFloat(scale.value); sv.textContent=Math.round(t.scale*100)+"%"; twApply(t); twSave(t); });

    function seg(wrap, opts, key, state){
      opts.forEach(function(o){
        var b=document.createElement("button"); b.textContent=o.label; b.className=(o.v===state[key]?"on":"");
        b.addEventListener("click", function(){ state[key]=o.v; twApply(state); twSave(state); wrap.querySelectorAll("button").forEach(function(x){x.classList.remove("on");}); b.classList.add("on"); });
        wrap.appendChild(b);
      });
    }

    panel.querySelector(".tw-x").addEventListener("click", function(){
      panel.classList.remove("open");
      try{ window.parent.postMessage({type:"__edit_mode_dismissed"},"*"); }catch(e){}
    });
    window.addEventListener("message", function(e){
      var ty=e && e.data && e.data.type;
      if(ty==="__activate_edit_mode") panel.classList.add("open");
      else if(ty==="__deactivate_edit_mode") panel.classList.remove("open");
    });
    try{ window.parent.postMessage({type:"__edit_mode_available"},"*"); }catch(e){}
  }

  /* ---------- boot ---------- */
  twApply(twRead());
  function init(){
    inject(); navBehaviour(); heroSlider(); faq(); reveal();
    filters(); chips(); cart(); forms(); anchors(); buildPanel();
  }
  if(document.readyState==="loading") document.addEventListener("DOMContentLoaded", init);
  else init();

})();
