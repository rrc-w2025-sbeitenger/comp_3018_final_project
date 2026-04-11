import { HTTP_STATUS } from "../../../constants/httpsConstants";
import { Request, Response }from "express";
import { successResponse } from "../models/responseModel"; 
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
                        deleteFactionService
                     } from "../services/services";
import { ShellRequest } from "../models/shellRequest";
import { WeaponsRequest } from "../models/weaponsRequest";

//CHECKCHECK
export const getHealthCheck = (req: Request, res: Response): void => {
    try{
        const healthStatus: HealthCheckResponse = getHealthStatusService();
        res.status(HTTP_STATUS.OK).json(successResponse(healthStatus));
    } catch (error){
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({message: "Internal Server Error"});
    }
}

//GET ALL
export const getAllShells = async (req: Request, res:Response): Promise<void> => {
    try {
        const getAllShellsResult: ShellRequest[] = await getAllShellsService();
        res.status(HTTP_STATUS.OK).json(successResponse(getAllShellsResult));
    } catch (error){
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({message: "Internal Server Error"});
    }
}

export const getAllWeapons = async (req: Request, res:Response): Promise<void> => {
    try {
        const getAllWeaponsResult: WeaponsRequest[] = await getAllWeaponsService();
        res.status(HTTP_STATUS.OK).json(successResponse(getAllWeaponsResult));
    } catch (error){
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({message: "Internal Server Error"});
    }
}

export const getAllFactions = async (req: Request, res:Response): Promise<void> => {
    try {
        const getAllFactionsResult: Factions[] = await getAllFactionsService();
        res.status(HTTP_STATUS.OK).json(successResponse(getAllFactionsResult));
    } catch (error){
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({message: "Internal Server Error"});
    }
}

//GET BY
export const getShellByName = async (req:Request, res:Response): Promise<void> => {
    try{
        const shellName: string = String(req.params.name);
        const selectedShell: Shell | null = await getShellByNameService(shellName);

        if(!selectedShell){
            res.status(HTTP_STATUS.NOT_FOUND).json({message: "Not Found."});
            return;
        }

        res.status(HTTP_STATUS.OK).json(successResponse(selectedShell));
        
    } catch (error){
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({message: "Interal Server Error"});
    }
}

export const getWeaponByName = async (req: Request, res:Response): Promise<void> => {
    try{
        const weaponName: string = String(req.params.name);
        const selectedWeapon: Weapons | null = await getWeaponByNameService(weaponName);

        if(!selectedWeapon){
            res.status(HTTP_STATUS.NOT_FOUND).json({message: "Not Found."});
            return;
        }

        res.status(HTTP_STATUS.OK).json(successResponse(selectedWeapon));

    } catch (error){
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({message: "Interal Server Error"});
    }
}

export const getFactionByName = async (req: Request, res:Response): Promise<void> => {
    try{
        const factionName: string = String(req.params.name);
        const selectedFaction: Factions | null = await getFactionByNameService(factionName);

        if(!selectedFaction){
            res.status(HTTP_STATUS.NOT_FOUND).json({message: "Not Found."});
            return;
        }

        res.status(HTTP_STATUS.OK).json(successResponse(selectedFaction));
        
    } catch (error){
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({message: "Interal Server Error"});
    }
}

//POST
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

    } catch (error){
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ message: "Internal Server Error"});
    }
}

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

    } catch (error){
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ message: "Internal Server Error"});
    }
}

export const createFaction = async (req: Request, res: Response): Promise<void> => {
    try{
        const factionCreateRequest: Factions = {
            lore: req.body.lore,
            name: req.body.name
    }
        const newFaction: Factions = await createFactionService(factionCreateRequest)
        res.status(HTTP_STATUS.CREATED).json(successResponse(newFaction));
        
    }catch (error){
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ message: "Internal Server Error"});
    }
}

//PUT
export const updateShell = async (req: Request, res:Response): Promise<void> => {
    try{
        const shellName: string = String(req.params.name);
        const updateShellRequest: Shell = {
            prime: req.body.prime,
            tactical: req.body.tactical,
            trait_1: req.body.trait_1,
            trait_2: req.body.trait_2, 
            heat_capacity: req.body.heat_capacity,
            agility: req.body.agility,
            loot_speed: req.body.loot_speed,
            melee_damage: req.body.melee_damage,
            prime_recovery: req.body.prime_recovery,
            tactical_recovery: req.body.tactical_recovery,
            self_repair_speed: req.body.self_repair_speed,
            finisher_siphon: req.body.finisher_siphon,
            revive_speed: req.body.revive_speed,
            hardware: req.body.hardware,
            firewall: req.body.firewall,
            fall_resistance: req.body.fall_resistance,
            ping_duration: req.body.ping_duration
        }

        const updatedShell: DocumentData | null = await updateShellByNameService(shellName, updateShellRequest);
        
        if(!updatedShell){
            res.status(HTTP_STATUS.NOT_FOUND).json({message: `Validation error: Valid shell name is required.`});
        }

        res.status(HTTP_STATUS.OK).json(successResponse(updatedShell, `Document ${shellName} was updated.`));
        
    } catch (error){
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({message: "Internal Server Error"});
    }
}

export const updateWeapon = async (req: Request, res:Response): Promise<void> => {
    try{
        const weaponName: string = String(req.params.name);
        const updateWeaponRequest: Weapons = {
            ads_speed: req.body.ads_speed,
            aim_assist: Number(req.body.aim_assist),
            damage: Number(req.body.damage),
            equip_speed: req.body.equip_speed,
            precision_multiplier: Number(req.body.precision_multiplier),
            rate_of_fire: req.body.rate_of_fire,
            recoil: req.body.recoil,
            reload_speed: req.body.reload_speed
        }

        const updatedWeapon: DocumentData | null = await updateWeaponByNameService(weaponName, updateWeaponRequest);
        
        if(!updatedWeapon){
            res.status(HTTP_STATUS.NOT_FOUND).json({message: `Validation error: Valid weapon name is required.`});
        }

        res.status(HTTP_STATUS.OK).json(successResponse(updatedWeapon, `Document ${weaponName} was updated`));

    } catch (error){
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({message: "Internal Server Error"});
    }
}

export const updateFaction = async (req: Request, res:Response): Promise<void> => {
    try{
        const name: string = String(req.params.name);
        const updateFactionRequest: Factions = {
            lore: req.body.lore,
            name: req.body.name
        }

        const updatedFaction: any = await updateFactionByNameService(name, updateFactionRequest);
        
        if(updatedFaction == false){
            res.status(HTTP_STATUS.NOT_FOUND).json({message: `Validation error: Valid faction name is required.`});
        }

        res.status(HTTP_STATUS.OK).json(successResponse(updatedFaction, `Document ${name} was updated`));

    } catch (error){
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({message: "Internal Server Error"});
    }
}

export const deleteShell = async (req: Request, res: Response): Promise<void> => {
    try{
        const shellName: string = String(req.params.name);
        const deletedShell: DocumentData | null = await deleteShellService(shellName);

        if(!deletedShell){
            res.status(HTTP_STATUS.NOT_FOUND).json({message: `Validation error: Valid shell name is required.`});
        }

        res.status(HTTP_STATUS.OK).json(successResponse(deletedShell, `Document ${shellName} was deleted`));
    } catch (error){
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({message: `Internal Server Error`});
    }
}