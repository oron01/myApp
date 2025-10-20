import { error } from "console"
import db from "../db/db.js"

let getProjectData = async (id) => {
    let projectData = await db.query(`SELECT * FROM projects WHERE id = $1`,[id])
    projectData.rows.sort((a,b) => a.position - b.position)
  // console.log(projectData.rows)
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
  }``
}

let getGoalsData = async (id) => {

  let {rows:goals} = await db.query(`
  SELECT g.id, g.name, g.project_id,
  (
    SELECT COALESCE(json_agg(
    
      json_build_object(
        'id', o.id,
        'name', o.name,
        'description', o.description,
        'goal_id', o.goal_id,
        'subSteps',
          (
            SELECT json_agg(subStep)
            FROM (
              SELECT json_build_object(
                'id', s.id,
                'name', s.name,
                'description', s.description,
                'objective_id', s.objective_id,
                'type', 'sequence',
                'tasks', (
                  SELECT COALESCE(json_agg(
                      json_build_object(
                        'id', t.id,
                        'name', t.name,
                        'description', t.description,
                        'sequence_id', s.id,
                        'type', 'task',
                        'objective_id', t.objective_id
                        )
                        ORDER BY t.id ASC
                      ),'[]'::json)
                    FROM project_tasks t
                    WHERE t.sequence_id = s.id
                  )
                ) AS subStep
              FROM project_sequences s
              WHERE s.objective_id = o.id
    
              UNION ALL
              SELECT json_build_object(
                'id', t.id,
                'name', t.name,
                'description', t.description,
                'sequence_id', t.sequence_id,
                'type', 'task',
                'objective_id', t.objective_id
                ) as subStep
              FROM project_tasks t
              WHERE t.objective_id = o.id AND t.sequence_id IS NULL
              ) AS subStep
          )
      )
              ORDER BY o.id ASC
      ),'[]'::json)
      FROM project_objectives o
      WHERE o.goal_id = g.id
    
    ) AS objectives
  FROM project_goals g
  WHERE g.project_id = $1


  `,[id])
        // console.log(goals[0].objectives[0])
        // console.log(id + "GidParam")

        //  goals[0]
          console.log(goals[0])
          return [goals[0]]
}

let getLatestID = async (req,res) => {
  let {type,projectID} = req.params
  let test = "obama"
  let latestID = await db.query(`SELECT id FROM project_objectives ORDER BY id DESC LIMIT 1; `,[])
  res.json({ok:true,test,type,projectID,latestID})
}

let check = async (req,res) => {
  let {id,projectID,key,type} = req.params
  let newVal = req.body.val
  let cleanedType
  console.log("keyname" + key)
  if (type == "objective") cleanedType = "objectives"
  if (type == "sequence") cleanedType = "sequences"
  if (type == "task") cleanedType = "tasks"

const validColumns = ["name", "description"]
if (!validColumns.includes(key)) throw new Error("invalid key name")

    db.query(`UPDATE project_${cleanedType} 
      SET ${key} = $3
      WHERE project_id = $1 AND id = $2`
      ,[projectID,id,newVal])
      
  res.json({ok:true,newVal})
}

export default {getMainDump,getProjectData,getNotesData,createNewNote,getGoalsData,getLatestID,check}