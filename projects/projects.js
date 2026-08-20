// projects.js - Projects page specific logic

function filterProjects(type, btn) {
  // Update active button state
  document.querySelectorAll('#project-filters .mchip').forEach(el => el.classList.remove('on'));
  btn.classList.add('on');

  // Filter project cards
  const projects = document.querySelectorAll('#projects-grid .pcard');
  projects.forEach(card => {
    if (type === 'all' || card.getAttribute('data-type') === type) {
      card.style.display = 'block';
    } else {
      card.style.display = 'none';
    }
  });
}

// Expose to window scope for inline HTML event handlers
window.filterProjects = filterProjects;
