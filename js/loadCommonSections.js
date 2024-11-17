// Load common sections (navbar and footer) into the DOM
function loadSection(sectionId, filePath) {
  fetch(filePath)
    .then(response => response.text())
    .then(data => {
      document.getElementById(sectionId).innerHTML = data;
      document.body.classList.remove('hidden');
    })
    .catch(error => console.error('Error loading section:', error));
}

document.addEventListener('DOMContentLoaded', () => {
  loadSection('navbar-container', 'navbar.html');
  loadSection('footer-container', 'footer.html');
});