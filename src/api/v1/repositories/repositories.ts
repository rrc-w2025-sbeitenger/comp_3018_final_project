import { db } from "../../../config/firebaseConfig";
import { QuerySnapshot, DocumentData } from "firebase-admin/firestore";
import { Shell } from "../models/shellModel";

export const getShellCollection = async (): Promise<Shell[]> => {
    //Retrieve all documents from the 'shells' collection.
    //get() returns a QuerySnapshot containing all documents in the collection.
    const shellSnapshot: QuerySnapshot = await db.collection("shells").get();

    //array of shells
    const shellsArray: Shell[] = [];

    //itreate through each document in the collection
    shellSnapshot.forEach((document) => {
        //get document properties.
        const data: DocumentData = document.data();
        shellsArray.push({
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