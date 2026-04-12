import express, { Router } from "express";
import { upload } from "../middleware/multer";
import { getHealthCheck,
          getAllShells,
           getAllWeapons,
            getAllFactions,
             getShellByName,
              getWeaponByName,
               getFactionByName,
                createShell,
                 createWeapon,
                  createFaction,
                   updateShell,
                    updateWeapon,
                     updateFaction,
                      deleteShell,
                       deleteWeapon,
                        deleteFaction,
                        createMap,
                        getMap
                  } from "../controllers/controllers";

const router:Router = express.Router();

/**
 * @openapi
 * /health:
 *   get:
 *     summary: Returns the health status of the server
 *     tags: [Health]
 *     responses:
 *       '200':
 *         description: Server is running
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "success"
 *                 data:
 *                   $ref: '#/components/schemas/HealthCheckResponse'
 *             example:
 *               status: "success"
 *               data:
 *                 status: 200
 *                 uptime: 1234.56
 *                 timestamp: "2026-04-11T17:30:00.000Z"
 *                 version: "1.0.0"
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Internal Server Error"
 *             example:
 *               message: "Internal Server Error"
 */
router.get("/health", getHealthCheck);

/**
 * @openapi
 * /shells:
 *   get:
 *     summary: Retrieve all shells
 *     tags: [Shells]
 *     responses:
 *       '200':
 *         description: A list of shells
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "success"
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Shell'
 *             example:
 *               status: "success"
 *               data:
 *                 - shell_name: "Assassin"
 *                   prime: "Overshield"
 *                   tactical: "Smoke Grenade"
 *                   trait_1: "Resilience"
 *                   trait_2: "Swift"
 *                   heat_capacity: 100
 *                   agility: 85
 *                   loot_speed: 75
 *                   melee_damage: 50
 *                   prime_recovery: 30
 *                   tactical_recovery: 20
 *                   self_repair_speed: 40
 *                   finisher_siphon: 15
 *                   revive_speed: 60
 *                   hardware: 90
 *                   firewall: 80
 *                   fall_resistance: 70
 *                   ping_duration: 25
 *       '500':
 *         description: Internal server error
 */
router.get("/shells", getAllShells);

/**
 * @openapi
 * /weapons:
 *   get:
 *     summary: Retrieve all weapons
 *     tags: [Weapons]
 *     responses:
 *       '200':
 *         description: A list of weapons
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "success"
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Weapons'
 *             example:
 *               status: "success"
 *               data:
 *                 weapon_name: "Bully SMG"
 *                 damage: 45
 *                 precision_multiplier: 1.5
 *                 rate_of_fire: "100 RPM"
 *                 ads_speed: "0.9s"
 *                 equip_speed: "0.8s"
 *                 reload_speed: "1.0s"
 *                 recoil: "Low"
 *                 aim_assist: 70
 *       '500':
 *         description: Internal server error
 */
router.get("/weapons", getAllWeapons);
router.get("/factions", getAllFactions);
router.get("/shells/:name", getShellByName);
router.get("/weapons/:name", getWeaponByName);
router.get("/factions/:name", getFactionByName);
router.get("/maps/:name", getMap);
router.post("/shells", createShell);
router.post("/weapons", createWeapon);
router.post("/factions", createFaction);
router.post("/maps", upload.single('map_image'), createMap);
router.put("/shells/:name", updateShell);
router.put("/weapons/:name", updateWeapon);
router.put("/factions/:name", updateFaction);
router.delete("/shells/:name", deleteShell);
router.delete("/weapons/:name", deleteWeapon);
router.delete("/factions/:name", deleteFaction);
//!add put routes later and admin routes

export default router;