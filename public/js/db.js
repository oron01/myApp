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

let getSubProjectID = async (url,type,projectID,startingSessionToken,currentSessionToken) => {
        if (!isValid(startingSessionToken,currentSessionToken)) {
        alert(`${startingSessionToken} then ${currentSessionToken}`)
        makeOutdated()
        return} 

    const res = await fetch(`/${url}/${projectID}/${type}`)
          const data = await res.json();
        console.log(data); // { ok: true, updated: {…} }
    return data

}

let updateGoalsPart = async (url,type,projectID,id,key,newValuesObj,startingSessionToken,currentSessionToken) => {
    if (!isValid(startingSessionToken,currentSessionToken)) {
        alert(`${startingSessionToken} then ${currentSessionToken}`)
        makeOutdated()
        return} 

    const res = await fetch(`/${url}/${type}/${projectID}/${id}/${key}`, {
        method: "PATCH",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(newValuesObj)
    })
      const data = await res.json();
    console.log(data); // { ok: true, updated: {…} }
}

let postGoalsPart = async (url,type,projectID,id,startingSessionToken,currentSessionToken,optBody=null) => {
    if (!isValid(startingSessionToken,currentSessionToken)) {
        alert(`${startingSessionToken} then ${currentSessionToken}`)
        makeOutdated()
        return} 
        console.log("ad")
        console.log(optBody)

    const res = await fetch(`/${url}/${type}/${projectID}/${id}`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(optBody)
    })
      const data = await res.json();
    console.log(data); // { ok: true, updated: {…} }
}

let removeGoalsPart = async (url,type, id,startingSessionToken,currentSessionToken, optBody=null) => {
        if (!isValid(startingSessionToken,currentSessionToken)) {
        alert(`${startingSessionToken} then ${currentSessionToken}`)
        makeOutdated()
        return} 
        const res = await fetch(`/${url}/${type}/${id}`, {
        method: "PATCH",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(optBody)
    })
      const data = await res.json();
    console.log(data); // { ok: true, updated: {…} }

}

// let makePartialRefresh = () => {}

export default {updateDatabase, insertNewDBRow,createNewValuesObject,getSubProjectID,updateGoalsPart,postGoalsPart,removeGoalsPart}