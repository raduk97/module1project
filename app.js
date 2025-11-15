// Notes
const dialog = document.getElementById('noteDialog');
const dialogTitle = document.getElementById('dialogTitle')
const titleInput = document.getElementById('noteTitle');
const contentInput = document.getElementById('noteContent');
const notesContainer = document.getElementById('notesContainer')

let notes = []
let editingNodeId = null

//To Do



//Notes Functions
function loadNotes(){
    const savedNotes = localStorage.getItem('notes')
    if(savedNotes){
        return JSON.parse(savedNotes)
    }
    else {
        return []
    }
}

function saveNote(){
    event.preventDefault()
    
    const title = titleInput.value
    const content = contentInput.value

    if(editingNodeId){
        const noteIdex = notes.findIndex(note => note.id === editingNodeId)
        notes[noteIdex] = {
            ...notes[noteIdex],
            title: title,
            content:content
        }
    }
    else {
        notes.push({
        id: generateID(),
        title:title,
        content: content
    })
    }
    
    closeNoteDialog()
    saveNotes()
    renderNotes()
}

function generateID(){
    return Date.now().toString()
}

function saveNotes(){
    localStorage.setItem('notes', JSON.stringify(notes))
}

function deleteNote(noteId){
    notes = notes.filter(note => note.id != noteId)
    saveNotes()
    renderNotes()
}

function renderNotes(){
    notesContainer.innerHTML = notes.map(note => `
        <div class="note-card">
            <div class="note-actions">
                <button class="edit-btn" onclick="openNoteDialog('${note.id}')" title="Edit Note">
                <img src="https://img.icons8.com/?size=100&id=86725&format=png&color=000000" style="height:15px;">
                
                <button class="delete-btn" onclick="deleteNote('${note.id}')" title="Delete Note">
                <img class="" src="https://img.icons8.com/?size=100&id=99961&format=png&color=000000" style="height:15px">
            </div>    
            <h3 class="note-title">${note.title}</h3>
            <p class="note-content">${note.content}</p>            
        </div>
        `).join('')
}

function openNoteDialog(noteId){
    if(noteId){
        // Edit
        const noteEdit = notes.find(note => note.id === noteId)
        editingNodeId = noteId
        dialogTitle.textContent = "Edit Note"
        titleInput.value = noteEdit.title
        contentInput.value = noteEdit.content
    }
    else {
        //Add
        editingNodeId = null
        dialogTitle.textContent = "Add New Note"
        titleInput.value = ''
        contentInput.value = ''
    }
    
    dialog.showModal()
}

function closeNoteDialog(){
    dialog.close()
}

document.addEventListener("DOMContentLoaded", function (){
    notes = loadNotes()
    renderNotes()
    
    document.getElementById('noteForm').addEventListener('submit', saveNote)
    

})

//To Do Functions


