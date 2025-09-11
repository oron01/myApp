export const setUpSession = async () => {
    let a = await fetch("/session/increment", {
        method:"post"
    })
    console.log(a.ok)
   if (!a.ok) {throw new Error(`HTTP ${a.status}`); 
  alert("couldn't icrement")
  return r.json(); }

return a
}

export const getLatestSessionToken = async () => {
        const res = await fetch(`/session`, {
        method: "get",
    })
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json()   
      return data.data
}
export const makeOutdated = async () => {
    location.reload();
    }

export const isValid = (currentSessionToken,latestSessionToken) => {
    const isOutdated = (currentSessionToken,latestSessionToken) => {
        return (currentSessionToken != latestSessionToken)
    }
    return (!isOutdated(currentSessionToken,latestSessionToken))
}

export const setGlobalVersionChecker = async (startingSessionToken,getLatestSessionToken,document) => {
    let body = document.querySelector("body")
    body.addEventListener("focusin",async () => {
        let latestSessionToken = await getLatestSessionToken()

        if (!isValid(startingSessionToken,latestSessionToken)) {await makeOutdated()
        return
        }
    })    
}