import { DocumentData } from "node_modules/firebase-admin/lib/firestore";
import { HTTP_STATUS } from "../../../constants/httpsConstants";
import { Factions } from "../models/factionsModel";
import { HealthCheckResponse } from "../models/healthCheckResponse";
import { Shell } from "../models/shellModel";
import { ShellRequest } from "../models/shellRequest";
import { Weapons } from "../models/weaponsModel";
import { WeaponsRequest } from "../models/weaponsRequest";
import { getShellCollection,
          getWeaponCollection,
           getFactionsCollection,
            getShellDocument,
             getWeaponDocument,
              getFactionDocument,
               addShellDocument,
                addWeaponDocument,
                 addFactionDocument,
                 updateShellDocument,
                 updateWeaponDocument,
                  updateFactionDocument,
                  deleteShellDocument,
                   deleteWeaponDocument,
                    deleteFactionDocument,
                     addMapImageDocument,
                      getMapDocument
                } from "../repositories/repositories";
import { Maps } from "../models/mapsModel";

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
    return getShellDocument(shellName);
}

export const getWeaponByNameService = async (weaponName: string): Promise<Weapons | null> => {
    return getWeaponDocument(weaponName);
}

export const getFactionByNameService = async (factionName: string): Promise<Factions | null> => {
    return getFactionDocument(factionName);
}

//! will refactor code later to combine similar methods.

export const createShellService = async (shellCreateRequest: ShellRequest): Promise<Shell> => {
    return await addShellDocument(shellCreateRequest);
}

export const createWeaponService = async (weaponCreateRequest: WeaponsRequest): Promise<Weapons> => {
    return await addWeaponDocument(weaponCreateRequest);
}

export const createFactionService = async (factionCreateRequest: Factions): Promise<Factions> => {
    return await addFactionDocument(factionCreateRequest);
}

export const updateShellByNameService = async (shellName: string, shellObject: Shell): Promise<DocumentData | null> => {
    try{
        return await updateShellDocument(shellName, shellObject);
    } catch (error: unknown){
        const errorMessage = error instanceof Error ? error.message : "Unknown error";
        throw new Error(`Failed to update post ${shellName}: ${errorMessage}`);
    }
}

export const updateWeaponByNameService = async(weaponName: string, weaponObject: Weapons): Promise<DocumentData | null> => {
    try{
        return await updateWeaponDocument(weaponName, weaponObject);
    } catch (error: unknown){
        const errorMessage = error instanceof Error ? error.message : "Unknown error";
        throw new Error(`Failed to update post ${weaponName}: ${errorMessage}`);
    }
}

export const updateFactionByNameService = async(factionName: string, factionObject: Factions): Promise<DocumentData | null> => {
    try{
        return await updateFactionDocument(factionName, factionObject);
    } catch (error: unknown){
        const errorMessage = error instanceof Error ? error.message : "Unknown error";
        throw new Error(`Failed to update post ${factionName}: ${errorMessage}`);
    }
}

export const deleteShellService = async(shellName: string): Promise<DocumentData | null> => {
    return await deleteShellDocument(shellName);
}

export const deleteWeaponService = async(weaponName: string): Promise<DocumentData | null> => {
    return await deleteWeaponDocument(weaponName);
}

export const deleteFactionService = async(factionName: string): Promise<DocumentData | null> => {
    return await deleteFactionDocument(factionName);
}

export const createMapService = async(mapImage: Express.Multer.File | undefined, mapName: string): Promise<any> => {
    //! currently storing in Firestore as base64 since I am unable to create a Firestore Storage because of region.
    //! this will be fixed once the issue has been resolved.
    //convert binary to text, since we can't store the raw image in firestore.
    const base64MapImage: string = mapImage!.buffer.toString("base64");
    
    const mapData: Maps = {
        map_name: mapName,
        map_image: base64MapImage
    }

    return await addMapImageDocument(mapData);
    
}

export const getMapService = async(mapName: string): Promise<DocumentData | null> => {
    return await getMapDocument(mapName);
}