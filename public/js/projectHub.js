import db from "/js/db.js"
import {setUpSession,getLatestSessionToken,makeOutdated,isValid} from "/js/session.js"

await setUpSession()
const startingSessionToken = await getLatestSessionToken()

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

let createNoteFunctionality = () => {
    let notes = document.querySelectorAll(".testerInstance")
    console.log(notes)

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
}
setCSS()


setKeyMovement()
addMainDumpEventListener(contentText)

