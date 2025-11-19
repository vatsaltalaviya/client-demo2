const menuBtn = document.getElementById('menu-btn');
const navMenu = document.querySelector('nav ul.menu');

// Toggle mobile menu
menuBtn.addEventListener('click', () => {
  navMenu.classList.toggle('show');
});

// Toggle submenus on mobile
document.querySelectorAll('nav ul.menu li > a').forEach(link => {
  link.addEventListener('click', e => {
    const submenu = link.nextElementSibling;
    if(submenu && submenu.classList.contains('submenu')) {
      e.preventDefault();
      link.parentElement.classList.toggle('active');
    }
  });
});

// Close mobile menu when clicking outside
document.addEventListener('click', e => {
  if(!navMenu.contains(e.target) && !menuBtn.contains(e.target)) {
    navMenu.classList.remove('show');
    document.querySelectorAll('nav ul.menu li.active').forEach(item => item.classList.remove('active'));
  }
});
