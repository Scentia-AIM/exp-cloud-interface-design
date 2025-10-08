(function(){
  // simple active link based on filename
  const path = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.topnav .links a').forEach(a => {
    const target = a.getAttribute('href');
    if (!target) return;
    const tname = target.split('/').pop();
    if (tname === path) a.setAttribute('aria-current','page');
  });

  // animate any progress bars that have data-value
  document.querySelectorAll('.progress[data-value]').forEach(p => {
    const v = Math.max(0, Math.min(100, Number(p.dataset.value||0)));
    const bar = p.querySelector('.bar');
    if (bar) requestAnimationFrame(()=> bar.style.width = v + '%');
  });
})();
