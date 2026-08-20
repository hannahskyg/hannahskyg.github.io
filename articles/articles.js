// articles.js - Logic for the Articles index listing page

document.addEventListener('DOMContentLoaded', () => {
  // Compute article counts per topic dynamically
  const articles = document.querySelectorAll('.article-preview');
  let counts = {
    all: articles.length,
    career: 0,
    internship: 0,
    academic: 0,
    fun: 0
  };

  articles.forEach(article => {
    const topicsStr = article.getAttribute('data-topics') || '';
    const topicsList = topicsStr.split(',').map(t => t.trim().toLowerCase());
    
    topicsList.forEach(topic => {
      if (counts.hasOwnProperty(topic)) {
        counts[topic]++;
      }
    });
  });

  // Update DOM badges
  for (const [topic, count] of Object.entries(counts)) {
    const badge = document.getElementById(`count-${topic}`);
    if (badge) {
      badge.textContent = `(${count})`;
    }
  }

  // Define filter function
  function filterArticles(topic, btn) {
    // Update active state in sidebar
    document.querySelectorAll('#topics-filter-list a').forEach(el => el.classList.remove('active'));
    btn.classList.add('active');

    // Filter article cards
    articles.forEach(article => {
      const topicsStr = article.getAttribute('data-topics') || '';
      const topicsList = topicsStr.split(',').map(t => t.trim().toLowerCase());

      if (topic === 'all' || topicsList.includes(topic)) {
        article.style.display = 'block';
      } else {
        article.style.display = 'none';
      }
    });
  }

  // Expose to window scope for HTML click events
  window.filterArticles = filterArticles;
});
