(() => {
  const root = document.querySelector('.menu-story');
  if (!root) return;
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const paused = () => reduced.matches || document.body.classList.contains('lc-motion-paused') || document.hidden;
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      if (!paused()) entry.target.classList.add('ms-enter');
      observer.unobserve(entry.target);
    });
  }, {threshold: .2});
  root.querySelectorAll('.ms-overture h2,.menu-category-wh>header,.menu-subcat-label,.ms-signoff>span').forEach(element => observer.observe(element));
})();
