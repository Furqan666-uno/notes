const btn= document.getElementsByClassName('btn')[0];
const app= document.getElementsByClassName('app')[0];


// to make sure the saved notes remains in the web page even after the web page is refreshed
getNotes().forEach((note) => {
    const noteEl= createNoteEl(note.id, note.content);
    app.insertBefore(noteEl, btn); //to insert noteEl, but before the btn 
})  


function createNoteEl(id, content)
{
    //to create a new textarea everytime some clicks the button
    const element= document.createElement('textarea');
    element.classList.add('note'); //just like in the html code for notes area we created
    element.placeholder='Empty Note'
    element.cols= '30'
    element.rows= '10'
    element.value= content 

    //for adding func of double clicking to delete a note
    element.addEventListener('dblclick', () => {  
        const warning= confirm('DO you want to delete the note ?') //confirm= creates a popup window to confirm deletion
        if (warning) //warning===true
        {
            deleteNote(id, element);
        }
    })

    //for adding func to take user input for the note
    element.addEventListener('input', () => {
        updateNote(id, element.value);
    })

    return element; //this will now send element to the noteEl from addNote()
}


function deleteNote(id, element) 
{
    const notes= getNotes().filter((note)=> note.id != id)
    //note.id != id, means if the use input id is not equal to id, only then it will be kept in the localStorage 
    saveNote(notes);
    app.removeChild(element) // to make sure the note is also removed from the webpage
}


//to make sure if the user input is written in the note, it is updated in the localStorage also 
function updateNote(id, content)
{
    const notes= getNotes()
    const target= notes.filter((note)=>note.id == id)[0]; 
    //filter= filter out notes using their id, [0]= points to the 1st note.id in the localStorage
    //note.id == id, means if the note.id is equal to the user input id
    target.content= content
    saveNote(notes);
}


function addNote() {
    const notes= getNotes();
    const noteObj= {id: Math.floor(Math.random()*100000), content: ""}; //this creates an object(dictionary in python) with random id no. and content
    const noteEl= createNoteEl(noteObj.id, noteObj.content);
    app.insertBefore(noteEl, btn); // used to insert a note but to make sure to add it before the button
    notes.push(noteObj);
    saveNote(notes);
} 


// to save notes to the localStorage, found in inspect->Application->localstorage
function saveNote(notes)
{
    // here note-app will be the key, JSON.stringify will convert array to string, then add notes id and content in value of storage
    localStorage.setItem('notes-app', JSON.stringify(notes)); 
}


//to get notes from the localStorage
function getNotes() 
{
    return JSON.parse(localStorage.getItem('notes-app') || '[]'); 
    //parse= convert JSON to JSobject or an array, []= if nothing is in localStorage, it will return an empty array
}

btn.addEventListener('click', addNote);