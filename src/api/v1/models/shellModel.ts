/**
 * @openapi
 * components:
 *   schemas:
 *     Shell:
 *       type: object
 *       required:
 *         - prime
 *         - tactical
 *         - trait_1
 *         - trait_2
 *         - heat_capacity
 *         - agility
 *         - loot_speed
 *         - melee_damage
 *         - prime_recovery
 *         - tactical_recovery
 *         - self_repair_speed
 *         - finisher_siphon
 *         - revive_speed
 *         - hardware
 *         - firewall
 *         - fall_resistance
 *         - ping_duration
 *       properties:
 *         prime:
 *           type: string
 *           description: The primary ability of the shell
 *           example: "Overshield"
 *         tactical:
 *           type: string
 *           description: The tactical ability of the shell
 *           example: "Smoke Grenade"
 *         trait_1:
 *           type: string
 *           description: The first passive trait of the shell
 *           example: "Resilience"
 *         trait_2:
 *           type: string
 *           description: The second passive trait of the shell
 *           example: "Swift"
 *         heat_capacity:
 *           type: number
 *           description: The heat capacity stat of the shell
 *           example: 100
 *         agility:
 *           type: number
 *           description: The agility stat of the shell
 *           example: 85
 *         loot_speed:
 *           type: number
 *           description: The looting speed stat of the shell
 *           example: 75
 *         melee_damage:
 *           type: number
 *           description: The melee damage stat of the shell
 *           example: 50
 *         prime_recovery:
 *           type: number
 *           description: The recovery rate of the prime ability
 *           example: 30
 *         tactical_recovery:
 *           type: number
 *           description: The recovery rate of the tactical ability
 *           example: 20
 *         self_repair_speed:
 *           type: number
 *           description: The self repair speed stat of the shell
 *           example: 40
 *         finisher_siphon:
 *           type: number
 *           description: The finisher siphon stat of the shell
 *           example: 15
 *         revive_speed:
 *           type: number
 *           description: The revive speed stat of the shell
 *           example: 60
 *         hardware:
 *           type: number
 *           description: The hardware stat of the shell
 *           example: 90
 *         firewall:
 *           type: number
 *           description: The firewall stat of the shell
 *           example: 80
 *         fall_resistance:
 *           type: number
 *           description: The fall resistance stat of the shell
 *           example: 70
 *         ping_duration:
 *           type: number
 *           description: The ping duration stat of the shell
 *           example: 25
 *       example:
 *         prime: "Overshield"
 *         tactical: "Smoke Grenade"
 *         trait_1: "Resilience"
 *         trait_2: "Swift"
 *         heat_capacity: 100
 *         agility: 85
 *         loot_speed: 75
 *         melee_damage: 50
 *         prime_recovery: 30
 *         tactical_recovery: 20
 *         self_repair_speed: 40
 *         finisher_siphon: 15
 *         revive_speed: 60
 *         hardware: 90
 *         firewall: 80
 *         fall_resistance: 70
 *         ping_duration: 25
 */
export interface Shell{
    prime: string,
    tactical: string,
    trait_1: string,
    trait_2: string, 
    heat_capacity: number,
    agility: number,
    loot_speed: number,
    melee_damage: number,
    prime_recovery: number,
    tactical_recovery: number,
    self_repair_speed: number,
    finisher_siphon: number,
    revive_speed: number,
    hardware: number,
    firewall: number,
    fall_resistance: number,
    ping_duration: number
}