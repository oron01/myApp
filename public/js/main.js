
let setGlobalVersionChecker = async() => {
    let body = document.querySelector("body")
    body.addEventListener("focusin",async () => {
        let latestSessionToken = await getLatestSessionToken()
        if (!isValid(startingSessionToken,latestSessionToken)) {await makeOutdated()
        return
        }
    })    
}
 setGlobalVersionChecker()

    let getCaretPosition = (el,parent,sel) => {
        let isFunctionViable = () => {
            let test1 = !(el instanceof HTMLElement) || el.getAttribute('contenteditable') !== 'plaintext-only' && el.getAttribute('contenteditable') !== 'true'
            let test2 = !sel || !sel.isCollapsed || !el.contains(sel.anchorNode)
            if (!test1 && !test2) return true
        }
        let isCaretAtStart = () => {
            if (sel.anchorOffset === 0) return true
            return false
        }
        let isCaretAtEnd = () => {
            let test1 = sel.anchorOffset === el.textContent.length
            let test2 = sel.anchorOffset === el.innerText.length
            return (test1 || test2)
        }
        let isViable = isFunctionViable()
        if (!isViable) console.log("obama")
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
                    switch (key) {
            case "ArrowDown":{
                let isValidMovement = (position) => {
                    if (position < 15) return true
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
                    if (position > 7) return true
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
                    if (![7,14,21].includes(position)) return true
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
                    if (![1,8,15].includes(position)) return true
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
                    switch (key) {
            case "ArrowDown":{
                let isValidMovement = (position) => {
                    if (position < 22) return true
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
                    if (position > 1) return true
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
                    if (minimove < 3) return true
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
                    if (minimove > 1) return true
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
    const getTextboxObjects = document.querySelectorAll(".quickActionTask > p")
    
    getTextboxObjects.forEach(textbox => {
        
        textbox.addEventListener("beforeinput",(e) => {
        if (e.inputType === "historyUndo") {
            updateQuickActionTask(e.target)
        }
    })
        
        textbox.addEventListener("beforeinput",(e) => {
        if (e.inputType === "historyRedo") {
            updateQuickActionTask(e.target)
        }
    })   

            textbox.addEventListener("blur",(e) => {
            updateQuickActionTask(e.target)
    })      

    })
}

let updateDatabase = async (url,id,newValuesObj) => {
    let latestSessionToken = await getLatestSessionToken()
    if (!isValid(startingSessionToken,latestSessionToken)) {
        makeOutdated()
        return} 
    const res = await fetch(`/${url}/${id}`, {
        method: "PATCH",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(newValuesObj)
    })
      const data = await res.json();
    console.log(data); // { ok: true, updated: {…} }
    

}
let updateQuickActionTask = async (task) => {
    let taskid = task.dataset.id.slice(6)
    await updateDatabase("quickActions",taskid,{content:task.textContent})
}

let createProjectEventHandlers = () => {
    const getProjectObjects = document.querySelectorAll(".pi")
    
    getProjectObjects.forEach(textbox => {
        
        textbox.addEventListener("beforeinput",(e) => {
        if (e.inputType === "historyUndo") {
            updateProjects(e.target)
        }
    })
        
        textbox.addEventListener("beforeinput",(e) => {
        if (e.inputType === "historyRedo") {
            updateProjects(e.target)
        }
    })   

            textbox.addEventListener("blur",(e) => {
            updateProjects(e.target)
    })      

    })
}

let updateProjects = async (project) => {
    let messageObject = 
    {newValue : project.textContent,
        type : project.dataset.type
        
    }
    updateDatabase("projects/projectsMainHub",project.dataset.id,messageObject)

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
        if (!sel.isCollapsed) return true;
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

const isValid = (currentSessionToken,latestSessionToken) => {
    const isOutdated = (currentSessionToken,latestSessionToken) => {
        if (currentSessionToken != latestSessionToken) return true
        return false;
    }
    return (!isOutdated(currentSessionToken,latestSessionToken))
}


let getLatestSessionToken = async () => {
        const res = await fetch(`/session`, {
        method: "get",
    })
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json()   
      return data.data
}

let setUpSession = async () => {
    let a = await fetch("/session/increment", {
        method:"post"
    })
    console.log(a.ok)
   if (!a.ok) {throw new Error(`HTTP ${a.status}`); 
  alert("couldn't icrement")
  return r.json(); }

return a
}

const makeOutdated = async () => {
    console.log(startingSessionToken)
    location.reload();
    }

await setUpSession()
const startingSessionToken = await getLatestSessionToken()


//Activating the functions
createTextboxEventHandlers()
createProjectEventHandlers()
createProjectPageEventListeners()