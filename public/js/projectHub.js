import db from "/js/db.js"
import {setUpSession,getLatestSessionToken,makeOutdated} from "/js/session.js"

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
setKeyMovement()
addMainDumpEventListener(contentText)