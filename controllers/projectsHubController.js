import db from "../db/db.js"

let getProjectData = async (id) => {
    let projectData = await db.query(`SELECT * FROM projects WHERE id = $1`,[id])
    projectData.rows.sort((a,b) => a.position - b.position)
  console.log(projectData.rows)
    return projectData.rows[0]
}

let getMainDump = async (id) => {
      let projectData = await db.query(`SELECT content FROM projectMainDumps WHERE id = $1`,[id])
    return projectData.rows[0]
}

let getNotesData = async (id) => {
  let notesData = await db.query(`SELECT * FROM note_instances WHERE project_id=$1`,[id])
  notesData.rows
  .sort((a,b) => a.id - b.id)
  return notesData.rows
}

let createNewNote = async (req,res) => {
  try {
  const {projectID} = req.params
  let newNote = await db.query(`INSERT INTO note_instances (note_name,content,project_id) VALUES ('[]','[]',$1) RETURNING id`,[Number(projectID)])
  res.json({ok:true,newNote})
  }
  catch (err) {
    console.error(err);
    res.status(500).json({ok:false,error:"DB error"})
  }
}

export default {getMainDump,getProjectData,getNotesData,createNewNote}