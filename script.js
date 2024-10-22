// Referências aos elementos de canvas e input
const dislexiaCanvas = document.getElementById('dislexiaCanvas');
const discalculiaCanvas = document.getElementById('discalculiaCanvas');
const dislexiaCtx = dislexiaCanvas.getContext('2d');
const dislexiaTextbox = document.getElementById('dislexiaTextbox');
const dislexiaInput = document.getElementById('dislexiaInput');

let currentWord = 'frigorifico'; // Palavra correta a ser mostrada
let shuffledWord = ''; // Palavra com letras embaralhadas
let isDislexiaGameRunning = false;

// Funções para iniciar os jogos
function startDislexiaGame() {
  dislexiaCanvas.style.display = 'block';
  dislexiaTextbox.style.display = 'block';
  discalculiaCanvas.style.display = 'none';
  isDislexiaGameRunning = true;

  shuffleWord();
  animateDislexiaGame();
}

function startDiscalculiaGame() {
  dislexiaCanvas.style.display = 'none';
  dislexiaTextbox.style.display = 'none';
  discalculiaCanvas.style.display = 'block';
  isDislexiaGameRunning = false;

  // Iniciar lógica do jogo de Discalculia aqui...
}

// Função para embaralhar a palavra
function shuffleWord() {
  let letters = currentWord.split('');
  for (let i = letters.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [letters[i], letters[j]] = [letters[j], letters[i]];
  }
  shuffledWord = letters.join('');
}

// Função para animar o jogo de dislexia (troca de letras)
function animateDislexiaGame() {
  if (!isDislexiaGameRunning) return;

  shuffleWord(); // Troca as letras cada vez que a função é chamada
  dislexiaCtx.clearRect(0, 0, dislexiaCanvas.width, dislexiaCanvas.height);
  dislexiaCtx.font = '30px Arial';
  dislexiaCtx.fillText(shuffledWord, 50, 100);

  // Animação continua a ser executada
  setTimeout(animateDislexiaGame, 1000); // Atualiza a cada 1 segundo
}

// Função para verificar se a palavra digitada está correta
function checkDislexiaWord() {
  const userInput = dislexiaInput.value.toLowerCase();
  if (userInput === currentWord) {
    alert('Correto!');
    dislexiaInput.value = ''; // Limpa a caixa de texto
    isDislexiaGameRunning = false; // Para a animação
    dislexiaCanvas.style.display = 'none'; // Esconde o canvas
    dislexiaTextbox.style.display = 'none'; // Esconde a textbox
  } else {
    alert('Tenta novamente!');
  }
}
