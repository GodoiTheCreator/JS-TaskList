const inputTarefa = document.querySelector('.input-tarefa')
const buttonAdd = document.querySelector('.buttonAdd')
const tarefas = document.querySelector('.tarefas')

function criaLi(){
    const li = document.createElement('li')
    return li
}

function criaTarefa(tarefa){
    const li = criaLi()
    li.innerHTML = tarefa
    tarefas.appendChild(li)
    limpaInput()
    criaBotaoApagar(li)
    salvarTarefas()
}

function salvarTarefas() {
    const liTarefas = tarefas.querySelectorAll('li')
    const listaDeTarefas = []

    for (let tarefa of liTarefas){
        let tarefaTexto = tarefa.innerText
        tarefaTexto = tarefaTexto.replace('Apagar', '').trim()
        listaDeTarefas.push(tarefaTexto)
    }

    const tarefaJSON = JSON.stringify(listaDeTarefas)
    localStorage.setItem('tarefas', tarefaJSON)
}

function adicionaTarefasSalvas(){
    const tarefas = localStorage.getItem('tarefas')
    const listaDeTarefas = JSON.parse(tarefas)

    for (let tarefa of listaDeTarefas){
        criaTarefa(tarefa)
    }
}

function limpaInput(){
    inputTarefa.value = ''
    inputTarefa.focus()
}

function criaBotaoApagar(li){
    li.innerText += ' '
    const botaoApagar = document.createElement('button')
    botaoApagar.innerText = 'Apagar'
    botaoApagar.setAttribute('class', 'apagar')
    li.appendChild(botaoApagar)
}

document.addEventListener('click', function(e){
    const el = e.target

    if(el.classList.contains('apagar')){
        el.parentElement.remove()
        salvarTarefas()
    }
    
})

inputTarefa.addEventListener('keypress', function(e){
    if(e.keyCode == 13) {
        e.preventDefault()
        if(!inputTarefa.value) return
        criaTarefa(inputTarefa.value)
    }
})

buttonAdd.addEventListener('click', function(e){
    e.preventDefault()
    if(!inputTarefa.value) return
    criaTarefa(inputTarefa.value)
})

adicionaTarefasSalvas()

