const inputNumero = document.getElementById("numero");

inputNumero.addEventListener("input", function () {
  const input = this;
  const valorAntigo = input.value;
  const cursorAntes = input.selectionStart;

  const numeros = valorAntigo.replace(/\D/g, '');
  const formatado = formatarNumeroVisual(numeros);

  let digitosAntes = valorAntigo.slice(0, cursorAntes).replace(/\D/g, '').length;
  let contador = 0, i = 0;
  while (contador < digitosAntes && i < formatado.length) {
    if (/\d/.test(formatado[i])) contador++;
    i++;
  }

  input.value = formatado;
  input.setSelectionRange(i, i);
});

function formatarNumeroVisual(numero) {
  return numero.replace(/\D/g, '')
               .replace(/(.{3})/g, '$1 ')
               .trim();
}

function formatarData(dataStr) {
  if (!dataStr) return "";
  const [ano, mes, dia] = dataStr.split("-");
  return `${dia}/${mes}/${ano}`;
}

function enviarMensagem() {
  const nome = document.getElementById("nome").value;
  const servico = document.getElementById("servico").value;
  const data = document.getElementById("data").value;
  const hora = document.getElementById("hora").value;
  const numeroInput = document.getElementById("numero").value;
  const indicativo = document.getElementById("pais").value;
  const mensagemOriginal = document.getElementById("mensagem").value;

  let mensagem = mensagemOriginal
    .replace("[nome]", nome)
    .replace("[serviço]", servico)
    .replace("[data]", formatarData(data))
    .replace("[hora]", hora);

  const numeroLimpo = numeroInput.replace(/\D/g, '');

  if (numeroLimpo.length < 9) {
    alert("Número de telemóvel inválido.");
    return;
  }

  const link = `https://wa.me/${indicativo}${numeroLimpo}?text=${encodeURIComponent(mensagem)}`;
  window.open(link, '_blank');
}

function abrirModal() {
  const modal = document.getElementById("modal");
  const mensagem = document.getElementById("mensagem").value;
  document.getElementById("mensagemModal").value = mensagem;
  modal.style.display = "flex";
}

function fecharModal(event) {
  document.getElementById("modal").style.display = "none";
}

function carregarMensagem() {
  const msgSalva = localStorage.getItem('mensagemPersonalizada');
  if (msgSalva) {
    document.getElementById("mensagem").value = msgSalva;
  } else {
    document.getElementById("mensagem").value = `
Olá [nome]! 🌸

Seu agendamento no Júlio Beauty Spa está confirmado!
📍 Serviço: [serviço]
📅 Data: [data]
⏰ Horário: [hora]

Estamos te esperando com muito carinho para deixar suas unhas ainda mais lindas!
Caso precise reagendar, por favor, entre em contato com antecedência.

Até breve! 💅✨
Esteticista Ana Moreira
    `.trim();
  }
}

function salvarMensagem() {
  const novaMensagem = document.getElementById("mensagemModal").value;
  document.getElementById("mensagem").value = novaMensagem;
  localStorage.setItem('mensagemPersonalizada', novaMensagem);
  fecharModal();
}

window.onload = function() {
  carregarMensagem();
};

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then(reg => console.log('Service Worker registado', reg))
      .catch(err => console.log('Erro no registo do SW:', err));
  });
}