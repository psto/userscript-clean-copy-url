// ==UserScript==
// @name         Clean Copy URL
// @namespace    https://stojanow.com/
// @version      0.1.0
// @description  Clean and copy the URL by pressing "alt+c"
// @author       Piotr Stojanow (https://github.com/psto/)
// @license      MIT
// @homepageURL  https://github.com/psto/userscript-clean-copy-url
// @supportURL   https://github.com/psto/userscript-clean-copy-url
// @icon         data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🔗</text></svg>
// @match        *://*/*
// @grant        none
// ==/UserScript==

(function () {
  'use strict'

  document.addEventListener('keydown', (event) => {
    // Check if the alt and c keys are pressed
    if (event.altKey && event.code === 'KeyC') {
      // Get the current URL
      let url = window.location.href
      // Find the index of the question mark
      const index = url.indexOf('?')
      // If there is a question mark, delete everything after it
      if (index !== -1) {
        url = url.slice(0, index)
        // Replace the current URL with the new one
        window.history.replaceState(null, null, url)
        // Copy the new URL to the clipboard
        navigator.clipboard.writeText(url)
          .then(() => {
            // Go to the new URL
            window.location.href = url
          })
          .catch(() => {
            throw new Error('copying failed')
          })
        // Otherwise just copy the URL
      }
      else {
        navigator.clipboard.writeText(url)
      }
    }
  })
})()
