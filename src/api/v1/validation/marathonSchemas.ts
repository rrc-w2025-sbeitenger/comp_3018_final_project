import Joi from "joi";

export const marathonSchemas = {
    //GET /shells/:name - get a single shell.
    getByName: {
        params: Joi.object({
            name: Joi.string().trim().min(1).required().messages({
                "any.required": `"name" is required.`,
                "string.empty": `"name" cannot be empty`,
                "string.min": `"name" cannot be empty`
            })
        })
    },

}