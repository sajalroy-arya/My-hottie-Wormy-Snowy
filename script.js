const start = document.querySelector('#start-btn');
const intro = document.querySelector('#intro');
const adventure = document.querySelector('#adventure');
const quests = [...document.querySelectorAll('.quest')];
const progress = document.querySelector('#progress');
const finale = document.querySelector('#finale');
const toast = document.querySelector('#toast');
const hearts = document.querySelector('#hearts');

function burst(amount = 20) {
  const icons = ['♥', '♡', '💗', '✨', '💋'];
  for (let i = 0; i < amount; i++) {
    const heart = document.createElement('span');
    heart.className = 'heart';
    heart.textContent = icons[Math.floor(Math.random() * icons.length)];
    heart.style.left = `${Math.random() * 100}%`;
    heart.style.bottom = `${-5 - Math.random() * 15}px`;
    heart.style.animationDelay = `${Math.random() * .45}s`;
    hearts.appendChild(heart);
    setTimeout(() => heart.remove(), 3600);
  }
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 2800);
}

start.addEventListener('click', () => {
  intro.classList.add('hidden');
  adventure.classList.remove('hidden');
  adventure.scrollIntoView({ behavior: 'smooth', block: 'start' });
  burst(12);
});

document.querySelectorAll('.next-btn').forEach((button) => {
  button.addEventListener('click', () => {
    const current = button.closest('.quest');
    const index = quests.indexOf(current);
    current.classList.remove('active');
    quests[index + 1].classList.add('active');
    progress.style.width = `${(index + 2) * 33.33}%`;
    burst(16);
  });
});

document.querySelectorAll('.choice').forEach((choice) => {
  choice.addEventListener('click', () => {
    showToast(choice.dataset.reward);
    burst(24);
    setTimeout(() => {
      adventure.classList.add('hidden');
      finale.classList.remove('hidden');
      finale.scrollIntoView({ behavior: 'smooth', block: 'center' });
      burst(30);
    }, 750);
  });
});

document.querySelector('#kiss-btn').addEventListener('click', () => {
  burst(100);
  showToast('100 kisses successfully delivered to Maneef. MWAH MWAH MWAH!');
});
