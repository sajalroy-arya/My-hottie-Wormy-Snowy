const start = document.querySelector('#start-btn');
const intro = document.querySelector('#intro');
const adventure = document.querySelector('#adventure');
const quests = [...document.querySelectorAll('.quest')];
const progress = document.querySelector('#progress');
const finale = document.querySelector('#finale');
const toast = document.querySelector('#toast');
const hearts = document.querySelector('#hearts');
const heartGame = document.querySelector('#heart-game');
const gameHeart = document.querySelector('.game-heart');
const gameScore = document.querySelector('#game-score');
let rescuedKisses = 0;

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

function unlockQuest(quest, message = 'Unlocked! The next part is ready. ♡') {
  const next = quest.querySelector('.next-btn');
  next.disabled = false;
  quest.querySelector('.unlock-note').textContent = message;
  burst(12);
}

function showQuest(index) {
  quests.forEach((quest, questIndex) => quest.classList.toggle('active', questIndex === index));
  progress.style.width = `${((index + 1) / quests.length) * 100}%`;
  burst(16);
}

function moveGameHeart() {
  const maxX = Math.max(0, heartGame.clientWidth - 52);
  const maxY = Math.max(0, heartGame.clientHeight - 52);
  gameHeart.style.left = `${Math.random() * maxX}px`;
  gameHeart.style.top = `${Math.random() * maxY}px`;
}

start.addEventListener('click', () => {
  intro.classList.add('hidden');
  adventure.classList.remove('hidden');
  adventure.scrollIntoView({ behavior: 'smooth', block: 'start' });
  burst(12);
});

document.querySelector('#read-apology').addEventListener('click', (event) => {
  event.currentTarget.classList.add('done');
  event.currentTarget.textContent = 'thank you for reading ♡';
  event.currentTarget.disabled = true;
  unlockQuest(event.currentTarget.closest('.quest'), 'Unlocked. Thank you for giving my sorry a place in your heart.');
});

document.querySelectorAll('.task-choice').forEach((button) => {
  button.addEventListener('click', () => {
    const quest = button.closest('.quest');
    quest.querySelectorAll('.task-choice').forEach((choice) => choice.classList.remove('done'));
    button.classList.add('done');
    showToast(button.dataset.reward);
    unlockQuest(quest, 'Evidence accepted. The next clue is unlocked!');
  });
});

gameHeart.addEventListener('click', () => {
  if (rescuedKisses >= 7) return;
  rescuedKisses += 1;
  gameScore.textContent = `kisses rescued: ${rescuedKisses} / 7`;
  burst(8);
  if (rescuedKisses === 7) {
    gameHeart.style.display = 'none';
    gameScore.textContent = 'kisses rescued: 7 / 7 · all delivered safely!';
    unlockQuest(gameHeart.closest('.quest'), 'All seven kisses are safe. Finale route unlocked!');
    showToast('All 7 kisses rescued! Maneef is officially very kissable.');
  } else {
    moveGameHeart();
  }
});

document.querySelector('#accept-delivery').addEventListener('click', (event) => {
  event.currentTarget.classList.add('done');
  event.currentTarget.textContent = 'comfort parcel received ♡';
  event.currentTarget.disabled = true;
  showToast('Delivery complete: one giant hug, seven forehead kisses, and snacks.');
  unlockQuest(event.currentTarget.closest('.quest'), 'Parcel safely received. You may continue.');
});

document.querySelectorAll('.collect-choice').forEach((button) => {
  button.addEventListener('click', () => {
    const quest = button.closest('.quest');
    if (!button.classList.contains('done')) {
      button.classList.add('done');
      showToast(button.dataset.reward);
      burst(17);
    } else {
      showToast('Already claimed, but you may have another anyway. ♡');
    }
    const total = quest.querySelectorAll('.collect-choice').length;
    const collected = quest.querySelectorAll('.collect-choice.done').length;
    if (collected === total) unlockQuest(quest, 'Everything is packed and ready! ♡');
  });
});

document.querySelectorAll('.quiz-btn').forEach((button) => {
  button.addEventListener('click', () => {
    const quest = button.closest('.quest');
    quest.querySelectorAll('.quiz-btn').forEach((choice) => choice.classList.remove('done'));
    button.classList.add('done');
    showToast(button.dataset.quiz);
    unlockQuest(quest, 'The comedian has been judged. You may proceed.');
  });
});

document.querySelectorAll('.next-btn').forEach((button) => {
  button.addEventListener('click', () => {
    if (button.disabled) return;
    const current = button.closest('.quest');
    const index = quests.indexOf(current);
    if (index < quests.length - 1) {
      showQuest(index + 1);
      adventure.scrollIntoView({ behavior: 'smooth', block: 'start' });
      if (index + 1 === 2) setTimeout(moveGameHeart, 350);
      return;
    }
    adventure.classList.add('hidden');
    finale.classList.remove('hidden');
    finale.scrollIntoView({ behavior: 'smooth', block: 'center' });
    burst(60);
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
