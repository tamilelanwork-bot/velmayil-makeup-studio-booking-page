(() => {
  const toggle = document.querySelector('.reviews-nav');
  const section = document.getElementById('reviews');
  toggle.addEventListener('click', () => {
    const expanded = toggle.getAttribute('aria-expanded') !== 'true';
    toggle.setAttribute('aria-expanded', String(expanded));
    section.classList.toggle('hidden', !expanded);
    if (expanded) section.scrollIntoView({behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'start'});
  });
  const dialog = document.getElementById('reviewDialog');
  const photo = document.getElementById('reviewFull');
  const cards = Array.from(document.querySelectorAll('[data-review]'));
  let current = 0;
  function show(index) {
    current = (index + cards.length) % cards.length;
    photo.src = cards[current].getAttribute('href');
    photo.alt = `Client review screenshot ${current + 1}`;
    document.getElementById('reviewCounter').textContent = `${current + 1} / ${cards.length}`;
    dialog.scrollTop = 0;
  }
  cards.forEach((card, index) => card.addEventListener('click', event => {
    if (typeof dialog.showModal !== 'function') return;
    event.preventDefault(); show(index); dialog.showModal();
  }));
  dialog.querySelector('.review-close').addEventListener('click', () => dialog.close());
  document.getElementById('reviewPrevious').addEventListener('click', () => show(current - 1));
  document.getElementById('reviewNext').addEventListener('click', () => show(current + 1));
  dialog.addEventListener('click', event => { if (event.target === dialog) { const r = dialog.getBoundingClientRect(); if (event.clientX < r.left || event.clientX > r.right || event.clientY < r.top || event.clientY > r.bottom) dialog.close(); } });
  dialog.addEventListener('keydown', event => {
    if (event.key === 'ArrowLeft') { event.preventDefault(); show(current - 1); }
    if (event.key === 'ArrowRight') { event.preventDefault(); show(current + 1); }
  });
})();
