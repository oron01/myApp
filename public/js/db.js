import { isValid, makeOutdated } from "/js/session.js"

let createNewValuesObject = (newValue,valueColumnType,table) => {
    return {
        newValue,
        type: valueColumnType,
        table
    }
}

let updateDatabase = async (url,id,newValuesObj,startingSessionToken,currentSessionToken) => {
    if (!isValid(startingSessionToken,currentSessionToken)) {
        alert(`${startingSessionToken} then ${currentSessionToken}`)
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

let insertNewDBRow = async (url,id,startingSessionToken,currentSessionToken) => {
        if (!isValid(startingSessionToken,currentSessionToken)) {
        alert(`${startingSessionToken} then ${currentSessionToken}`)
        makeOutdated()
        return} 
    const res = await fetch(`/${url}/${id}`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
    })
      const data = await res.json();
    console.log(data); // { ok: true, updated: {…} }
    return data

}

// let makePartialRefresh = () => {}

export default {updateDatabase, insertNewDBRow,createNewValuesObject}