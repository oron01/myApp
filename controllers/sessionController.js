import db from "../db/db.js"

export const getSessionToken = async () => {
    let sessionToken = await db.query("SELECT version FROM session_limiter version")
    console.log(sessionToken.rows[0].version)
    return sessionToken.rows[0].version
}

export const getLatestSessionToken = async () => {
    let latestSessionToken = await db.query("SELECT version FROM session_limiter version")
    console.log(latestSessionToken.rows[0].version)
    return {data:latestSessionToken.rows[0].version}
}

export const incrementSessionTokens = async () => {
    await db.query(`UPDATE session_limiter
SET version = version + 1,
    updated_at = now()
WHERE id = true
RETURNING version;
`)
}