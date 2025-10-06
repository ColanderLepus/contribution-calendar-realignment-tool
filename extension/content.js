function startWeekOnMonday(table) {
   
   // Prevent repeated modification
   if (table.dataset.weekMondayCorrected) return;
   
   const tbody = table.querySelector('tbody');
   if (tbody && tbody.rows.length === 7) {
      
      // 1. Move the Sunday row (index 0) to the bottom.
      const sundayRow = tbody.rows[0];
      tbody.appendChild(sundayRow);
      
      // 2. Shift Sunday row's contribution data
      const lastRow = tbody.rows[tbody.rows.length - 1];
      if (lastRow.cells && lastRow.cells.length >= 2) {
         lastRow.deleteCell(1);
      }
      
      // 3. Fix the visibility of the "Sun" label
      if (lastRow.cells && lastRow.cells.length > 0) {
         const labelCell = lastRow.cells[0];
         const span = labelCell.querySelector('span[aria-hidden="true"]');
         if (span && span.hasAttribute('style')) {
            const newStyle = span.getAttribute('style').replace('Circle(0)', 'None');
            span.setAttribute('style', newStyle);
         }
      }

      // 4. Mark as corrected
      table.dataset.weekMondayCorrected = 'true';
   }
}

// --- Initialization and MutationObserver Logic ---

function observeTable() {
   
   // Try to correct immediately
   const table = document.querySelector('.ContributionCalendar-grid');
   if (table) {
      startWeekOnMonday(table);
   }
   
   // Observe for future changes
   const observer = new MutationObserver(() => {
      const table = document.querySelector('.ContributionCalendar-grid');
      if (table) {
         startWeekOnMonday(table);
      }
   });

   // Start observing the body for changes
   observer.observe(document.body, {
      childList: true,
      subtree: true
   });

   // Disconnect observer if .js-yearly-contributions is not present after 5 seconds
   setTimeout(() => {
      if (!document.querySelector('.js-yearly-contributions')) {
         observer.disconnect();
      }
   }, 5000);
}

// Safe URL change detection
function onUrlChange(callback) {
   let lastUrl = location.href;
   const checkUrl = () => {
      if (location.href !== lastUrl) {
         lastUrl = location.href;
         callback();
      }
   };
   window.addEventListener('popstate', checkUrl);
   setInterval(checkUrl, 500);
}

// Main entry point
function main() {
   observeTable();
   onUrlChange(() => {
      observeTable();
   });
}

// Run main when DOM is ready
if (document.readyState === 'loading') {
   document.addEventListener('DOMContentLoaded', main);
} else {
   main();
}
