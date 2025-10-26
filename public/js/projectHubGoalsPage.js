import db from "/js/db.js"
import {getLatestSessionToken,makeOutdated,isValid, setGlobalVersionChecker} from "/js/session.js"
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
let removeSubTaskButton = document.querySelectorAll('.removeSubTaskButton')
let removeSequenceButton = document.querySelectorAll('.removeSubSequenceButton')
let checkerButton = document.querySelectorAll('.checkSubObjectiveButton')

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

let checkInvalidity = () => {

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

    return {isInvalidObjectiveClose,isInvalidSequenceClose,isInvalidTaskClose,isInvalidSubSequenceTaskClose}
}

let checkInv = checkInvalidity()

const {open: openObjective, close:closeObjective} = makeOpenCloseFunctions("selectedObjectiveContainer",checkInv.isInvalidObjectiveClose)
const {open:openSequence, close:closeSequence} = makeOpenCloseFunctions("selectedSubObjectiveSequence",checkInv.isInvalidSequenceClose)
const {open:openTask, close:closeTask} = makeOpenCloseFunctions("selectedSubObjectiveTask",checkInv.isInvalidTaskClose)
const {open:openSubSequenceTask, close:closeSubSequenceTask} = makeOpenCloseFunctions("selectedSubSequenceTask",checkInv.isInvalidSubSequenceTaskClose)

let addNewElementFunction = () => {

let addNewTaskElement = async (e) => {

    let createTasksElement = (taskID) => {
    let taskDiv = document.createElement("div")
   taskDiv.classList = "subObjectiveTask"
   taskDiv.dataset.type = "task"
   taskDiv.dataset.id = taskID
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
   taskNameField.dataset.key = 'name'
   let taskDescription = document.createElement("p")
   taskDescription.classList = "goalTaskDescription"
   taskDescription.textContent = "Description:"
   let taskDescriptionField = document.createElement("span")
   taskDescriptionField.classList = "goalTaskDescriptionField"
   taskDescriptionField.textContent = '[]'
   taskDescriptionField.contentEditable = "plaintext-only"
   taskDescriptionField.dataset.key = 'description'
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
        setButtonEventListeners([removeButton],remove.removeSubTask)
    }
    addEventListeners()

    }

    let getLatestTaskID = async () => {
    let latestTaskID = await db.getSubProjectID("projects/projectHub/getLatestID","task",currentSession,await getLatestSessionToken())
        return latestTaskID.latestID.rows[0].id
    }
    let taskID = await getLatestTaskID()
    console.log(taskID + 'bnana')

    let postNewTask = async (id) => {
    console.log(e.target.closest("[data-type = 'objective']"))
    let objectiveID = e.target.closest("[data-type = 'objective']").dataset.id
    let sequenceID = null
    if (e.target.closest("[data-type='sequence']")) sequenceID = e.target.closest("[data-type='sequence']").dataset.id

    await db.postGoalsPart("projects/projectHub/postNew","task",window.projectID,id,currentSession,await getLatestSessionToken(),{sequenceID,objectiveID})
}
    createTasksElement(taskID)
    postNewTask(taskID)


}

let addNewSubSequenceTaskElement = async (e) => {
    let createTaskElement = async (taskID) => {

   let taskDiv = document.createElement("div")
   taskDiv.classList = "subSequenceTask"
   taskDiv.dataset.type = 'task'
    taskDiv.dataset.id = taskID
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
   taskNameField.dataset.key = 'name'
   let taskDescription = document.createElement("p")
   taskDescription.classList = "goalTaskDescription"
   taskDescription.textContent = "Description:"
   let taskDescriptionField = document.createElement("span")
   taskDescriptionField.classList = "goalTaskDescriptionField"
   taskDescriptionField.textContent = '[]'
   taskDescriptionField.contentEditable = "plaintext-only"
   taskDescriptionField.dataset.key = 'description'
   taskDescription.append(taskDescriptionField)
   
   let allChildren = [orderUpButton,orderDownButton,checkButton,removeButton,taskName,taskDescription]
    allChildren.forEach((child) => {
        taskDiv.append(child)
    })
    let newSeparator = document.createElement("div")
    newSeparator.textContent = "▼"
    newSeparator.classList = "subSequenceSeparator"

    let parentSequence = e.target.closest("[data-type='sequence']")
    let plusButton = parentSequence.querySelector('.addNewSubtaskButton')
    parentSequence.insertBefore(newSeparator,plusButton)
    parentSequence.insertBefore(taskDiv,plusButton)

    // parentSequence.appendChild(newSeparator)
    // parentSequence.appendChild(taskDiv)

    let addEventListeners = () => {
        setButtonEventListeners([taskDiv],openSubSequenceTask)
        setTextEventHandlers("",taskDiv)
    }
    addEventListeners()
    }

    let getLatestTaskID = async () => {
    let latestTaskID = await db.getSubProjectID("projects/projectHub/getLatestID",'task',currentSession,await getLatestSessionToken())
        return latestTaskID.latestID.rows[0].id
    }
    let taskID = await getLatestTaskID()
    console.log(taskID)

    let postNewTask = async (id) => {
    console.log(e.target.closest("[data-type = 'objective']"))
    let objectiveID = e.target.closest("[data-type = 'objective']").dataset.id
    let sequenceID = null
    if (e.target.closest("[data-type='sequence']")) sequenceID = e.target.closest("[data-type='sequence']").dataset.id

    await db.postGoalsPart("projects/projectHub/postNew","task",window.projectID,id,currentSession,await getLatestSessionToken(),{sequenceID,objectiveID})
}
    createTaskElement(taskID)
    postNewTask(taskID)
}

let addNewSequenceElement = async (e) => {
    let createNewSequenceElement = () => {
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
    let getLatestSequenceID = async () => {
        let latestSequenceID = await db.getSubProjectID("projects/projectHub/getLatestID","sequence",currentSession,await getLatestSessionToken())
            return latestSequenceID.latestID.rows[0].id
    }
    let sequenceID = await getLatestSequenceID()

    let postNewSequence = async (id) => {
        let goalID = document.querySelector('.goalDiv')
        goalID = goalID.dataset.id
        console.log(e.target.closest("[data-type = 'objective']"))
        let objectiveID = e.target.closest("[data-type = 'objective']").dataset.id
        await db.postGoalsPart("projects/projectHub/postNew","sequence",window.projectID,id,currentSession,await getLatestSessionToken(),{goalID,objectiveID})
    }
    createNewSequenceElement(sequenceID)
    postNewSequence(sequenceID)

}

let addNewObjectiveElement = async () => {
    let createNewObjectiveElement = async (id) => {
let objectiveContainerDiv = document.createElement("div")
objectiveContainerDiv.classList = "objectiveContainer"
objectiveContainerDiv.dataset.type = "objective"
objectiveContainerDiv.dataset.id = id


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
        let latestObjectiveID = await db.getSubProjectID("projects/projectHub/getLatestID","objective",currentSession,await getLatestSessionToken())
        console.log(latestObjectiveID.latestID.rows[0].id)
        return latestObjectiveID.latestID.rows[0].id
    }
    let postNewObjectiveElement = async (id) => {
        let goalID = document.querySelector('.goalDiv')
        goalID = goalID.dataset.id
        console.log(goalID)
        await db.postGoalsPart("projects/projectHub/postNew","objective",window.projectID,id,currentSession,await getLatestSessionToken(),{goalID})
    }
let objectiveID = await getObjectiveID()
    postNewObjectiveElement(objectiveID)
    createNewObjectiveElement((objectiveID))
}

return {addNewTaskElement,addNewSubSequenceTaskElement,addNewSequenceElement,addNewObjectiveElement}
}
let addNew = addNewElementFunction()

let removeElementFunction = () => {
    let removeSubTask = (e) => {
    let removeSubTaskElement = () => {
        console.log(e.target)
        let subTaskElement = e.target.closest('[data-type="task"]')
        console.log(subTaskElement)
                if (subTaskElement.previousElementSibling.classList.contains("subObjectiveSeparator")) {subTaskElement.previousElementSibling.remove()}
        subTaskElement.remove()

    }
    let removeSubtaskFromDB = async () => {
        let elemID = e.target.closest('[data-type="task"]').dataset.id
        db.removeGoalsPart("projects/projectHub/remove","task",elemID,startingSessionToken,await getLatestSessionToken(),{})
    }
    removeSubTaskElement()
    removeSubtaskFromDB()

    }

        let removeSequence = (e) => {
        let removeSequenceElement = () => {
                        console.log(e.currentTarget)
        let sequenceElement = e.currentTarget.closest('[data-type="sequence"]')
        console.log(sequenceElement)
                if (sequenceElement.previousElementSibling && sequenceElement.previousElementSibling.classList.contains("subObjectiveSeparator")) {sequenceElement.previousElementSibling.remove()}
        sequenceElement.remove()

            }
        let removeSequenceFromDB = async () => {
            let elemID = e.target.closest('[data-type="sequence"]').dataset.id
            db.removeGoalsPart("projects/projectHub/remove","sequence",elemID,startingSessionToken,await getLatestSessionToken(),{})


        }
        removeSequenceElement()
        removeSequenceFromDB()
    }

    return {removeSubTask,removeSequence}
}
let remove = removeElementFunction()

let markElementFunction = () => {
let markTaskElement = (e) => {
    let taskElement = e.currentTarget.closest('[data-type="task"]')
    if (!taskElement.classList.contains("marked")) taskElement.classList.add("marked")
        else {taskElement.classList.remove("marked")}
}
    return {markTaskElement}
}
let mark = markElementFunction()

let updateText = async (e) => { //for some reason i've made e the target already
        let key = e.target.dataset.key
        let type = e.target.closest("[data-type]").dataset.type
        let id = e.target.closest("[data-id]").dataset.id
        
        let newValuesObj = {val : e.target.textContent}
        let obama = window.projectID
        // console.log({type,obama,id,key,newValuesObj})
        await db.updateGoalsPart("projects/projectHub/updateText",type,id,key,newValuesObj,startingSessionToken,await getLatestSessionToken())
    }
    
let setTextEventHandlers = (selector=".goalsPageContentDiv",optElem=undefined) => {
editing.createTextEventHandlers(`${selector} [contenteditable="plaintext-only"]`,updateText,optElem)
}

setTextEventHandlers()

let setButtonEventListeners = (allButtonElements, handler) => {
allButtonElements.forEach(button => {
    button.addEventListener("click", handler)
})
}

setButtonEventListeners(objectiveButtons,openObjective)
setButtonEventListeners(sequenceButtons,openSequence)
setButtonEventListeners(taskButtons,openTask)
setButtonEventListeners(subSequenceTaskButtons,openSubSequenceTask)
setButtonEventListeners(newSubObjectiveTaskButtons,addNew.addNewTaskElement)
setButtonEventListeners(newSubSequenceTaskButton,addNew.addNewSubSequenceTaskElement)
setButtonEventListeners(newSequenceButtons,addNew.addNewSequenceElement)
setButtonEventListeners(newObjectiveButtons,addNew.addNewObjectiveElement)
setButtonEventListeners(removeSubTaskButton,remove.removeSubTask)
setButtonEventListeners(removeSequenceButton,remove.removeSequence)
setButtonEventListeners(checkerButton,mark.markTaskElement)