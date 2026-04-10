import { db } from "../../../config/firebaseConfig";
import { QuerySnapshot, DocumentData } from "firebase-admin/firestore";
import { ShellRequest } from "../models/shellRequest";
import { WeaponsRequest } from "../models/weaponsRequest";

export const getShellCollection = async (): Promise<ShellRequest[]> => {
    //Retrieve all documents from the 'shells' collection.
    //get() returns a QuerySnapshot containing all documents in the collection.
    const shellSnapshot: QuerySnapshot = await db.collection("shells").get();

    //array of shells.
    const shellsArray: ShellRequest[] = [];

    //itreate through each document in the collection.
    shellSnapshot.forEach((document) => {
        //get document properties.
        const data: DocumentData = document.data();
        shellsArray.push({
            shell_name: document.id,
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
    weaponsSnapshot.forEach((document) => {
        //get document properties.
        const data: DocumentData = document.data();
        weaponsArray.push({
            weapon_name: document.id,
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