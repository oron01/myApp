let objectiveButtons = document.querySelectorAll(".objectiveContainer")
let sequenceButtons = document.querySelectorAll(".subObjectiveSequence")
let taskButtons = document.querySelectorAll(".subObjectiveTask")
let subSequenceTaskButtons = document.querySelectorAll(".subSequenceTask")

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
    && (!e.target.classList.contains("objectiveContents"))
    && (!e.target.classList.contains("objectiveDetails")))
    return outcome}

    const isInvalidSequenceClose= (e) => {
        let outcome = (!e.target.classList.contains("selectedSubObjectiveSequence"))
    return outcome}

const {open: openObjective, close:closeObjective} = makeOpenCloseFunctions("selectedObjectiveContainer",isInvalidObjectiveClose)

const {open:openSequence, close:closeSequence} = makeOpenCloseFunctions("selectedSubObjectiveSequence",isInvalidSequenceClose)
const {open:openTask, close:closeTask} = makeOpenCloseFunctions("selectedSubObjectiveTask")
const {open:openSubSequenceTask, close:closeSubSequenceTask} = makeOpenCloseFunctions("selectedSubSequenceTask")


let setButtonEventListeners = (allButtonElements, handler) => {
allButtonElements.forEach(button => {
    button.addEventListener("click", handler)
})
}
setButtonEventListeners(objectiveButtons,openObjective)
setButtonEventListeners(sequenceButtons,openSequence)
setButtonEventListeners(taskButtons,openTask)
setButtonEventListeners(subSequenceTaskButtons,openSubSequenceTask)

