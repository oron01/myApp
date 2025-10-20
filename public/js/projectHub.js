import db from "/js/db.js"
import {setUpSession,getLatestSessionToken,makeOutdated,isValid} from "/js/session.js"
import editing from "/js/editing.js"

await setUpSession()
export const startingSessionToken = await getLatestSessionToken()

let contentText = document.querySelector(".contentText")

let updateMainDump = async (content,id) => {
        let contentObject = 
    {newValue : content,
        type : "content",
        table: "projectMainDumps"
        
    }
    await db.updateDatabase(`projects/projectHub/mainDump`,id,contentObject,startingSessionToken,await getLatestSessionToken())
}   

const addMainDumpEventListener = (element) => {
    element.addEventListener("focus",() => {
        updateMainDump(element.textContent,window.projectID)})

    element.addEventListener("blur",() => {
        updateMainDump(element.textContent,window.projectID)})
}

let setKeyMovement = () => {
document.addEventListener('keydown',async e => {
    let isEventRepeated = e.repeat
    if (isEventRepeated) return;
    //Checked for spamclick

    let latestSessionToken = await getLatestSessionToken()
    let isSessionValid = isValid(startingSessionToken,latestSessionToken)
    if (!isSessionValid) {await makeOutdated()
        return
        }
    }
    )
}

let setCSS = () => {
const bodyElement = document.querySelector('body');
const mainContainerElement = document.querySelector(".mainContainer")

bodyElement.style.setProperty('--pageCount', mainContainerElement.children.length);
let pagesToMiddlePage = Math.floor(mainContainerElement.children.length / 2)
document.documentElement.style.setProperty('--pagesToMiddleCount', pagesToMiddlePage);

bodyElement.style.setProperty('--positionModifier', 0);
    bodyElement.style.setProperty('--centerFixer', 0)


let setMovementButton = (buttonClass,modifier) => {
    
    let mainContainer = document.querySelector(".mainContainer")
    let button = document.querySelector(`.${buttonClass}`)
    
    button.parentElement.addEventListener("click",() => {
    let currentPage = document.querySelector(".selectedPage")


    mainContainer.classList.add("animatePageTransitions")
    
    let pageIndexModifier = Number(getComputedStyle(bodyElement).getPropertyValue('--positionModifier'))
    bodyElement.style.setProperty('--positionModifier', Number(pageIndexModifier) + Number(modifier));

    currentPage.classList.remove("selectedPage")
    let getSibling = () => {if (modifier == -1) return "previousElementSibling"
        else return "nextElementSibling"
    }
    console.log(currentPage[getSibling()])
    currentPage[getSibling()].classList.add("selectedPage")

})
}

let createNoteFunctionality = (notes=null) => {
    if (notes == null) {
    notes = document.querySelectorAll(".testerInstance")
    console.log(notes)}
    else {notes = [notes]}

    let openNote = (note) => {
        note.currentTarget.classList.add("selectedNote")
        note.currentTarget.removeEventListener("click",openNote)
        note.currentTarget.addEventListener("click",closeNote)

    }

    let closeNote = (note) => {
        note.currentTarget.classList.remove("selectedNote")
        note.currentTarget.removeEventListener("click",closeNote)
        note.currentTarget.addEventListener("click",openNote)

    }
    notes.forEach((note) => {
        note.addEventListener("click" ,openNote)
    })
}

createNoteFunctionality()

setMovementButton("prevPageButton", -1)
setMovementButton("nextPageButton",1)

return {createNoteFunctionality}
}

let updateNoteNames = async (note) => {
    let id = note.dataset.id
    let noteType = note.dataset.type
    let newVal = note.textContent
    let newObj = db.createNewValuesObject(newVal,noteType,"note_instances")
    await db.updateDatabase("projects/projectHub/noteInstances",id,newObj,startingSessionToken,await getLatestSessionToken())
}

let updateNoteMainContent = async (note) => {
    let id = note.dataset.id
    let noteType = note.dataset.type
    let newVal = note.textContent
    let newObj = db.createNewValuesObject(newVal,noteType,"note_instances")
    await db.updateDatabase("projects/projectHub/noteInstances",id,newObj,startingSessionToken,await getLatestSessionToken())
}

let postNewNote = async (projectId) => {
    let a = await db.insertNewDBRow("projects/projectHub/noteInstances/createNote",projectId,startingSessionToken,await getLatestSessionToken())
    return a.newNote.rows[0]
}

let generateNewNoteElement = (id) => {
    let divScroller = document.querySelector(".dataPageDataScrollerDiv")
    let subject = divScroller.lastElementChild
    console.log(subject)
    let newNote = subject.cloneNode(true)
    let newPosition = Number(newNote.dataset.position) + 1
    newNote.dataset.position = newPosition
    let fields = newNote.querySelectorAll("p")
    fields.forEach((field) => {
        field.dataset.id = id
        field.textContent = "[]"
    })
    divScroller.appendChild(newNote)
    return newNote


}
let setNewNoteEventListener = async () => {
    let button = document.querySelector(".addNoteButton")
    button.addEventListener("click",async (e) => {
            const projectID = e.currentTarget.dataset.projectid
            console.log(projectID)
            let id = await postNewNote(projectID)
            let newNoteElement = generateNewNoteElement(id.id)
            cssFunctions.createNoteFunctionality(newNoteElement)
            let noteHeader = (`.testerInstance:last-child [data-type="note_name"]`)
            let noteMainContent = (`.testerInstance:last-child [data-type="content"]`)
            editing.createTextEventHandlers(noteMainContent,updateNoteMainContent)
            editing.createTextEventHandlers(noteHeader,updateNoteNames)
        
        }
            
    )
}
setNewNoteEventListener()

editing.createTextEventHandlers(".testerInstance > p",updateNoteNames)
editing.createTextEventHandlers(".noteMainContent",updateNoteMainContent)

let cssFunctions = setCSS()


setKeyMovement()
addMainDumpEventListener(contentText)

