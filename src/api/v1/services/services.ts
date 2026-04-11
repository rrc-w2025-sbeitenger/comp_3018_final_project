import { HTTP_STATUS } from "../../../constants/httpsConstants";
//import { updateWeapon } from "../controllers/controllers";
import { Factions } from "../models/factionsModel";
import { HealthCheckResponse } from "../models/healthCheckResponse";
import { Shell } from "../models/shellModel";
import { ShellRequest } from "../models/shellRequest";
import { Weapons } from "../models/weaponsModel";
import { WeaponsRequest } from "../models/weaponsRequest";
import { getShellCollection, getWeaponCollection, getFactionsCollection, getShellDocument } from "../repositories/repositories";

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

export const getAllShellsService = async (): Promise<ShellRequest[]> => {
    return await getShellCollection();
}

export const getAllWeaponsService = async (): Promise<WeaponsRequest[]> => {
    return await getWeaponCollection();
}

export const getAllFactionsService = async (): Promise<Factions[]> => {
    return await getFactionsCollection();
}

export const getShellByNameService = async (shellName: string): Promise<Shell | null> => {
    const shellEntity: Shell | null = await getShellDocument(shellName);

    if(!shellEntity){
        return null;
    } else {
        return {
            prime: shellEntity.prime,
            tactical: shellEntity.tactical,
            trait_1: shellEntity.trait_1,
            trait_2: shellEntity.trait_2, 
            heat_capacity: shellEntity.heat_capacity,
            agility: shellEntity.agility,
            loot_speed: shellEntity.loot_speed,
            melee_damage: shellEntity.melee_damage,
            prime_recovery: shellEntity.prime_recovery,
            tactical_recovery: shellEntity.tactical_recovery,
            self_repair_speed: shellEntity.self_repair_speed,
            finisher_siphon: shellEntity.finisher_siphon,
            revive_speed: shellEntity.revive_speed,
            hardware: shellEntity.hardware,
            firewall: shellEntity.firewall,
            fall_resistance: shellEntity.fall_resistance,
            ping_duration: shellEntity.ping_duration
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
