const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzg6RRGEMXsJW72mRlR-GmupMG3M_hcbBzIp8Btp-lKZ0hEbgiJD7aJt2EdZuQMxnar/exec';
 // Показ кнопки теста для английского
  const courseSelect = document.getElementById('courseSelect');
  const levelTestBtn = document.getElementById('levelTestBtn');


  courseSelect.addEventListener('change', () => {
    if(courseSelect.value === 'Английский язык'){
      levelTestBtn.style.display = 'inline-flex';
    } else {
      levelTestBtn.style.display = 'none';
    }
  });

  levelTestBtn.addEventListener('click', () => {
  const questions = [
    { q: "I ___ a student.", options: ["am", "is", "are"], correct: "am" },
    { q: "He ___ to school yesterday.", options: ["go", "went", "gone"], correct: "went" },
    { q: "I have ___ apples.", options: ["some", "any", "many"], correct: "some" },
    { q: "She ___ like coffee.", options: ["don't", "doesn't", "not"], correct: "doesn't" },
    { q: "We ___ football on Sundays.", options: ["play", "plays", "playing"], correct: "play" }
  ];

  let score = 0;

  for (let i = 0; i < questions.length; i++) {
    const ans = prompt(
      `${questions[i].q}\n${questions[i].options.join(", ")}`
    );

    // ❌ Нажали Cancel — сразу выходим из теста
    if (ans === null) {
      alert('Тест отменён');
      return; // ⬅️ КЛЮЧЕВОЙ МОМЕНТ
    }

    if (ans.trim().toLowerCase() === questions[i].correct) {
      score++;
    }
  }

  let level;
  if (score >= 4) level = 'B1';
  else if (score >= 2) level = 'A2';
  else level = 'A1';

  alert(`Ваш уровень английского: ${level}`);

  // сохраняем уровень в форму
  let inputLevel = document.getElementById('levelInput');
  if (!inputLevel) {
    inputLevel = document.createElement('input');
    inputLevel.type = 'hidden';
    inputLevel.name = 'level';
    inputLevel.id = 'levelInput';
    form.appendChild(inputLevel);
  }
  inputLevel.value = level;
});


const form = document.getElementById('myForm');
const status = document.getElementById('status');

form.addEventListener('submit', (e) => {
  e.preventDefault();

  // 🔥 МГНОВЕННЫЙ отклик
  status.textContent = 'Заявка отправлена ✅';
  status.style.color = '#22c55e';

  const formData = new FormData(form);
  form.reset(); // сразу очищаем — нет ощущения тормозов

  // 🚀 отправка в фоне
  fetch(SCRIPT_URL, {
    method: 'POST',
    body: formData
  }).catch(() => {
    status.textContent = 'Ошибка отправки ❌';
    status.style.color = '#ef4444';
  });
});



const wrapper = document.querySelector('.testimonials-wrapper');
const track = document.querySelector('.testimonials');
const prevBtn = document.querySelector('.carousel-btn.prev');
const nextBtn = document.querySelector('.carousel-btn.next');

let index = 0;

function updateCarousel() {
  const cardWidth = track.querySelector('blockquote').offsetWidth + 16; // gap 16px
  track.style.transform = `translateX(${-index * cardWidth}px)`;
}

// Кнопки вперед/назад
nextBtn.addEventListener('click', () => {
  if (index < track.children.length - 1) index++;
  else index = 0;
  updateCarousel();
});

prevBtn.addEventListener('click', () => {
  if (index > 0) index--;
  else index = track.children.length - 1;
  updateCarousel();
});

// Автопрокрутка каждые 4 секунды
setInterval(() => {
  index++;
  if(index >= track.children.length) index = 0;
  updateCarousel();
}, 4000);


