import { buscarDadosApi } from "./app";

 export async function criarCards(){
    const url = await buscarDadosApi()
    const main = document.getElementById('main')

    const conteiner = document.createElement('div')
    conteiner.className = 'conteinerCards'
        
    const titulo = document.createElement('h2')
    titulo.className = 'titulo' 
    titulo.textContent = url.name

    const imgProduto = document.createElement('img')
    imgProduto.src = url.image.medium
    imgProduto.className = 'imgProduto'

    const miniInformacao = document.createElement('p')
    miniInformacao.textContent = url.language

    const bntSaibaMais = document.createElement('button')
    bntSaibaMais.className = 'saibaMais'
    bntSaibaMais.textContent = "Saiba Mais"

    const subCategoria = document.createElement('p')
    subCategoria.textContent = url.status

    conteiner.append(titulo,imgProduto,miniInformacao,bntSaibaMais,subCategoria)
    main.replaceChild(conteiner)
    return main
}