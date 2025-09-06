import db from "../db/db.js"

let getFullQuickActionTasksData = async () => {
    let quickActionTasks = await db.query("SELECT * FROM quickactiontasks;")
    return quickActionTasks
    }

const getQuickActionTasks = async () => {
const FullQuickActionTasksData = await getFullQuickActionTasksData()

let transformDataToContentArray = FullQuickActionTasksData.rows
.sort((a,b) => a.position - b.position)
// .map(object => object.content)
  return transformDataToContentArray
}

const updateQuickActionTask = async (req,res) => {

  const {id} = req.params;
  const {content} = req.body;
  console.log("skibidi" + content)
  try {

    const result = await db.query("UPDATE quickactiontasks SET content = $1 WHERE id = $2 RETURNING *",      
    [content,id]
    )
    res.json({ok:true,updated:result.rows[0]})
  } catch (err) {
    console.error(err);
    res.status(500).json({ok:false,error:"DB error"})
  }
}

export default {getQuickActionTasks,updateQuickActionTask};