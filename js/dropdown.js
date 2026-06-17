const bntAlimento = document.getElementById("bnt_alimento");
const dropdownConteudo = document.getElementById("dropdown_alimento_conteudo");

// 1. Abre/Fecha o menu imediatamente ao clicar no botão Alimento
bntAlimento.addEventListener("click", (event) => {
    event.stopPropagation(); // Impede o clique de ir para a janela
    
    // Alterna a classe (abre ou fecha visualmente)
    const estaAberto = dropdownConteudo.classList.toggle("mostrar");

    // Se o menu acabou de abrir e estiver vazio, busca os dados
    if (estaAberto && dropdownConteudo.children.length === 0) {
        carregarDados();
    }
});

// 2. FECHA O MENU QUANDO CLICAR FORA (Isolado e seguro)
window.addEventListener("click", (event) => {
    // Se o clique NÃO foi no botão e NÃO foi dentro do menu, fecha ele
    if (event.target !== bntAlimento && !dropdownConteudo.contains(event.target)) {
        dropdownConteudo.classList.remove("mostrar");
    }
});

// 3. Função que busca os dados (com tratamento de erro isolado)
async function carregarDados() {
    dropdownConteudo.innerHTML = `<a href="#" style="font-size: 16px; color: #888;">Carregando...</a>`;

    try {
        const resposta = await fetch("https://tvmaze.com");
        if (!resposta.ok) throw new Error("Erro na rede");
        
        const dados = await resposta.json();
        const itens = dados.slice(0, 6); 

        dropdownConteudo.innerHTML = "";
        itens.forEach(show => {
            const link = document.createElement("a");
            link.href = "#";
            link.textContent = show.name;
            dropdownConteudo.appendChild(link);
        });

    } catch (erro) {
        console.warn("API indisponível, carregando itens locais de segurança.");
        
        // Itens locais para o menu nunca ficar em branco ou quebrado
        const itensLocais = ["Grãos", "Doces Veganos", "Congelados", "Bebidas", "Massas"];
        dropdownConteudo.innerHTML = "";
        itensLocais.forEach(nome => {
            const link = document.createElement("a");
            link.href = "#";
            link.textContent = nome;
            dropdownConteudo.appendChild(link);
        });
    }
}
