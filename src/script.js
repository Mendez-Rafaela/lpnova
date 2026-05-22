const whatsappBase = "https://wa.me/5511940018352?text=";
let selectedTypeLabel = "";

// ── NAVEGAÇÃO ENTRE STEPS ──
function nextStep(stepId) {
  document.querySelectorAll('.sim-step').forEach(step => {
    step.classList.remove('active');
  });
  document.getElementById(stepId).classList.add('active');
}

function selectType(type) {
  if (type === 'Casa') {
    nextStep('step-casa');
  } else if (type === 'Condominio') {
    nextStep('step-condo');
  } else if (type === 'Comercio') {
    nextStep('step-comercio');
  }
}

function goToSimulator(label) {
  selectedTypeLabel = label;
  document.getElementById('sim-header-title').innerText = "SIMULE SEU " + label.toUpperCase();
  nextStep('step-calculator');
  atualizarV4();
}

function finishCasa(option) {
  const msg = encodeURIComponent(`eu vi a página de vocês e quero contratar para a minha casa ${option}`);
  window.open(whatsappBase + msg, '_blank');
}

// ── SIMULADOR ──
const sliderV4   = document.getElementById('slider-v4');
const valorV4    = document.getElementById('valor-v4');
const unidadesV4 = document.getElementById('unidades-v4');
const porteV4    = document.getElementById('porte-v4');
const alertaV4   = document.getElementById('alerta-v4');
const toqueBoxV4 = document.getElementById('toqueBox-v4');
const valorToqueBox = 33.90;

function calcularValorV4(qtd) {
  let total = 89.90;
  if (qtd <= 25) {
    total = 89.90;
  } else if (qtd <= 35) {
    total = 89.90 + ((qtd - 25) * 2.90);
  } else if (qtd <= 99) {
    total = 89.90 + (10 * 2.90) + ((qtd - 35) * 3.50);
  } else {
    total = 89.90 + (10 * 2.90) + (64 * 3.50) + ((qtd - 99) * 3.15);
  }
  if (toqueBoxV4.checked) {
    total += valorToqueBox;
  }
  return total;
}

function atualizarV4() {
  const qtd = parseInt(sliderV4.value);
  unidadesV4.innerText = qtd;

  const total = calcularValorV4(qtd);
  valorV4.innerText = total.toLocaleString('pt-BR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });

  let tipo = '';
  if (qtd <= 35) {
    tipo = 'Pequeno';
  } else if (qtd <= 99) {
    tipo = 'Médio';
  } else {
    tipo = 'Grande';
  }
  porteV4.innerHTML = `Porte: <span>${tipo}</span>`;

  if (qtd >= 200) {
    alertaV4.style.display = 'block';
  } else {
    alertaV4.style.display = 'none';
  }
}

sliderV4.addEventListener('input', atualizarV4);
toqueBoxV4.addEventListener('change', atualizarV4);

function finishSimulatorV4() {
  const msg = encodeURIComponent(`eu vi a página de vocês e quero contratar para o meu ${selectedTypeLabel}`);
  window.open(whatsappBase + msg, '_blank');
}