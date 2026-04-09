import { HTTP_STATUS } from "../../../constants/httpsConstants";
import { Request, Response }from "express";
import { successResponse } from "../models/responseModel"; 
import { HealthCheckResponse } from "../models/healthCheckResponse";
import { Shell } from "../models/shellModel";
import { Weapons } from "../models/weaponsModel";
import { Factions } from "../models/factionsModel";
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
                     updateWeaponByNameService } from "../services/services";
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
        const getAllShellsResult: Shell[] = await getAllShellsService();
        res.status(HTTP_STATUS.OK).json(successResponse(getAllShellsResult));
    } catch (error){
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({message: "Internal Server Error"});
    }
}

export const getAllWeapons = async (req: Request, res:Response): Promise<void> => {
    try {
        const getAllWeaponsResult: Weapons[] = await getAllWeaponsService();
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
        const selectedShell: Shell | false = await getShellByNameService(shellName);

        if(selectedShell == false){
            res.status(HTTP_STATUS.NOT_FOUND).json({message: "Not Found."});
            return;
        } else {
            res.status(HTTP_STATUS.OK).json(selectedShell);
        }
    } catch (error){
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({message: "Interal Server Error"});
    }
}

export const getWeaponByName = async (req: Request, res:Response): Promise<void> => {
    try{
        const weaponName: string = String(req.params.name);
        const selectedWeapon: Weapons | false = await getWeaponByNameService(weaponName);

        if(selectedWeapon == false){
            res.status(HTTP_STATUS.NOT_FOUND).json({message: "Not Found."});
            return;
        } else {
            res.status(HTTP_STATUS.OK).json(selectedWeapon);
        }
    } catch (error){
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({message: "Interal Server Error"});
    }
}

export const getFactionByName = async (req: Request, res:Response): Promise<void> => {
    try{
        const factionName: string = String(req.params.name);
        const selectedFaction: Factions | false = await getFactionByNameService(factionName);

        if(selectedFaction == false){
            res.status(HTTP_STATUS.NOT_FOUND).json({message: "Not Found."});
            return;
        } else {
            res.status(HTTP_STATUS.OK).json(selectedFaction);
        }
    } catch (error){
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({message: "Interal Server Error"});
    }
}

//POST
export const createShell = async (req: Request, res: Response): Promise<void> => {
    try{
        const shellCreateRequest: ShellRequest = {
            shell_name: req.body.name,
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
        res.status(HTTP_STATUS.CREATED).json(newShell);

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
            reload_speed: req.body.reload
    }

        const newWeapon: Weapons = createWeaponService(weaponCreateRequest)
        res.status(HTTP_STATUS.CREATED).json(newWeapon);

    } catch (error){
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ message: "Internal Server Error"});
    }
}

export const createFaction = (req: Request, res: Response): void => {
    try{
        const factionCreateRequest: Factions = {
            lore: req.body.lore,
            name: req.body.name
    }
        const newFaction: Factions = createFactionService(factionCreateRequest)
        res.status(HTTP_STATUS.CREATED).json(newFaction);
        
    }catch (error){
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ message: "Internal Server Error"});
    }
}

//PUT
export const updateShell = async (req: Request, res:Response): Promise<void> => {
    try{
        const name: string = String(req.params.name);
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

        const updatedShell: any = await updateShellByNameService(name, updateShellRequest);
        
        if(updatedShell == false){
            res.status(HTTP_STATUS.NOT_FOUND).json({message: `Validation error: Valid shell name is required.`});
        } else {
            res.status(HTTP_STATUS.OK).json(successResponse(updatedShell, `Entity ${name} was updated`));
        }
    } catch (error){
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({message: "Internal Server Error"});
    }
}

export const updateWeapon = async (req: Request, res:Response): Promise<void> => {
    try{
        const name: string = String(req.params.name);
        const updateWeaponRequest: Weapons = {
            ads_speed: req.body.ads_speed,
            aim_assist: Number(req.body.aim_assist),
            damage: Number(req.body.damage),
            equip_speed: req.body.equip_speed,
            precision_multiplier: Number(req.body.precision_multiplier),
            rate_of_fire: req.body.rate_of_fire,
            recoil:  req.body.recoil,
            reload_speed: req.body.reload
        }

        const updatedWeapon: any = await updateWeaponByNameService(name, updateWeaponRequest);
        
        if(updatedWeapon == false){
            res.status(HTTP_STATUS.NOT_FOUND).json({message: `Validation error: Valid weapon name is required.`});
        } else {
            res.status(HTTP_STATUS.OK).json(successResponse(updatedWeapon, `Entity ${name} was updated`));
        }
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
        } else {
            res.status(HTTP_STATUS.OK).json(successResponse(updatedFaction, `Entity ${name} was updated`));
        }
    } catch (error){
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({message: "Internal Server Error"});
    }
}