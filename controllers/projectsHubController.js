import db from "../db/db.js"

let getProjectData = async (id) => {
    let projectData = await db.query(`SELECT * FROM projects WHERE id = ${id}`)
    projectData.rows.sort((a,b) => a.position - b.position)
  console.log(projectData.rows)
    return projectData.rows[0]
}

let getMainDump = async (id) => {
      let projectData = await db.query(`SELECT content FROM projectMainDumps WHERE id = ${id}`)
  console.log(projectData.rows)
    return projectData.rows[0]
}

export default {getMainDump,getProjectData}