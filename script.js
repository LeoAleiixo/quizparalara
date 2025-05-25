const audio = document.getElementById("audio");

function iniciar() {
  document.getElementById("intro").classList.remove("ativa");
  document.getElementById("intro").classList.add("escondido");
  document.getElementById("calendario").classList.remove("escondido");
  document.getElementById("calendario").classList.add("ativa");
  audio.play();
  notificarTelegram("🎶 Lara clicou em INICIAR o convite com calendário!");
  gerarCalendario(2025, 4); // Maio (mês 4, zero-based)
}

// Gera o calendário de Maio 2025 e marca os dias especiais
function gerarCalendario(ano, mes) {
  const calendarDiv = document.getElementById("calendar");
  calendarDiv.innerHTML = "";

  const diasSemana = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'];
  const primeiroDiaSemana = new Date(ano, mes, 1).getDay(); // 0=Dom, 4=Qui (confirmado)
  const ultimoDiaMes = new Date(ano, mes + 1, 0).getDate();

  let tabela = '<table><thead><tr>';
  diasSemana.forEach(dia => tabela += `<th>${dia}</th>`);
  tabela += '</tr></thead><tbody><tr>';

  // Espaços antes do 1º dia do mês
  for (let i = 0; i < primeiroDiaSemana; i++) {
    tabela += '<td></td>';
  }

  // Dias do mês com marcações
  for (let dia = 1; dia <= ultimoDiaMes; dia++) {
    // Quebra de linha na semana
    if ((dia + primeiroDiaSemana - 1) % 7 === 0 && dia !== 1) {
      tabela += '</tr><tr>';
    }

    // Classes e legendas para dias especiais
    let classe = '';
    let titulo = '';

    if (dia === 21) {
      classe = 'dia-marcado-forte';
      titulo = 'Galo x Maringá';
    } else if ([22].includes(dia)) {
      classe = 'dia-marcado';
      titulo = 'Freelancer';
    } else if ([23, 24, 25].includes(dia)) {
      classe = 'dia-marcado';
      titulo = 'Casamento';
    } else if (dia === 29) {
      classe = 'dia-verde';
      titulo = 'O Reencontro';
    }

    tabela += `<td class="${classe}" title="${titulo}">${dia}</td>`;
  }

  tabela += '</tr></tbody></table>';

  // Legendas
  tabela += `
    <div class="legend">
      <div class="legend-item"><span class="legend-color legend-vermelho-forte"></span> 21 - Freelance (Galo x Maringá FAIL)</div>
      <div class="legend-item"><span class="legend-color legend-vermelho"></span> 22 - Freelance</div>
      <div class="legend-item"><span class="legend-color legend-vermelho"></span> 23, 24, 25 - Casamento</div>
      <div class="legend-item"><span class="legend-color legend-verde"></span> 29 - O Reencontro</div>
    </div>
  `;

  calendarDiv.innerHTML = tabela;
}

function mostrarFinal() {
  document.getElementById("calendario").classList.remove("ativa");
  document.getElementById("calendario").classList.add("escondido");
  document.getElementById("final").classList.remove("escondido");
  document.getElementById("final").classList.add("ativa");
  notificarTelegram("➡️ Lara clicou no botão SEGUINTE do calendário");
}

function mostrarFoto() {
  document.getElementById("final").classList.remove("ativa");
  document.getElementById("final").classList.add("escondido");
  document.getElementById("convite").classList.remove("escondido");
  document.getElementById("convite").classList.add("ativa");
  setTimeout(() => {
    confetti({
      particleCount: 100,
      spread: 80,
      origin: { y: 0.6 },
      colors: ['#000000', '#ffffff', '#FFD700']
    });
  }, 500);

  setTimeout(() => {
    confetti({
      particleCount: 100,
      spread: 100,
      origin: { y: 0.4 },
      colors: ['#000000', '#ffffff', '#FFD700']
    });
  }, 1000);

  notificarTelegram("➡️ Lara terminou o convite e clicou no botão SEGUINTE");
}

function responderBora() {
  notificarTelegram("💬 Lara clicou em BORA! Partiu Arena ❤️");
  window.open("https://wa.me/5531971212125?text=Partiu%20Arena%20com%20você!", "_blank");
}

function responderNao() {
  notificarTelegram("💬 Lara disse NÃO 😢");
  window.open("https://wa.me/5531971212125?text=Não%20vai%20dar!", "_blank");
}

function notificarTelegram(mensagem) {
  const token = "7970828922:AAFwJNYMEoQUhrnY56pDMfExnR3QKJXh3og";
  const chat_id = "1343180054";
  const url = `https://api.telegram.org/bot${token}/sendMessage`;

  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      chat_id: chat_id,
      text: mensagem
    })
  });
}

function atualizarContador() {
  const contador = document.getElementById("contador");
  // Data alvo: 29 Maio 2025, 21:30 Brasília (UTC-3)
  // Para garantir o horário certo, vamos usar UTC e ajustar o fuso
  const dataAlvo = new Date(Date.UTC(2025, 4, 29, 0, 30)); // 21:30 Brasília = 00:30 UTC (do dia seguinte)

  const agora = new Date();
  const diff = dataAlvo - agora;

  if (diff <= 0) {
    contador.innerHTML = "O evento já começou!";
    clearInterval(intervalId);
    return;
  }

  const dias = Math.floor(diff / (1000 * 60 * 60 * 24));
  const horas = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutos = Math.floor((diff / (1000 * 60)) % 60);
  const segundos = Math.floor((diff / 1000) % 60);

  contador.innerHTML = `Faltam ${dias}d ${horas}h ${minutos}m ${segundos}s para O Reencontro!`;
}

const intervalId = setInterval(atualizarContador, 1000);

// Chamar uma vez para iniciar já mostrando o valor
atualizarContador();
