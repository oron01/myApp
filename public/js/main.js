let setKeyMovement = () => {
document.addEventListener('keydown', e => {
    if (e.repeat) return;
  const el = e.target;
  const parent = el.parentElement
  if (!(el instanceof HTMLElement) || el.getAttribute('contenteditable') !== 'true') return;

  const sel = window.getSelection();
  if (!sel || !sel.isCollapsed || !el.contains(sel.anchorNode)) return;

  const caretAtStart = sel.anchorOffset === 0;
  const caretAtEnd   = sel.anchorOffset === el.innerText.length;

  let minimove = el.dataset.minimove

  if (e.key === 'ArrowDown' && caretAtEnd) {
    let pos = Number(el.dataset.position)
    e.preventDefault();
    if (el.dataset.movetype == "qa" && pos < 15) {
        let target = parent.parentElement.querySelector(`p[data-position="${Number(pos)+7}"]`)
        target.focus()
    }
    else if (el.dataset.movetype == "pi" && pos < 20) {
        let target = parent.querySelector(`div[data-position="${Number(pos)+1}"][data-minimove="${minimove}"]`)
        target.focus()
    }
  }

  if (e.key === 'ArrowUp' && caretAtStart) {
    let pos = Number(el.dataset.position)
    e.preventDefault();
    if (el.dataset.movetype == "qa" && pos > 7) {
        let target = parent.parentElement.querySelector(`p[data-position="${Number(pos)-7}"]`)
        target.focus()
    }
        else if (el.dataset.movetype == "pi" && pos > 1) {
        let target = parent.querySelector(`div[data-position="${Number(pos)-1}"][data-minimove="${minimove}"]`)
        target.focus()
    }
  }
    if (e.key === 'ArrowRight' && caretAtEnd) {
    let pos = Number(el.dataset.position)
    e.preventDefault();
    if (el.dataset.movetype == "qa" && ![7,14,21].includes(pos)) {
        let target = parent.parentElement.querySelector(`p[data-position="${Number(pos)+1}"]`)
        target.focus()
    }
            else if (el.dataset.movetype == "pi" && minimove < 3) {
        let target = parent.querySelector(`div[data-position="${Number(pos)}"][data-minimove="${Number(minimove)+1}"]`)
        target.focus()
    }
  }

      if (e.key === 'ArrowLeft' && caretAtStart) {
    let pos = Number(el.dataset.position)
    e.preventDefault();
    if (el.dataset.movetype == "qa" && ![1,8,15].includes(pos)) {
        let target = parent.parentElement.querySelector(`p[data-position="${Number(pos)-1}"]`)
        target.focus()
    }
            else if (el.dataset.movetype == "pi" && minimove > 1) {
        let target = parent.querySelector(`div[data-position="${Number(pos)}"][data-minimove="${Number(minimove)-1}"]`)
        target.focus()
    }
  }
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
    const getProjectObjects = document.querySelectorAll(".projectNameDiv,.projectNextTaskDiv,.projectTaskDateDiv")
    
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
    updateDatabase("projects",project.dataset.id,messageObject)

}
//Activating the functions
createTextboxEventHandlers()
createProjectEventHandlers()