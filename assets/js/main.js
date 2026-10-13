// ── Date ──
const now = new Date();
const ds = now.toLocaleDateString('en-US', { year:'numeric', month:'long', day:'numeric' }).toUpperCase();
const hdate = document.getElementById('hdate');
if (hdate) hdate.textContent = ds;
const fy = document.getElementById('fyear');
if (fy) fy.textContent = now.getFullYear();

// ── Skill bars ──
function animSkills() {
  document.querySelectorAll('.sfill').forEach(el => {
    const w = el.getAttribute('data-w');
    setTimeout(() => { el.style.width = w + '%'; }, 60);
  });
}

// ── Init ──
setTimeout(() => { animSkills(); }, 150);
