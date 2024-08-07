/*
** NOTE: This file is generated by Gulp and should not be edited directly!
** Any changes made directly to this file will be overwritten next time its asset group is processed by Gulp.
*/

var darkThemeName = 'dark';
var lightThemeName = 'light';
var themeStoreKeySuffix = 'theme';
var getTenantName = function getTenantName() {
  return document.documentElement.getAttribute('data-tenant') || 'default';
};
var getStoreKeySuffix = function getStoreKeySuffix() {
  return themeStoreKeySuffix || 'theme';
};
var getStoreKey = function getStoreKey() {
  return "".concat(getTenantName(), "-").concat(getStoreKeySuffix());
};
var getStoredTheme = function getStoredTheme() {
  return localStorage.getItem(getStoreKey());
};
var setStoredTheme = function setStoredTheme(theme) {
  return localStorage.setItem(getStoreKey(), theme);
};
var isDarkMedia = function isDarkMedia() {
  return window.matchMedia('(prefers-color-scheme: dark)').matches;
};
var getPreferredTheme = function getPreferredTheme() {
  var storedTheme = getStoredTheme();
  if (storedTheme) {
    return storedTheme;
  }
  return isDarkMedia() ? darkThemeName : lightThemeName;
};
var setTheme = function setTheme(theme) {
  if (theme === 'auto') {
    document.documentElement.setAttribute('data-bs-theme', isDarkMedia() ? darkThemeName : lightThemeName);
  } else {
    document.documentElement.setAttribute('data-bs-theme', theme);
  }
};
// We need to apply the classes BEFORE the page is rendered. 
// That is why we use a MutationObserver instead of document.Ready().
var themeObserver = new MutationObserver(function (mutations) {
  for (var i = 0; i < mutations.length; i++) {
    for (var j = 0; j < mutations[i].addedNodes.length; j++) {
      if (mutations[i].addedNodes[j].tagName == 'BODY') {
        setTheme(getPreferredTheme());

        // we're done: 
        themeObserver.disconnect();
      }
      ;
    }
  }
});
themeObserver.observe(document.documentElement, {
  childList: true,
  subtree: true
});