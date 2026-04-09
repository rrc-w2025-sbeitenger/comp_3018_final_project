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
                  createFaction} from "../controllers/controllers";

const router:Router = express.Router();

router.get("/health", getHealthCheck);
router.get("/shells", getAllShells);
router.get("/weapons", getAllWeapons);
router.get("/factions", getAllFactions);
router.get("/shells/:name", getShellByName);
router.get("/weapons/:name", getWeaponByName);
router.get("/factions/:name", getFactionByName);
router.post("/shells", createShell);
router.post("/shells", createWeapon);
router.post("/shells", createFaction);
//!add put routes later and admin routes

export default router;