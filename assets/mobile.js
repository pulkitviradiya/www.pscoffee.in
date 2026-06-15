/* P.S. Coffee mobile-only interactions. */
(function(){
  "use strict";

  var mobileMQ = window.matchMedia ? window.matchMedia("(max-width: 760px)") : null;

  function isMobile(){
    return !mobileMQ || mobileMQ.matches;
  }

  function homeHeroSlider(){
    var wrap = document.querySelector('body[data-page="home"] .wh-banners');
    if(!wrap || wrap.getAttribute("data-mobile-slider-ready")) return;

    var slides = Array.prototype.slice.call(wrap.querySelectorAll(".wh-banner"));
    if(slides.length < 2) return;

    wrap.setAttribute("data-mobile-slider-ready", "true");
    slides.forEach(function(slide, idx){
      slide.classList.toggle("is-active", idx === 0);
      slide.setAttribute("data-mobile-slide", String(idx));
    });

    var count = document.createElement("div");
    count.className = "mobile-hero-count";
    count.setAttribute("aria-label", "Home hero slides");

    slides.forEach(function(_, idx){
      var button = document.createElement("button");
      button.type = "button";
      button.textContent = String(idx + 1).padStart(2, "0");
      button.className = idx === 0 ? "is-active" : "";
      button.setAttribute("aria-label", "Show slide " + (idx + 1));
      button.addEventListener("click", function(){ show(idx, true); });
      count.appendChild(button);
    });

    var progress = document.createElement("div");
    progress.className = "mobile-hero-progress";
    progress.innerHTML = "<span></span>";
    wrap.appendChild(count);
    wrap.appendChild(progress);

    var active = 0;
    var timer = null;

    function setProgress(){
      var bar = progress.querySelector("span");
      if(!bar) return;
      bar.style.transform = "scaleX(" + ((active + 1) / slides.length) + ")";
    }

    function show(next, manual){
      slides[active].classList.remove("is-active");
      count.children[active].classList.remove("is-active");
      active = (next + slides.length) % slides.length;
      slides[active].classList.add("is-active");
      count.children[active].classList.add("is-active");
      setProgress();
      if(manual) restart();
    }

    function restart(){
      clearInterval(timer);
      if(isMobile()){
        timer = setInterval(function(){ show(active + 1, false); }, 5200);
      }
    }

    setProgress();
    restart();

    if(mobileMQ && mobileMQ.addEventListener){
      mobileMQ.addEventListener("change", restart);
    }
  }

  function compactMobileLabels(){
    if(!isMobile()) return;
    document.querySelectorAll('body[data-page="home"] .wh-product-card button').forEach(function(button){
      if(button.getAttribute("data-mobile-label-ready")) return;
      button.setAttribute("data-mobile-label-ready", "true");
      button.childNodes.forEach(function(node){
        if(node.nodeType === 3 && node.textContent.indexOf("Add to cart") !== -1){
          node.textContent = "Menu price ";
        }
      });
    });
  }

  function init(){
    homeHeroSlider();
    compactMobileLabels();
  }

  if(document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
