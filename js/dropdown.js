// Captura todos os blocos de dropdown da página
const listaDropdowns = document.querySelectorAll(".dropdown");


const dadosLocaisSeguranca = {
    bnt_alimento: ["Grãos", "Doces Veganos", "Congelados", "Bebidas", "Massas"],
    bnt_cosmetico: ["Batons", "Cremes Faciais", "Protetor Solar", "Rímel Vegano"],
    bnt_vestuario: ["Camisetas Orgânicas", "Calçados Ecológicos", "Casacos Sintéticos"],
    bnt_acessorio: ["Bolsas de Cacto", "Cintos Ecológicos", "Carteiras Recicladas"],
    bnt_higienePessoal: ["Shampoo Sólido", "Desodorante Natural", "Creme Dental"],
    bnt_limpeza: ["Lava-Louças", "Sabão em Pó Ecológico", "Desinfetante Natural"]
};

// Configura os cliques de abertura e fechamento para cada um deles
listaDropdowns.forEach(container => {
    const botao = container.querySelector(".bnt-categoria");
    const conteudoMenu = container.querySelector(".dropdown_content");

    botao.addEventListener("click", (event) => {
        event.stopPropagation(); // Impede o clique de propagar para a janela

        // Fecha todos os outros menus abertos antes de abrir o atual
        fecharTodosMenus(conteudoMenu);

        // Abre ou fecha o menu atual
        const estaAberto = conteudoMenu.classList.toggle("mostrar");

        // Se o menu acabou de abrir e está vazio, busca os dados para preencher
        if (estaAberto && conteudoMenu.children.length === 0) {
            carregarDadosMenu(conteudoMenu, botao.id);
        }
    });
});

// Fecha todos os menus se o usuário clicar em qualquer outra parte vazia da tela
window.addEventListener("click", () => {
    fecharTodosMenus();
});

// Função auxiliar para remover a classe "mostrar" dos menus
function fecharTodosMenus(menuAtualExcluido = null) {
    const todosMenus = document.querySelectorAll(".dropdown_content");
    todosMenus.forEach(menu => {
        if (menu !== menuAtualExcluido) {
            menu.classList.remove("mostrar");
        }
    });
}

// Busca os dados na API ou usa a lista local correspondente ao botão
async function carregarDadosMenu(elementoMenu, idBotao) {
    elementoMenu.innerHTML = `<a href="#" style="font-size: 16px; color: #888;">Carregando...</a>`;

    try {
        // Correção da URL para o endpoint correto de dados em JSON
        const resposta = await fetch("https://tvmaze.com");
        if (!resposta.ok) throw new Error("Erro na rede");
        
        const dados = await resposta.json();
        const itens = dados.slice(0, 5); // Pega 5 itens da API

        elementoMenu.innerHTML = "";
        itens.forEach(show => {
            const link = document.createElement("a");
            link.href = "#";
            link.textContent = show.name;
            elementoMenu.appendChild(link);
        });

    } catch (erro) {
        console.warn(`API indisponível. Carregando itens de segurança para: ${idBotao}`);
        
        // Pega a lista certa baseada no ID do botão que foi clicado
        const listaFallback = dadosLocaisSeguranca[idBotao] || ["Opção 1", "Opção 2"];
        
        elementoMenu.innerHTML = "";
        listaFallback.forEach(nomeItem => {
            const link = document.createElement("a");
            link.href = "#";
            link.textContent = nomeItem;
            elementoMenu.appendChild(link);
        });
    }
}
