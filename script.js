const toggle = document.querySelector('.menu-toggle');
const links = document.querySelector('.nav-links');
if (toggle && links) {
  toggle.addEventListener('click', () => {
    const isOpen = links.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(isOpen));
    toggle.setAttribute('aria-label', isOpen ? 'Close navigation' : 'Toggle navigation');
    toggle.textContent = isOpen ? '×' : '☰';
  });
  links.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
    links.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Toggle navigation');
    toggle.textContent = '☰';
  }));
}
document.getElementById('year').textContent = new Date().getFullYear();


// Accessible light/dark theme switcher. The selected theme is remembered on this device.
const themeButton = document.getElementById('theme-toggle');
const themeIcon = themeButton?.querySelector('.theme-icon');
const themeLabel = themeButton?.querySelector('.theme-label');
const themeMeta = document.getElementById('theme-color-meta');
const savedTheme = (() => {
  try { return localStorage.getItem('nour-portfolio-theme'); } catch (_) { return null; }
})();
const preferredTheme = window.matchMedia?.('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
function applyTheme(theme) {
  document.documentElement.dataset.theme = theme;
  document.documentElement.style.colorScheme = theme;
  if (themeButton) {
    const switchTo = theme === 'dark' ? 'light' : 'dark';
    themeButton.setAttribute('aria-label', `Switch to ${switchTo} mode`);
    themeButton.setAttribute('title', `Switch to ${switchTo} mode`);
    if (themeIcon) themeIcon.textContent = theme === 'dark' ? '☼' : '☾';
    if (themeLabel) themeLabel.textContent = theme === 'dark' ? 'Light mode' : 'Dark mode';
  }
  if (themeMeta) themeMeta.setAttribute('content', theme === 'dark' ? '#101c32' : '#f5f7fb');
}
applyTheme(savedTheme === 'light' || savedTheme === 'dark' ? savedTheme : preferredTheme);
themeButton?.addEventListener('click', () => {
  const nextTheme = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
  applyTheme(nextTheme);
  try { localStorage.setItem('nour-portfolio-theme', nextTheme); } catch (_) {}
});
