// global.js - Shared scripts for The Gonzalez Times

document.addEventListener('DOMContentLoaded', () => {
  // ── Date ──
  const now = new Date();
  const ds = now.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }).toUpperCase();
  const hdate = document.getElementById('hdate');
  if (hdate) hdate.textContent = ds;
  const fy = document.getElementById('fyear');
  if (fy) fy.textContent = now.getFullYear();

  // ── Navigation Auto-Highlight & Vol/No Setup ──
  const path = window.location.pathname;
  let pageId = 'home';
  let volText = 'Vol. I, No. 1';

  if (path.includes('/projects/')) {
    pageId = 'projects';
    volText = 'Vol. I, No. 2';
  } else if (path.includes('/resume/')) {
    pageId = 'resume';
    volText = 'Vol. I, No. 3';
  } else if (path.includes('/articles/')) {
    pageId = 'articles';
    volText = 'Vol. I, No. 4';
  } else if (path.includes('/contact/')) {
    pageId = 'contact';
    volText = 'Vol. I, No. 5';
  }

  // Update navbar active link
  const activeNav = document.getElementById('n-' + pageId);
  if (activeNav) {
    document.querySelectorAll('.tnav a').forEach(a => a.classList.remove('active'));
    activeNav.classList.add('active');
  }

  // Update Vol/No based on page
  const volNo = document.getElementById('vol-no');
  if (volNo) {
    volNo.textContent = volText;
  }

  // ── Skill bars animation (if present) ──
  function animSkills() {
    document.querySelectorAll('.sfill').forEach(el => {
      const w = el.getAttribute('data-w');
      setTimeout(() => { el.style.width = w + '%'; }, 60);
    });
  }
  setTimeout(animSkills, 150);
});