import { isValid, makeOutdated } from "/js/session.js"

let updateDatabase = async (url,id,newValuesObj,startingSessionToken,currentSessionToken) => {
    if (!isValid(startingSessionToken,currentSessionToken)) {
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

export default {updateDatabase}