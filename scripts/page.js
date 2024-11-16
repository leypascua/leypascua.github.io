(function () {
  function calcYxp() {
    const startDate = new Date('2006-07-01');
    const today = new Date();
    const yearsXp = Math.floor(
      (today - startDate) / (365.25 * 24 * 60 * 60 * 1000)
    );
    document.getElementById('years-xp').textContent = yearsXp;
  }

  function setupNavHeader() {
    const navHeader = document.querySelector('.nav-header');
    const mainHeader = document.getElementById('main-header');

    const observer = new IntersectionObserver(
      ([entry]) => {
        navHeader.style.transform = entry.isIntersecting
          ? 'translateY(-100%)'
          : 'translateY(0)';
      },
      { threshold: 0 }
    );

    observer.observe(mainHeader);
  }

  window.addEventListener('load', () => {
    calcYxp();
    setupNavHeader();
  });
})();
