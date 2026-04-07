/**
 * @openapi
 * components:
 *   schemas:
 *     Weapons:
 *       type: object
 *       required:
 *         - damage
 *         - precision_multiplier
 *         - rate_of_fire
 *         - ads_speed
 *         - equip_speed
 *         - reload_speed
 *         - recoil
 *         - aim_assist
 *       properties:
 *         damage:
 *           type: number
 *           description: The base damage of the weapon
 *           example: 45
 *         precision_multiplier:
 *           type: number
 *           description: The precision/headshot damage multiplier of the weapon
 *           example: 1.5
 *         rate_of_fire:
 *           type: string
 *           description: The rate of fire of the weapon
 *           example: "100 RPM"
 *         ads_speed:
 *           type: string
 *           description: The aim down sights speed of the weapon
 *           example: "0.9s"
 *         equip_speed:
 *           type: string
 *           description: The equip speed of the weapon
 *           example: "0.9s"
 *         reload_speed:
 *           type: string
 *           description: The reload speed of the weapon
 *           example: "1.0s"
 *         recoil:
 *           type: string
 *           description: The recoil of the weapon
 *           example: "100%"
 *         aim_assist:
 *           type: number
 *           description: The aim assist value of the weapon
 *           example: 70
 *       example:
 *         damage: 45
 *         precision_multiplier: 1.5
 *         rate_of_fire: "100 RPM"
 *         ads_speed: "0.9s"
 *         equip_speed: "0.8s"
 *         reload_speed: "1.0s"
 *         recoil: "Low"
 *         aim_assist: 70
 */
export interface Weapons {
    damage: number,
    precision_multiplier: number,
    rate_of_fire: string,
    ads_speed: string,
    equip_speed: string,
    reload_speed: string,
    recoil: string, 
    aim_assist: number,
}