import db from "./db.js"
import editing from "./editing.js"

import {setUpSession,getLatestSessionToken,makeOutdated,isValid, setGlobalVersionChecker} from "/js/session.js"
await setUpSession()
const startingSessionToken = await getLatestSessionToken()


let setKeyMovement = () => {
document.addEventListener('keydown',async e => {
    let isEventRepeated = e.repeat
    if (isEventRepeated) return;
    //Checked for spamclick

    let isSessionValid = isValid(startingSessionToken,await getLatestSessionToken())
    if (!isSessionValid) {await makeOutdated()
        return
        }
    }
    )
}
setKeyMovement()

let updateStageContent = async (id,content) => {
await db.updateDatabase("brainstorming/updateDatapoint",id,{content},startingSessionToken, await getLatestSessionToken())
}
let updateTitleContent = async (id,content) => {
await db.updateDatabase("brainstorming/updateInstanceName",id,{content},startingSessionToken, await getLatestSessionToken())
}

let setBrainstormEventListeners = () => {
    let brainstormingInstanceElements = document.querySelectorAll(".brainstormingInstance")
    let setClickEventListeners = () => {
    let openFunction = (e) => {
        let instanceDiv = e.currentTarget
            if (e.target.closest('p')) return;


        instanceDiv.classList.add("selected")
        instanceDiv.addEventListener("click",closeFunction)
        instanceDiv.removeEventListener("click",openFunction)
    }

    let closeFunction = (e) => {
        let instanceDiv = e.currentTarget
        if (e.target.closest('p')) return;

        instanceDiv.classList.remove("selected")
        instanceDiv.addEventListener("click",openFunction)
        instanceDiv.removeEventListener("click",closeFunction)
    }

    brainstormingInstanceElements.forEach((instance) => {
        instance.addEventListener("click",openFunction)
    })
    }
    const setTypingEventListeners = () => {
        let content = document.querySelectorAll(".stageContent")
        let contentDiv = document.querySelectorAll(".stageContentDiv")
        let contentHandlerFunc = (e) => {
            // console.log(e)
            let contentID = e.dataset.datapointid
            let contentNewVal = e.textContent
            updateStageContent(contentID,contentNewVal)
        }
        let titleHandlerFunc = (e) => {
            // console.log(e)
            let instanceID = e.dataset.instanceid
            let contentNewVal = e.textContent
            // console.log(instanceID)
            updateTitleContent(instanceID,contentNewVal)
        }
        let createTextEventHandlers = () => {
            editing.createTextEventHandlers(".stageContent",contentHandlerFunc)
            editing.createTextEventHandlers(".instanceTitle",titleHandlerFunc)
            }
            createTextEventHandlers()
    }
    const setAddNewInstanceButton = () => {
        const buttonElement = document.querySelector(".addInstanceButton")
        buttonElement.addEventListener("click",async () => {
            await db.updateDatabase("brainstorming/createBrainstormingInstance","",{},startingSessionToken,await getLatestSessionToken())
        makeOutdated()
        })
    }
    setAddNewInstanceButton()
    setClickEventListeners()
    setTypingEventListeners()
}

setBrainstormEventListeners()