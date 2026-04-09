import { HTTP_STATUS } from "../../../constants/httpsConstants";
import { HealthCheckResponse } from "../models/healthCheckResponse";

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

export const getAllShellsService = (): any => {
    console.log("shells");
    //I have the Database created, but inorder for me to do the service logic I stil need to connect it.  
}

export const getAllWeaponsService = (): any => {
    console.log("weapons");
}

export const getAllFactionsService = (): any => {
    console.log("Factions");
}

export const getShellByNameService = (shellName: string): any => {
    console.log("shell by name");
}

export const getWeaponByNameService = (weaponName: string): any => {
    console.log("weapon by name");
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

