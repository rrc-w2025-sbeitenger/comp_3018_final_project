import { HTTP_STATUS } from "../../../constants/httpsConstants";
import { updateWeapon } from "../controllers/controllers";
import { Factions } from "../models/factionsModel";
import { HealthCheckResponse } from "../models/healthCheckResponse";
import { Shell } from "../models/shellModel";
import { ShellRequest } from "../models/shellRequest";
import { Weapons } from "../models/weaponsModel";
import { WeaponsRequest } from "../models/weaponsRequest";

/**
 * returns healthCheck server status.
 * @returns {HealthCheckResponse} - returns a healthCheckResponse object.
 */
export const getHealthStatusService = (): HealthCheckResponse => {
    return {
        status: HTTP_STATUS.OK,
        uptime: process.uptime(),
        timestamp: new Date().toISOString(),
        version: '1.0.0'
    };
}

export const getAllShellsService = async (): Promise<Shell[]> => {
    //call repositories.
    return await getShellCollection();
}

export const getAllWeaponsService = async (): Promise<Weapons[]> => {
    return await getWeaponCollection();
}

export const getAllFactionsService = async (): Promise<Factions[]> => {
    return await getFactionsCollection();
}

export const getShellByNameService = async (shellName: string): Promise<Shell | false> => {
    const entity: Shell | false = await getShellById(shellName);

    if(!entity){
        return false;
    } else {
        return {
            prime: entity.prime,
            tactical: entity.tactical,
            trait_1: entity.trait_1,
            trait_2: entity.trait_2, 
            heat_capacity: entity.heat_capacity,
            agility: entity.agility,
            loot_speed: entity.loot_speed,
            melee_damage: entity.melee_damage,
            prime_recovery: entity.prime_recovery,
            tactical_recovery: entity.tactical_recovery,
            self_repair_speed: entity.self_repair_speed,
            finisher_siphon: entity.finisher_siphon,
            revive_speed: entity.revive_speed,
            hardware: entity.hardware,
            firewall: entity.firewall,
            fall_resistance: entity.fall_resistance,
            ping_duration: entity.ping_duration
        }
    }
}

export const getWeaponByNameService = async (weaponName: string): Promise<Weapons | false> => {
    const entity: Weapons | false = await getWeaponById(weaponName);

    if(!entity){
        return false;
    } else {
        return {
            damage: entity.damage,
            precision_multiplier: entity.precision_multiplier,
            rate_of_fire: entity.rate_of_fire,
            ads_speed: entity.ads_speed,
            equip_speed: entity.equip_speed,
            reload_speed: entity.reload_speed,
            recoil: entity.recoil, 
            aim_assist: entity.aim_assist,
        }
    }
}

export const getFactionByNameService = async (factionName: string): Promise<Factions | false> => {
    const entity: Factions | false = await getFactionById(factionName);

    if(!entity){
        return false;
    } else {
        return {
            name: entity.name,
            lore: entity.lore,
        }
    }
}

export const createShellService = async (shellCreateRequest: ShellRequest): Promise<Shell> => {
    return await addShellDocument(shellCreateRequest);
}

export const createWeaponService = async (weaponCreateRequest: WeaponsRequest): Promise<Weapons> => {
    return await addWeaponDocument(weaponCreateRequest);
}

export const createFactionService = async (factionCreateRequest: Factions): Promise<Factions> => {
    return await addFactionDocument(factionCreateRequest);
}

//! update what promise is returned!
export const updateShellByNameService = async(name:string, shellObject: Shell): Promise<any> => {
    return await updateShellDocument(name, shellObject);
}

export const updateWeaponByNameService = async(name:string, weaponObject: Weapons): Promise<any> => {
    return await updateWeaponDocument(name, weaponObject);
}

export const updateFactionByNameService = async(name:string, factionObject: Factions): Promise<any> => {
    return await updateFactionDocument(name, factionObject);
}
