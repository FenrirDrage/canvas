// Referências aos elementos de canvas e input
const dislexiaCanvas = document.getElementById("dislexiaCanvas");
const discalculiaCanvas = document.getElementById("discalculiaCanvas");
const dislexiaCtx = dislexiaCanvas.getContext("2d");
const discalculiaCtx = discalculiaCanvas.getContext("2d");
const dislexiaTextbox = document.getElementById("dislexiaTextbox");
const dislexiaInput = document.getElementById("dislexiaInput");
const discalculiaQuestions = document.getElementById("discalculiaQuestions");
const pointsInput = document.getElementById("pointsInput");
const squaresInput = document.getElementById("squaresInput");

let currentWord = "letter"; // Palavra correta a ser mostrada no jogo de dislexia
let shuffledWord = ""; // Palavra com letras embaralhadas no jogo de dislexia
let isDislexiaGameRunning = false;

let totalPoints = 0; // Total de pontos gerados no lado esquerdo
let totalSquares = 0; // Total de quadrados gerados no lado direito

// Funções para iniciar os jogos
function startDislexiaGame() {
  dislexiaCanvas.style.display = "block";
  dislexiaTextbox.style.display = "block";
  discalculiaCanvas.style.display = "none";
  discalculiaQuestions.style.display = "none";
  isDislexiaGameRunning = true;

  shuffleWord();
  animateDislexiaGame();
}

function startDiscalculiaGame() {
  dislexiaCanvas.style.display = "none";
  dislexiaTextbox.style.display = "none";
  discalculiaCanvas.style.display = "block";
  discalculiaQuestions.style.display = "block";

  generateShapes(); // Gerar os pontos e quadrados
}

// Função para gerar os pontos e quadrados no canvas
function generateShapes() {
  discalculiaCtx.clearRect(
    0,
    0,
    discalculiaCanvas.width,
    discalculiaCanvas.height
  );

  // Dividir o canvas ao meio
  const middleX = discalculiaCanvas.width / 2;

  // Gerar um número aleatório de pontos (círculos) para o lado esquerdo
  totalPoints = Math.floor(Math.random() * 6) + 1; // De 1 a 6 pontos
  for (let i = 0; i < totalPoints; i++) {
    const x = Math.random() * middleX;
    const y = Math.random() * discalculiaCanvas.height;
    drawCircle(x, y);
  }

  // Gerar um número aleatório de quadrados para o lado direito
  totalSquares = Math.floor(Math.random() * 6) + 1; // De 1 a 6 quadrados
  for (let i = 0; i < totalSquares; i++) {
    const x = middleX + Math.random() * middleX;
    const y = Math.random() * discalculiaCanvas.height;
    drawSquare(x, y);
  }
}

// Função para desenhar um círculo (ponto)
function drawCircle(x, y) {
  discalculiaCtx.beginPath();
  discalculiaCtx.arc(x, y, 10, 0, Math.PI * 2);
  discalculiaCtx.fillStyle = "blue";
  discalculiaCtx.fill();
}

// Função para desenhar um quadrado
function drawSquare(x, y) {
  discalculiaCtx.beginPath();
  discalculiaCtx.rect(x, y, 20, 20);
  discalculiaCtx.fillStyle = "red";
  discalculiaCtx.fill();
}

// Função para verificar se a resposta está correta
function checkDiscalculiaAnswer() {
  const pointsAnswer = parseInt(pointsInput.value);
  const squaresAnswer = parseInt(squaresInput.value);

  if (pointsAnswer === totalPoints && squaresAnswer === totalSquares) {
    alert("Correto!");
  } else {
    alert("Tenta novamente!");
  }

  // Limpar as inputs para próxima tentativa
  pointsInput.value = "";
  squaresInput.value = "";
}

// Jogo de dislexia (já implementado antes)
function shuffleWord() {
  let letters = currentWord.split("");
  for (let i = letters.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [letters[i], letters[j]] = [letters[j], letters[i]];
  }
  shuffledWord = letters.join("");
}

function animateDislexiaGame() {
  if (!isDislexiaGameRunning) return;

  shuffleWord(); // Troca as letras cada vez que a função é chamada
  dislexiaCtx.clearRect(0, 0, dislexiaCanvas.width, dislexiaCanvas.height);
  dislexiaCtx.font = "30px Arial";
  dislexiaCtx.fillText(shuffledWord, 50, 100);

  // Animação continua a ser executada
  setTimeout(animateDislexiaGame, 1000); // Atualiza a cada 1 segundo
}

function checkDislexiaWord() {
  const userInput = dislexiaInput.value.toLowerCase();
  if (userInput === currentWord) {
    alert("Correto!");
    dislexiaInput.value = ""; // Limpa a caixa de texto
    isDislexiaGameRunning = false; // Para a animação
    dislexiaCanvas.style.display = "none"; // Esconde o canvas
    dislexiaTextbox.style.display = "none"; // Esconde a textbox
  } else {
    alert("Tenta novamente!");
  }
}
