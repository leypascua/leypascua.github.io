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

  function setupThemeSwitch() {
    const themeSwitch = document.createElement('button');
    themeSwitch.className = 'theme-switch';
    themeSwitch.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <path d="M12 3c-4.97 0-9 4.03-9 9s4.03 9 9 9 9-4.03 9-9c0-.46-.04-.92-.1-1.36-.98 1.37-2.58 2.26-4.4 2.26-3.03 0-5.5-2.47-5.5-5.5 0-1.82.89-3.42 2.26-4.4-.44-.06-.9-.1-1.36-.1z"/>
      </svg>
      <span>Toggle theme</span>
    `;

    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
    const savedTheme = localStorage.getItem('theme');

    if (savedTheme) {
      document.documentElement.setAttribute('data-theme', savedTheme);
    } else if (prefersDark.matches) {
      document.documentElement.setAttribute('data-theme', 'dark');
    }

    function updateThemeIcon() {
      const isDark =
        document.documentElement.getAttribute('data-theme') === 'dark';
      themeSwitch.innerHTML = isDark
        ? `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path d="M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zM2 13h2c.55 0 1-.45 1-1s-.45-1-1-1H2c-.55 0-1 .45-1 1s.45 1 1 1zm18 0h2c.55 0 1-.45 1-1s-.45-1-1-1h-2c-.55 0-1 .45-1 1s.45 1 1 1zM11 2v2c0 .55.45 1 1 1s1-.45 1-1V2c0-.55-.45-1-1-1s-1 .45-1 1zm0 18v2c0 .55.45 1 1 1s1-.45 1-1v-2c0-.55-.45-1-1-1s-1 .45-1 1zM5.99 4.58c-.39-.39-1.03-.39-1.41 0-.39.39-.39 1.03 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0s.39-1.03 0-1.41L5.99 4.58zm12.37 12.37c-.39-.39-1.03-.39-1.41 0-.39.39-.39 1.03 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0 .39-.39.39-1.03 0-1.41l-1.06-1.06zm1.06-10.96c.39-.39.39-1.03 0-1.41-.39-.39-1.03-.39-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06zM7.05 18.36c.39-.39.39-1.03 0-1.41-.39-.39-1.03-.39-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06z"/>
        </svg>
        <span>Light</span>
      `
        : `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path d="M12 3c-4.97 0-9 4.03-9 9s4.03 9 9 9 9-4.03 9-9c0-.46-.04-.92-.1-1.36-.98 1.37-2.58 2.26-4.4 2.26-3.03 0-5.5-2.47-5.5-5.5 0-1.82.89-3.42 2.26-4.4-.44-.06-.9-.1-1.36-.1z"/>
        </svg>
        <span>Dark</span>
      `;
    }

    themeSwitch.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme);
      updateThemeIcon();
    });

    document.body.appendChild(themeSwitch);
    updateThemeIcon();
  }

  window.addEventListener('load', () => {
    calcYxp();
    setupNavHeader();
    setupThemeSwitch();
  });
})();
