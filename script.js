//definir cores alternadas para as notas
let noteColors = ['#f28b82', '#fbbc04', '#fff475', '#ccff90', '#a7ffeb', '#cbf0f8', '#aecbfa', '#d7aefb']
let colorIndex = 0

//selecionar elementos do DOM
const addNoteButton = document.getElementById("add-note")
const noteTitleInput = document.getElementById("note-title")
const noteContentInput = document.getElementById("note-content")
const noteTagsInput = document.getElementById("note-tags")
const notesList = document.getElementById("notes-list")

//carregar notas do localStorage quando o conteúdo do DOM estiver totalmente carregado
document.addEventListener("DOMContentLoaded", loadNotes)

//adicionar evento ao acionamento do botao Adicionar na WEB
addNoteButton.addEventListener('click', addNote)

function addNote() {
    const title = noteTitleInput.value
    const content = noteContentInput.value
    const tags = noteTagsInput.value.split(',').map(tag => tag.trim())

    if (title && content) {
        const note = {
            id: Date.now(),
            title,
            content,
            tags,
            color: getNextColor() //definir a cor alternada para a nota
        }
        saveNoteTolocalStorage(note) //salvar a nota no localstorage
        displayNote(note) //exibir a nota na lista

        //limpar os campos de entrada de dados
        noteTitleInput.value = ''
        noteContentInput.value = ''
        noteTagsInput.value = ''
    }
    if (title === '' || content === '') {
        alert("Estão faltando campos para realizar o procedimento");
    }

}

//funcao para escolher a cor alternada
function getNextColor() {
    const color = noteColors[colorIndex]
    colorIndex = (colorIndex + 1) % noteColors.length //atualizar o indice para a proxima cor
    return color;
}

//funcao para exebir uma nota
function displayNote(note) {
    const noteItem = document.createElement('div') //criar um novo div para a nota
    noteItem.classList.add('note-item') //adiconar a classe 'note-item'
    noteItem.setAttribute('data-id', note.id) //definir o atributo 'data-id' com o ID da nota
    noteItem.style.backgroundColor = note.color //definir a cor de fundo da nota

    //definir o conteudo HTML do div da nota
    noteItem.innerHTML = `
    <h3>${note.title}</h3>
    <p>${note.content}</p>
    <div class="tags">${note.tags.map(tag => `#${tag}`).join(' ')}</div>
    <button onclick="deleteNote(${note.id})">Excluir</button>
`;


    notesList.appendChild(noteItem) //adicionar a nota á lista de Notas
}

//funcao para salvar uma nota no localStorage
function saveNoteTolocalStorage(note) {
    let notes = getNotesFromLocalStorage() // obter as notas existentes do localstorage
    notes.push(note)
    localStorage.setItem('notes', JSON.stringify(notes)) //salvar a lista atualizada no localstorage
}

//funcao para carregar as notas do localStorage
function loadNotes() {
    const notes = getNotesFromLocalStorage() //obter as notas do LocalStorage
    notes.forEach(note => displayNote(note)) //exibir cada nota
}

function getNotesFromLocalStorage() {
    return localStorage.getItem('notes') ?
        JSON.parse(localStorage.getItem('notes')) : [] //retornar as notas ou uma lista vazia
}

function deleteNote(id) {
    let notes = getNotesFromLocalStorage() //obter as notas do localStorage
    notes = notes.filter(note => note.id != id) //filtrar a nota a ser excluida
    localStorage.setItem('notes', JSON.stringify(notes)) //salvar a lista atualziada no localstorage
    document.querySelector(`[data-id="${id}"]`).remove() //remover a nota na lista exibida

}