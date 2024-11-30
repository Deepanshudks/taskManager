const zod = require("zod");

const createTask = zod.object({
    title : zod.string(),
    description : zod.string(),
    completed : zod.boolean().optional()
})

const updateTask = zod.object({
    title : zod.string(),
    description : zod.string(),
    completed: zod.boolean().optional()
})
module.exports = {updateTask,createTask}