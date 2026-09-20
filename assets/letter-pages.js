(() => {
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const toggle = document.querySelector('.lc-motion-toggle');
  const choices = [...document.querySelectorAll('[data-mood-choice]')];
  let paused = reduced.matches;

  function setMood(mood) {
    const selected = mood === 'matcha' ? 'matcha' : 'coffee';
    document.body.dataset.mood = selected;
    choices.forEach(button => button.setAttribute('aria-pressed', String(button.dataset.moodChoice === selected)));
  }

  function syncMotion() {
    document.body.classList.toggle('lc-motion-paused', paused);
    document.querySelectorAll('img[data-static-src]').forEach(image => {
      image.dataset.motionSrc ||= image.getAttribute('src');
      image.setAttribute('src', paused ? image.dataset.staticSrc : image.dataset.motionSrc);
    });
    if (!toggle) return;
    toggle.disabled = reduced.matches;
    toggle.setAttribute('aria-pressed', String(paused));
    toggle.innerHTML = reduced.matches ? 'Reduced motion on' : paused ? 'Motion paused <span aria-hidden="true">▷</span>' : 'Pause motion <span aria-hidden="true">Ⅱ</span>';
  }

  choices.forEach(button => button.addEventListener('click', () => setMood(button.dataset.moodChoice)));
  toggle?.addEventListener('click', () => { paused = !paused; syncMotion(); });
  reduced.addEventListener('change', () => { paused = reduced.matches; syncMotion(); });
  setMood(document.body.dataset.mood);
  syncMotion();

  if ('IntersectionObserver' in window && !reduced.matches) {
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add('alp-visible'); observer.unobserve(entry.target); }
    }), {threshold: .08});
    document.querySelectorAll('.alp-reveal, .plp-reveal, .aplp-reveal, .mlp-reveal').forEach(section => observer.observe(section));
  } else document.querySelectorAll('.alp-reveal, .plp-reveal, .aplp-reveal, .mlp-reveal').forEach(section => section.classList.add('alp-visible'));
})();
