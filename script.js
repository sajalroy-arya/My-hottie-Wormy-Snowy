const start = document.querySelector('#start-btn');
const intro = document.querySelector('#intro');
const adventure = document.querySelector('#adventure');
const quests = [...document.querySelectorAll('.quest')];
const progress = document.querySelector('#progress');
const finale = document.querySelector('#finale');
const toast = document.querySelector('#toast');
const hearts = document.querySelector('#hearts');

function burst(amount = 20) {
  const icons = ['♥', '♡', '💗', '✨', '💋', '🌸'];
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
  setTimeout(() => toast.classList.remove('show'), 3200);
}

function showQuest(index) {
  quests.forEach((quest, questIndex) => quest.classList.toggle('active', questIndex === index));
  progress.style.width = `${((index + 1) / quests.length) * 100}%`;
  burst(16);
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
    if (index < quests.length - 1) {
      showQuest(index + 1);
      adventure.scrollIntoView({ behavior: 'smooth', block: 'start' });
      return;
    }

    adventure.classList.add('hidden');
    finale.classList.remove('hidden');
    finale.scrollIntoView({ behavior: 'smooth', block: 'center' });
    burst(45);
  });
});

document.querySelectorAll('.reward-btn').forEach((button) => {
  button.addEventListener('click', () => {
    showToast(button.dataset.reward);
    burst(18);
  });
});

document.querySelectorAll('.quiz-btn').forEach((button) => {
  button.addEventListener('click', () => {
    showToast(button.dataset.quiz);
    burst(10);
  });
});

document.querySelector('#kiss-btn').addEventListener('click', () => {
  burst(100);
  showToast('100 kisses successfully delivered to Maneef. MWAH MWAH MWAH!');
});

document.querySelectorAll('.rating-btn').forEach((button) => {
  button.addEventListener('click', () => {
    showToast(button.dataset.rating);
    burst(55);
  });
});
