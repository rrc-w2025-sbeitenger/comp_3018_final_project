import { HTTP_STATUS } from "../../../constants/httpsConstants";
import { Factions } from "../models/factionsModel";
import { HealthCheckResponse } from "../models/healthCheckResponse";
import { Shell } from "../models/shellModel";
import { Weapons } from "../models/weaponsModel";

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
    
}

export const getWeaponByNameService = async (weaponName: string): Promise<Weapons | false> => {
    
}

export const getFactionByNameService = (factionName: string): any => {
    console.log("faction by name");
}

export const createShellService = (prime: string,
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
                                  ): any => {
    console.log("create shell");
}

export const createWeaponService = (ads_speed: string,
                                    aim_assist: number,
                                    damage: number,
                                    equip_speed: string,
                                    precision_multiplier: number,
                                    rate_of_fire: string,
                                    recoil: string,
                                    reload: string
                                   ): any => {
    console.log("create weapon");
}

export const createFactionService = (lore: string, name: string): any => {
    console.log("create faction");
}

