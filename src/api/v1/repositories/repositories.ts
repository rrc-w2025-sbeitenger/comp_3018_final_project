import { db } from "../../../config/firebaseConfig";
import { QuerySnapshot, DocumentData, DocumentSnapshot, DocumentReference } from "firebase-admin/firestore";
import { ShellRequest } from "../models/shellRequest";
import { WeaponsRequest } from "../models/weaponsRequest";
import { Factions } from "../models/factionsModel";
import { Shell } from "../models/shellModel";
import { Weapons } from "../models/weaponsModel";

export const getShellCollection = async (): Promise<ShellRequest[]> => {
    try {
        //Retrieve all documents from the 'shells' collection.
        //get() returns a QuerySnapshot containing all documents in the collection.
        const shellSnapshot: QuerySnapshot = await db.collection("shells").get();

        //array of shells.
        const shellsArray: ShellRequest[] = [];

        //itreate through each document in the collection.
        shellSnapshot.forEach((shellDocument) => {
            //get document fields.
            const data: DocumentData = shellDocument.data();
            shellsArray.push({
                shell_name: shellDocument.id,
                prime: data.prime,
                tactical: data.tactical,
                trait_1: data.trait_1,
                trait_2: data.trait_2, 
                heat_capacity: data.heat_capacity,
                agility: data.agility,
                loot_speed: data.loot_speed,
                melee_damage: data.melee_damage,
                prime_recovery: data.prime_recovery,
                tactical_recovery: data.tactical_recovery,
                self_repair_speed: data.self_repair_speed,
                finisher_siphon: data.finisher_siphon,
                revive_speed: data.revive_speed,
                hardware: data.hardware,
                firewall: data.firewall,
                fall_resistance: data.fall_resistance,
                ping_duration: data.ping_duration
            });
        });

        return shellsArray;
    } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : "Unknown error";
        throw new Error(`Failed to get shells collection: ${errorMessage}`)
    }
}

export const getWeaponCollection = async (): Promise<WeaponsRequest[]> => {
    try{
        //Retrieve all documents from the 'weapons' collection.
        //get() returns a QuerySnapshot containing all documents in the collection.
        const weaponsSnapshot: QuerySnapshot = await db.collection("weapons").get();

        //array of weapons.
        const weaponsArray: WeaponsRequest[] = [];

        //itreate through each document in the collection.
        weaponsSnapshot.forEach((weaponDocument) => {
            //get document fields.
            const data: DocumentData = weaponDocument.data();
            weaponsArray.push({
                weapon_name: weaponDocument.id,
                damage: data.damage,
                precision_multiplier: data.precision_multiplier,
                rate_of_fire: data.rate_of_fire,
                ads_speed: data.ads_speed,
                equip_speed: data.equip_speed,
                reload_speed: data.reload_speed,
                recoil: data.recoil, 
                aim_assist: data.aim_assist,
            });
        });

        return weaponsArray;
    } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : "Unknown error";
        throw new Error(`Failed to get weapons collection: ${errorMessage}`)
    }
}

export const getFactionsCollection = async (): Promise<Factions[]> => {
    try{
        //Retrieve all documents from the 'factions' collection.
        //get() returns a QuerySnapshot containing all documents in the collection.
        const factionsSnapshot: QuerySnapshot = await db.collection("factions").get();

        //array of factions.
        const factionsArray: Factions[] = [];

        //itreate through each document in the collection.
        factionsSnapshot.forEach((factionDocument) => {
            //get document properties.
            const data: DocumentData = factionDocument.data();
            factionsArray.push({
                name: data.name,
                lore: data.lore,
            });
        });

        return factionsArray;
    } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : "Unknown error";
        throw new Error(`Failed to get factions collection: ${errorMessage}`)
    }
}

export const getShellDocument = async (shellName: string): Promise<Shell | null> => {
    try{
        //doc() gets the shell document reference form firestore.
        //get() uses that reference to fetch the document, returning DocumentSnapshot.
        const shellDocument: DocumentSnapshot = await (db.collection("shells").doc(shellName)).get();

        //Check if the document exists.
        if (!shellDocument.exists) {
            return null;
        }

            //get document fields.
            const data: DocumentData | undefined = shellDocument.data();

            //data is returned as undefined.
            if(!data){
                return null;
            }

            return {
                prime: data.prime,
                tactical: data.tactical,
                trait_1: data.trait_1,
                trait_2: data.trait_2, 
                heat_capacity: data.heat_capacity,
                agility: data.agility,
                loot_speed: data.loot_speed,
                melee_damage: data.melee_damage,
                prime_recovery: data.prime_recovery,
                tactical_recovery: data.tactical_recovery,
                self_repair_speed: data.self_repair_speed,
                finisher_siphon: data.finisher_siphon,
                revive_speed: data.revive_speed,
                hardware: data.hardware,
                firewall: data.firewall,
                fall_resistance: data.fall_resistance,
                ping_duration: data.ping_duration
            };   
    } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : "Unknown error";
        throw new Error(`Failed to get document from shells collection: ${errorMessage}`)
    }   
};

export const getWeaponDocument = async (weaponName: string): Promise<Weapons | null> => {
    try{
        //doc() gets the shell document reference form firestore.
        //get() uses that reference to fetch the document, returning DocumentSnapshot.
        const weaponDocument: DocumentSnapshot = await (db.collection("weapons").doc(weaponName)).get();

        //Check if the document exists.
        if (!weaponDocument.exists) {
            return null;
        }

        //get document fields.
        const data: DocumentData | undefined = weaponDocument.data();

        //data is returned as undefined.
        if(!data){
            return null;
        }

        return {
            damage: data.damage,
            precision_multiplier: data.precision_multiplier,
            rate_of_fire: data.rate_of_fire,
            ads_speed: data.ads_speed,
            equip_speed: data.equip_speed,
            reload_speed: data.reload_speed,
            recoil: data.recoil, 
            aim_assist: data.aim_assist,
        }; 
    } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : "Unknown error";
        throw new Error(`Failed to get document from weapons collection: ${errorMessage}`)
    }        
};

export const getFactionDocument = async (factionName: string): Promise<Factions | null> => {
    try{
        //doc() gets the shell document reference form firestore.
        //get() uses that reference to fetch the document, returning DocumentSnapshot.
        const weaponDocument: DocumentSnapshot = await (db.collection("factions").doc(factionName)).get();

        //Check if the document exists.
        if (!weaponDocument.exists) {
            return null;
        }

        //get document fields.
        const data: DocumentData | undefined = weaponDocument.data();

        //data is returned as undefined.
        if(!data){
            return null;
        }

        return {
            name: data.name,
            lore: data.lore,
        };     

    } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : "Unknown error";
        throw new Error(`Failed to get document from factions collection: ${errorMessage}`)
    }    
};

export const addShellDocument = async (createNewShell: ShellRequest): Promise<Shell> => {
    try{
        //create a reference to a document in the 'shells' collection.
        //if the document doesn't exist, it will be created.
        const shellDocumentRef: DocumentReference = db.collection("shells").doc(createNewShell.shell_name);

        //use the `set` method to add or overwrite data in the document.
        //the data is passed as an object with fields and their values.
        const shellEntity: Shell = {
            prime: createNewShell.prime,
            tactical: createNewShell.tactical,
            trait_1: createNewShell.trait_1,
            trait_2: createNewShell.trait_2, 
            heat_capacity: createNewShell.heat_capacity,
            agility: createNewShell.agility,
            loot_speed: createNewShell.loot_speed,
            melee_damage: createNewShell.melee_damage,
            prime_recovery: createNewShell.prime_recovery,
            tactical_recovery: createNewShell.tactical_recovery,
            self_repair_speed: createNewShell.self_repair_speed,
            finisher_siphon: createNewShell.finisher_siphon,
            revive_speed: createNewShell.revive_speed,
            hardware: createNewShell.hardware,
            firewall: createNewShell.firewall,
            fall_resistance: createNewShell.fall_resistance,
            ping_duration: createNewShell.ping_duration
        }

        await shellDocumentRef.set(shellEntity);

        return shellEntity;
    } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : "Unknown error";
        throw new Error(`Failed to create document in shells collection: ${errorMessage}`)
    }   
};

export const addWeaponDocument = async (createNewWeapon: WeaponsRequest): Promise<Weapons> => {
    try{
        //create a reference to a document in the 'weapons' collection.
        //if the document doesn't exist, it will be created.
        const weaponDocumentRef: DocumentReference = db.collection("weapons").doc(createNewWeapon.weapon_name);

        //use the `set` method to add or overwrite data in the document.
        //the data is passed as an object with fields and their values.
        const weaponEntity: Weapons = {
            damage: createNewWeapon.damage,
            precision_multiplier: createNewWeapon.precision_multiplier,
            rate_of_fire: createNewWeapon.rate_of_fire,
            ads_speed: createNewWeapon.ads_speed,
            equip_speed: createNewWeapon.equip_speed,
            reload_speed: createNewWeapon.reload_speed,
            recoil: createNewWeapon.recoil, 
            aim_assist: createNewWeapon.aim_assist,
        }

        await weaponDocumentRef.set(weaponEntity);

        return weaponEntity;
    } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : "Unknown error";
        throw new Error(`Failed to create document in weapons collection: ${errorMessage}`)
    }  
};

export const addFactionDocument = async (createNewFaction: Factions): Promise<Factions> => {
    try{
        //create a reference to a document in the 'weapons' collection.
        //if the document doesn't exist, it will be created.
        const factionDocumentRef: DocumentReference = db.collection("factions").doc(createNewFaction.name);

        await factionDocumentRef.set(createNewFaction);

        return createNewFaction;
    } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : "Unknown error";
        throw new Error(`Failed to create document in factions collection: ${errorMessage}`)
    }  
};


export const updateShellDocument = async <T>(shellName:string, shellObject: Partial<T>): Promise<DocumentData | null> => {
    try{
        //doc() gets the shell document reference form firestore.
        const shellDocumentRef: DocumentReference = db.collection("shells").doc(shellName);

        //get() uses that reference to fetch the document, returning DocumentSnapshot.
        if(!(await shellDocumentRef.get()).exists){
            return null;
        }
        
        //update() modifies specific fields in the document.
        //This will only change the specified fields leaving others untouched.
        await shellDocumentRef.update(shellObject);

        //get updated doc snapshot.
        const updatedDocument: DocumentSnapshot = await shellDocumentRef.get();
        //return the updated data.
        return updatedDocument.data()!;
    } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : "Unknown error";
        throw new Error(`Failed to update document in shells collection: ${errorMessage}`)
    }
};

export const updateWeaponDocument = async <T>(weaponName:string, weaponObject: Partial<T>): Promise<DocumentData | null> => {
    try{
        //doc() gets the shell document reference form firestore.
        const weaponsDocumentRef: DocumentReference = db.collection("weapons").doc(weaponName);
        
        if(!(await weaponsDocumentRef.get()).exists){
            return null;
        }
        
        //update() modifies specific fields in the document.
        //This will only change the specified fields leaving others untouched.
        await weaponsDocumentRef.update(weaponObject);

        //get updated doc snapshot.
        const updatedDocument: DocumentSnapshot = await weaponsDocumentRef.get();
        //data() to view the actual document.
        return updatedDocument.data()!;
    } catch (error: unknown){
        const errorMessage = error instanceof Error ? error.message : "Unknown error";
        throw new Error(`Failed to update document in weapons collection: ${errorMessage}`)
    }
};

export const updateFactionDocument = async <T>(factionName:string, factionObject: Partial<T>): Promise<DocumentData | null> => {
    try{
        //doc() gets the shell document reference form firestore.
        const factionDocumentRef: DocumentReference = db.collection("factions").doc(factionName);
        
        if(!(await factionDocumentRef.get()).exists){
            return null;
        }
        
        //update() modifies specific fields in the document.
        //This will only change the specified fields leaving others untouched.
        await factionDocumentRef.update(factionObject);

        //get updated doc snapshot.
        const updatedDocument: DocumentSnapshot = await factionDocumentRef.get();
        //data() to view the actual document.
        return updatedDocument.data()!;
    } catch (error: unknown){
        const errorMessage = error instanceof Error ? error.message : "Unknown error";
        throw new Error(`Failed to update document in factions collection: ${errorMessage}`)
    }
};

export const deleteShellDocument = async (shellName:string): Promise<DocumentData | null> => {
    try{
        //Create a reference to a specific document in the 'shells' collection.
        const shellDocumentRef: DocumentReference = db.collection("shells").doc(shellName);

        //get() to retrieve the document.
        const shellDocument: DocumentSnapshot = await shellDocumentRef.get();

        if(!shellDocument.exists){
            return null;
        }

        //delete() to remove the document from Firestore.
        await shellDocumentRef.delete();

        //return the delete data.
        return shellDocument.data()!;
    } catch (error: unknown){
        const errorMessage = error instanceof Error ? error.message : "Unknown error";
        throw new Error(`Failed to delete document in shells collection: ${errorMessage}`)
    }
};

export const deleteWeaponDocument = async (weaponName:string): Promise<DocumentData | null> => {
    try{
        //Create a reference to a specific document in the 'weapons' collection.
        const weaponDocumentRef: DocumentReference = db.collection("weapons").doc(weaponName);

        //get() to retrieve the document.
        const weaponDocument: DocumentSnapshot = await weaponDocumentRef.get();

        if(!weaponDocument.exists){
            return null;
        }

        //delete() to remove the document from Firestore.
        await weaponDocumentRef.delete();

        //return the delete data.
        return weaponDocument.data()!;
    } catch (error: unknown){
        const errorMessage = error instanceof Error ? error.message : "Unknown error";
        throw new Error(`Failed to delete document in weapons collection: ${errorMessage}`)
    }
};

export const deleteFactionDocument = async (factionName:string): Promise<DocumentData | null> => {
    try{
        //Create a reference to a specific document in the 'factions' collection.
        const factionDocumentRef: DocumentReference = db.collection("factions").doc(factionName);

        //get() to retrieve the document.
        const factionDocument: DocumentSnapshot = await factionDocumentRef.get();

        if(!factionDocument.exists){
            return null;
        }

        //delete() to remove the document from Firestore.
        await factionDocumentRef.delete();

        //return the delete data.
        return factionDocument.data()!;
    } catch (error: unknown){
        const errorMessage = error instanceof Error ? error.message : "Unknown error";
        throw new Error(`Failed to delete document in factions collection: ${errorMessage}`)
    }
};

export const addMapImageDocument = async (mapData:any): Promise<any> => {
    try{
        //Create a reference to a specific document in the 'maps' collection.
        const mapDocumentRef: DocumentReference = db.collection("maps").doc(mapData.map_name);

        await mapDocumentRef.set(mapData);

        return mapData;
    } catch (error: unknown){
        const errorMessage = error instanceof Error ? error.message : "Unknown error";
        throw new Error(`Failed to create document in maps collection: ${errorMessage}`)
    }
}

export const getMapDocument = async (mapName: string): Promise<DocumentData | null> => {
    try{
        //Create a reference to a specific document in the 'maps' collection.
        const mapDocumentRef: DocumentReference = db.collection("maps").doc(mapName);
        const mapDocument: DocumentData = await mapDocumentRef.get();

        if(!mapDocument.exists){
            return null;
        }

        return mapDocument.data();
    } catch (error: unknown){
        const errorMessage = error instanceof Error ? error.message : "Unknown error";
        throw new Error(`Failed to get document in maps collection: ${errorMessage}`)
    }
}
