// --- ROULETTE ---
const WHEEL_NUMBERS = [
  0, 32, 15, 19, 4, 21, 2, 25, 17, 34, 6, 27, 13, 36, 11, 30, 8, 23, 10,
  5, 24, 16, 33, 1, 20, 14, 31, 9, 22, 18, 29, 7, 28, 12, 35, 3, 26
];
const redNumbers = [1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36];

function getRouletteColor(num) {
  if (num === 0) return "vert";
  return redNumbers.includes(num) ? "rouge" : "noir";
}

const canvas = document.getElementById('roulette-canvas');
const ctx = canvas.getContext('2d');
let currentWheelAngle = 0;
let rouletteSpinning = false;
const rouletteHistory = [];

function drawRouletteWheel(angle) {
  const centerX = canvas.width / 2;
  const centerY = canvas.height / 2;
  const outerRadius = 285;
  const sliceAngle = (2 * Math.PI) / WHEEL_NUMBERS.length;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.save();
  ctx.beginPath();
  ctx.arc(centerX, centerY, outerRadius + 20, 0, 2 * Math.PI);
  const woodGrad = ctx.createRadialGradient(centerX, centerY, outerRadius - 10, centerX, centerY, outerRadius + 20);
  woodGrad.addColorStop(0, '#2d1408');
  woodGrad.addColorStop(0.5, '#6a3417');
  woodGrad.addColorStop(0.9, '#1a0a03');
  woodGrad.addColorStop(1, '#0c0401');
  ctx.fillStyle = woodGrad;
  ctx.fill();
  ctx.restore();

  ctx.save();
  ctx.beginPath();
  ctx.arc(centerX, centerY, outerRadius, 0, 2 * Math.PI);
  ctx.lineWidth = 7;
  ctx.strokeStyle = '#d4af37';
  ctx.shadowColor = 'rgba(0,0,0,0.8)';
  ctx.shadowBlur = 8;
  ctx.stroke();
  ctx.restore();

  ctx.save();
  ctx.translate(centerX, centerY);
  ctx.rotate(angle);

  for (let i = 0; i < WHEEL_NUMBERS.length; i++) {
    const num = WHEEL_NUMBERS[i];
    const colorType = getRouletteColor(num);
    const start = i * sliceAngle;
    const end = start + sliceAngle;

    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.arc(0, 0, outerRadius, start, end);
    ctx.closePath();

    if (colorType === 'vert') ctx.fillStyle = '#065f46';
    else if (colorType === 'rouge') ctx.fillStyle = '#991b1b';
    else ctx.fillStyle = '#181f2c';
    ctx.fill();

    ctx.lineWidth = 2;
    ctx.strokeStyle = '#fef08a';
    ctx.stroke();

    ctx.save();
    ctx.rotate(start + sliceAngle / 2);
    ctx.textAlign = 'right';
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 20px "Plus Jakarta Sans", system-ui, sans-serif';
    ctx.shadowColor = 'rgba(0,0,0,0.9)';
    ctx.shadowBlur = 4;
    ctx.fillText(num, outerRadius - 18, 7);
    ctx.restore();
  }

  ctx.beginPath();
  ctx.arc(0, 0, 140, 0, 2 * Math.PI);
  const bowlGrad = ctx.createRadialGradient(0, 0, 60, 0, 0, 140);
  bowlGrad.addColorStop(0, '#b45309');
  bowlGrad.addColorStop(0.35, '#fbbf24');
  bowlGrad.addColorStop(0.7, '#78350f');
  bowlGrad.addColorStop(1, '#1c0d02');
  ctx.fillStyle = bowlGrad;
  ctx.fill();

  ctx.beginPath();
  ctx.arc(0, 0, 72, 0, 2 * Math.PI);
  ctx.fillStyle = 'rgba(0, 0, 0, 0.65)';
  ctx.fill();

  ctx.beginPath();
  ctx.arc(0, 0, 62, 0, 2 * Math.PI);
  const baseGrad = ctx.createRadialGradient(0, 0, 0, 0, 0, 62);
  baseGrad.addColorStop(0, '#fef08a');
  baseGrad.addColorStop(0.4, '#d97706');
  baseGrad.addColorStop(0.85, '#92400e');
  baseGrad.addColorStop(1, '#451a03');
  ctx.fillStyle = baseGrad;
  ctx.fill();
  ctx.lineWidth = 3;
  ctx.strokeStyle = '#fef08a';
  ctx.stroke();

  for (let b = 0; b < 4; b++) {
    ctx.save();
    ctx.rotate((b * Math.PI) / 2);

    ctx.fillStyle = 'rgba(0,0,0,0.45)';
    ctx.beginPath();
    ctx.ellipse(3, -55, 6, 25, 0, 0, 2 * Math.PI);
    ctx.fill();

    const spokeGrad = ctx.createLinearGradient(-8, 0, 8, 0);
    spokeGrad.addColorStop(0, '#78350f');
    spokeGrad.addColorStop(0.3, '#fef08a');
    spokeGrad.addColorStop(0.6, '#f59e0b');
    spokeGrad.addColorStop(1, '#451a03');

    ctx.beginPath();
    ctx.moveTo(-6, -20);
    ctx.quadraticCurveTo(-9, -55, -4, -80);
    ctx.lineTo(4, -80);
    ctx.quadraticCurveTo(9, -55, 6, -20);
    ctx.closePath();
    ctx.fillStyle = spokeGrad;
    ctx.fill();

    const ballGrad = ctx.createRadialGradient(-2, -83, 1, 0, -82, 10);
    ballGrad.addColorStop(0, '#ffffff');
    ballGrad.addColorStop(0.25, '#fef08a');
    ballGrad.addColorStop(0.7, '#d97706');
    ballGrad.addColorStop(1, '#451a03');
    ctx.beginPath();
    ctx.arc(0, -82, 9, 0, 2 * Math.PI);
    ctx.fillStyle = ballGrad;
    ctx.fill();
    ctx.lineWidth = 1;
    ctx.strokeStyle = '#451a03';
    ctx.stroke();

    ctx.restore();
  }

  const domeGrad = ctx.createRadialGradient(-8, -8, 2, 0, 0, 32);
  domeGrad.addColorStop(0, '#ffffff');
  domeGrad.addColorStop(0.2, '#fef08a');
  domeGrad.addColorStop(0.6, '#d97706');
  domeGrad.addColorStop(0.9, '#78350f');
  domeGrad.addColorStop(1, '#290f02');
  ctx.beginPath();
  ctx.arc(0, 0, 32, 0, 2 * Math.PI);
  ctx.fillStyle = domeGrad;
  ctx.fill();
  ctx.lineWidth = 2;
  ctx.strokeStyle = '#fef08a';
  ctx.stroke();

  const tipGrad = ctx.createRadialGradient(-3, -3, 1, 0, 0, 12);
  tipGrad.addColorStop(0, '#ffffff');
  tipGrad.addColorStop(0.4, '#e2e8f0');
  tipGrad.addColorStop(0.8, '#64748b');
  tipGrad.addColorStop(1, '#0f172a');
  ctx.beginPath();
  ctx.arc(0, 0, 11, 0, 2 * Math.PI);
  ctx.fillStyle = tipGrad;
  ctx.fill();

  ctx.restore();
}

drawRouletteWheel(currentWheelAngle);

function playRoulette(choice) {
  if (rouletteSpinning) return;
  let bet = parseFloat(document.getElementById('roulette-bet').value);

  if (isNaN(bet) || bet <= 0 || money < bet) return alert("Fonds insuffisants !");

  money -= bet;
  updateUI();
  rouletteSpinning = true;
  document.querySelectorAll('.tapis-bets button').forEach(b => b.disabled = true);

  let roll = Math.floor(Math.random() * 37);
  let targetIndex = WHEEL_NUMBERS.indexOf(roll);
  let sliceAngle = (2 * Math.PI) / WHEEL_NUMBERS.length;

  let targetSliceAngle = -(Math.PI / 2) - (targetIndex * sliceAngle + sliceAngle / 2);
  let extraTurns = (6 + Math.floor(Math.random() * 3)) * (2 * Math.PI);
  
  let startAngle = currentWheelAngle % (2 * Math.PI);
  let totalRotation = extraTurns + (targetSliceAngle - startAngle);
  while (totalRotation < extraTurns) totalRotation += 2 * Math.PI;

  let startTime = null;
  const spinDuration = 3200;

  function animate(timestamp) {
    if (!startTime) startTime = timestamp;
    let elapsed = timestamp - startTime;
    let progress = Math.min(elapsed / spinDuration, 1);

    let easeOut = 1 - Math.pow(1 - progress, 3);
    currentWheelAngle = startAngle + totalRotation * easeOut;
    drawRouletteWheel(currentWheelAngle);

    if (progress < 1) {
      requestAnimationFrame(animate);
    } else {
      currentWheelAngle = startAngle + totalRotation;
      drawRouletteWheel(currentWheelAngle);
      finishRoulette(roll, choice, bet);
    }
  }

  requestAnimationFrame(animate);
}

function finishRoulette(roll, choice, bet) {
  rouletteSpinning = false;
  document.querySelectorAll('.tapis-bets button').forEach(b => b.disabled = false);

  let color = getRouletteColor(roll);
  rouletteHistory.unshift({ num: roll, color: color });
  if (rouletteHistory.length > 5) rouletteHistory.pop();
  renderRouletteHistory();

  rouletteTotalGames++;
  let won = false;
  let gain = 0;

  if (choice === 'vert' && roll === 0) {
    gain = bet * 36;
    won = true;
    greenWinsCount++;
  } else if (choice === color && color !== 'vert') {
    gain = bet * 2;
    won = true;
  }

  if (won) {
    rouletteWins++;
    money += gain;
    totalMoneyEarned += gain;
    rouletteTotalEarned += gain;
    if (gain > rouletteMaxGain) rouletteMaxGain = gain;
    triggerGameFeedback('card-roulette', 'roulette-banner', 'win', `Numéro ${roll} !<br>+${formatMoney(gain)}`);
  } else {
    triggerGameFeedback('card-roulette', 'roulette-banner', 'lose', `Numéro ${roll} !<br>-${formatMoney(bet)}`);
  }
  updateUI();
}

function renderRouletteHistory() {
  const container = document.getElementById('roulette-history');
  container.innerHTML = '';
  rouletteHistory.forEach(item => {
    const div = document.createElement('div');
    div.className = `hist-item num-${item.color}`;
    div.innerText = item.num;
    container.appendChild(div);
  });
}

// --- BLACKJACK AVEC SPLIT ---
let deck = [];
let hands = [];
let activeHandIdx = 0;
let dealerHand = [];
let currentBjBets = [];
let bjRoundInProgress = false;

function initShoe() {
  const suits = ['♠', '♥', '♦', '♣'];
  const ranks = [
    { name: 'A', val: 11 }, { name: '2', val: 2 }, { name: '3', val: 3 },
    { name: '4', val: 4 }, { name: '5', val: 5 }, { name: '6', val: 6 },
    { name: '7', val: 7 }, { name: '8', val: 8 }, { name: '9', val: 9 },
    { name: '10', val: 10 }, { name: 'V', val: 10 }, { name: 'D', val: 10 }, { name: 'R', val: 10 }
  ];
  deck = [];
  for (let s of suits) {
    for (let r of ranks) {
      deck.push({ name: r.name, val: r.val, suit: s, isRed: (s === '♥' || s === '♦') });
    }
  }
  deck.sort(() => Math.random() - 0.5);
}

function drawCard() {
  if (deck.length < 10) initShoe();
  return deck.pop();
}

function calcHandScore(hand) {
  let total = 0;
  let aces = 0;
  for (let c of hand) {
    total += c.val;
    if (c.name === 'A') aces++;
  }
  while (total > 21 && aces > 0) {
    total -= 10;
    aces--;
  }
  return total;
}

function isNaturalBJ(hand) {
  return hand.length === 2 && calcHandScore(hand) === 21;
}

function createCardElement(card, animated = true) {
  const el = document.createElement('div');
  el.className = `playing-card ${card.isRed ? 'red' : 'black'} ${animated ? 'deal-animation' : ''}`;
  el.innerHTML = `<div>${card.name}</div><div style="font-size: 1.15rem; text-align: center;">${card.suit}</div><div style="text-align: right;">${card.name}</div>`;
  return el;
}

function startBlackjack() {
  if (bjRoundInProgress) return;

  let bet = parseFloat(document.getElementById('bj-bet').value);
  if (isNaN(bet) || bet <= 0 || money < bet) return alert("Fonds insuffisants !");

  bjRoundInProgress = true;
  money -= bet;
  currentBjBets = [bet];

  hands = [[drawCard(), drawCard()]];
  activeHandIdx = 0;
  dealerHand = [drawCard(), drawCard()];

  document.getElementById('bj-betting-area').style.display = 'none';
  document.getElementById('bj-actions').style.display = 'flex';
  
  document.getElementById('btn-bj-hit').disabled = false;
  document.getElementById('btn-bj-stand').disabled = false;

  const canSplit = (hands[0][0].val === hands[0][1].val || hands[0][0].name === hands[0][1].name) && money >= bet;
  document.getElementById('btn-bj-split').style.display = canSplit ? 'inline-block' : 'none';

  renderHands(false, true);
  updateUI();

  if (isNaturalBJ(hands[0])) {
    setTimeout(() => resolveRoundAfterNaturalBJ(), 400);
  }
}

function resolveRoundAfterNaturalBJ() {
  renderHands(true, false);
  let dealerHasBJ = isNaturalBJ(dealerHand);
  bjTotalGames++;

  if (dealerHasBJ) {
    money += currentBjBets[0];
    triggerGameFeedback('card-bj', 'bj-banner', 'push', `Égalité<br>Blackjack !`);
  } else {
    bjWins++;
    naturalBjCount++;
    let gain = currentBjBets[0] + (currentBjBets[0] * 1.5);
    money += gain;
    totalMoneyEarned += gain;
    bjTotalEarned += gain;
    if (gain > bjMaxGain) bjMaxGain = gain;
    triggerGameFeedback('card-bj', 'bj-banner', 'win', `Blackjack Naturel !<br>+${formatMoney(gain)}`);
  }
  resetBj();
  updateUI();
}

function renderHands(revealDealer = false, isInitialDeal = false) {
  const dRow = document.getElementById('dealer-cards');
  dRow.innerHTML = '';

  if (revealDealer) {
    dealerHand.forEach(c => dRow.appendChild(createCardElement(c, false)));
    document.getElementById('dealer-score').innerText = calcHandScore(dealerHand);
  } else {
    dRow.appendChild(createCardElement(dealerHand[0], isInitialDeal));
    const back = document.createElement('div');
    back.className = `playing-card back ${isInitialDeal ? 'deal-animation' : ''}`;
    back.innerText = "?";
    dRow.appendChild(back);
    document.getElementById('dealer-score').innerText = dealerHand[0].val;
  }

  for (let i = 0; i < 2; i++) {
    const container = document.getElementById(`player-hand-container-${i+1}`);
    if (i < hands.length) {
      container.style.display = 'block';
      if (i === activeHandIdx && hands.length > 1) {
        container.style.border = '2px solid var(--accent)';
      } else {
        container.style.border = 'none';
      }
      const pRow = document.getElementById(`player-cards-${i+1}`);
      pRow.innerHTML = '';
      hands[i].forEach((c, idx) => {
        pRow.appendChild(createCardElement(c, isInitialDeal && idx === hands[i].length - 1));
      });
      document.getElementById(`player-score-${i+1}`).innerText = calcHandScore(hands[i]);
    } else {
      container.style.display = 'none';
    }
  }
}

function bjHit() {
  if (!bjRoundInProgress) return;

  hands[activeHandIdx].push(drawCard());
  renderHands(false, false);

  if (calcHandScore(hands[activeHandIdx]) > 21) {
    nextHandOrDealer();
  }
}

function bjSplit() {
  if (!bjRoundInProgress || hands.length > 1) return;
  if (money < currentBjBets[0]) return alert("Fonds insuffisants pour splitter !");

  money -= currentBjBets[0];
  currentBjBets.push(currentBjBets[0]);

  const card1 = hands[0][0];
  const card2 = hands[0][1];
  hands = [
    [card1, drawCard()],
    [card2, drawCard()]
  ];

  document.getElementById('btn-bj-split').style.display = 'none';
  renderHands(false, false);
  updateUI();
}

function bjStand() {
  if (!bjRoundInProgress) return;
  nextHandOrDealer();
}

function nextHandOrDealer() {
  activeHandIdx++;
  if (activeHandIdx < hands.length) {
    renderHands(false, false);
  } else {
    document.getElementById('btn-bj-hit').disabled = true;
    document.getElementById('btn-bj-stand').disabled = true;
    document.getElementById('btn-bj-split').style.display = 'none';

    renderHands(true, false);

    while (calcHandScore(dealerHand) < 17) {
      dealerHand.push(drawCard());
    }
    renderHands(true, false);

    let dScore = calcHandScore(dealerHand);
    let totalGain = 0;
    let resultsText = [];

    setTimeout(() => {
      for (let i = 0; i < hands.length; i++) {
        let pScore = calcHandScore(hands[i]);
        bjTotalGames++;

        if (pScore <= 21 && (dScore > 21 || pScore > dScore)) {
          bjWins++;
          let gain = currentBjBets[i] * 2;
          totalGain += gain;
          bjTotalEarned += gain;
          if (gain > bjMaxGain) bjMaxGain = gain;
          resultsText.push(`Main ${i+1}: Gagné (+${formatMoney(gain)})`);
        } else if (pScore <= 21 && pScore === dScore) {
          money += currentBjBets[i];
          resultsText.push(`Main ${i+1}: Égalité`);
        } else {
          resultsText.push(`Main ${i+1}: Perdu (-${formatMoney(currentBjBets[i])})`);
        }
      }

      if (totalGain > 0) {
        money += totalGain;
        totalMoneyEarned += totalGain;
        triggerGameFeedback('card-bj', 'bj-banner', 'win', resultsText.join('<br>'));
      } else if (resultsText.some(r => r.includes('Égalité'))) {
        triggerGameFeedback('card-bj', 'bj-banner', 'push', resultsText.join('<br>'));
      } else {
        triggerGameFeedback('card-bj', 'bj-banner', 'lose', resultsText.join('<br>'));
      }

      resetBj();
      updateUI();
    }, 400);
  }
}

function resetBj() {
  setTimeout(() => {
    document.getElementById('bj-actions').style.display = 'none';
    document.getElementById('bj-betting-area').style.display = 'block';
    document.getElementById('player-hand-container-2').style.display = 'none';
    bjRoundInProgress = false;
    updateUI();
  }, 1800);
}

initShoe();