(() => {
  const header = document.querySelector('.lc-nav');
  const toggle = header?.querySelector('.lc-menu-toggle');
  const menu = header?.querySelector('nav[aria-label="Main navigation"]');
  if (!header || !toggle || !menu) return;

  function closeMenu({ restoreFocus = false } = {}) {
    header.dataset.menuOpen = 'false';
    toggle.setAttribute('aria-expanded', 'false');
    if (restoreFocus) toggle.focus();
  }

  toggle.addEventListener('click', () => {
    const open = header.dataset.menuOpen !== 'true';
    header.dataset.menuOpen = String(open);
    toggle.setAttribute('aria-expanded', String(open));
  });
  menu.addEventListener('click', event => { if (event.target.closest('a')) closeMenu(); });
  document.addEventListener('click', event => { if (!header.contains(event.target)) closeMenu(); });
  document.addEventListener('keydown', event => { if (event.key === 'Escape' && header.dataset.menuOpen === 'true') closeMenu({restoreFocus:true}); });
  matchMedia('(min-width: 1025px)').addEventListener('change', event => { if (event.matches) closeMenu(); });
})();

(() => {
  const tabs = [...document.querySelectorAll('.lc-tabs [role="tab"]')];
  function activate(tab) {
    tabs.forEach(item => {
      const selected = item === tab;
      item.setAttribute('aria-selected', String(selected));
      item.tabIndex = selected ? 0 : -1;
      document.getElementById(item.getAttribute('aria-controls')).hidden = !selected;
    });
  }
  tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => activate(tab));
    tab.addEventListener('keydown', event => {
      let next;
      if(event.key === 'ArrowRight' || event.key === 'ArrowLeft') next = tabs[(index + 1) % tabs.length];
      if(event.key === 'Home') next = tabs[0];
      if(event.key === 'End') next = tabs[tabs.length - 1];
      if(next) { event.preventDefault(); activate(next); next.focus(); }
    });
  });
  if ('IntersectionObserver' in window && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if(entry.isIntersecting) { entry.target.classList.remove('lc-waiting'); observer.unobserve(entry.target); }
    }), {threshold:0.08});
    document.querySelectorAll('.lc-reveal').forEach(section => {
      if(section.getBoundingClientRect().top > innerHeight) { section.classList.add('lc-waiting'); observer.observe(section); }
    });
  }
})();

(() => {
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const toggle = document.querySelector('.lc-motion-toggle');
  const journey = document.querySelector('.lc-go');
  const replay = document.querySelector('.lc-go-replay');
  let paused = reduced.matches;
  function syncMotion() {
    document.body.classList.toggle('lc-motion-paused', paused);
    const prototype = document.querySelector('.lc-app img');
    prototype.src = paused ? 'assets/photos/site/app-range-panel-desktop.webp' : 'assets/photos/home-p-s-coffee-app-desktop.gif';
    toggle.disabled = reduced.matches;
    replay.disabled = reduced.matches;
    toggle.setAttribute('aria-pressed', String(paused));
    toggle.innerHTML = reduced.matches ? 'Reduced motion on' : paused ? 'Motion paused <span aria-hidden="true">▷</span>' : 'Pause motion <span aria-hidden="true">Ⅱ</span>';
  }
  toggle.addEventListener('click', () => { paused = !paused; syncMotion(); });
  reduced.addEventListener('change', () => { paused = reduced.matches; syncMotion(); });
  syncMotion();
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(entries => entries.forEach(entry => journey.classList.toggle('in-view', entry.isIntersecting)), {threshold:.15}).observe(journey);
  } else journey.classList.add('in-view');
  replay.addEventListener('click', () => {
    if (reduced.matches) { replay.textContent = 'Static journey · reduced motion'; return; }
    paused = false; syncMotion();
    journey.classList.add('lc-restarting');
    requestAnimationFrame(() => requestAnimationFrame(() => journey.classList.remove('lc-restarting')));
  });
})();

(() => {
  const choices = [...document.querySelectorAll('[data-mood-choice]')];
  function setMood(mood) {
    const selected = mood === 'matcha' ? 'matcha' : 'coffee';
    document.body.dataset.mood = selected;
    choices.forEach(button => button.setAttribute('aria-pressed', String(button.dataset.moodChoice === selected)));
    try { localStorage.setItem('ps-letter-mood', selected); } catch (_) { /* Mood works without storage. */ }
  }
  let saved = 'coffee';
  try { saved = localStorage.getItem('ps-letter-mood') || 'coffee'; } catch (_) {}
  setMood(saved);
  choices.forEach(button => button.addEventListener('click', () => setMood(button.dataset.moodChoice)));
})();
