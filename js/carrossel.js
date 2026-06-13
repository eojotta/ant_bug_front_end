export async function buscarDadosApi(){
    try {
        const url = `https://api.tvmaze.com/shows`
        const response = await fetch(url)

        // O throw new Error é para utilizar o Erro 
        if(!response.ok) throw new Error("requisição falhou");
        const dados = await response.json()

        return dados
        
    } catch (error) {
        let alerta =alert("não consegui pegar nada")
        return alerta
    }
}

function randomImagens(dados){
    const imgTodas = dados.length

    if(imgTodas > 0){
        const random = Math.random() * imgTodas
        const randomImg = Math.floor(random)
        const imgSorteado = dados[randomImg]

        //caso precise mudar é aqui
        if(imgSorteado.image.medium){

            // para pegar as imagens da api
            const img = imgSorteado.image.medium

            return img
        }
        else{
            return randomImagens(dados)
        }
    }
    else{
        let alerta =alert("Não fez o random")
        return alerta
    }
}

async function criarFotosCarrossel(dados){
    const pegarImage = randomImagens(dados)

    const ulCarrossel = document.getElementById('carrossel')
    const li = document.createElement('li')
    const imageProduto = document.createElement('img')

    li.className = 'listaCarrossel'

    imageProduto.src = pegarImage
    imageProduto.className = 'imageProduto'

    li.appendChild(imageProduto)
    ulCarrossel.appendChild(li)
}

 async function moverCarrossel(){
    const ulCarrossel = document.getElementById('carrossel')
    let dados = await buscarDadosApi()

    setInterval( () => {
        if(ulCarrossel.children.length === 0){

            for(let i = 0;i < 7;i++){
                criarFotosCarrossel(dados)
            }
        }

        criarFotosCarrossel(dados)

        ulCarrossel.style.transition = 'transform 0.5s ease-in-out'
        ulCarrossel.style.transform = `translateX(-230px)`

        setTimeout(() => {
            const primeiroItem = ulCarrossel.querySelector('.listaCarrossel');
            if (primeiroItem) {
                primeiroItem.remove(); // Apaga a foto que sumiu na esquerda
            }
            ulCarrossel.style.transition = 'none'
            ulCarrossel.style.transform = 'translateX(0px)'
        },500)
    },1800)
}

moverCarrossel()