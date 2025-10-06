function startWeekOnMonday(table) {
   const tbody = table.querySelector('tbody');
   
   if (tbody && tbody.rows.length === 7) {
      
      // 1. Move the Sunday row (index 0) to the bottom.
      const sundayRow = tbody.rows[0];
      tbody.appendChild(sundayRow);
      
      // 2. The Sunday row, when moved to the bottom, needs its contribution data shifted.
      // Since the calendar graph is a rolling window, moving the Sunday row to the end
      // requires dropping the *oldest* Sunday contribution cell (index 1) to align the remaining 
      // contributions with the now Monday-started week columns
      const lastRow = tbody.rows[tbody.rows.length - 1];
      if (lastRow.cells && lastRow.cells.length >= 2) {
         lastRow.deleteCell(1);
      }

      // 3. Fix the visibility of the "Sun" label. The default GitHub design 
      // uses an inline style (clip-path: Circle(0)) to hide the "Sun" label. 
      // We override this to 'None' to make it visible.
      if (lastRow.cells && lastRow.cells.length > 0) {
         const labelCell = lastRow.cells[0];
         const span = labelCell.querySelector('span[aria-hidden="true"]');
         if (span && span.hasAttribute('style')) {
            const newStyle = span.getAttribute('style').replace('Circle(0)', 'None');
            span.setAttribute('style', newStyle);
         }
      }
   }
}

// --- Initialization and MutationObserver Logic ---

function observeTable() {
   
   // Check if the table is already present
   const table = document.querySelector('.ContributionCalendar-grid');
   if (table) {
      startWeekOnMonday(table);
      return;
   }

   // If not, set up a MutationObserver to watch for it
   const observer = new MutationObserver((mutations, obs) => {
      const table = document.querySelector('.ContributionCalendar-grid');
      if (table) {
         startWeekOnMonday(table);
         obs.disconnect();
      }
   });
   
   // Start observing the body for changes (new content loading)
   observer.observe(document.body, {
      childList: true,
      subtree: true
   });
   
   // Stop observing after a timeout to avoid infinite observation
   setTimeout(() => {
      observer.disconnect();
   }, 5000);
}

// Start the process immediately or after the DOM is fully loaded
if (document.readyState === 'loading') {
   document.addEventListener('DOMContentLoaded', observeTable);
} else {
   observeTable();
}
