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

    createShell: {
        body: Joi.object({
            shell_name: Joi.string().required().messages({
                "any.required": `"shell_name" is required`,
                "string.empty": `"shell_name" cannot be empty`
            }),
            prime: Joi.string().required().messages({
                "any.required": `"prime" is required`,
                "string.empty": `"prime" cannot be empty`
            }),
            tactical: Joi.string().required().messages({
                "any.required": `"tactical" is required`,
                "string.empty": `"tactical" cannot be empty`
            }),
            trait_1: Joi.string().required().messages({
                "any.required": `"trait_1" is required`,
                "string.empty": `"trait_1" cannot be empty`
            }),
            trait_2: Joi.string().required().messages({
                "any.required": `"trait_2" is required`,
                "string.empty": `"trait_2" cannot be empty`
            }),
            heat_capacity: Joi.number().min(0).required().messages({
                "any.required": `"heat_capacity" is required`,
                "number.empty": `"heat_capacity" cannot be empty`
            }),
            agility: Joi.number().min(0).required().messages({
                "any.required": `"agility" is required`,
                "number.empty": `"agility" cannot be empty`
            }),
            loot_speed: Joi.number().min(0).required().messages({
                "any.required": `"agility" is required`,
                "number.empty": `"agility" cannot be empty`
            }),
            melee_damage: Joi.number().min(0).required().messages({
                "any.required": `"melee_damage" is required`,
                "number.empty": `"melee_damage" cannot be empty`
            }),
            prime_recovery: Joi.number().min(0).required().messages({
                "any.required": `"prime_recovery" is required`,
                "number.empty": `"prime_recovery" cannot be empty`
            }),
            tactical_recovery: Joi.number().min(0).required().messages({
                "any.required": `"tactical_recovery" is required`,
                "number.empty": `"tactical_recovery" cannot be empty`
            }),
            self_repair_speed: Joi.number().min(0).required().messages({
                "any.required": `"self_repair_speed" is required`,
                "number.empty": `"self_repair_speed" cannot be empty`
            }),
            finisher_siphon: Joi.number().min(0).required().messages({
                "any.required": `"finisher_siphon" is required`,
                "number.empty": `"finisher_siphon" cannot be empty`
            }),
            revive_speed: Joi.number().min(0).required().messages({
                "any.required": `"revive_speed" is required`,
                "number.empty": `"revive_speed" cannot be empty`
            }),
            hardware: Joi.number().min(0).required().messages({
                "any.required": `"hardware" is required`,
                "number.empty": `"hardware" cannot be empty`
            }),
            fall_resistance: Joi.number().min(0).required().messages({
                "any.required": `"fall_resistance" is required`,
                "number.empty": `"fall_resistance" cannot be empty`
            }),
            ping_duration: Joi.number().min(0).required().messages({
                "any.required": `"ping_duration" is required`,
                "number.empty": `"ping_duration" cannot be empty`
            })
        })
    }
}