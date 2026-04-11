import express, { Router } from "express";
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
 */
router.get("/health", getHealthCheck);
router.get("/shells", getAllShells);
router.get("/weapons", getAllWeapons);
router.get("/factions", getAllFactions);
router.get("/shells/:name", getShellByName);
router.get("/weapons/:name", getWeaponByName);
router.get("/factions/:name", getFactionByName);
router.post("/shells", createShell);
router.post("/weapons", createWeapon);
router.post("/factions", createFaction);
router.put("/shells/:name", updateShell);
router.put("/weapons/:name", updateWeapon);
router.put("/factions/:name", updateFaction);
router.delete("/shells/:name", deleteShell);
router.delete("/weapons/:name", deleteWeapon);
//!add put routes later and admin routes

export default router;