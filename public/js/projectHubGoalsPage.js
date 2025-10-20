import db from "/js/db.js"
import {setUpSession,getLatestSessionToken,makeOutdated,isValid, setGlobalVersionChecker} from "/js/session.js"
import { startingSessionToken } from "/js/projectHub.js"
import editing from "/js/editing.js"

let currentSession = startingSessionToken
console.log("session set")

let objectiveButtons = document.querySelectorAll(".objectiveContainer")
let sequenceButtons = document.querySelectorAll(".subObjectiveSequence")
let taskButtons = document.querySelectorAll(".subObjectiveTask")
let subSequenceTaskButtons = document.querySelectorAll(".subSequenceTask")
let newSubObjectiveTaskButtons = document.querySelectorAll('.addSubObjectiveTaskButton')
let newSubSequenceTaskButton = document.querySelectorAll('.addNewSubtaskButton')
let newSequenceButtons = document.querySelectorAll('.addSubObjectiveSequenceButton')
let newObjectiveButtons = document.querySelectorAll(".goalAddObjectiveButton")
let openObj = ''

let makeOpenCloseFunctions = (newClass,isInvalid=null) => {

    let open,close
    open = function (e) {
    e.currentTarget.classList.add(newClass)
    e.currentTarget.addEventListener("click", close)
    e.currentTarget.removeEventListener("click", open)
}
    close = function (e) {
    if (isInvalid !== null && isInvalid(e)) return
    e.currentTarget.classList.remove(newClass)
    e.currentTarget.addEventListener("click", open)
    e.currentTarget.removeEventListener("click", close)
}
return {open,close}
}

    const isInvalidObjectiveClose = (e) => {
        let outcome = (!e.target.classList.contains("selectedObjectiveContainer")
    && (!e.target.classList.contains("objectiveDescription"))
    && (!e.target.classList.contains("skibidi")))
    return outcome}

    const isInvalidSequenceClose= (e) => {
        let outcome = (!e.target.classList.contains("selectedSubObjectiveSequence"))
    return outcome}

        const isInvalidTaskClose= (e) => {
        let outcome = (!e.target.classList.contains("goalTaskName")
    && (!e.target.classList.contains("goalTaskDescription")))  
    return outcome}

            const isInvalidSubSequenceTaskClose= (e) => {
        let outcome = (!e.target.classList.contains("goalTaskName")
    && (!e.target.classList.contains("goalTaskDescription")))  
    return outcome}


const {open: openObjective, close:closeObjective} = makeOpenCloseFunctions("selectedObjectiveContainer",isInvalidObjectiveClose)

const {open:openSequence, close:closeSequence} = makeOpenCloseFunctions("selectedSubObjectiveSequence",isInvalidSequenceClose)
const {open:openTask, close:closeTask} = makeOpenCloseFunctions("selectedSubObjectiveTask",isInvalidTaskClose)
const {open:openSubSequenceTask, close:closeSubSequenceTask} = makeOpenCloseFunctions("selectedSubSequenceTask",isInvalidSubSequenceTaskClose)

let addNewTaskElement = () => {
   let taskDiv = document.createElement("div")
   taskDiv.classList = "subObjectiveTask"
    let orderUpButton = document.createElement("div")
   orderUpButton.classList = "taskOrderUpButton"
   orderUpButton.textContent = `/\\`
   let orderDownButton = document.createElement("div")
   orderDownButton.classList = "taskOrderDownButton"
   orderDownButton.textContent = "\\/"
   let checkButton = document.createElement("div")
   checkButton.classList = "checkSubObjectiveButton"
   checkButton.textContent = "✓"
   let removeButton = document.createElement("div")
   removeButton.classList = "removeSubTaskButton"
   removeButton.textContent = "X"
   let taskName = document.createElement("p")
   taskName.textContent = "Task: "
   taskName.classList = "goalTaskName"
   let taskNameField = document.createElement("span")
   taskNameField.classList = "goalTaskNameField"
   taskName.append(taskNameField)
   taskNameField.textContent = '[]'
   taskNameField.contentEditable = "plaintext-only"
   let taskDescription = document.createElement("p")
   taskDescription.classList = "goalTaskDescription"
   taskDescription.textContent = "Description:"
   let taskDescriptionField = document.createElement("span")
   taskDescriptionField.classList = "goalTaskDescriptionField"
   taskDescriptionField.textContent = '[]'
   taskDescriptionField.contentEditable = "plaintext-only"
   taskDescription.append(taskDescriptionField)
   
   let allChildren = [orderUpButton,orderDownButton,checkButton,removeButton,taskName,taskDescription]
    allChildren.forEach((child) => {
        taskDiv.append(child)
    })

    let contentContainer = document.querySelector(".selectedObjectiveContainer > .objectiveContents")
    let newSeparator = document.createElement("div")
    newSeparator.textContent = "▼"
    newSeparator.classList = "subObjectiveSeparator"
    contentContainer.appendChild(newSeparator)
    contentContainer.appendChild(taskDiv)

    let addEventListeners = () => {
        setButtonEventListeners([taskDiv],openTask)
    }
    addEventListeners()
}

let addNewSubSequenceTaskElement = (e) => {
   let taskDiv = document.createElement("div")
   taskDiv.classList = "subSequenceTask"
    let orderUpButton = document.createElement("div")
   orderUpButton.classList = "taskOrderUpButton"
   orderUpButton.textContent = `/\\`
   let orderDownButton = document.createElement("div")
   orderDownButton.classList = "taskOrderDownButton"
   orderDownButton.textContent = "\\/"
   let checkButton = document.createElement("div")
   checkButton.classList = "checkSubObjectiveButton"
   checkButton.textContent = "✓"
   let removeButton = document.createElement("div")
   removeButton.classList = "removeSubTaskButton"
   removeButton.textContent = "X"
   let taskName = document.createElement("p")
   taskName.textContent = "Task:"
   taskName.classList = "goalTaskName"
   let taskNameField = document.createElement("span")
   taskNameField.classList = "goalTaskNameField"
   taskName.append(taskNameField)
   taskNameField.textContent = '[]'
   taskNameField.contentEditable = "plaintext-only"
   let taskDescription = document.createElement("p")
   taskDescription.classList = "goalTaskDescription"
   taskDescription.textContent = "Description:"
   let taskDescriptionField = document.createElement("span")
   taskDescriptionField.classList = "goalTaskDescriptionField"
   taskDescriptionField.textContent = '[]'
   taskDescriptionField.contentEditable = "plaintext-only"
   taskDescription.append(taskDescriptionField)
   
   let allChildren = [orderUpButton,orderDownButton,checkButton,removeButton,taskName,taskDescription]
    allChildren.forEach((child) => {
        taskDiv.append(child)
    })
    let newSeparator = document.createElement("div")
    newSeparator.textContent = "▼"
    newSeparator.classList = "subSequenceSeparator"

    let parentSequence = e.currentTarget.parentNode
    let plusButton = parentSequence.querySelector('.addNewSubtaskButton')
    parentSequence.insertBefore(newSeparator,plusButton)
    parentSequence.insertBefore(taskDiv,plusButton)

    // parentSequence.appendChild(newSeparator)
    // parentSequence.appendChild(taskDiv)

    let addEventListeners = () => {
        setButtonEventListeners([taskDiv],openSubSequenceTask)
    }
    addEventListeners()
}

let addNewSequenceElement = () => {
   let sequenceDiv = document.createElement("div")
   sequenceDiv.classList = "subObjectiveSequence"
   sequenceDiv.textContent = "Sequence: "

   let sequenceDivNameField = document.createElement('span')
   sequenceDivNameField.classList = "sequenceNameField"
   sequenceDivNameField.textContent = '[]'
      sequenceDivNameField.contentEditable = "plaintext-only"


    let orderUpButton = document.createElement("div")
   orderUpButton.classList = "sequenceOrderUpButton"
   orderUpButton.textContent = `/\\`

   let orderDownButton = document.createElement("div")
   orderDownButton.classList = "sequenceOrderDownButton"
   orderDownButton.textContent = "\\/"

   let checkButton = document.createElement("div")
   checkButton.classList = "checkSubObjectiveButton"
   checkButton.textContent = "✓"

   let removeButton = document.createElement("div")
   removeButton.classList = "removeSubSequenceButton"
   removeButton.textContent = "X"


   let addNewTaskButton = document.createElement("div")
   addNewTaskButton.classList = "addNewSubtaskButton"
   addNewTaskButton.textContent = '+'
   
   let allChildren = [sequenceDivNameField,orderUpButton,orderDownButton,checkButton,removeButton,addNewTaskButton]
    allChildren.forEach((child) => {
        sequenceDiv.append(child)
    })

    let contentContainer = document.querySelector(".selectedObjectiveContainer > .objectiveContents")
    let newSeparator = document.createElement("div")
    newSeparator.textContent = "▼"
    newSeparator.classList = "subObjectiveSeparator"
    contentContainer.appendChild(newSeparator)
    contentContainer.appendChild(sequenceDiv)

    let addEventListeners = () => {
        setButtonEventListeners([sequenceDiv],openSequence)
        setButtonEventListeners([addNewTaskButton],addNewSubSequenceTaskElement)
    }
    addEventListeners()
}

let addNewObjectiveElement = async () => {
    let createNewObjectiveElement = () => {
let objectiveContainerDiv = document.createElement("div")
objectiveContainerDiv.classList = "objectiveContainer"

let objectiveHeader = document.createElement("p")
objectiveHeader.classList = "objectiveHeader"
objectiveHeader.textContent = "Sample Objective"
objectiveHeader.contentEditable = "plaintext-only"

let objectiveDetails = document.createElement("div")
objectiveDetails.classList = "objectiveDetails"

let objectiveDetailsDescription = document.createElement("p")
objectiveDetailsDescription.textContent = "Description: " 

let objectiveDetailsDescriptionField = document.createElement("span")
objectiveDetailsDescriptionField.textContent = "Sample Details" 
objectiveDetailsDescriptionField.contentEditable = "plaintext-only"

let objectiveContents = document.createElement("div")
objectiveContents.classList = "objectiveContents"

let addSubObjectiveButtons = document.createElement("div")
addSubObjectiveButtons.classList = "addSubObjectiveButtons"

let addSubObjectiveTaskButton = document.createElement("div")
addSubObjectiveTaskButton.classList = "addSubObjectiveTaskButton"
addSubObjectiveTaskButton.textContent = "+T" 

let addSubObjectiveSequenceButton = document.createElement("div")
addSubObjectiveSequenceButton.classList = "addSubObjectiveSequenceButton"
addSubObjectiveSequenceButton.textContent = "+S"

objectiveContainerDiv.append(objectiveHeader)
objectiveContainerDiv.append(objectiveDetails)
objectiveDetails.append(objectiveDetailsDescription)
objectiveDetailsDescription.append(objectiveDetailsDescriptionField)
objectiveContainerDiv.append(objectiveContents)
objectiveContainerDiv.append(addSubObjectiveButtons)
addSubObjectiveButtons.append(addSubObjectiveTaskButton)
addSubObjectiveButtons.append(addSubObjectiveSequenceButton)

let goalsCardContainer = document.querySelector(".goalsCardContainer")
goalsCardContainer.append(objectiveContainerDiv)

let addEventListeners = () => {
setButtonEventListeners([objectiveContainerDiv],openObjective)
setButtonEventListeners([addSubObjectiveTaskButton],addNewTaskElement)
setButtonEventListeners([addSubObjectiveSequenceButton],addNewSequenceElement)

}

addEventListeners()
    }
    let getObjectiveID = async () => {
        let latestObjectiveID = await db.getSubProjectID("projects/projectHub/getLatestID","objective",window.projectID,currentSession,await getLatestSessionToken())
        return objectiveID
    }
let objectiveID = getObjectiveID()
    createNewObjectiveElement(objectiveID)
}

let updateText = async (e) => { //for some reason i've made e the target already
        let key = e.dataset.key
        let type = e.closest("[data-type]").dataset.type
        let id = e.closest("[data-id]").dataset.id
        
        let newValuesObj = {val : e.textContent}
        let obama = window.projectID
        // console.log({type,obama,id,key,newValuesObj})
        await db.updateGoalsPart("projects/projectHub/updateText",type,window.projectID,id,key,newValuesObj)
    }

editing.createTextEventHandlers(`.goalsPageContentDiv [contenteditable="plaintext-only"]`,updateText)

let setButtonEventListeners = (allButtonElements, handler) => {
allButtonElements.forEach(button => {
    button.addEventListener("click", handler)
})
}
setButtonEventListeners(objectiveButtons,openObjective)
setButtonEventListeners(sequenceButtons,openSequence)
setButtonEventListeners(taskButtons,openTask)
setButtonEventListeners(subSequenceTaskButtons,openSubSequenceTask)
setButtonEventListeners(newSubObjectiveTaskButtons,addNewTaskElement)
setButtonEventListeners(newSubSequenceTaskButton,addNewSubSequenceTaskElement)
setButtonEventListeners(newSequenceButtons,addNewSequenceElement)
setButtonEventListeners(newObjectiveButtons,addNewObjectiveElement)

