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
                  createFactionService} from "../services/services";

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
export const getShellByName = (req:Request, res:Response): void => {
    const shellName: string = String(req.params.name);

    //! add validation

    const selectedShell: Shell = getShellByNameService(shellName);

    if(!selectedShell){
        res.status(HTTP_STATUS.NOT_FOUND).json({message: "Not Found."});
        return;
    } else {
        res.status(HTTP_STATUS.OK).json(selectedShell);
    }
}

export const getWeaponByName = (req: Request, res:Response): void => {
    const weaponName: string = String(req.params.name);

    //! add validation

    const selectedWeapon: Weapons = getWeaponByNameService(weaponName);

    if(!selectedWeapon){
        res.status(HTTP_STATUS.NOT_FOUND).json({message: "Not Found."});
        return;
    } else {
        res.status(HTTP_STATUS.OK).json(selectedWeapon);
    }
}

export const getFactionByName = (req: Request, res:Response): void => {
    const factionName: string = String(req.params.name);

    //! add validation

    const selectedFaction: Factions = getFactionByNameService(factionName);

    if(!selectedFaction){
        res.status(HTTP_STATUS.NOT_FOUND).json({message: "Not Found."});
        return;
    } else {
        res.status(HTTP_STATUS.OK).json(selectedFaction);
    }
}

//POST
export const createShell = (req: Request, res: Response): void => {
    const prime: string = req.body.prime;
    const tactical: string = req.body.tactical;
    const trait_1: string = req.body.trait_1;
    const trait_2: string = req.body.trait_2;
    const heat_capacity: number = Number(req.body.heat_capacity);
    const agility: number = Number(req.body.agility);
    const loot_speed: number = Number(req.body.loot_speed);
    const melee_damage: number = Number(req.body.melee_damage);
    const prime_recovery: number = Number(req.body.prime_recovery);
    const tactical_recovery: number = Number(req.body.tactical_recovery);
    const self_repair_speed: number = Number(req.body.self_repair_speed);
    const finisher_siphon: number = Number(req.body.finisher_siphon);
    const revive_speed: number = Number(req.body.revive_speed);
    const hardware: number = Number(req.body.hardware);
    const firewall: number = Number(req.body.firewall);
    const fall_resistance: number = Number(req.body.fall_resistance);
    const ping_duration: number = Number(req.body.ping_duration);

    /**
     *  prime: string,
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
     */
    const newShell: Shell = createShellService(prime,
                                               tactical,
                                               trait_1, 
                                               trait_2, 
                                               heat_capacity, 
                                               agility, 
                                               loot_speed, 
                                               melee_damage, 
                                               prime_recovery, 
                                               tactical_recovery, 
                                               self_repair_speed,
                                               finisher_siphon,
                                               revive_speed, 
                                               hardware,
                                               firewall,
                                               fall_resistance,
                                               ping_duration);
    res.status(HTTP_STATUS.CREATED).json(newShell);
}

export const createWeapon = (req: Request, res: Response): void => {
    const ads_speed: string = req.body.ads_speed;
    const aim_assist: number = Number(req.body.aim_assist);
    const damage: number = Number(req.body.damage);
    const equip_speed: string = req.body.equip_speed;
    const precision_multiplier: number = Number(req.body.precision_multiplier);
    const rate_of_fire: string = req.body.rate_of_fire;
    const recoil: string = req.body.recoil;
    const reload: string = req.body.reload;

    const newWeapon: Weapons = createWeaponService(ads_speed,
                                                   aim_assist, 
                                                   damage, 
                                                   equip_speed, 
                                                   precision_multiplier, 
                                                   rate_of_fire, 
                                                   recoil, 
                                                   reload)
    res.status(HTTP_STATUS.CREATED).json(newWeapon);
}

export const createFaction = (req: Request, res: Response): void => {
    const lore: string = req.body.lore;
    const name: string = req.body.name;

    const newFaction: Factions = createFactionService(lore, name)
    res.status(HTTP_STATUS.CREATED).json(newFaction);
}