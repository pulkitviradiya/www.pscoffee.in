/* ============================================================
   P.S. Coffee, Shared behaviour  ·  v5
   ============================================================ */
(function(){
  "use strict";

  var PAGES = [
    {href:"menu.html",        label:"Menu",        n:"01", primary:true},
    {href:"pods.html#pods",   label:"Pods",        n:"02", primary:true},
    {href:"app.html",         label:"App",         n:"03", primary:true},
    {href:"pack.html",        label:"P.S. Pass",   n:"04", primary:true, cls:"pack-link"},
    {href:"about.html",       label:"About",       n:"05", primary:true},
    {href:"events.html",      label:"Events",      n:"06", primary:false},
    {href:"blogs.html",       label:"Journal",     n:"07", primary:false},
    {href:"partnership.html", label:"Partner",     n:"08", primary:false},
    {href:"join.html",        label:"Join us",     n:"09", primary:false}
  ];
  var here = (location.pathname.split("/").pop() || "index.html").toLowerCase();
  var assetDepth = location.pathname.indexOf("/blog/") !== -1 ? "../" : "";
  var isMatcha = document.body.getAttribute("data-page") === "matcha";
  var navWordmark = isMatcha ? "ps-coffee_wordmark_ceremonial.png" : "ps-coffee_wordmark_terracotta.png";
  var navMonogram = isMatcha ? "ps-coffee_monogram_ceremonial_flat.png" : "ps-coffee_monogram_terracotta_flat.png";

  function localHref(href){
    if(!href || href.indexOf("http") === 0 || href.indexOf("mailto:") === 0 || href.charAt(0) === "#") return href;
    return assetDepth + href;
  }


  function navHTML(){
    var links = PAGES.filter(function(p){return p.primary;}).map(function(p){
      var act = (p.href === here) ? " active" : "";
      var cls = p.cls ? (" "+p.cls) : "";
      return '<a href="'+localHref(p.href)+'" class="'+(act+cls).trim()+'"'+(act?' aria-current="page"':'')+'>'+p.label+'.</a>';
    }).join("");
    return '<div class="wh-announce">'+
        '<div class="wh-announce-track">'+
          '<span class="wh-announce-msg">Ahmedabad first.<span class="sep">&#10022;</span>Honest specialty coffee.<span class="sep">&#10022;</span>The menu is taking shape.<span class="sep">&#10022;</span><a href="'+localHref("pods.html#waitlist")+'">Be first in line →</a><span class="sep">&#10022;</span></span>'+
          '<span class="wh-announce-msg" aria-hidden="true">Ahmedabad first.<span class="sep">&#10022;</span>Honest specialty coffee.<span class="sep">&#10022;</span>The menu is taking shape.<span class="sep">&#10022;</span>Be first in line →<span class="sep">&#10022;</span></span>'+
        '</div>'+
      '</div>'+
      '<nav class="nav" id="psNav">'+
        '<a href="'+localHref("index.html")+'" class="nav-logo" aria-label="P.S. Coffee home">'+
          '<img class="ps-logo-img ps-logo-nav ps-logo-nav-word" src="'+localHref("assets/icons/"+navWordmark)+'" alt="P.S. Coffee">'+
          '<img class="ps-logo-img ps-logo-nav ps-logo-nav-mono" src="'+localHref("assets/icons/"+navMonogram)+'" alt="P.S. Coffee">'+
        '</a>'+
        '<div class="nav-links">'+links+'</div>'+
        '<div class="nav-tools">'+
          '<a href="'+localHref("join.html")+'" class="ntool ntool-text'+(here==='join.html'?' active':'')+'" title="Join us">Join us.</a>'+
          '<a href="'+localHref("partnership.html")+'" class="ntool ntool-text'+(here==='partnership.html'?' active':'')+'" title="Partner">Partner.</a>'+
          '<button class="nav-burger" id="psBurger" aria-label="Open menu" aria-controls="psDrawer" aria-expanded="false"><span></span><span></span><span></span></button>'+
        '</div>'+
      '</nav>'+
      '<div class="drawer" id="psDrawer" aria-label="Mobile navigation" aria-hidden="true">'+
        PAGES.map(function(p){var active=p.href===here;var classes=[p.cls||'',active?'active':''].filter(Boolean).join(' ');var dc=classes?' class="'+classes+'"':'';return '<a href="'+localHref(p.href)+'"'+dc+(active?' aria-current="page"':'')+'><span>'+p.label+'.</span><span class="n">'+p.n+'</span></a>';}).join("")+
      '</div>';
  }

  function footHTML(){
    return '<footer class="footer">'+
      '<div class="wrap">'+
        '<div class="f-top">'+
          '<div class="f-col f-brand">'+
            '<div class="display ps-wordmark">'+
              '<img class="ps-logo-img ps-logo-footer" src="'+localHref("assets/icons/ps-coffee_wordmark_steam%20cream.png")+'" alt="P.S. Coffee">'+
            '</div>'+
            '<a href="'+localHref("about.html")+'">Story</a><a href="'+localHref("blogs.html")+'">Journal</a><a href="'+localHref("events.html")+'">Events</a><a href="'+localHref("join.html")+'">Join Us</a><a href="'+localHref("partnership.html")+'">Partner</a>'+
            '<a href="https://www.thebarista.school" target="_blank" rel="noopener">Barista School ↗</a>'+
          '</div>'+
          '<div class="f-col"><h4>Pods.</h4>'+
            '<a href="'+localHref("pods.html#pods")+'">Planned locations</a><a href="'+localHref("app.html")+'">App preview</a><a href="'+localHref("partnership.html#host")+'">Host a Pod</a><a href="'+localHref("coffee-for-offices.html")+'">Coffee for offices</a><a href="'+localHref("coffee-for-coworking-spaces.html")+'">Coffee for co-working</a>'+
          '</div>'+
          '<div class="f-col"><h4>Help & Info.</h4>'+
            '<a href="'+localHref("faq.html")+'">FAQ</a><a href="mailto:hello@pscoffee.in">Contact</a><a href="'+localHref("terms.html")+'">Terms of Use</a><a href="'+localHref("privacy.html")+'">Privacy Policy</a><a href="'+localHref("disclaimer.html")+'">General Disclaimer</a><a href="'+localHref("survey-disclosure.html")+'">Survey Notice</a><a href="'+localHref("copyright.html")+'">Copyright</a>'+
          '</div>'+
          '<div class="f-col f-mosaic" aria-label="P.S. Coffee imagery">'+
            '<span></span><span></span><span></span><span></span>'+
            '<small>@pscoffee</small>'+
          '</div>'+
          '<div class="f-col f-email" data-form-wrap><h4>Be there when the first Pod opens.</h4>'+
            '<p>First access and opening news.</p>'+
            '<form class="news" data-ps-form="newsletter">'+
              '<input type="hidden" name="interest_type" value="launch">'+
              '<label class="visually-hidden" for="psFooterEmail">Email address</label>'+
              '<input id="psFooterEmail" name="email" type="email" required placeholder="Email address" autocomplete="email" inputmode="email" autocapitalize="none">'+
              '<button class="btn accent sm" type="submit" aria-label="Subscribe by email">&rarr;</button>'+
            '</form><p class="form-success" role="status">You are on the list. We will email you with opening news.</p>'+
          '</div>'+
        '</div>'+
        '<div class="f-radhe">|| राधे राधे ||</div>'+
        '<div class="f-bot">'+
          '<span>&copy; P.S. Coffee 2026</span>'+
          '<span class="f-legal"><a href="'+localHref("faq.html")+'">FAQ</a> <a href="'+localHref("terms.html")+'">Terms</a> <a href="'+localHref("privacy.html")+'">Privacy</a> <a href="'+localHref("disclaimer.html")+'">Disclaimer</a> <a href="'+localHref("survey-disclosure.html")+'">Survey</a> <a href="'+localHref("copyright.html")+'">Copyright</a></span>'+
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
    onIdle(function(){
      if(location.hostname === "localhost" || location.hostname === "127.0.0.1") return;
      if(document.querySelector('script[src="/_vercel/insights/script.js"]')) return;
      var va = document.createElement('script');
      va.defer = true;
      va.src = '/_vercel/insights/script.js';
      document.head.appendChild(va);
    });
  }

  /* ---------- nav behaviour ---------- */
  function navBehaviour(){
    var nav = document.getElementById("psNav");
    var wrap = document.getElementById("ps-nav");
    var burger = document.getElementById("psBurger");
    var drawer = document.getElementById("psDrawer");
    if(burger && drawer){
      function closeDrawer(restoreFocus){
        drawer.classList.remove("open");
        drawer.setAttribute("aria-hidden", "true");
        burger.classList.remove("open");
        burger.setAttribute("aria-expanded", "false");
        burger.setAttribute("aria-label", "Open menu");
        document.body.style.overflow = "";
        if(restoreFocus) burger.focus();
      }
      burger.addEventListener("click", function(){
        var open = drawer.classList.toggle("open");
        burger.classList.toggle("open", open);
        burger.setAttribute("aria-expanded", open ? "true" : "false");
        burger.setAttribute("aria-label", open ? "Close menu" : "Open menu");
        drawer.setAttribute("aria-hidden", open ? "false" : "true");
        document.body.style.overflow = open ? "hidden" : "";
        if(open){
          window.setTimeout(function(){ var first=drawer.querySelector("a"); if(first) first.focus(); }, 0);
        }
      });
      drawer.querySelectorAll("a").forEach(function(a){
        a.addEventListener("click", function(){ closeDrawer(false); });
      });
      document.addEventListener("keydown", function(e){
        if(!drawer.classList.contains("open")) return;
        if(e.key === "Escape"){
          closeDrawer(true);
          return;
        }
        if(e.key !== "Tab") return;
        var items = Array.prototype.slice.call(drawer.querySelectorAll("a[href]"));
        if(!items.length) return;
        var first = items[0], lastItem = items[items.length-1];
        if(e.shiftKey && document.activeElement === first){ e.preventDefault(); lastItem.focus(); }
        else if(!e.shiftKey && document.activeElement === lastItem){ e.preventDefault(); first.focus(); }
      });
    }
    if(nav && wrap){
      var last = 0;
      var ticking = false;
      window.addEventListener("scroll", function(){
        if(ticking) return;
        ticking = true;
        requestAnimationFrame(function(){
          var y = window.scrollY || window.pageYOffset || 0;
          if(y > last && y > 260){ wrap.classList.add("hide"); } else { wrap.classList.remove("hide"); }
          last = y;
          ticking = false;
        });
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
                  '<div class="psl-cap">Something good is brewing.</div>';
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
    document.querySelectorAll(".faq-item").forEach(function(item, idx){
      var q = item.querySelector(".faq-q");
      if(!q) return;
      var answer = item.querySelector(".faq-a");
      var qId = q.id || "psFaqQuestion" + idx;
      var aId = answer && (answer.id || "psFaqAnswer" + idx);
      q.id = qId;
      q.setAttribute("aria-expanded", item.classList.contains("open") ? "true" : "false");
      if(answer){
        answer.id = aId;
        answer.setAttribute("role", "region");
        answer.setAttribute("aria-labelledby", qId);
        q.setAttribute("aria-controls", aId);
      }
      q.addEventListener("click", function(){
        item.classList.toggle("open");
        q.setAttribute("aria-expanded", item.classList.contains("open") ? "true" : "false");
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
      tabs.setAttribute("role", "tablist");
      var targetSel = tabs.getAttribute("data-target");
      var target = targetSel ? document.querySelector(targetSel) : tabs.nextElementSibling;
      if(!target) return;
      var items = target.querySelectorAll("[data-cat]");
      function applyFilter(f){
        f = f || "all";
        if(["coffee","matcha","protein"].indexOf(f)!==-1) f="letter";
        if(!Array.from(tabs.querySelectorAll("[data-filter]")).some(function(p){ return p.getAttribute("data-filter") === f; })) f = "all";
        tabs.querySelectorAll("[data-filter]").forEach(function(p){
          var selected = p.getAttribute("data-filter")===f;
          p.classList.toggle("active", selected);
          p.setAttribute("aria-selected", selected ? "true" : "false");
        });
        items.forEach(function(it){
          var show = (f==="all") || it.getAttribute("data-cat")===f;
          it.style.display = show ? "" : "none";
        });
        var total = target.querySelectorAll('.menu-product-wh').length;
        var count = Array.from(items).filter(function(it){return f === 'all' || it.getAttribute('data-cat') === f;}).reduce(function(n,it){return n + it.querySelectorAll('.menu-product-wh').length;},0);
        var label = tabs.querySelector('[data-menu-count]');
        if(label) label.textContent = (f === 'all' ? total + ' items' : count + ' of ' + total + ' items') + '. Menu in development.';
        var heroLink = document.querySelector('body[data-page="menu"] .menu-hero-copy a');
        if(heroLink) heroLink.setAttribute('href', '#menu-' + (f === 'all' ? 'letter' : f));
      }
      tabs.querySelectorAll("[data-filter]").forEach(function(pill){
        pill.setAttribute("role", "tab");
        pill.setAttribute("aria-selected", pill.classList.contains("active") ? "true" : "false");
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
        if(h==="letter" || h==="ps" || h==="food") requested = h;
        else if(h==="coffee" || h==="matcha" || h==="protein") requested = "letter";
      }
      applyFilter(requested || "all");
    });
    document.querySelectorAll("[data-menu-link]").forEach(function(card){
      card.setAttribute("role", "link");
      card.setAttribute("tabindex", "0");
      card.addEventListener("click", function(e){
        if(e.target.closest("button,a")) return;
        location.href = card.getAttribute("data-menu-link");
      });
      card.addEventListener("keydown", function(e){
        if(e.key === "Enter") location.href = card.getAttribute("data-menu-link");
      });
    });
  }

  /* ---------- chips (multi-select) ---------- */
  function chips(){
    document.querySelectorAll(".chip").forEach(function(c){
      c.setAttribute("role", "button");
      c.setAttribute("tabindex", "0");
      c.setAttribute("aria-pressed", c.classList.contains("on") ? "true" : "false");
      function toggle(){
        c.classList.toggle("on");
        c.setAttribute("aria-pressed", c.classList.contains("on") ? "true" : "false");
      }
      c.addEventListener("click", toggle);
      c.addEventListener("keydown", function(e){
        if(e.key === "Enter" || e.key === " "){ e.preventDefault(); toggle(); }
      });
    });
  }

  /* ---------- shared accessibility and mobile input hints ---------- */
  function accessibility(){
    document.querySelectorAll("form").forEach(function(form, formIndex){
      form.querySelectorAll("input:not([type='hidden']),textarea,select").forEach(function(input, inputIndex){
        if(!input.id) input.id = "psField" + formIndex + "_" + inputIndex;
        var field = input.closest(".field");
        var label = field && field.querySelector("label");
        if(label && !label.getAttribute("for")) label.setAttribute("for", input.id);
        if(input.required) input.setAttribute("aria-required", "true");

        var name = (input.name || "").toLowerCase();
        if(input.type === "email" || name.indexOf("email") !== -1){
          input.setAttribute("autocomplete", "email");
          input.setAttribute("inputmode", "email");
          input.setAttribute("autocapitalize", "none");
        }else if(input.type === "tel" || /(mobile|phone|whatsapp)/.test(name)){
          input.setAttribute("autocomplete", "tel");
          input.setAttribute("inputmode", "tel");
        }else if(name === "name"){
          input.setAttribute("autocomplete", "name");
        }else if(/(city|location)/.test(name)){
          input.setAttribute("autocomplete", "address-level2");
        }else if(/(company|organisation|organization)/.test(name)){
          input.setAttribute("autocomplete", "organization");
        }

        var error = field && field.querySelector(".err");
        if(error){
          if(!error.id) error.id = input.id + "Error";
          error.setAttribute("role", "alert");
          error.setAttribute("aria-live", "polite");
          input.setAttribute("aria-describedby", error.id);
        }
      });
    });
  }

  /* ---------- modal focus, dismissal, and scroll restoration ---------- */
  function modalAccessibility(){
    var dialogs = Array.prototype.slice.call(document.querySelectorAll('[role="dialog"][aria-modal="true"]'));
    if(!dialogs.length) return;
    var activeDialog = null;
    var returnFocus = null;

    function focusables(dialog){
      return Array.prototype.slice.call(dialog.querySelectorAll('button,[href],input,select,textarea,[tabindex]:not([tabindex="-1"])'))
        .filter(function(el){ return !el.disabled && el.getClientRects().length; });
    }

    function sync(dialog){
      var open = dialog.classList.contains("on");
      dialog.setAttribute("aria-hidden", open ? "false" : "true");
      if(open){
        activeDialog = dialog;
        returnFocus = document.activeElement;
        document.body.style.overflow = "hidden";
        window.setTimeout(function(){ var items=focusables(dialog); if(items[0]) items[0].focus(); }, 0);
      }else if(activeDialog === dialog){
        activeDialog = null;
        document.body.style.overflow = "";
        if(returnFocus && returnFocus.focus) returnFocus.focus();
        returnFocus = null;
      }
    }

    dialogs.forEach(function(dialog){
      dialog.setAttribute("aria-hidden", dialog.classList.contains("on") ? "false" : "true");
      new MutationObserver(function(){ sync(dialog); }).observe(dialog,{attributes:true,attributeFilter:["class"]});
    });

    document.addEventListener("keydown", function(e){
      if(!activeDialog) return;
      if(e.key === "Escape"){
        activeDialog.classList.remove("on");
        return;
      }
      if(e.key !== "Tab") return;
      var items = focusables(activeDialog);
      if(!items.length){ e.preventDefault(); return; }
      var first = items[0], last = items[items.length-1];
      if(e.shiftKey && document.activeElement === first){ e.preventDefault(); last.focus(); }
      else if(!e.shiftKey && document.activeElement === last){ e.preventDefault(); first.focus(); }
    });
  }

  /* ---------- add to cart (visual) ---------- */
  var cartN = 0;
  function ensureToast(){
    var t = document.getElementById("ps-toast");
    if(!t){
      t = document.createElement("div"); t.id="ps-toast";
      t.innerHTML = '<span class="t-ico"><svg class="i" viewBox="0 0 24 24" style="width:18px;height:18px;stroke:var(--color-success)"><path d="M20 6L9 17l-5-5"/></svg></span><span id="ps-toast-msg"></span>';
      document.body.appendChild(t);
    }
    return t;
  }
  // showToast(boldText, dimSuffix), two text-only args, no HTML accepted
  // showToast(plainText)          , single plain string
  function showToast(boldPart, dimPart){
    var t = ensureToast();
    var msg = t.querySelector("#ps-toast-msg");
    msg.textContent = '';
    if(dimPart !== undefined){
      var b = document.createElement('b'); b.textContent = boldPart;
      var dim = document.createElement('span'); dim.style.opacity = '.7'; dim.textContent = dimPart;
      msg.appendChild(b); msg.appendChild(dim);
    } else {
      msg.textContent = boldPart;
    }
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
        showToast(name, ' added. Visual demo, not live yet');
      });
    });
  }

  function launchForms(){
    document.querySelectorAll('[data-launch-form]').forEach(function(form){
      var method = form.elements.contact_method;
      var area = form.elements.area;
      function sync(){
        form.querySelectorAll('[data-contact]').forEach(function(field){
          var active = field.getAttribute('data-contact') === method.value;
          field.hidden = !active;
          var input = field.querySelector('input');
          input.disabled = !active;
          input.required = active;
          input.setAttribute('aria-required', active ? 'true' : 'false');
          if(!active){ input.value = ''; input.removeAttribute('aria-invalid'); field.classList.remove('invalid'); }
        });
        var other = form.querySelector('[data-other-area]');
        if(other){
          var active = area.value === 'other';
          other.hidden = !active;
          var input = other.querySelector('input');
          input.disabled = !active;
          input.required = active;
          input.setAttribute('aria-required', active ? 'true' : 'false');
          if(!active){ input.value = ''; input.removeAttribute('aria-invalid'); other.classList.remove('invalid'); }
        }
      }
      method.addEventListener('change', sync);
      if(area) area.addEventListener('change', sync);
      var requested = new URLSearchParams(location.search).get('area');
      if(area && requested && Array.from(area.options).some(function(option){return option.value === requested;})) area.value = requested;
      sync();
    });
  }

  /* ---------- forms ---------- */
  var PS_CONVERSION_EVENTS = {
    "newsletter": { event: "sign_up", type: "launch_updates", value: 1 },
    "pod-waitlist": { event: "sign_up", type: "pods", value: 1 },
    "app-waitlist": { event: "sign_up", type: "app", value: 1 },
    "pack-enquiry": { event: "generate_lead", type: "ps_pass", value: 25 },
    "partnership-enquiry": { event: "generate_lead", type: "host_pod", value: 250 },
    "event-enquiry": { event: "generate_lead", type: "events", value: 100 },
    "join-barista": { event: "generate_lead", type: "careers", value: 10 },
    "join-ops": { event: "generate_lead", type: "careers", value: 10 },
    "join-craft": { event: "generate_lead", type: "careers", value: 10 },
    "join-trade": { event: "generate_lead", type: "careers", value: 10 },
    "join-founders": { event: "generate_lead", type: "founding_team", value: 50 },
    "join-investor": { event: "generate_lead", type: "investor", value: 100 }
  };
  var PS_CONVERSION_CONTEXT_KEYS = ["pack", "type", "event_type", "category", "space_type", "partnership_type"];
  function toHex(buffer){
    return Array.prototype.map.call(new Uint8Array(buffer), function(b){
      return b.toString(16).padStart(2, "0");
    }).join("");
  }
  async function sha256(text){
    var data = new TextEncoder().encode(text);
    var digest = await crypto.subtle.digest("SHA-256", data);
    return toHex(digest);
  }
  function ensureAbuseFields(form){
    if(!form) return;
    if(!form.dataset.psStartedAt) form.dataset.psStartedAt = String(Date.now());
    if(!form.querySelector('input[name="ps_company_url"]')){
      var hp = document.createElement("input");
      hp.type = "text";
      hp.name = "ps_company_url";
      hp.tabIndex = -1;
      hp.autocomplete = "off";
      hp.setAttribute("aria-hidden", "true");
      hp.style.position = "absolute";
      hp.style.left = "-10000px";
      hp.style.width = "1px";
      hp.style.height = "1px";
      hp.style.opacity = "0";
      form.appendChild(hp);
    }
  }
  async function prepareAbusePayload(form, payload){
    ensureAbuseFields(form);
    var startedAt = form && form.dataset.psStartedAt || String(Date.now());
    var screenBits = window.screen ? [screen.width, screen.height, screen.colorDepth].join("x") : "";
    var fingerprint = await sha256([
      navigator.userAgent,
      navigator.language,
      Intl.DateTimeFormat().resolvedOptions().timeZone,
      screenBits
    ].join("|"));
    var formName = payload.form_name || form && form.getAttribute("data-ps-form") || "form";
    payload.ps_company_url = form && form.querySelector('input[name="ps_company_url"]') ? form.querySelector('input[name="ps_company_url"]').value : "";
    payload.ps_started_at = startedAt;
    payload.ps_fingerprint = fingerprint;
    payload.ps_form_token = await sha256([formName, startedAt, fingerprint, navigator.userAgent].join("|"));
    return payload;
  }
  window.PSAbuseControls = {
    ensureFields: ensureAbuseFields,
    preparePayload: prepareAbusePayload
  };
  function trackConversion(form, payload){
    var formName = form && form.getAttribute("data-ps-form") || payload && payload.form_name || "form";
    var cfg = PS_CONVERSION_EVENTS[formName] || { event: "generate_lead", type: formName, value: 1 };
    var detail = {
      event: "ps_form_submit_success",
      form_name: formName,
      conversion_event: cfg.event,
      conversion_type: cfg.type,
      conversion_value: cfg.value,
      currency: "INR",
      page_path: window.location.pathname
    };
    PS_CONVERSION_CONTEXT_KEYS.forEach(function(key){
      if(payload && payload[key]) detail[key] = payload[key];
    });
    // Only fixed choices can enter analytics; contact and suggested-area text stay in Sheets.
    if(payload && ['pods','app','pass','launch'].indexOf(payload.interest_type) !== -1) detail.interest_type = payload.interest_type;
    if(payload && ['prahladnagar','sg-highway','gift-city','tcs','sbr','makarba','other'].indexOf(payload.area) !== -1) detail.area = payload.area;
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push(detail);
    if(typeof window.gtag === "function"){
      window.gtag("event", cfg.event, {
        event_category: "lead",
        event_label: formName,
        value: cfg.value,
        currency: "INR",
        interest_type: detail.interest_type,
        area: detail.area
      });
    }
    if(typeof window.fbq === "function"){
      window.fbq("track", "Lead", { content_name: formName, content_category: cfg.type });
    }
  }

  function forms(){
    function setSubmitting(form, submitting){
      form.dataset.submitting = submitting ? "true" : "false";
      form.setAttribute("aria-busy", submitting ? "true" : "false");
      form.querySelectorAll('button[type="submit"],input[type="submit"]').forEach(function(control){
        if(submitting){
          control.dataset.psSubmitLabel = control.tagName === "INPUT" ? control.value : control.textContent;
          if(control.tagName === "INPUT") control.value = "Sending...";
          else control.textContent = "Sending...";
        }else if(control.dataset.psSubmitLabel){
          if(control.tagName === "INPUT") control.value = control.dataset.psSubmitLabel;
          else control.textContent = control.dataset.psSubmitLabel;
          delete control.dataset.psSubmitLabel;
        }
        control.disabled = submitting;
      });
    }

    document.querySelectorAll("form[data-ps-form]").forEach(function(form){
      ensureAbuseFields(form);
      form.setAttribute("novalidate","");
      form.addEventListener("submit", async function(e){
        e.preventDefault();
        if(form.dataset.submitting === "true") return;
        var ok = true;
        form.querySelectorAll("[required]").forEach(function(input){
          var field = input.closest(".field");
          var val = (input.value||"").trim();
          var good = input.disabled || (!!val && input.checkValidity());
          if(input.type==="email"){ good = good && /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(val); }
          if(field){ field.classList.toggle("invalid", !good); }
          input.setAttribute("aria-invalid", good ? "false" : "true");
          if(!good) ok = false;
        });
        if(!ok){ var bad = form.querySelector('[aria-invalid="true"]'); if(bad) bad.focus(); return; }
        var previousError = form.querySelector(".form-error");
        if(previousError) previousError.remove();
        setSubmitting(form, true);
        var controller = typeof AbortController === "function" ? new AbortController() : null;
        var timeout = controller ? setTimeout(function(){ controller.abort(); }, 15000) : null;
        try{
          var payload = { form_name: form.getAttribute('data-ps-form') || 'form' };
          new FormData(form).forEach(function(val, key){
            if(typeof val === 'string') payload[key] = val;
          });
          await prepareAbusePayload(form, payload);
          var response = await fetch('/api/submit-form', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
            signal: controller ? controller.signal : undefined
          });
          var result = await response.json().catch(function(){ return {}; });
          if(!response.ok || result.status !== "ok") throw new Error(result.error || result.message || "Submission failed");
          trackConversion(form, payload);

          try{
            var key="ps-submissions";
            var arr=JSON.parse(localStorage.getItem(key)||"[]");
            arr.push({form:form.getAttribute("data-ps-form")||"form",t:Date.now()});
            localStorage.setItem(key,JSON.stringify(arr));
          }catch(storageError){}

          var wrap = form.closest("[data-form-wrap]");
          var success = wrap ? wrap.querySelector(".form-success") : null;
          if(success){
            form.hidden = true;
            form.style.display="none";
            success.classList.add("show");
            success.setAttribute("role", "status");
            success.setAttribute("tabindex", "-1");
            success.focus();
          }else{
            showToast('Thank you.', ' Noted. Genuinely.');
            form.reset();
          }
        }catch(err){
          var error = form.querySelector('.form-error');
          if(!error){ error = document.createElement('p'); error.className = 'form-error'; error.setAttribute('role', 'alert'); form.appendChild(error); }
          error.textContent = 'Could not send. Your details are still here. Please try again or email hello@pscoffee.in.';
        }finally{
          if(timeout) clearTimeout(timeout);
          setSubmitting(form, false);
        }
      });
      form.querySelectorAll("input,textarea,select").forEach(function(input){
        input.addEventListener("input", function(){ var f=input.closest(".field"); if(f) f.classList.remove("invalid"); input.setAttribute("aria-invalid","false"); });
        input.addEventListener("change", function(){ var f=input.closest(".field"); if(f) f.classList.remove("invalid"); input.setAttribute("aria-invalid","false"); });
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

  /* ---------- Brand Kit 2A: Nectar signature move ---------- */
  var NECTAR_PHRASES = [
    "Nothing to hide",
    "the surprise",
    "a question",
    "The Usual",
    "the office vending machine",
    "closer than you think",
    "Matcha tonight",
    "Make it official",
    "already paid for",
    "Drink daily",
    "Plain and Simple",
    "Spot On Quality",
    "Spot On Pricing",
    "Spot On Reachability",
    "Ahmedabad first.",
    "P.S. Coffee",
    "P.S. Pack",
    "P.S. Pass",
    "No bad coffee mornings",
    "specialty coffee",
    "Specialty Coffee",
    "Specialty",
    "Matcha",
    "Coffee",
    "Packs",
    "Pack",
    "Pods",
    "Pod",
    "App",
    "Events",
    "Journal",
    "Story",
    "Partner",
    "Feedback",
    "FAQ"
  ];

  function escapeRegExp(s){
    return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  }

  function wrapPhraseInTextNode(node, phrase){
    var text = node.nodeValue;
    var re = new RegExp(escapeRegExp(phrase), "i");
    var match = text.match(re);
    if(!match) return false;
    var before = text.slice(0, match.index);
    var hit = text.slice(match.index, match.index + match[0].length);
    var after = text.slice(match.index + match[0].length);
    var frag = document.createDocumentFragment();
    if(before) frag.appendChild(document.createTextNode(before));
    var mark = document.createElement("span");
    mark.className = "nectar-highlight";
    hardenInlineHighlight(mark);
    mark.textContent = hit;
    frag.appendChild(mark);
    if(after) frag.appendChild(document.createTextNode(after));
    node.parentNode.replaceChild(frag, node);
    return true;
  }

  function hardenInlineHighlight(mark){
    if(!mark || !mark.style) return;
    mark.style.boxDecorationBreak = "clone";
    mark.style.setProperty("-webkit-box-decoration-break", "clone");
  }

  function hardenAllInlineHighlights(){
    document.querySelectorAll(".nectar-highlight, mark, .display .highlight, .wh-h1 .highlight, .wh-h2 .highlight").forEach(hardenInlineHighlight);
  }

  function highlightPhrase(el, phrase){
    var walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT, {
      acceptNode: function(node){
        if(!node.nodeValue || !node.nodeValue.trim()) return NodeFilter.FILTER_REJECT;
        var p = node.parentElement;
        if(!p || p.closest(".nectar-highlight, a, button, script, style")) return NodeFilter.FILTER_REJECT;
        return node.nodeValue.toLowerCase().indexOf(phrase.toLowerCase()) !== -1 ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
      }
    });
    var node = walker.nextNode();
    return node ? wrapPhraseInTextNode(node, phrase) : false;
  }

  // No curated phrase matched: fall back to the sentence's last clause
  // (after the final comma/period), since the trade-off or twist a
  // headline is "really about" tends to land in the second half of a
  // two-part sentence, not the opening word, see sec-10.
  function highlightLeadPhrase(el){
    var walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT, {
      acceptNode: function(node){
        if(!node.nodeValue || !node.nodeValue.trim()) return NodeFilter.FILTER_REJECT;
        var p = node.parentElement;
        if(!p || p.closest(".nectar-highlight, a, button, script, style")) return NodeFilter.FILTER_REJECT;
        return NodeFilter.FILTER_ACCEPT;
      }
    });
    var node = walker.nextNode();
    if(!node) return false;
    var text = node.nodeValue;
    var clauses = text.split(/[.,;]+/).map(function(s){ return s.trim(); }).filter(Boolean);
    var clause = clauses.length ? clauses[clauses.length - 1] : text.trim();
    var words = clause.split(/\s+/).filter(Boolean);
    var phrase = words.slice(-4).join(" ");
    if(!phrase) return false;
    return wrapPhraseInTextNode(node, phrase);
  }

  // sec-10 "neutral ground only": the highlight must never land on a bold
  // Terracotta/Ceremonial/Dark-Roast fill, whatever component produced it.
  // Checking the live computed background (rather than hand-maintaining a
  // list of "bold" class names) means new bold sections don't need a new
  // exclusion added here every time one is built.
  var BOLD_GROUND_COLORS = [
    "rgb(232, 64, 12)",  // Terracotta
    "rgb(184, 48, 10)",  // Brick Deep / Terracotta hover
    "rgb(61, 107, 74)",  // Deep Ceremonial
    "rgb(44, 79, 55)",   // Ceremonial deep (footer body row)
    "rgb(61, 32, 16)"    // Dark Roast, type-only, never a real fill, guarded anyway
  ];
  function sitsOnBoldGround(el){
    var node = el;
    while(node && node !== document.documentElement){
      var bg = getComputedStyle(node).backgroundColor;
      if(bg && bg !== "rgba(0, 0, 0, 0)" && bg !== "transparent"){
        return BOLD_GROUND_COLORS.indexOf(bg) !== -1;
      }
      node = node.parentElement;
    }
    return false;
  }

  function nectarSignature(){
    var selector = [
      "h1",
      "section > h2",
      "header > h2",
      ".wh-banner-heading",
      ".wh-modern h1",
      ".wh-sub-copy h2",
      ".wh-page-statement h2",
      ".wh-page-hero h1",
      ".wh-page-hero h2",
      ".wh-page-list-copy h2",
      ".wh-page-card h2",
      ".journal-hero-title",
      ".journal-post-body h2",
      ".journal-index h1"
    ].join(",");
    hardenAllInlineHighlights();
    document.querySelectorAll(selector).forEach(function(el){
      if(el.closest("#ps-nav, .footer, .drawer, .ps-pack-card, .menu-product-wh, .wh-fav-card")) return;
      if(el.querySelector(".nectar-highlight")) return;
      if(sitsOnBoldGround(el)) return;
      var text = (el.textContent || "").replace(/\s+/g, " ").trim();
      if(text.length < 10) return;
      for(var i=0; i<NECTAR_PHRASES.length; i++){
        if(text.toLowerCase().indexOf(NECTAR_PHRASES[i].toLowerCase()) !== -1){
          highlightPhrase(el, NECTAR_PHRASES[i]);
          return;
        }
      }
      highlightLeadPhrase(el);
    });
    hardenAllInlineHighlights();
  }

  /* ============================================================
     TWEAKS PANEL (vanilla), host protocol + localStorage
     ============================================================ */
  var TW_KEY = "ps-tweaks";
  var TW_DEFAULT = { tc:"#E8400C", paper:"#FAF6EE", scale:1, btn:"9px" };
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
    {v:"9px", label:"Soft"},
    {v:"999px", label:"Pill"}
  ];

  function twRead(){ try{ return Object.assign({}, TW_DEFAULT, JSON.parse(localStorage.getItem(TW_KEY)||"{}")); }catch(e){ return Object.assign({},TW_DEFAULT);} }
  function twApply(t){
    var r=document.documentElement;
    r.style.setProperty("--tc", t.tc);
    r.style.setProperty("--wh-tc", t.tc);
    /* brand terracotta uses the canonical Brick Deep hover + Nectar wash tint;
       computed shade/tint only for custom accents picked in the panel */
    if(t.tc === "#E8400C"){
      r.style.setProperty("--tc-deep", "#B8300A");
      r.style.setProperty("--tc-tint", "#FBEFD4");
    }else{
      r.style.setProperty("--tc-deep", shade(t.tc,-14));
      r.style.setProperty("--tc-tint", tint(t.tc));
    }
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
        '<div class="tw-note">P.S. Applies across every page.</div>'+
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
      // Only accept messages from the same origin or the known preview host
      if(e.origin !== window.location.origin && e.origin !== 'https://pscoffee.in' && e.origin !== 'https://www.pscoffee.in') return;
      var ty=e && e.data && e.data.type;
      if(ty==="__activate_edit_mode") panel.classList.add("open");
      else if(ty==="__deactivate_edit_mode") panel.classList.remove("open");
    });
    try{ window.parent.postMessage({type:"__edit_mode_available"},"*"); }catch(e){}
  }

  function onIdle(fn, timeout){
    if("requestIdleCallback" in window){
      window.requestIdleCallback(fn, {timeout: timeout || 1800});
    }else{
      window.setTimeout(fn, timeout || 120);
    }
  }

  /* ---------- boot ---------- */
  twApply(twRead());
  function init(){
    inject(); launchForms(); accessibility(); modalAccessibility(); navBehaviour(); heroSlider(); faq(); reveal();
    filters(); chips(); cart(); forms(); anchors();
    onIdle(nectarSignature, 1200);
    // Tweaks panel is only useful inside an edit/preview parent frame.
    // Skip building it on regular page loads to avoid dead DOM overhead.
    if(window.parent !== window) buildPanel();
  }
  if(document.readyState==="loading") document.addEventListener("DOMContentLoaded", init);
  else init();

})();
