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
import { validateRequest } from "../middleware/validate";
import { marathonSchemas } from "../validation/marathonSchemas";
import authenticate from "../middleware/authenticate";
import isAuthorized from "../middleware/authorize";

const router:Router = express.Router();

/**
 * @openapi
 * components:
 *   responses:
 *     ValidationError:
 *       description: Request validation failed
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               error:
 *                 type: string
 *           example:
 *             error: "Validation error: Params: \"name\" cannot be empty"
 *     UnauthorizedError:
 *       description: Missing or invalid Firebase bearer token
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               success:
 *                 type: boolean
 *                 example: false
 *               error:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                   code:
 *                     type: string
 *               timestamp:
 *                 type: string
 *                 format: date-time
 *           example:
 *             success: false
 *             error:
 *               message: "Unauthorized: No token provided"
 *               code: "TOKEN_NOT_FOUND"
 *             timestamp: "2026-04-11T17:30:00.000Z"
 *     ForbiddenError:
 *       description: Authenticated user does not have the required role
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               success:
 *                 type: boolean
 *                 example: false
 *               error:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                   code:
 *                     type: string
 *               timestamp:
 *                 type: string
 *                 format: date-time
 *           example:
 *             success: false
 *             error:
 *               message: "Forbidden: Insufficient role"
 *               code: "INSUFFICIENT_ROLE"
 *             timestamp: "2026-04-11T17:30:00.000Z"
 */

/**
 * @openapi
 * /health:
 *   get:
 *     summary: Returns the health status of the server
 *     tags: [Health]
 *     security: []
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
 *     security: []
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
 *                 - shell_name: "assassin"
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
 *     security: []
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
 *                 - weapon_name: "bully_smg"
 *                   damage: 45
 *                   precision_multiplier: 1.5
 *                   rate_of_fire: "100 RPM"
 *                   ads_speed: "0.9s"
 *                   equip_speed: "0.8s"
 *                   reload_speed: "1.0s"
 *                   recoil: "81%"
 *                   aim_assist: 70
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
 *     security: []
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
 *                 - name: "cyberacme"
 *                   lore: "The industry leader in AI."
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
 *     security: []
 *     parameters:
 *       - in: path
 *         name: name
 *         required: true
 *         schema:
 *           type: string
 *         description: The shell name
 *         example: assassin
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
 *                 shell_name: "assassin"
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
 *       '400':
 *         $ref: '#/components/responses/ValidationError'
 *       '500':
 *         description: Internal server error
 */
router.get("/shells/:name", validateRequest(marathonSchemas.getByName), getShellByName);

/**
 * @openapi
 * /weapons/{name}:
 *   get:
 *     summary: Retrieve a weapon by name
 *     tags: [Weapons]
 *     security: []
 *     parameters:
 *       - in: path
 *         name: name
 *         required: true
 *         schema:
 *           type: string
 *         description: The weapon name
 *         example: impact_hr
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
 *                 weapon_name: "bully_smg"
 *                 damage: 45
 *                 precision_multiplier: 1.5
 *                 rate_of_fire: "100 RPM"
 *                 ads_speed: "0.9s"
 *                 equip_speed: "0.8s"
 *                 reload_speed: "1.0s"
 *                 recoil: "81%"
 *                 aim_assist: 70
 *       '404':
 *         description: Weapon not found
 *         content:
 *           application/json:
 *             example:
 *               message: "Not Found."
 *       '400':
 *         $ref: '#/components/responses/ValidationError'
 *       '500':
 *         description: Internal server error
 */
router.get("/weapons/:name", validateRequest(marathonSchemas.getByName),  getWeaponByName);

/**
 * @openapi
 * /factions/{name}:
 *   get:
 *     summary: Retrieve a faction by name
 *     tags: [Factions]
 *     security: []
 *     parameters:
 *       - in: path
 *         name: name
 *         required: true
 *         schema:
 *           type: string
 *         description: The faction name
 *         example: cyberacme
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
 *                 name: "cyberacme"
 *                 lore: "The industry leader in AI."
 *       '404':
 *         description: Faction not found
 *         content:
 *           application/json:
 *             example:
 *               message: "Not Found."
 *       '400':
 *         $ref: '#/components/responses/ValidationError'
 *       '500':
 *         description: Internal server error
 */

router.get("/factions/:name", validateRequest(marathonSchemas.getByName), getFactionByName);

/**
 * @openapi
 * /maps/{name}:
 *   get:
 *     summary: Retrieve a map image by name
 *     tags: [Maps]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: name
 *         required: true
 *         schema:
 *           type: string
 *         description: The map name
 *         example: perimeter
 *     responses:
 *       '200':
 *         description: The map image file
 *         content:
 *           image/png:
 *             schema:
 *               type: string
 *               format: binary
 *       '404':
 *         description: Map not found
 *         content:
 *           application/json:
 *             example:
 *               message: "Validation error: Valid map is required."
 *       '400':
 *         $ref: '#/components/responses/ValidationError'
 *       '401':
 *         $ref: '#/components/responses/UnauthorizedError'
 *       '403':
 *         $ref: '#/components/responses/ForbiddenError'
 *       '500':
 *         description: Internal server error
 */
router.get("/maps/:name", authenticate, isAuthorized({ hasRole: ["admin", "user"]}), validateRequest(marathonSchemas.getByName), getMap);

/**
 * @openapi
 * /shells:
 *   post:
 *     summary: Create a new shell
 *     tags: [Shells]
 *     security:
 *       - bearerAuth: []
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
 *       '400':
 *         $ref: '#/components/responses/ValidationError'
 *       '401':
 *         $ref: '#/components/responses/UnauthorizedError'
 *       '403':
 *         $ref: '#/components/responses/ForbiddenError'
 *       '500':
 *         description: Internal server error
 */
router.post("/shells", authenticate, isAuthorized({ hasRole: ["admin"]}), validateRequest(marathonSchemas.createShell), createShell);

/**
 * @openapi
 * /weapons:
 *   post:
 *     summary: Create a new weapon
 *     tags: [Weapons]
 *     security:
 *       - bearerAuth: []
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
 *                 recoil: "81%"
 *                 aim_assist: 70
 *       '400':
 *         $ref: '#/components/responses/ValidationError'
 *       '401':
 *         $ref: '#/components/responses/UnauthorizedError'
 *       '403':
 *         $ref: '#/components/responses/ForbiddenError'
 *       '500':
 *         description: Internal server error
 */
router.post("/weapons", authenticate, isAuthorized({ hasRole: ["admin"]}), validateRequest(marathonSchemas.createWeapon), createWeapon);

/**
 * @openapi
 * /factions:
 *   post:
 *     summary: Create a new faction
 *     tags: [Factions]
 *     security:
 *       - bearerAuth: []
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
 *                 name: "cyberacme"
 *                 lore: "The industry leader in AI."
 *       '400':
 *         $ref: '#/components/responses/ValidationError'
 *       '401':
 *         $ref: '#/components/responses/UnauthorizedError'
 *       '403':
 *         $ref: '#/components/responses/ForbiddenError'
 *       '500':
 *         description: Internal server error
 */
router.post("/factions", authenticate, isAuthorized({ hasRole: ["admin"]}), validateRequest(marathonSchemas.createFaction), createFaction);

/**
 * @openapi
 * /maps:
 *   post:
 *     summary: Upload a map image
 *     tags: [Maps]
 *     security:
 *       - bearerAuth: []
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
 *       '400':
 *         $ref: '#/components/responses/ValidationError'
 *       '401':
 *         $ref: '#/components/responses/UnauthorizedError'
 *       '403':
 *         $ref: '#/components/responses/ForbiddenError'
 *       '500':
 *         description: Internal server error
 */
router.post("/maps", authenticate, isAuthorized({ hasRole: ["admin"]}), upload.single('map_image'), validateRequest(marathonSchemas.createMaps), createMap);

/**
 * @openapi
 * /shells/{name}:
 *   put:
 *     summary: Update a shell by name
 *     tags: [Shells]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: name
 *         required: true
 *         schema:
 *           type: string
 *         description: The shell name
 *         example: assassin
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
 *               message: "Document assassin was updated."
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
 *       '400':
 *         $ref: '#/components/responses/ValidationError'
 *       '401':
 *         $ref: '#/components/responses/UnauthorizedError'
 *       '403':
 *         $ref: '#/components/responses/ForbiddenError'
 *       '500':
 *         description: Internal server error
 */
router.put("/shells/:name", authenticate, isAuthorized({ hasRole: ["admin"]}), validateRequest(marathonSchemas.updateShell), updateShell);

/**
 * @openapi
 * /weapons/{name}:
 *   put:
 *     summary: Update a weapon by name
 *     tags: [Weapons]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: name
 *         required: true
 *         schema:
 *           type: string
 *         description: The weapon name
 *         example: impact_hr
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
 *               message: "Document bully_smg was updated"
 *               data:
 *                 damage: 45
 *                 precision_multiplier: 1.5
 *                 rate_of_fire: "100 RPM"
 *                 ads_speed: "0.9s"
 *                 equip_speed: "0.8s"
 *                 reload_speed: "1.0s"
 *                 recoil: "81%"
 *                 aim_assist: 70
 *       '404':
 *         description: Weapon not found
 *         content:
 *           application/json:
 *             example:
 *               message: "Validation error: Valid weapon name is required."
 *       '400':
 *         $ref: '#/components/responses/ValidationError'
 *       '401':
 *         $ref: '#/components/responses/UnauthorizedError'
 *       '403':
 *         $ref: '#/components/responses/ForbiddenError'
 *       '500':
 *         description: Internal server error
 */
router.put("/weapons/:name", authenticate, isAuthorized({ hasRole: ["admin"]}), validateRequest(marathonSchemas.updateWeapon), updateWeapon);

/**
 * @openapi
 * /factions/{name}:
 *   put:
 *     summary: Update a faction by name
 *     tags: [Factions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: name
 *         required: true
 *         schema:
 *           type: string
 *         description: The faction name
 *         example: cyberacme
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
 *               message: "Document cyberacme was updated"
 *               data:
 *                 name: "cyberacme"
 *                 lore: "The industry leader in AI."
 *       '404':
 *         description: Faction not found
 *         content:
 *           application/json:
 *             example:
 *               message: "Validation error: Valid faction name is required."
 *       '400':
 *         $ref: '#/components/responses/ValidationError'
 *       '401':
 *         $ref: '#/components/responses/UnauthorizedError'
 *       '403':
 *         $ref: '#/components/responses/ForbiddenError'
 *       '500':
 *         description: Internal server error
 */
router.put("/factions/:name", authenticate, isAuthorized({ hasRole: ["admin"]}), validateRequest(marathonSchemas.updateFaction), updateFaction);

/**
 * @openapi
 * /shells/{name}:
 *   delete:
 *     summary: Delete a shell by name
 *     tags: [Shells]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: name
 *         required: true
 *         schema:
 *           type: string
 *         description: The shell name
 *         example: assassin
 *     responses:
 *       '200':
 *         description: Shell deleted successfully
 *         content:
 *           application/json:
 *             example:
 *               status: "success"
 *               message: "Document assassin was deleted"
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
 *       '400':
 *         $ref: '#/components/responses/ValidationError'
 *       '401':
 *         $ref: '#/components/responses/UnauthorizedError'
 *       '403':
 *         $ref: '#/components/responses/ForbiddenError'
 *       '500':
 *         description: Internal server error
 */
router.delete("/shells/:name", authenticate, isAuthorized({ hasRole: ["admin"]}), validateRequest(marathonSchemas.getByName), deleteShell);

/**
 * @openapi
 * /weapons/{name}:
 *   delete:
 *     summary: Delete a weapon by name
 *     tags: [Weapons]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: name
 *         required: true
 *         schema:
 *           type: string
 *         description: The weapon name
 *         example: impact_hr
 *     responses:
 *       '200':
 *         description: Weapon deleted successfully
 *         content:
 *           application/json:
 *             example:
 *               status: "success"
 *               message: "Document bully_smg was deleted"
 *               data:
 *                 damage: 45
 *                 precision_multiplier: 1.5
 *                 rate_of_fire: "100 RPM"
 *                 ads_speed: "0.9s"
 *                 equip_speed: "0.8s"
 *                 reload_speed: "1.0s"
 *                 recoil: "81%"
 *                 aim_assist: 70
 *       '404':
 *         description: Weapon not found
 *         content:
 *           application/json:
 *             example:
 *               message: "Validation error: Valid weapon name is required."
 *       '400':
 *         $ref: '#/components/responses/ValidationError'
 *       '401':
 *         $ref: '#/components/responses/UnauthorizedError'
 *       '403':
 *         $ref: '#/components/responses/ForbiddenError'
 *       '500':
 *         description: Internal server error
 */
router.delete("/weapons/:name", authenticate, isAuthorized({ hasRole: ["admin"]}), validateRequest(marathonSchemas.getByName), deleteWeapon);

/**
 * @openapi
 * /factions/{name}:
 *   delete:
 *     summary: Delete a faction by name
 *     tags: [Factions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: name
 *         required: true
 *         schema:
 *           type: string
 *         description: The faction name
 *         example: cyberacme
 *     responses:
 *       '200':
 *         description: Faction deleted successfully
 *         content:
 *           application/json:
 *             example:
 *               status: "success"
 *               message: "Document cyberacme was deleted"
 *               data:
 *                 name: "cyberacme"
 *                 lore: "The industry leader in AI."
 *       '404':
 *         description: Faction not found
 *         content:
 *           application/json:
 *             example:
 *               message: "Validation error: Valid faction name is required."
 *       '400':
 *         $ref: '#/components/responses/ValidationError'
 *       '401':
 *         $ref: '#/components/responses/UnauthorizedError'
 *       '403':
 *         $ref: '#/components/responses/ForbiddenError'
 *       '500':
 *         description: Internal server error
 */
router.delete("/factions/:name", authenticate, isAuthorized({ hasRole: ["admin"]}), validateRequest(marathonSchemas.getByName), deleteFaction);

export default router;