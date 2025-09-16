let createTextEventHandlers = (querySelector,updateFunction) => {
    let getTextboxObjects = document.querySelectorAll(querySelector)

    if (!(getTextboxObjects instanceof NodeList)) {getTextboxObjects = [getTextboxObjects]}
    
    getTextboxObjects.forEach(textbox => {
        
        textbox.addEventListener("beforeinput",(e) => {
        if (e.inputType === "historyUndo") {
            updateFunction(e.target)
        }
    })
        
        textbox.addEventListener("beforeinput",(e) => {
        if (e.inputType === "historyRedo") {
            updateFunction(e.target)
        }
    })   

            textbox.addEventListener("blur",(e) => {
            updateFunction(e.target)
    })      
    })

}

export default {createTextEventHandlers}