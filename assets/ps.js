/* ============================================================
   P.S. Coffee — Shared behaviour  ·  v2
   ============================================================ */
(function(){
  "use strict";

  var PAGES = [
    {href:"pack.html",        label:"Subscribe",   n:"01", primary:true, cls:"pack-link"},
    {href:"menu.html",        label:"Menu",        n:"02", primary:true},
    {href:"about.html#pods",  label:"Visit us",    n:"03", primary:true},
    {href:"app.html",         label:"App",         n:"04", primary:true},
    {href:"story.html",       label:"About",       n:"05", primary:true},
    {href:"partnership.html", label:"Partner",     n:"06", primary:true},
    {href:"about.html",       label:"Pods",        n:"07", primary:true},
    {href:"join.html",        label:"Join us",     n:"08", primary:true}
  ];
  var here = (location.pathname.split("/").pop() || "index.html").toLowerCase();

  /* ---------- svg icons ---------- */
  var ICO = {
    chat:'<svg class="i" viewBox="0 0 24 24"><path d="M21 11.5a8.38 8.38 0 0 1-8.5 8.5 8.5 8.5 0 0 1-3.6-.8L3 21l1.9-5.4A8.5 8.5 0 1 1 21 11.5z"/></svg>',
    user:'<svg class="i" viewBox="0 0 24 24"><circle cx="12" cy="8" r="4"/><path d="M4 21c0-4 3.6-6.5 8-6.5S20 17 20 21"/></svg>',
    heart:'<svg class="i" viewBox="0 0 24 24"><path d="M12 20s-7-4.4-9.2-8.5C1.2 8.3 2.6 5 6 5c2 0 3.2 1.2 4 2.4C10.8 6.2 12 5 14 5c3.4 0 4.8 3.3 3.2 6.5C19 15.6 12 20 12 20z"/></svg>',
    cart:'<svg class="i" viewBox="0 0 24 24"><path d="M5 7h15l-1.5 9.5a2 2 0 0 1-2 1.7H9a2 2 0 0 1-2-1.7L5 4H2"/><circle cx="9.5" cy="21" r="1"/><circle cx="16.5" cy="21" r="1"/></svg>'
  };

  function navHTML(){
    var links = PAGES.filter(function(p){return p.primary;}).map(function(p){
      var act = (p.href === here) ? " active" : "";
      var cls = p.cls ? (" "+p.cls) : "";
      return '<a href="'+p.href+'" class="'+(act+cls).trim()+'">'+p.label+'.</a>';
    }).join("");
    return '<div class="wh-announce">'+
        '<span>○ 100% Arabica. From ₹89. Your coffee is ready before you arrive.</span>'+
        '<span class="wh-region">₹ INR&nbsp;&nbsp;|&nbsp;&nbsp;India</span>'+
      '</div>'+
      '<nav class="nav" id="psNav">'+
        '<a href="index.html" class="nav-logo" aria-label="P.S. Coffee home"><span class="ps-wordmark-ps">P.S.</span> <span class="ps-wordmark-coffee">Coffee.</span></a>'+
        '<div class="nav-links">'+links+'</div>'+
        '<div class="nav-tools">'+
          '<a href="join.html" class="ntool ntool-text" title="Join us">Join us.</a>'+
          '<a href="partnership.html" class="ntool ntool-text" title="Partner">Partner.</a>'+
          '<button class="nav-burger" id="psBurger" aria-label="Menu"><span></span><span></span><span></span></button>'+
        '</div>'+
      '</nav>'+
      '<div class="drawer" id="psDrawer">'+
        PAGES.map(function(p){return '<a href="'+p.href+'"><span>'+p.label+'.</span><span class="n">'+p.n+'</span></a>';}).join("")+
        '<a href="index.html#waitlist"><span>Waitlist.</span><span class="n">→</span></a>'+
      '</div>';
  }

  function footHTML(){
    return '<footer class="footer">'+
      '<div class="wrap">'+
        '<div class="f-top">'+
          '<div class="f-col f-brand">'+
            '<div class="display ps-wordmark"><span class="ps-wordmark-ps">P.S.</span> <span class="ps-wordmark-coffee">Coffee.</span></div>'+
            '<a href="story.html">Story</a><a href="story.html">Journal</a><a href="join.html">Join Us</a><a href="partnership.html">Partner</a>'+
          '</div>'+
          '<div class="f-col"><h4>Pods.</h4>'+
            '<a href="about.html#pods">Visit us</a><a href="app.html">Order ahead</a><a href="partnership.html#host">Host a Pod</a>'+
          '</div>'+
          '<div class="f-col"><h4>Help & Info.</h4>'+
            '<a href="index.html#waitlist">FAQs</a><a href="mailto:hello@pscoffee.in">Contact</a>'+
          '</div>'+
          '<div class="f-col f-mosaic" aria-label="P.S. Coffee imagery">'+
            '<span></span><span></span><span></span><span></span>'+
            '<small>@pscoffee</small>'+
          '</div>'+
          '<div class="f-col f-email"><h4>P.S. See you in the morning.</h4>'+
            '<p>New Pods. Usual orders. Pack reminders. No theatre, no daily friction.</p>'+
            '<form class="news" data-ps-form="newsletter">'+
              '<input name="email" type="email" required placeholder="Email address">'+
              '<button class="btn accent sm" type="submit">Subscribe</button>'+
            '</form>'+
          '</div>'+
        '</div>'+
        '<div class="f-bot">'+
          '<span>© P.S. Coffee 2026</span>'+
          '<span>Terms&nbsp;&nbsp;&nbsp; Privacy&nbsp;&nbsp;&nbsp; Cookies</span>'+
          '<span>Facebook.&nbsp;&nbsp;&nbsp; Instagram.&nbsp;&nbsp;&nbsp; LinkedIn.</span>'+
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
      var a = item.querySelector(".faq-a");
      if(!q||!a) return;
      q.addEventListener("click", function(){
        var open = item.classList.toggle("open");
        a.style.maxHeight = open ? (a.scrollHeight+"px") : "0px";
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

  /* ---------- favourites ---------- */
  function favs(){
    document.querySelectorAll(".fav").forEach(function(f){
      f.addEventListener("click", function(e){ e.preventDefault(); f.classList.toggle("on"); });
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
        if(!ok){ var bad = form.querySelector(".field.invalid input,.field.invalid textarea"); if(bad) bad.focus(); return; }
        try{
          var key="ps-submissions";
          var arr=JSON.parse(localStorage.getItem(key)||"[]");
          arr.push({form:form.getAttribute("data-ps-form")||"form",t:Date.now()});
          localStorage.setItem(key,JSON.stringify(arr));
        }catch(err){}
        var wrap = form.closest("[data-form-wrap]");
        var success = wrap ? wrap.querySelector(".form-success") : null;
        if(success){ form.style.display="none"; success.classList.add("show"); }
        else { showToast('<span><b>Thank you.</b> Noted — genuinely.</span>'); form.reset(); }
      });
      form.querySelectorAll("input,textarea").forEach(function(input){
        input.addEventListener("input", function(){ var f=input.closest(".field"); if(f) f.classList.remove("invalid"); });
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
    filters(); chips(); favs(); cart(); forms(); anchors(); buildPanel();
  }
  if(document.readyState==="loading") document.addEventListener("DOMContentLoaded", init);
  else init();

})();
