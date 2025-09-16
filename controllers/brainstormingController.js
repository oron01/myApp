import db from "../db/db.js"

let sendBrainstormingData = async () => {
    const instancesData = await db.query(`SELECT * from brainstorming_instances ORDER BY id`)
    let instancesArr = []
    for (const instance of instancesData.rows) {
        let datapointsOfInstance = await db.query(`SELECT *, dp.id FROM brainstorming_datapoints dp
            INNER JOIN brainstorming_instances instances
            ON dp.instance_id = instances.id
            WHERE instances.id = $1 ORDER BY dp.stage`,[instance.id])
            instance.content = datapointsOfInstance.rows
            instancesArr.push(instance)
    }

    return instancesArr
    // return [{name:"skibidi",instanceID:"1",content:["numero bana", "numero dos"]},{name:"obamaBorACK",instanceID:"2",content:["numera uno", "neumora sometihn"]}]
}

let handleUpdateBrainstormingRequest = (req,res) => {
    try {
    const {datapointID} = req.params
    const {content} = req.body
    const updated = updateBrainstormingData(datapointID,content)
    return res.json({ok:true,updated})}
    catch (err) {return err}
}

const updateBrainstormingData = async (datapointID,NewData) => {
    let updateDB = await db.query(`UPDATE brainstorming_datapoints
        SET content = $2 WHERE id = $1 RETURNING content `,[datapointID,NewData])
    }

    let handleUpdateBrainstormingTitleRequest = (req,res) => {
    const {instanceID} = req.params
    const {content} = req.body
    updateBrainstormingTitleData(instanceID,content)
}

const updateBrainstormingTitleData = async (instanceID,NewData) => {
    let updateDB = await db.query(`UPDATE brainstorming_instances
        SET name = $2 WHERE id = $1 RETURNING name `,[instanceID,NewData])
    }

const createBrainstormingInstance = async (req,res) => {
    let createNewBrainstormingInstance = async () => {
        let instanceID = await db.query("INSERT INTO brainstorming_instances (name) VALUES ('[]') RETURNING id")
        return instanceID.rows[0].id
    }
    let instanceID = await createNewBrainstormingInstance()

    let createInstanceDatapoints = async (instanceID) => {
        let createDatapoint = async (instanceID,content,i) => {
            let datapoint = await db.query(`INSERT INTO brainstorming_datapoints (instance_id,content,stage) 
                VALUES (${instanceID},'${content}',${i+1}) 
                RETURNING id, content, instance_id,stage`)
                return datapoint.rows
        }
        let createDatapointArray = async () => {
        let datapointsArray = []

        for (let i = 0; i < 9; i++) {
            let datapoint = await createDatapoint(instanceID,`[]`,i)
            datapointsArray.push(datapoint[0])
        }
        return datapointsArray}
        let datapointArray = await createDatapointArray()
        return datapointArray
    }

    let instanceDatapoints = await createInstanceDatapoints(instanceID)

    let finalObject = {instanceID,
        stages: instanceDatapoints
    }
    console.log(finalObject)
    res.send(finalObject)
}

export default {sendBrainstormingData,handleUpdateBrainstormingRequest,handleUpdateBrainstormingTitleRequest,createBrainstormingInstance}