const pedidoForm = document.querySelector('#pedidoForm');
const cancelButton = document.querySelector('.cancel-button');
const successMessage = document.querySelector('#formSuccess');


const whatsappPhone = '258867805911';

pedidoForm.addEventListener('submit', event => {
    event.preventDefault();

    const nome = document.querySelector('#nome').value.trim();
    const localEntrega = document.querySelector('#localEntrega').value.trim();
    const numChamadas = document.querySelector('#numChamadas').value.trim();
    const quantidade = document.querySelector('#quantidade').value.trim();

    if (!nome || !localEntrega || !numChamadas || !quantidade) {
        return;
    }

    const mensagem = `Olá Lumetech,%0A%0ANome: ${nome}%0ALocal de entrega: ${localEntrega}%0ANúmero de chamadas: ${numChamadas}%0AQuantidade: ${quantidade}`;
    const urlWhatsapp = `https://wa.me/${whatsappPhone}?text=${mensagem}`;

    window.open(urlWhatsapp, '_blank');
    successMessage.classList.remove('hidden');
    pedidoForm.reset();
});

cancelButton.addEventListener('click', () => {
    pedidoForm.reset();
    successMessage.classList.add('hidden');
});
