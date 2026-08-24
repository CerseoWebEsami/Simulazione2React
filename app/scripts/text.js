// text.js - Utility di formattazione testo

/**
 * Rimuove qualsiasi markup HTML e restituisce solo testo semplice.
 * @param {string} html
 * @returns {string}
 */
export function stripHtml(html) {
  if (!html) {
    return '';
  }

  const div = document.createElement('div');
  div.innerHTML = html;
  return div.textContent || div.innerText || '';
}
