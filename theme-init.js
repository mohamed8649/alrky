(function () {
  var savedTheme = null;

  try {
    savedTheme = localStorage.getItem('site-theme');
  } catch (error) {}

  var prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  document.documentElement.dataset.theme = savedTheme || (prefersDark ? 'dark' : 'light');
})();
