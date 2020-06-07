function populateUFs () { // declarando a função
    const ufSelect = document.querySelector("select[name=uf]") // procura o select que tem o nome "uf"

    fetch ("https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome") // fetch = promessa que vai no site
    .then( res => res.json() ) // arrow function (é uma função anonima menor) que está retornando um valor JSON
    .then( states => {

        for( const state of states ) {
            ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`
        }
  
    } )
}

populateUFs () // executando a função


function getCities(event) {
    const citySelect = document.querySelector("[name=city]") // procura o select que tem o nome "cidades"
    const stateInput = document.querySelector("[name=state]") // procura o select que tem o nome "cidades"

    const ufValue = event.target.value

    const indexOfSelectedState = event.target.selectedIndex
    stateInput.value = event.target.options[indexOfSelectedState].text


    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios?orderBy=nome`


    citySelect.innerHTML = "<option value>Selecione a Cidade</option>" // Campo cidade inicia como vazio
    citySelect.disabled = true // desabilita o campo cidade, ao selecionar outro estado

    fetch (url)
    .then( res => res.json() ) 
    .then( cities => {
        

        for( const city of cities ) {
            citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`
        }

        citySelect.disabled = false
    } )
}


document
 .querySelector("select[name=uf]") // procura o select que tem o nome "uf"
 .addEventListener("change", getCities) // passando a função por referencia (só vai executar quando mudar)

    
 // Itens de coleta
 // pegar todos os li's
 const itemsToCollect = document.querySelectorAll(".items-grid li")

 for (const item of itemsToCollect) {
     item.addEventListener("click", handleSelectedItem)
 }

   // atualizar o campo escondido com os itens selecionados
const collectedItems = document.querySelector("input[name=items]")

let selectedItems = []

 function handleSelectedItem(event) {
    const itemLi = event.target
    
    //adicionar ou remover uma classe com JavaScript
    itemLi.classList.toggle("selected") // toggle adicionar ou remover o elemento

    const itemId = event.target.dataset.id
  
    console.log('IDEM ID: ', itemId)

    //verificar se existem itens selecionados, se sim
    // pegar os itens selecionados

    const alreadySelected = selectedItems.findIndex( item => {
        const itemFound = item == itemId // isso sera true o false
        return itemFound
    })

    // se já estiver selecionado, tirar da seleção
    if (alreadySelected >= 0) {
        // tirar da seleção
        const filteredItems = selectedItems.filter( item  => {
            const itemIsDifferent = item != itemId
            return itemIsDifferent
        })

        selectedItems = filteredItems
    } else {
        // se não estiver selecionado
        // adicionar à seleção
        selectedItems.push(itemId)
    }

    console.log('selectedItems: ', selectedItems)

      // atualizar o campo escondido com os itens selecionados
    collectedItems.value = selectedItems

 }
