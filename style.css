// --- CONFIGURATION SUPABASE ---
if (typeof supabase === 'undefined') {
  var supabase = window.supabase.createClient(
    'https://abubtdiuhbxmklbhyhbw.supabase.co',
    'sb_publishable_VRwTTXtp0Kc18GiG-SWIBw_MwtZPJnW'
  );
}

let currentUser = null;
let currentPseudo = null;

// --- PLUIE DE JETONS ET DE CROUSTIES AGRANDIS ---
function initRain() {
  const container = document.getElementById('rain-container');
  const numItems = 25;
  const chipColors = [
    'radial-gradient(circle at 30% 30%, #ef4444, #991b1b)',
    'radial-gradient(circle at 30% 30%, #38bdf8, #0369a1)',
    'radial-gradient(circle at 30% 30%, #10b981, #065f46)',
    'radial-gradient(circle at 30% 30%, #fbbf24, #d97706)',
    'radial-gradient(circle at 30% 30%, #a855f7, #6b21a8)'
  ];

  for (let i = 0; i < numItems; i++) {
    const item = document.createElement('div');
    item.className = 'falling-item';
    item.style.left = `${Math.random() * 100}vw`;
    item.style.animationDuration = `${Math.random() * 6 + 5}s`;
    item.style.animationDelay = `${Math.random() * 5}s`;

    if (Math.random() > 0.4) {
      item.classList.add('chip-item');
      item.style.background = chipColors[Math.floor(Math.random() * chipColors.length)];
    } else {
      const img = document.createElement('img');
      img.src = 'crousty.png';
      img.className = 'crousty-png-item';
      img.onerror = () => { img.src = 'crousty.jpg'; };
      item.appendChild(img);
    }
    container.appendChild(item);
  }
}
initRain();

// --- VARIABLES ET ÉTAT DU JEU ---
let money = 0.00;
let bankMoney = 0.00;
let crousties = 0;
let croustyBaseCost = 10.00;
let croustyIncomePerMin = 3.00;

let bankTimer = 10.0;
let croustyMinuteTimer = 60.0;
let croustyProductionFinished = false;

let gameSeconds = 0;
let totalMoneyEarned = 0.00;

let rouletteTotalGames = 0;
let rouletteWins = 0;
let rouletteTotalEarned = 0.00;
let rouletteMaxGain = 0.00;
let greenWinsCount = 0;

let bjTotalGames = 0;
let bjWins = 0;
let bjTotalEarned = 0.00;
let bjMaxGain = 0.00;
let naturalBjCount = 0;

let sessionStartTime = Date.now();

function loadGame() {
  const saved = localStorage.getItem('croustyTycoonSave');
  if (saved) {
    try {
      const data = JSON.parse(saved);
      money = data.money ?? 0.00;
      bankMoney = data.bankMoney ?? 0.00;
      crousties = data.crousties ?? 0;
      gameSeconds = data.gameSeconds ?? 0;
      totalMoneyEarned = data.totalMoneyEarned ?? 0.00;
      
      rouletteTotalGames = data.rouletteTotalGames ?? 0;
      rouletteWins = data.rouletteWins ?? 0;
      rouletteTotalEarned = data.rouletteTotalEarned ?? 0.00;
      rouletteMaxGain = data.rouletteMaxGain ?? 0.00;
      greenWinsCount = data.greenWinsCount ?? 0;

      bjTotalGames = data.bjTotalGames ?? 0;
      bjWins = data.bjWins ?? 0;
      bjTotalEarned = data.bjTotalEarned ?? 0.00;
      bjMaxGain = data.bjMaxGain ?? 0.00;
      naturalBjCount = data.naturalBjCount ?? 0;
      currentPseudo = data.currentPseudo ?? null;
    } catch (e) {
      console.error("Erreur chargement sauvegarde", e);
    }
  }
  sessionStartTime = Date.now() - (gameSeconds * 1000);
}

async function saveGame() {
  const data = {
    money, bankMoney, crousties, gameSeconds, totalMoneyEarned,
    rouletteTotalGames, rouletteWins, rouletteTotalEarned, rouletteMaxGain, greenWinsCount,
    bjTotalGames, bjWins, bjTotalEarned, bjMaxGain, naturalBjCount, currentPseudo
  };
  localStorage.setItem('croustyTycoonSave', JSON.stringify(data));

  if (currentUser) {
    await supabase.from('players').upsert({
      email: currentUser.email,
      pseudo: currentPseudo || currentUser.email.split('@')[0],
      money: money,
      save_data: data,
      updated_at: new Date()
    }, { onConflict: 'email' });
  }
}

function resetProfile() {
  if (confirm("Êtes-vous sûr de vouloir réinitialiser toute votre progression ?")) {
    localStorage.removeItem('croustyTycoonSave');
    location.reload();
  }
}

// Gestion des modales séparées
function openStatsModal() {
  let hrs = Math.floor(gameSeconds / 3600);
  let mins = Math.floor((gameSeconds % 3600) / 60);
  let secs = gameSeconds % 60;
  let timeStr = hrs > 0 ? `${hrs} h ${mins} min ${secs < 10 ? '0' : ''}${secs} s` : `${mins} min ${secs < 10 ? '0' : ''}${secs} s`;
  document.getElementById('stat-time').innerText = timeStr;
  document.getElementById('stat-earned').innerText = formatMoney(totalMoneyEarned);

  document.getElementById('stat-roulette-earned').innerText = formatMoney(rouletteTotalEarned);
  document.getElementById('stat-roulette-max').innerText = formatMoney(rouletteMaxGain);
  let rWr = rouletteTotalGames > 0 ? Math.round((rouletteWins / rouletteTotalGames) * 100) : 0;
  document.getElementById('stat-roulette-wr').innerText = `${rWr} %`;
  document.getElementById('stat-green-wins').innerText = greenWinsCount;

  document.getElementById('stat-bj-earned').innerText = formatMoney(bjTotalEarned);
  document.getElementById('stat-bj-max').innerText = formatMoney(bjMaxGain);
  let bjWr = bjTotalGames > 0 ? Math.round((bjWins / bjTotalGames) * 100) : 0;
  document.getElementById('stat-bj-wr').innerText = `${bjWr} %`;
  document.getElementById('stat-natural-bj').innerText = naturalBjCount;

  document.getElementById('stats-modal-bg').style.display = 'flex';
}

function closeStatsModal() {
  document.getElementById('stats-modal-bg').style.display = 'none';
}

function openLeaderboardModal() {
  document.getElementById('leaderboard-modal-bg').style.display = 'flex';
  fetchLeaderboard();
}

function closeLeaderboardModal() {
  document.getElementById('leaderboard-modal-bg').style.display = 'none';
}

// Connexion Google (Gmail) via Supabase Auth
async function triggerGoogleOneTap() {
  if (currentUser) {
    if (confirm(`Se déconnecter de ${currentUser.email} (${currentPseudo}) ?`)) {
      await supabase.auth.signOut();
      currentUser = null;
      currentPseudo = null;
      updateAuthUI();
      alert("Déconnecté avec succès.");
    }
    return;
  }

  const { error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: window.location.origin + window.location.pathname
    }
  });

  if (error) {
    alert("Erreur de connexion : " + error.message);
  }
}

async function checkUserSession() {
  const { data: { session } } = await supabase.auth.getSession();
  if (session) {
    currentUser = session.user;
    await checkOrAskPseudo();
    updateAuthUI();
    loadCloudSave();
  }
  supabase.auth.onAuthStateChange(async (event, session) => {
    if (session) {
      currentUser = session.user;
      await checkOrAskPseudo();
      updateAuthUI();
      loadCloudSave();
    }
  });
}

async function checkOrAskPseudo() {
  if (!currentUser) return;

  const { data } = await supabase.from('players').select('pseudo').eq('email', currentUser.email).single();

  if (data && data.pseudo) {
    currentPseudo = data.pseudo;
  } else {
    let chosenPseudo = prompt("Bienvenue sur Crousty Gambling ! Choisissez votre pseudo pour le classement mondial :", currentUser.email.split('@')[0]);
    currentPseudo = chosenPseudo && chosenPseudo.trim() !== "" ? chosenPseudo.trim() : currentUser.email.split('@')[0];
    
    await supabase.from('players').upsert({
      email: currentUser.email,
      pseudo: currentPseudo,
      money: money,
      updated_at: new Date()
    }, { onConflict: 'email' });
  }
}

async function loadCloudSave() {
  if (!currentUser) return;
  const { data } = await supabase.from('players').select('save_data, pseudo').eq('email', currentUser.email).single();
  if (data) {
    if (data.pseudo) currentPseudo = data.pseudo;
    if (data.save_data) {
      let s = data.save_data;
      money = s.money ?? money;
      bankMoney = s.bankMoney ?? bankMoney;
      crousties = s.crousties ?? crousties;
      totalMoneyEarned = s.totalMoneyEarned ?? totalMoneyEarned;
      updateUI();
    }
  }
}

async function fetchLeaderboard() {
  const listEl = document.getElementById('leaderboard-list');
  if (!listEl) return;
  listEl.innerHTML = '<div style="text-align:center; color:var(--text-muted); padding:10px;">Chargement...</div>';

  const { data, error } = await supabase.from('players').select('pseudo, money').order('money', { ascending: false }).limit(10);

  if (error || !data) {
    listEl.innerHTML = '<div style="text-align:center; color:var(--red);">Erreur de chargement.</div>';
    return;
  }

  listEl.innerHTML = '';
  data.forEach((player, index) => {
    let medals = ['🥇', '🥈', '🥉'];
    let rankIcon = medals[index] || `#${index + 1}`;
    let playerName = player.pseudo || "Anonyme";

    const row = document.createElement('div');
    row.className = 'stat-row';
    row.style.cssText = "background: #162030; padding: 8px 10px; border-radius: 8px;";
    row.innerHTML = `<span>${rankIcon} <strong>${playerName}</strong></span><span style="color: var(--accent);">${formatMoney(player.money)}</span>`;
    listEl.appendChild(row);
  });
}

function updateAuthUI() {
  const label = document.getElementById('auth-btn-label');
  if (currentUser) {
    label.innerText = currentPseudo || currentUser.email.split('@')[0];
  } else {
    label.innerText = "Connexion Gmail";
  }
}

// Fonctions utilitaires de mise & interface
function handleWheelBet(event, gameType) {
  event.preventDefault();
  let direction = event.deltaY < 0 ? 1 : -1;
  stepBet(gameType, direction);
}

const streetActions = [
  { icon: "🗑️", label: "Fouiller une benne" },
  { icon: "👝", label: "Faire les poches d'un SDF" },
  { icon: "⚙️", label: "Vendre de la ferraille" },
  { icon: "👵", label: "Tabasser une grand-mère" },
  { icon: "🛒", label: "Mendier près du Lidl" }
];
let currentActionIdx = 0;
let isActionOnCooldown = false;
const COOLDOWN_MS = 800;

function formatMoney(amount) {
  return amount.toFixed(2).replace('.', ',') + " €";
}

function calcBetAmount(percent) {
  if (money <= 0) return 0.01;
  let totalCents = Math.round(money * 100);
  if (percent >= 1.0) return Math.max(0.01, totalCents / 100);
  let betCents = Math.floor((totalCents * percent) + 0.00001);
  return Math.max(0.01, betCents / 100);
}

function getTotalPassiveRatePerSec() {
  let croustyPerSec = (crousties * croustyIncomePerMin) / 60;
  let bankPerSec = (bankMoney * 0.01) / 10;
  return croustyPerSec + bankPerSec;
}

function triggerWalletPulse(type) {
  const frame = document.getElementById('wallet-frame');
  frame.classList.remove('pulse-win', 'pulse-lose');
  void frame.offsetWidth;
  frame.classList.add(type === 'win' ? 'pulse-win' : 'pulse-lose');
  setTimeout(() => frame.classList.remove('pulse-win', 'pulse-lose'), 650);
}

function updateUI() {
  money = Math.round(money * 100) / 100;
  bankMoney = Math.round(bankMoney * 100) / 100;

  document.getElementById('money').innerText = formatMoney(money);
  document.getElementById('bank-money').innerText = formatMoney(bankMoney);
  document.getElementById('passive-income').innerText = getTotalPassiveRatePerSec().toFixed(2).replace('.', ',');

  const cardCrousty = document.getElementById('card-crousty');
  const lockOverlay = document.getElementById('crousty-lock-overlay');
  const btnFirstCrousty = document.getElementById('btn-first-crousty');
  const croustyBadge = document.getElementById('crousty-multiplier');
  const croustyTimerBox = document.getElementById('crousty-timer-box');

  if (crousties >= 1) {
    cardCrousty.classList.remove('card-crousty-locked');
    lockOverlay.style.display = 'none';
    croustyBadge.style.display = 'block';
    croustyBadge.innerText = 'x' + crousties;
    croustyTimerBox.style.display = 'block';
  } else {
    cardCrousty.classList.add('card-crousty-locked');
    lockOverlay.style.display = 'flex';
    btnFirstCrousty.disabled = (money < croustyBaseCost);
    croustyBadge.style.display = 'none';
    croustyTimerBox.style.display = 'none';
  }

  let rawCost = croustyBaseCost * Math.pow(1.45, crousties);
  let nextCost = Math.ceil(rawCost);
  document.getElementById('crousty-cost').innerText = nextCost.toFixed(2).replace('.', ',');
  document.getElementById('buy-crousty').disabled = (money < nextCost);

  let b10 = formatMoney(calcBetAmount(0.10));
  let b25 = formatMoney(calcBetAmount(0.25));
  let b50 = formatMoney(calcBetAmount(0.50));

  document.getElementById('r-bet-10').innerText = b10;
  document.getElementById('r-bet-25').innerText = b25;
  document.getElementById('r-bet-50').innerText = b50;

  document.getElementById('bj-bet-10').innerText = b10;
  document.getElementById('bj-bet-25').innerText = b25;
  document.getElementById('bj-bet-50').innerText = b50;

  saveGame();
}

function openDepositModal() {
  const input = document.getElementById('deposit-input');
  input.value = Math.min(money, 1.00).toFixed(2);
  document.getElementById('bank-modal-bg').style.display = 'flex';
}

function closeDepositModal() {
  document.getElementById('bank-modal-bg').style.display = 'none';
}

function applyDepositPercent(percent) {
  const input = document.getElementById('deposit-input');
  let totalCents = Math.round(money * 100);
  let depCents = percent >= 1.0 ? totalCents : Math.floor((totalCents * percent) + 0.00001);
  input.value = Math.max(0.01, depCents / 100).toFixed(2);
}

function confirmDeposit() {
  const input = document.getElementById('deposit-input');
  let amount = parseFloat(input.value);
  if (isNaN(amount) || amount <= 0) return alert("Montant invalide !");
  if (money < amount) return alert("Fonds insuffisants !");
  money -= amount;
  bankMoney += amount;
  closeDepositModal();
  updateUI();
}

// Boucle principale
setInterval(() => {
  gameSeconds = Math.floor((Date.now() - sessionStartTime) / 1000);

  bankTimer -= 0.1;
  if (bankTimer <= 0.05) {
    bankTimer = 10.0;
    if (bankMoney > 0) {
      let gain = Math.round((bankMoney * 0.01) * 100) / 100;
      if (gain > 0) {
        money += gain;
        totalMoneyEarned += gain;
        triggerWalletPulse('win');
        const vaultBox = document.getElementById('vault-box-container');
        const span = document.createElement('span');
        span.className = 'floating-gain';
        span.innerText = `+${formatMoney(gain)}`;
        vaultBox.appendChild(span);
        setTimeout(() => span.remove(), 850);
        updateUI();
      }
    }
  }
  document.getElementById('vault-countdown').innerText = bankTimer.toFixed(1).replace('.', ',') + " s";
  document.getElementById('vault-timer-bar').style.width = (((10.0 - bankTimer) / 10.0) * 100) + "%";

  if (crousties >= 1 && !croustyProductionFinished) {
    croustyMinuteTimer -= 0.1;
    if (croustyMinuteTimer <= 0.05) {
      croustyMinuteTimer = 0;
      croustyProductionFinished = true;
      let totalGain = crousties * croustyIncomePerMin;
      document.getElementById('crousty-countdown').innerText = "Prêt !";
      document.getElementById('crousty-progress-bar').style.width = "100%";
      document.getElementById('btn-collect').style.display = "block";
      document.getElementById('collect-amount').innerText = formatMoney(totalGain);
    } else {
      document.getElementById('crousty-countdown').innerText = croustyMinuteTimer.toFixed(1).replace('.', ',') + " s";
      document.getElementById('crousty-progress-bar').style.width = (((60.0 - croustyMinuteTimer) / 60.0) * 100) + "%";
    }
  }
}, 100);

function collectCroustyRevenue() {
  let totalGain = crousties * croustyIncomePerMin;
  if (totalGain <= 0) return;
  money += totalGain;
  totalMoneyEarned += totalGain;
  triggerWalletPulse('win');

  const cardCrousty = document.getElementById('card-crousty');
  const span = document.createElement('span');
  span.className = 'floating-gain';
  span.innerText = `+${formatMoney(totalGain)}`;
  cardCrousty.appendChild(span);
  setTimeout(() => span.remove(), 850);

  croustyMinuteTimer = 60.0;
  croustyProductionFinished = false;
  document.getElementById('btn-collect').style.display = 'none';
  updateUI();
}

function applyPercentBet(game, percent) {
  const input = document.getElementById(game + '-bet');
  input.value = calcBetAmount(percent).toFixed(2);
}

function stepBet(game, direction) {
  const input = document.getElementById(game + '-bet');
  let val = parseFloat(input.value) || 0;
  let step = val >= 50 ? 10 : (val >= 10 ? 1 : (val >= 1 ? 0.50 : 0.05));
  val += step * direction;
  input.value = Math.max(0.01, val).toFixed(2);
}

function triggerGameFeedback(cardId, bannerId, type, text) {
  const banner = document.getElementById(bannerId);
  banner.className = `game-result-banner banner-${type} active`;
  banner.innerHTML = text;
  triggerWalletPulse(type === 'win' ? 'win' : (type === 'lose' ? 'lose' : ''));
  setTimeout(() => banner.classList.remove('active'), 1500);
}

function triggerStreetAction() {
  if (isActionOnCooldown) return;
  isActionOnCooldown = true;

  const card = document.getElementById('street-box');
  const btn = document.getElementById('btn-street');
  const bar = document.getElementById('cooldown-fill');
  card.classList.add('on-cooldown');
  btn.disabled = true;

  let rand = Math.random();
  let gain = 0;
  let isGain = false;

  if (rand < 0.000001) { gain = 1000.00; isGain = true; }
  else if (rand < 0.005) { gain = 1.00; isGain = true; }
  else if (rand < 0.10) { gain = parseFloat((Math.random() * (0.16 - 0.08) + 0.08).toFixed(2)); isGain = true; }

  if (isGain) {
    money += gain;
    totalMoneyEarned += gain;
    triggerWalletPulse('win');
    const box = document.getElementById('street-box');
    const span = document.createElement('span');
    span.className = 'floating-gain';
    span.innerText = `+${formatMoney(gain)}`;
    box.appendChild(span);
    setTimeout(() => span.remove(), 850);
  }
  updateUI();

  bar.style.transition = `width ${COOLDOWN_MS}ms linear`;
  bar.style.width = '100%';

  setTimeout(() => {
    bar.style.transition = 'none';
    bar.style.width = '0%';
    currentActionIdx = (currentActionIdx + 1) % streetActions.length;
    const act = streetActions[currentActionIdx];
    document.getElementById('street-icon').innerText = act.icon;
    document.getElementById('street-label').innerText = act.label;
    btn.disabled = false;
    card.classList.remove('on-cooldown');
    isActionOnCooldown = false;
  }, COOLDOWN_MS);
}

function buyCrousty() {
  let rawCost = croustyBaseCost * Math.pow(1.45, crousties);
  let cost = Math.ceil(rawCost);
  if (money >= cost) {
    money -= cost;
    crousties++;
    updateUI();
  }
}

loadGame();
checkUserSession();
updateUI();
