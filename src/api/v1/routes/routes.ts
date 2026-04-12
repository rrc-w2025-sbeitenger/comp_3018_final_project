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

/**
 * @openapi
 * /factions:
 *   get:
 *     summary: Retrieve all factions
 *     tags: [Factions]
 *     responses:
 *       '200':
 *         description: A list of factions
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
 *                     $ref: '#/components/schemas/Factions'
 *             example:
 *               status: "success"
 *               data:
 *                 name: "CYBERACME"
 *                 lore: "The industry leader in AI."
 *       '500':
 *         description: Internal server error
 */
router.get("/factions", getAllFactions);

/**
 * @openapi
 * /shells/{name}:
 *   get:
 *     summary: Retrieve a shell by name
 *     tags: [Shells]
 *     parameters:
 *       - in: path
 *         name: name
 *         required: true
 *         schema:
 *           type: string
 *         description: The shell name
 *     responses:
 *       '200':
 *         description: The requested shell
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "success"
 *                 data:
 *                   $ref: '#/components/schemas/Shell'
 *             example:
 *               status: "success"
 *               data:
 *                 shell_name: "Assassin"
 *                 prime: "Overshield"
 *                 tactical: "Smoke Grenade"
 *                 trait_1: "Resilience"
 *                 trait_2: "Swift"
 *                 heat_capacity: 100
 *                 agility: 85
 *                 loot_speed: 75
 *                 melee_damage: 50
 *                 prime_recovery: 30
 *                 tactical_recovery: 20
 *                 self_repair_speed: 40
 *                 finisher_siphon: 15
 *                 revive_speed: 60
 *                 hardware: 90
 *                 firewall: 80
 *                 fall_resistance: 70
 *                 ping_duration: 25
 *       '404':
 *         description: Shell not found
 *         content:
 *           application/json:
 *             example:
 *               message: "Not Found."
 *       '500':
 *         description: Internal server error
 */
router.get("/shells/:name", getShellByName);

/**
 * @openapi
 * /weapons/{name}:
 *   get:
 *     summary: Retrieve a weapon by name
 *     tags: [Weapons]
 *     parameters:
 *       - in: path
 *         name: name
 *         required: true
 *         schema:
 *           type: string
 *         description: The weapon name
 *     responses:
 *       '200':
 *         description: The requested weapon
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "success"
 *                 data:
 *                   $ref: '#/components/schemas/Weapons'
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
 *       '404':
 *         description: Weapon not found
 *         content:
 *           application/json:
 *             example:
 *               message: "Not Found."
 *       '500':
 *         description: Internal server error
 */
router.get("/weapons/:name", getWeaponByName);

/**
 * @openapi
 * /factions/{name}:
 *   get:
 *     summary: Retrieve a faction by name
 *     tags: [Factions]
 *     parameters:
 *       - in: path
 *         name: name
 *         required: true
 *         schema:
 *           type: string
 *         description: The faction name
 *     responses:
 *       '200':
 *         description: The requested faction
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "success"
 *                 data:
 *                   $ref: '#/components/schemas/Factions'
 *             example:
 *               status: "success"
 *               data:
 *                 name: "CYBERACME"
 *                 lore: "The industry leader in AI."
 *       '404':
 *         description: Faction not found
 *         content:
 *           application/json:
 *             example:
 *               message: "Not Found."
 *       '500':
 *         description: Internal server error
 */

router.get("/factions/:name", getFactionByName);

/**
 * @openapi
 * /maps/{name}:
 *   get:
 *     summary: Retrieve a map image by name
 *     tags: [Maps]
 *     parameters:
 *       - in: path
 *         name: name
 *         required: true
 *         schema:
 *           type: string
 *         description: The map name
 *     responses:
 *       '200':
 *         description: The map image file
 *         content:
 *           image/png:
 *             schema:
 *               type: string
 *               format: binary
 *           image/jpeg:
 *             schema:
 *               type: string
 *               format: binary
 *       '404':
 *         description: Map not found
 *         content:
 *           application/json:
 *             example:
 *               message: "Validation error: Valid map is required."
 *       '500':
 *         description: Internal server error
 */
router.get("/maps/:name", getMap);

/**
 * @openapi
 * /shells:
 *   post:
 *     summary: Create a new shell
 *     tags: [Shells]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Shell'
 *     responses:
 *       '201':
 *         description: Shell created successfully
 *         content:
 *           application/json:
 *             example:
 *               status: "success"
 *               message: "Document Assassin was created."
 *               data:
 *                 prime: "Overshield"
 *                 tactical: "Smoke Grenade"
 *                 trait_1: "Resilience"
 *                 trait_2: "Swift"
 *                 heat_capacity: 100
 *                 agility: 85
 *                 loot_speed: 75
 *                 melee_damage: 50
 *                 prime_recovery: 30
 *                 tactical_recovery: 20
 *                 self_repair_speed: 40
 *                 finisher_siphon: 15
 *                 revive_speed: 60
 *                 hardware: 90
 *                 firewall: 80
 *                 fall_resistance: 70
 *                 ping_duration: 25
 *       '500':
 *         description: Internal server error
 */
router.post("/shells", createShell);

/**
 * @openapi
 * /weapons:
 *   post:
 *     summary: Create a new weapon
 *     tags: [Weapons]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Weapons'
 *     responses:
 *       '201':
 *         description: Weapon created successfully
 *         content:
 *           application/json:
 *             example:
 *               status: "success"
 *               data:
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
router.post("/weapons", createWeapon);

/**
 * @openapi
 * /factions:
 *   post:
 *     summary: Create a new faction
 *     tags: [Factions]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Factions'
 *     responses:
 *       '201':
 *         description: Faction created successfully
 *         content:
 *           application/json:
 *             example:
 *               status: "success"
 *               data:
 *                 name: "CYBERACME"
 *                 lore: "The industry leader in AI."
 *       '500':
 *         description: Internal server error
 */
router.post("/factions", createFaction);

/**
 * @openapi
 * /maps:
 *   post:
 *     summary: Upload a map image
 *     tags: [Maps]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - map_name
 *               - map_image
 *             properties:
 *               map_name:
 *                 type: string
 *                 example: "Perimeter"
 *               map_image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       '201':
 *         description: Map uploaded successfully
 *         content:
 *           application/json:
 *             example:
 *               status: "success"
 *               message: "Document Perimeter was created."
 *               data:
 *                 map_name: "Perimeter"
 *                 map_image: "<base64 image data>"
 *       '404':
 *         description: No image uploaded
 *         content:
 *           application/json:
 *             example:
 *               message: "Validation error: No image uploaded."
 *       '500':
 *         description: Internal server error
 */
router.post("/maps", upload.single('map_image'), createMap);

/**
 * @openapi
 * /shells/{name}:
 *   put:
 *     summary: Update a shell by name
 *     tags: [Shells]
 *     parameters:
 *       - in: path
 *         name: name
 *         required: true
 *         schema:
 *           type: string
 *         description: The shell name
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Shell'
 *     responses:
 *       '200':
 *         description: Shell updated successfully
 *         content:
 *           application/json:
 *             example:
 *               status: "success"
 *               message: "Document Assassin was updated."
 *               data:
 *                 prime: "Overshield"
 *                 tactical: "Smoke Grenade"
 *                 trait_1: "Resilience"
 *                 trait_2: "Swift"
 *                 heat_capacity: 100
 *                 agility: 85
 *                 loot_speed: 75
 *                 melee_damage: 50
 *                 prime_recovery: 30
 *                 tactical_recovery: 20
 *                 self_repair_speed: 40
 *                 finisher_siphon: 15
 *                 revive_speed: 60
 *                 hardware: 90
 *                 firewall: 80
 *                 fall_resistance: 70
 *                 ping_duration: 25
 *       '404':
 *         description: Shell not found
 *         content:
 *           application/json:
 *             example:
 *               message: "Validation error: Valid shell name is required."
 *       '500':
 *         description: Internal server error
 */
router.put("/shells/:name", updateShell);

/**
 * @openapi
 * /weapons/{name}:
 *   put:
 *     summary: Update a weapon by name
 *     tags: [Weapons]
 *     parameters:
 *       - in: path
 *         name: name
 *         required: true
 *         schema:
 *           type: string
 *         description: The weapon name
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Weapons'
 *     responses:
 *       '200':
 *         description: Weapon updated successfully
 *         content:
 *           application/json:
 *             example:
 *               status: "success"
 *               message: "Document Bully SMG was updated"
 *               data:
 *                 damage: 45
 *                 precision_multiplier: 1.5
 *                 rate_of_fire: "100 RPM"
 *                 ads_speed: "0.9s"
 *                 equip_speed: "0.8s"
 *                 reload_speed: "1.0s"
 *                 recoil: "Low"
 *                 aim_assist: 70
 *       '404':
 *         description: Weapon not found
 *         content:
 *           application/json:
 *             example:
 *               message: "Validation error: Valid weapon name is required."
 *       '500':
 *         description: Internal server error
 */
router.put("/weapons/:name", updateWeapon);

/**
 * @openapi
 * /factions/{name}:
 *   put:
 *     summary: Update a faction by name
 *     tags: [Factions]
 *     parameters:
 *       - in: path
 *         name: name
 *         required: true
 *         schema:
 *           type: string
 *         description: The faction name
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Factions'
 *     responses:
 *       '200':
 *         description: Faction updated successfully
 *         content:
 *           application/json:
 *             example:
 *               status: "success"
 *               message: "Document CYBERACME was updated"
 *               data:
 *                 name: "CYBERACME"
 *                 lore: "The industry leader in AI."
 *       '404':
 *         description: Faction not found
 *         content:
 *           application/json:
 *             example:
 *               message: "Validation error: Valid faction name is required."
 *       '500':
 *         description: Internal server error
 */
router.put("/factions/:name", updateFaction);

/**
 * @openapi
 * /shells/{name}:
 *   delete:
 *     summary: Delete a shell by name
 *     tags: [Shells]
 *     parameters:
 *       - in: path
 *         name: name
 *         required: true
 *         schema:
 *           type: string
 *         description: The shell name
 *     responses:
 *       '200':
 *         description: Shell deleted successfully
 *         content:
 *           application/json:
 *             example:
 *               status: "success"
 *               message: "Document Assassin was deleted"
 *               data:
 *                 prime: "Overshield"
 *                 tactical: "Smoke Grenade"
 *                 trait_1: "Resilience"
 *                 trait_2: "Swift"
 *                 heat_capacity: 100
 *                 agility: 85
 *                 loot_speed: 75
 *                 melee_damage: 50
 *                 prime_recovery: 30
 *                 tactical_recovery: 20
 *                 self_repair_speed: 40
 *                 finisher_siphon: 15
 *                 revive_speed: 60
 *                 hardware: 90
 *                 firewall: 80
 *                 fall_resistance: 70
 *                 ping_duration: 25
 *       '404':
 *         description: Shell not found
 *         content:
 *           application/json:
 *             example:
 *               message: "Validation error: Valid shell name is required."
 *       '500':
 *         description: Internal server error
 */
router.delete("/shells/:name", deleteShell);

/**
 * @openapi
 * /weapons/{name}:
 *   delete:
 *     summary: Delete a weapon by name
 *     tags: [Weapons]
 *     parameters:
 *       - in: path
 *         name: name
 *         required: true
 *         schema:
 *           type: string
 *         description: The weapon name
 *     responses:
 *       '200':
 *         description: Weapon deleted successfully
 *         content:
 *           application/json:
 *             example:
 *               status: "success"
 *               message: "Document Bully SMG was deleted"
 *               data:
 *                 damage: 45
 *                 precision_multiplier: 1.5
 *                 rate_of_fire: "100 RPM"
 *                 ads_speed: "0.9s"
 *                 equip_speed: "0.8s"
 *                 reload_speed: "1.0s"
 *                 recoil: "Low"
 *                 aim_assist: 70
 *       '404':
 *         description: Weapon not found
 *         content:
 *           application/json:
 *             example:
 *               message: "Validation error: Valid weapon name is required."
 *       '500':
 *         description: Internal server error
 */
router.delete("/weapons/:name", deleteWeapon);
router.delete("/factions/:name", deleteFaction);
//!add put routes later and admin routes

export default router;