import { HTTP_STATUS } from "../../../constants/httpsConstants";
import { Request, Response }from "express";
import { successResponse} from "../models/responseModel"; 
import { HealthCheckResponse } from "../models/healthCheckResponse";
import { Shell } from "../models/shellModel";
import { Weapons } from "../models/weaponsModel";
import { Factions } from "../models/factionsModel";
import { DocumentData } from "node_modules/firebase-admin/lib/firestore";
import { getHealthStatusService,
          getAllShellsService,
           getAllWeaponsService,
            getAllFactionsService,
             getShellByNameService,
              getWeaponByNameService,
               getFactionByNameService,
                createShellService,
                 createWeaponService,
                  createFactionService,
                   updateFactionByNameService,
                    updateShellByNameService,
                     updateWeaponByNameService,
                      deleteShellService,
                       deleteWeaponService,
                        deleteFactionService,
                        createMapService,
                         getMapService
                     } from "../services/services";
import { ShellRequest } from "../models/shellRequest";
import { WeaponsRequest } from "../models/weaponsRequest";

/**
 * API server health check status.
 * 
 * @param {Request} req - incoming request object.
 * @param {Response} res - response containing a health status object.
 * @param {void}
 */
export const getHealthCheck = (req: Request, res: Response): void => {
    try{
        const healthStatus: HealthCheckResponse = getHealthStatusService();
        res.status(HTTP_STATUS.OK).json(successResponse(healthStatus));
    } catch (error: unknown){
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({message: "Internal Server Error"});
    }
}

/**
 * Retrieves all shell documents.
 * 
 * @param {Request} req - incoming request object.
 * @param {Response} res - response containing a shell array of all shells.
 * @param {Promise<void>}
 */
export const getAllShells = async (req: Request, res:Response): Promise<void> => {
    try {
        const getAllShellsResult: ShellRequest[] = await getAllShellsService();
        res.status(HTTP_STATUS.OK).json(successResponse(getAllShellsResult));
    } catch (error: unknown){
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({message: "Internal Server Error"});
    }
}

/**
 * Retrieves all weapon documents.
 * 
 * @param {Request}req - incoming request object.
 * @param {Response}res - response containing an array of all weapons.
 * @returns {Promise<void>}
 */
export const getAllWeapons = async (req: Request, res:Response): Promise<void> => {
    try {
        const getAllWeaponsResult: WeaponsRequest[] = await getAllWeaponsService();
        res.status(HTTP_STATUS.OK).json(successResponse(getAllWeaponsResult));
    } catch (error: unknown){
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({message: "Internal Server Error"});
    }
}

/**
 * Retrieves all faction documents.
 * 
 * @param {Request}req - incoming request object.
 * @param {Response}res - response containing an array of all factions.
 *  @returns {Promise<void>}
 */
export const getAllFactions = async (req: Request, res:Response): Promise<void> => {
    try {
        const getAllFactionsResult: Factions[] = await getAllFactionsService();
        res.status(HTTP_STATUS.OK).json(successResponse(getAllFactionsResult));
    } catch (error: unknown){
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({message: "Internal Server Error"});
    }
}

/**
 * Retrieves a single shell document by name.
 * 
 * @param {Request}req - incoming request object containing the shell name route parameter.
 * @param {Response}res - response containing the matching single shell or 404 not found.
 *  @returns {Promise<void>}
 */
export const getShellByName = async (req:Request, res:Response): Promise<void> => {
    try{
        const shellName: string = String(req.params.name);
        const selectedShell: Shell | null = await getShellByNameService(shellName);

        if(!selectedShell){
            res.status(HTTP_STATUS.NOT_FOUND).json({message: "Not Found."});
            return;
        }

        res.status(HTTP_STATUS.OK).json(successResponse(selectedShell));
    } catch (error: unknown){
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({message: "Interal Server Error"});
    }
}

/**
 * Retrieves a single weapon document by name.
 * 
 * @param {Request}req - incoming request object containing the weapon name route parameter.
 * @param {Response}res - response containing the matching single weapon or 404 not found.
 *  @returns {Promise<void>}
 */
export const getWeaponByName = async (req: Request, res:Response): Promise<void> => {
    try{
        const weaponName: string = String(req.params.name);
        const selectedWeapon: Weapons | null = await getWeaponByNameService(weaponName);

        if(!selectedWeapon){
            res.status(HTTP_STATUS.NOT_FOUND).json({message: "Not Found."});
            return;
        }

        res.status(HTTP_STATUS.OK).json(successResponse(selectedWeapon));
    } catch (error: unknown){
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({message: "Interal Server Error"});
    }
}

/**
 * Retrieves a single faction document by name.
 * 
 * @param {Request}req - incoming request object containing the faction name route parameter.
 * @param {Response}res - response containing the matching single faction or 404 not found.
 *  @returns {Promise<void>}
 */
export const getFactionByName = async (req: Request, res:Response): Promise<void> => {
    try{
        const factionName: string = String(req.params.name);
        const selectedFaction: Factions | null = await getFactionByNameService(factionName);

        if(!selectedFaction){
            res.status(HTTP_STATUS.NOT_FOUND).json({message: "Not Found."});
            return;
        }

        res.status(HTTP_STATUS.OK).json(successResponse(selectedFaction));
    } catch (error: unknown){
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({message: "Interal Server Error"});
    }
}

/**
 * Creates a new shell document.
 * 
 * @param {Request}req - incoming request object containing shell data in the body.
 * @param {Response}res - response containing the newly created shell.
 *  @returns {Promise<void>}
 */
export const createShell = async (req: Request, res: Response): Promise<void> => {
    try{
        const shellCreateRequest: ShellRequest = {
            shell_name: req.body.shell_name,
            prime: req.body.prime,
            tactical: req.body.tactical,
            trait_1: req.body.trait_1,
            trait_2: req.body.trait_2,
            heat_capacity: Number(req.body.heat_capacity),
            agility: Number(req.body.agility),
            loot_speed: Number(req.body.loot_speed),
            melee_damage: Number(req.body.melee_damage),
            prime_recovery: Number(req.body.prime_recovery),
            tactical_recovery: Number(req.body.tactical_recovery),
            self_repair_speed: Number(req.body.self_repair_speed),
            finisher_siphon: Number(req.body.finisher_siphon),
            revive_speed: Number(req.body.revive_speed),
            hardware: Number(req.body.hardware),
            firewall: Number(req.body.firewall),
            fall_resistance: Number(req.body.fall_resistance),
            ping_duration: Number(req.body.ping_duration),
    }
    
        const newShell: Shell = await createShellService(shellCreateRequest);
        res.status(HTTP_STATUS.CREATED).json(successResponse(newShell));

    } catch (error: unknown){
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ message: "Internal Server Error"});
    }
}

/**
 * Creates a new weapon document.
 * 
 * @param {Request}req - incoming request object containing weapon data in the body.
 * @param {Response}res - response containing the newly created weapon.
 *  @returns {Promise<void>}
 */
export const createWeapon = async (req: Request, res: Response): Promise<void> => {
    try{
        const weaponCreateRequest: WeaponsRequest = {
            weapon_name: req.body.weapon_name,
            ads_speed: req.body.ads_speed,
            aim_assist: Number(req.body.aim_assist),
            damage: Number(req.body.damage),
            equip_speed: req.body.equip_speed,
            precision_multiplier: Number(req.body.precision_multiplier),
            rate_of_fire: req.body.rate_of_fire,
            recoil:  req.body.recoil,
            reload_speed: req.body.reload_speed
    }

        const newWeapon: Weapons = await createWeaponService(weaponCreateRequest)
        res.status(HTTP_STATUS.CREATED).json(successResponse(newWeapon));

    } catch (error: unknown){
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ message: "Internal Server Error"});
    }
}

/**
 * Creates a new faction document.
 * 
 * @param {Request}req - incoming request object containing faction data in the body.
 * @param {Response}res - response containing the newly created faction.
 *  @returns {Promise<void>}
 */
export const createFaction = async (req: Request, res: Response): Promise<void> => {
    try{
        const factionCreateRequest: Factions = {
            lore: req.body.lore,
            name: req.body.name
        }

        const newFaction: Factions = await createFactionService(factionCreateRequest)
        res.status(HTTP_STATUS.CREATED).json(successResponse(newFaction));
    } catch (error: unknown){
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ message: "Internal Server Error"});
    }
}

/**
 * Updates the shell document by name.
 * 
 * @param {Request}req - incoming request object containing the shell name from params and shell data in the body.
 * @param {Response}res - response containing the updated shell or 404 for not found.
 *  @returns {Promise<void>}
 */
export const updateShell = async (req: Request, res:Response): Promise<void> => {
    try{
        const shellName: string = String(req.params.name);
        const updatedShell: DocumentData | null = await updateShellByNameService(shellName, req.body);
        
        if(!updatedShell){
            res.status(HTTP_STATUS.NOT_FOUND).json({message: `Validation error: Valid shell name is required.`});
            return;
        }

        res.status(HTTP_STATUS.OK).json(successResponse(updatedShell, `Document ${shellName} was updated.`));
    } catch (error: unknown){
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({message: "Internal Server Error"});
    }
}

/**
 * Updates the weapon documen by name.
 * 
 * @param {Request}req - incoming request object containing the weapon name from params and weapon data in the body.
 * @param {Response}res - response containing the updated weapon or 404 for not found.
 *  @returns {Promise<void>}
 */
export const updateWeapon = async (req: Request, res:Response): Promise<void> => {
    try{
        const weaponName: string = String(req.params.name);
        const updatedWeapon: DocumentData | null = await updateWeaponByNameService(weaponName, req.body);
        
        if(!updatedWeapon){
            res.status(HTTP_STATUS.NOT_FOUND).json({message: `Validation error: Valid weapon name is required.`});
            return;
        }

        res.status(HTTP_STATUS.OK).json(successResponse(updatedWeapon, `Document ${weaponName} was updated`));
    } catch (error: unknown){
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({message: "Internal Server Error"});
    }
}

/**
 * Updates the faction document by name.
 * 
 * @param {Request}req - incoming request object containing the faction name from params and faction data in the body.
 * @param {Response}res - response containing the updated faction or 404 for not found.
 *  @returns {Promise<void>}
 */
export const updateFaction = async (req: Request, res:Response): Promise<void> => {
    try{
        const name: string = String(req.params.name);
        const updatedFaction: DocumentData | null = await updateFactionByNameService(name, req.body);
        
        if(!updatedFaction){
            res.status(HTTP_STATUS.NOT_FOUND).json({message: `Validation error: Valid faction name is required.`});
            return;
        }

        res.status(HTTP_STATUS.OK).json(successResponse(updatedFaction, `Document ${name} was updated`));
    } catch (error: unknown){
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({message: "Internal Server Error"});
    }
}

/**
 * Deletes the shell document by name.
 * 
 * @param {Request}req - incoming request object containing the shell name from params.
 * @param {Response}res - response containing the deleted shell or 404 for not found.
 *  @returns {Promise<void>}
 */
export const deleteShell = async (req: Request, res: Response): Promise<void> => {
    try{
        const shellName: string = String(req.params.name);
        const deletedShell: DocumentData | null = await deleteShellService(shellName);

        if(!deletedShell){
            res.status(HTTP_STATUS.NOT_FOUND).json({message: `Validation error: Valid shell name is required.`});
            return;
        }

        res.status(HTTP_STATUS.OK).json(successResponse(deletedShell, `Document ${shellName} was deleted`));
    } catch (error: unknown){
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({message: `Internal Server Error`});
    }
}

/**
 * Deletes the weapon document by name.
 * 
 * @param {Request}req - incoming request object containing the weapon name from params.
 * @param {Response}res - response containing the deleted weapon or 404 for not found.
 *  @returns {Promise<void>}
 */
export const deleteWeapon = async (req: Request, res: Response): Promise<void> => {
    try{
        const weaponName: string = String(req.params.name);
        const deletedWeapon: DocumentData | null = await deleteWeaponService(weaponName);

        if(!deletedWeapon){
            res.status(HTTP_STATUS.NOT_FOUND).json({message: `Validation error: Valid weapon name is required.`});
            return;
        }

        res.status(HTTP_STATUS.OK).json(successResponse(deletedWeapon, `Document ${weaponName} was deleted`));
    } catch (error: unknown){
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({message: `Internal Server Error`});
    }
}

/**
 * Deletes the faction document by name.
 * @param {Request}req - incoming request object containing the faction name from params.
 * @param {Response}res - response containing the deleted faction or 404 for not found.
 * @returns {Promise<void>}
 */
export const deleteFaction = async (req: Request, res: Response): Promise<void> => {
    try{
        const factionName: string = String(req.params.name);
        const deletedFaction: DocumentData | null = await deleteFactionService(factionName);

        if(!deletedFaction){
            res.status(HTTP_STATUS.NOT_FOUND).json({message: `Validation error: Valid weapon name is required.`});
            return;
        }

        res.status(HTTP_STATUS.OK).json(successResponse(deletedFaction, `Document ${factionName} was deleted`));
    } catch (error: unknown){
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({message: `Internal Server Error`});
    }
}

/**
 * Creates the map document.
 * 
 * @param {Request}req - incoming request object containing image file in req.file and map name from body.
 * @param {Response}res - response containing the newly map image or 404 if image was not uploaded.
 * @returns {Promise<void>}
 *
 */
export const createMap = async (req: Request, res: Response): Promise<void> => {
    try{
        if(!req.file){
            res.status(HTTP_STATUS.NOT_FOUND).json({message: "Validation error: No image uploaded."})
            return;
        }

        const mapImage: Express.Multer.File | undefined = req.file;
        const mapName: string = req.body.map_name;

        const createdMap = await createMapService(mapImage, mapName);
        res.status(HTTP_STATUS.CREATED).json(successResponse(createdMap, `Document ${mapName} was created.`));

    } catch (error: unknown){
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({message: "Internal Server Error"});
    }
}

/**
 * Retrieves the map document and returns it as png buffer response.
 * 
 * @param {Request}req - incoming request object containing the map name from params.
 * @param {Response}res - response containing the newly map image, or 404 for not found.
 * @returns {Promise<void>}
 *
 */
export const getMap = async (req: Request, res: Response): Promise<void> => {
    try{
        const mapName: string = String(req.params.name);
        const map: DocumentData | null = await getMapService(mapName);

        if(!map){
            res.status(HTTP_STATUS.NOT_FOUND).json({message: `Validation error: Valid map is required.`});
            return;
        }

        //converts text into binary
        const imageBuffer = Buffer.from(map.map_image, 'base64');

        res.set('Content-Type', 'image/png');
        res.send(imageBuffer);

    } catch (error: unknown){
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({message: "Internal Server Error"});
    }
}
