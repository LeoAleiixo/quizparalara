const perguntas = [
  {
    pergunta: "Em que ano foi o último título brasileiro do Galo?",
    opcoes: ["20", "21", "22", "23", "24"],
    correta: "21",
    gabarito: "21/__/__ na ______ ___"
  },
  {
    pergunta: "Quantos anos o melhor goleiro do Brasil vai fazer no Galo?",
    opcoes: ["05", "06", "07", "04", "03"],
    correta: "05",
    gabarito: "21/05/__ na ______ ___"
  },
  {
    pergunta: "Qual o dia de fundação do Galo?",
    opcoes: ["01", "05", "08", "25", "31"],
    correta: "25",
    gabarito: "21/05/25 na ______ ___"
  },
  {
    pergunta: "Qual a melhor arena do Brasil?",
    opcoes: ["Neo Quimica Arena", "Arena MRV", "Arena Barueri", "Ligga Arena", "Arena do Grêmio"],
    correta: "Arena MRV",
    gabarito: "21/05/25 na Arena MRV"
  }
];

let indice = 0;
const audio = document.getElementById("audio");

function iniciar() {
  document.getElementById("intro").classList.remove("ativa");
  document.getElementById("intro").classList.add("escondido");
  document.getElementById("quiz").classList.remove("escondido");
  document.getElementById("quiz").classList.add("ativa");
  audio.play();
  notificarTelegram("🎶 Lara clicou em INICIAR o quiz!");
  mostrarPergunta();
}

function mostrarPergunta() {
  const p = perguntas[indice];
  document.getElementById("pergunta").innerText = p.pergunta;
  const respostasDiv = document.getElementById("respostas");
  respostasDiv.innerHTML = "";
  p.opcoes.forEach(op => {
    const btn = document.createElement("button");
    btn.innerText = op;
    btn.onclick = () => verificarResposta(op);
    respostasDiv.appendChild(btn);
  });
  document.getElementById("gabarito").innerText = indice === 0 ? "__/__/__ na ______ ___" : perguntas[indice - 1].gabarito;
}

function verificarResposta(resposta) {
  const perguntaAtual = perguntas[indice];
  if (resposta === perguntaAtual.correta) {
    notificarTelegram(`✅ Lara acertou: "${perguntaAtual.pergunta}" → ${resposta}`);
    indice++;
    if (indice < perguntas.length) {
      mostrarPergunta();
    } else {
      document.getElementById("quiz").classList.remove("ativa");
      document.getElementById("quiz").classList.add("escondido");
      document.getElementById("final").classList.remove("escondido");
      document.getElementById("final").classList.add("ativa");
      document.getElementById("gabarito").innerText = perguntas[perguntas.length - 1].gabarito;
    }
  } else {
    alert("Errou! Tenta de novo...");
  }
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


  notificarTelegram("➡️ Lara terminou o quiz e clicou no botão SEGUINTE");
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
