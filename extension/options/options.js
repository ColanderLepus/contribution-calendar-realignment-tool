// Handles saving and restoring the realignment setting
const checkbox = document.getElementById('enableRealignment');

// Use browser.storage if available (preferred in modern browsers), otherwise fall back to chrome.storage.
// This ensures compatibility across Chrome, Firefox, and other browsers supporting the WebExtension API.
const storage = (typeof browser !== 'undefined' && browser.storage) ? browser.storage : chrome.storage;

// Load setting on page load
window.addEventListener('DOMContentLoaded', () => {
  // Get the setting from storage (default: true)
  storage.sync.get({ enableRealignment: true }, (items) => {
    // Set checkbox state based on stored value
    checkbox.checked = items.enableRealignment;
  });
});

// Save setting when changed
checkbox.addEventListener('change', () => {
  // Store the new value in browser/chrome storage
  storage.sync.set({ enableRealignment: checkbox.checked });
});
