(() => {
  const buttons = [...document.querySelectorAll('.pst-tabs button')];
  const groups = [...document.querySelectorAll('.pst-group')];
  buttons.forEach(button => button.addEventListener('click', () => {
    buttons.forEach(b => b.setAttribute('aria-pressed', String(b === button)));
    groups.forEach((group, index) => { group.hidden = button.dataset.group !== 'all' && button.dataset.group !== String(index); });
  }));
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const observer = new IntersectionObserver(entries => entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    if (!reduced.matches && !document.body.classList.contains('lc-motion-paused')) entry.target.classList.add('pst-arrive');
    observer.unobserve(entry.target);
  }), {threshold:.12});
  document.querySelectorAll('.pst-group>header,.pst-bridge,.pst-close').forEach(el => observer.observe(el));
})();
