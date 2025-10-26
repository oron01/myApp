let createTextEventHandlers = (querySelector,updateFunction,optElem=document) => {
    let getTextboxObjects = optElem.querySelectorAll(querySelector)

    if (!(getTextboxObjects instanceof NodeList)) {getTextboxObjects = [getTextboxObjects]}
    console.log("joebama")
    getTextboxObjects.forEach(textbox => {
        
        textbox.addEventListener("beforeinput",(e) => {
        if (e.inputType === "historyUndo") {
            updateFunction(e)
        }
    })
        
        textbox.addEventListener("beforeinput",(e) => {
        if (e.inputType === "historyRedo") {
            updateFunction(e)
        }
    })   

            textbox.addEventListener("blur",(e) => {
            updateFunction(e)
    })      
    })

}

export default {createTextEventHandlers}