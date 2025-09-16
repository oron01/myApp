import db from "/js/db.js"
import {setUpSession,getLatestSessionToken,makeOutdated,isValid, setGlobalVersionChecker} from "/js/session.js"
import editing from "/js/editing.js"

await setUpSession()
const startingSessionToken = await getLatestSessionToken()

await setGlobalVersionChecker(startingSessionToken, getLatestSessionToken,document)

    let getCaretPosition = (el,parent,sel) => {
        let isFunctionViable = () => {
            let test1 = !(el instanceof HTMLElement) || el.getAttribute('contenteditable') !== 'plaintext-only' && el.getAttribute('contenteditable') !== 'true'
            let test2 = !sel || !sel.isCollapsed || !el.contains(sel.anchorNode)
            return (!test1 && !test2)
        }
        let isCaretAtStart = () => {
            return (sel.anchorOffset === 0)
        }
        let isCaretAtEnd = () => {
            let test1 = sel.anchorOffset === el.textContent.length
            let test2 = sel.anchorOffset === el.innerText.length
            return (test1 || test2)
        }
        let isViable = isFunctionViable()
        let atStart = isCaretAtStart()
        let atEnd = isCaretAtEnd()
        return {atStart,atEnd}
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
    //checked if sessionIsInvalid or outdated, handled if so

    let el = e.target
    let parent = el.parentElement
    let sel = window.getSelection()
    let caretPosition = getCaretPosition(e.target,el.parentElement,sel)
    
    let qaActionHandler = (key,position) => {
            e.preventDefault()

            switch (key) {
            case "ArrowDown":{
                let isValidMovement = (position) => {
                    return (position < 15)
                    }

                let isValid = isValidMovement(position)

                let handleAction = () => {
                    let target = parent.parentElement.querySelector(`p[data-position="${Number(position)+7}"]`)
                    target.focus()
                }
                if (isValid) handleAction()
                break;
            }
            case "ArrowUp": {
                let isValidMovement = (position) => {
                    return (position > 7)
                    }

                let isValid = isValidMovement(position)
                console.log(isValid)
                console.log(position)
                let handleAction = () => {
                    let target = parent.parentElement.querySelector(`p[data-position="${Number(position)-7}"]`)
                    target.focus()
                }
                if (isValid) handleAction()

                break;
            }
            case "ArrowRight":{

                let isValidMovement = (position) => {
                    return (![7,14,21].includes(position))
                    }

                let isValid = isValidMovement(position)
                let handleAction = () => {
                    let target = parent.parentElement.querySelector(`p[data-position="${Number(position)+1}"]`)
                    target.focus()
                }
                if (isValid) handleAction()
                break;
            }
            case "ArrowLeft": {
                let isValidMovement = (position) => {
                    return (![1,8,15].includes(position))
                    }

                let isValid = isValidMovement(position)

                let handleAction = () => {
                    let target = parent.parentElement.querySelector(`p[data-position="${Number(position)-1}"]`)
                    target.focus()
                }
                if (isValid) handleAction()
                break;   
                }
            }
        }       

    let piActionHandler = (key,position,minimove) => {
            e.preventDefault()

            switch (key) {
            case "ArrowDown":{
                let isValidMovement = (position) => {
                    return (position < 22)
                    }

                let isValid = isValidMovement(position)

                let handleAction = () => {
                    let target = parent.parentElement.querySelector(`p[data-position="${Number(position)+1}"][data-minimove="${minimove}"]`)
                    target.focus()
                }
                if (isValid) handleAction()
                break;
            }
            case "ArrowUp": {
                let isValidMovement = (position) => {
                    return (position > 1)
                    }

                let isValid = isValidMovement(position)
                let handleAction = () => {
                    let target = parent.parentElement.querySelector(`p[data-position="${Number(position)-1}"][data-minimove="${minimove}"]`)
                    target.focus()
                }
                if (isValid) handleAction()

                break;
            }
            case "ArrowRight":{
                let isValidMovement = (minimove) => {
                    return (minimove < 3)
                    }

                let isValid = isValidMovement(minimove)
                let handleAction = () => {
                    let target = parent.parentElement.querySelector(`p[data-position="${Number(position)}"][data-minimove="${Number(minimove)+1}"]`)
                    target.focus()
                }
                if (isValid) handleAction()
                break;
            }
            case "ArrowLeft": {
                let isValidMovement = (minimove) => {
                    return (minimove > 1)
                }

                let isValid = isValidMovement(minimove)

                let handleAction = () => {
                    let target = parent.parentElement.querySelector(`p[data-position="${position}"][data-minimove="${minimove-1}"]`)
                    target.focus()
                }
                if (isValid) handleAction()
                break;   
                }
            }
    }

    let actionHandler = (key,movetype,position,minimove,e) => {

        switch (key) {
            case "ArrowDown":
                if (!caretPosition.atEnd) return
                if (movetype == "qa") qaActionHandler(key,position)
                if (movetype == "pi") piActionHandler(key,position,minimove)
                break;

            case "ArrowUp":
                if (!caretPosition.atStart) return
                if (movetype == "qa") qaActionHandler(key,position)
                if (movetype == "pi") piActionHandler(key,position,minimove)

                break;

            case "ArrowRight":
                if (!caretPosition.atEnd) return
                if (movetype == "qa") qaActionHandler(key,position)
                if (movetype == "pi") piActionHandler(key,position,minimove)

                break;

            case "ArrowLeft":
                if (!caretPosition.atStart) return
                if (movetype == "qa") qaActionHandler(key,position)
                if (movetype == "pi") piActionHandler(key,position,minimove)
                break;
            }}

    let position = Number(el.dataset.position)
      let minimove = Number(el.dataset.minimove)
    actionHandler(e.key,el.dataset.movetype,position,minimove,e)
        //Make sure is should be called base

    let movetype = el.dataset.movetype
    // let actionType = getActionType(e.key,movetype)

});
}
setKeyMovement()

let createTextboxEventHandlers = () => {
    editing.createTextEventHandlers(".quickActionTask > p",updateQuickActionTask)
    editing.createTextEventHandlers(".pi",updateProjects)
}


let updateQuickActionTask = async (task) => {
    let taskid = task.dataset.id
    await db.updateDatabase("quickActions",taskid,{content:task.textContent},startingSessionToken,await getLatestSessionToken())
}

let updateProjects = async (project) => {
    let messageObject = 
    {newValue : project.textContent,
        type : project.dataset.type,
        table: "projects"
        
    }
    await db.updateDatabase("projects/projectsMainHub",project.dataset.id,messageObject,startingSessionToken,await getLatestSessionToken())

}

let getProjectIdFromHTMLOBJ = (projectObject) => {
    let target = projectObject.currentTarget.querySelector("p")

    return target.dataset.id

}

let linkToProjectHub = (projectId) => {
    location.replace(`/projects/projectHub/${projectId}`)
}

let createProjectPageEventListeners = () => {
    let getProjectNameDivs = () => {
        let projectNameDivs = document.querySelectorAll(".projectNameDiv")
        return projectNameDivs
    }

    let isTextCurrentlySelected = () => {
          const sel = window.getSelection?.();
        return (!sel.isCollapsed)
    }

    let projectNameDivs = getProjectNameDivs()
    projectNameDivs.forEach((div) => {
        div.addEventListener("dblclick",(e) => {
            let a = isTextCurrentlySelected()
            console.log(e.currentTarget)
            if (a) {return}
            let objectId = getProjectIdFromHTMLOBJ(e)
            linkToProjectHub(objectId)}
        )
    })
}

let generateOtherLinks = () => {
    let setBrainstormingButton = () => {
        let brainstormingButton = document.querySelector(".brainstormingButton")
        brainstormingButton.addEventListener("click", () => {
            location.replace('/brainstorming')
        })
    }
    setBrainstormingButton()
}
generateOtherLinks()

console.log(startingSessionToken)


//Activating the functions
createTextboxEventHandlers()
createProjectPageEventListeners()