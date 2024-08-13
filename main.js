document.addEventListener('DOMContentLoaded', function() {
    // Botões para abrir os pop-ups
    const btnProjetos = document.getElementById('btn-projetos');
    const btnRepositorios = document.getElementById('btn-repositorios');

    // Elementos dos pop-ups
    const popupProjetos = document.getElementById('popup-projetos');
    const popupRepositorios = document.getElementById('popup-repositorios');

    // Botões de fechar
    const closeProjetos = popupProjetos.querySelector('.close');
    const closeRepositorios = popupRepositorios.querySelector('.close');

    // Eventos para abrir os pop-ups
    btnProjetos.addEventListener('click', function() {
        carregarProjetos();
        popupProjetos.style.display = 'block';
    });

    btnRepositorios.addEventListener('click', function() {
        carregarRepositorios();
        popupRepositorios.style.display = 'block';
    });

    // Eventos para fechar os pop-ups
    closeProjetos.addEventListener('click', function() {
        popupProjetos.style.display = 'none';
    });

    closeRepositorios.addEventListener('click', function() {
        popupRepositorios.style.display = 'none';
    });

    // Fechar o pop-up se o usuário clicar fora dele
    window.addEventListener('click', function(event) {
        if (event.target == popupProjetos) {
            popupProjetos.style.display = 'none';
        }
        if (event.target == popupRepositorios) {
            popupRepositorios.style.display = 'none';
        }
    });

    // Funções para carregar projetos e repositórios via Ajax
    function carregarProjetos() {
        const endpoint = 'projetos.json'; // Substitua pela URL real ou por um arquivo JSON local
        fetch(endpoint)
            .then(response => response.json())
            .then(projetos => {
                const listaProjetos = document.getElementById('lista-projetos');
                listaProjetos.innerHTML = ''; // Limpa a lista antes de carregar
                projetos.forEach(projeto => {
                    const projetoDiv = document.createElement('div');
                    projetoDiv.textContent = projeto.nome;
                    listaProjetos.appendChild(projetoDiv);
                });
            })
            .catch(error => console.error('Erro ao carregar projetos:', error));
    }

    function carregarRepositorios() {
        const endpoint = 'https://api.github.com/users/jemacieldev/repos';
        fetch(endpoint)
            .then(response => response.json())
            .then(repositorios => {
                const listaRepositorios = document.getElementById('lista-repositorios');
                listaRepositorios.innerHTML = ''; // Limpa a lista antes de carregar
                repositorios.forEach(repo => {
                    const repoDiv = document.createElement('div');
                    repoDiv.textContent = repo.name;
                    listaRepositorios.appendChild(repoDiv);
                });
            })
            .catch(error => console.error('Erro ao carregar repositórios:', error));
    }
    
    // Formulário de contato
    const formContato = document.getElementById('form-contato');
    const mensagemConfirmacao = document.getElementById('mensagem-confirmacao');

    formContato.addEventListener('submit', function(event) {
        event.preventDefault();
        enviarMensagem();
    });

    function enviarMensagem() {
        const nome = document.getElementById('nome').value;
        const email = document.getElementById('email').value;
        const mensagem = document.getElementById('mensagem').value;

        try {
            // Simulação de envio da mensagem (aqui você pode implementar o envio real)
            mensagemConfirmacao.style.display = 'block'; // Exibe a mensagem de confirmação
            formContato.reset(); // Reseta o formulário
        } catch (error) {
            console.error('Erro ao enviar a mensagem:', error);
            alert('Ocorreu um erro ao enviar sua mensagem. Por favor, tente novamente.');
        }

        // Esconde a mensagem de confirmação após alguns segundos
        setTimeout(() => {
            mensagemConfirmacao.style.display = 'none';
        }, 4000); // Esconde a mensagem após 4 segundos
    }
});

