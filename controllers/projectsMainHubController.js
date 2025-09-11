import db from "../db/db.js"

 const getProjectInstances = async () => {
  let projectInstances = await db.query("SELECT * FROM projects")
  projectInstances.rows.sort((a,b) => a.position - b.position)
  return projectInstances.rows
}

 const updateProjects = async (req,res) => {

  const {id} = req.params;
  const {newValue,type,table} = req.body;
  try {

    const result = await db.query(`UPDATE ${table} SET ${type} = $1 WHERE id = $2 RETURNING *`,      
    [newValue,id]
    )
    res.json({ok:true,updated:result.rows[0]})
  } catch (err) {
    console.error(err);
    res.status(500).json({ok:false,error:"DB error"})
  }
}

export default {getProjectInstances, updateProjects}