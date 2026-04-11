import { db } from "../../../config/firebaseConfig";
import { QuerySnapshot, DocumentData, DocumentSnapshot, DocumentReference } from "firebase-admin/firestore";
import { ShellRequest } from "../models/shellRequest";
import { WeaponsRequest } from "../models/weaponsRequest";
import { Factions } from "../models/factionsModel";
import { Shell } from "../models/shellModel";
import { Weapons } from "../models/weaponsModel";

export const getShellCollection = async (): Promise<ShellRequest[]> => {
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
}

export const getWeaponCollection = async (): Promise<WeaponsRequest[]> => {
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
}

export const getFactionsCollection = async (): Promise<Factions[]> => {
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
}

export const getShellDocument = async (shellName: string): Promise<Shell | null> => {
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
};

export const getWeaponDocument = async (weaponName: string): Promise<Weapons | null> => {
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
};

export const getFactionDocument = async (factionName: string): Promise<Factions | null> => {
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
};

export const addShellDocument = async (createNewShell: ShellRequest): Promise<Shell> => {
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
};

export const addWeaponDocument = async (createNewWeapon: WeaponsRequest): Promise<Weapons> => {
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
};

export const addFactionDocument = async (createNewFaction: Factions): Promise<Factions> => {
    //create a reference to a document in the 'weapons' collection.
    //if the document doesn't exist, it will be created.
    const factionDocumentRef: DocumentReference = db.collection("factions").doc(createNewFaction.name);

    await factionDocumentRef.set(createNewFaction);

    return createNewFaction;
};