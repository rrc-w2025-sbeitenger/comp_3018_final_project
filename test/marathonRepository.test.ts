jest.mock("../src/config/firebaseConfig", () => ({
    db: {
        collection: jest.fn(),
    },
}));

import { db } from "../src/config/firebaseConfig";
import {
    addFactionDocument,
    addShellDocument,
    deleteWeaponDocument,
    getFactionDocument,
    getShellCollection,
    getShellDocument,
    getWeaponCollection,
    getWeaponDocument,
    updateShellDocument,
} from "../src/api/v1/repositories/repositories";
import { ShellRequest } from "../src/api/v1/models/shellRequest";
import { WeaponsRequest } from "../src/api/v1/models/weaponsRequest";

const collectionMock = db.collection as jest.Mock;

const shellData = {
    prime: "Overshield",
    tactical: "Smoke Grenade",
    trait_1: "Resilience",
    trait_2: "Swift",
    heat_capacity: 100,
    agility: 85,
    loot_speed: 75,
    melee_damage: 50,
    prime_recovery: 30,
    tactical_recovery: 20,
    self_repair_speed: 40,
    finisher_siphon: 15,
    revive_speed: 60,
    hardware: 90,
    firewall: 80,
    fall_resistance: 70,
    ping_duration: 25,
};

const shellRequest: ShellRequest = {
    shell_name: "Assassin",
    ...shellData,
};

const weaponData = {
    damage: 45,
    precision_multiplier: 1.5,
    rate_of_fire: "100 RPM",
    ads_speed: "0.9s",
    equip_speed: "0.8s",
    reload_speed: "1.0s",
    recoil: "Low",
    aim_assist: 70,
};

const weaponRequest: WeaponsRequest = {
    weapon_name: "Bully SMG",
    ...weaponData,
};

describe("marathon repository", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("should return shells from the shells collection", async () => {
        const forEach = jest.fn((callback) => {
            callback({
                id: shellRequest.shell_name,
                data: () => shellData,
            });
        });

        const get = jest.fn().mockResolvedValue({ forEach });
        collectionMock.mockReturnValue({ get });

        const result = await getShellCollection();

        expect(collectionMock).toHaveBeenCalledWith("shells");
        expect(get).toHaveBeenCalledTimes(1);
        expect(result).toEqual([shellRequest]);
    });

    it("should return weapons from the weapons collection", async () => {
        const forEach = jest.fn((callback) => {
            callback({
                id: weaponRequest.weapon_name,
                data: () => weaponData,
            });
        });

        const get = jest.fn().mockResolvedValue({ forEach });
        collectionMock.mockReturnValue({ get });

        const result = await getWeaponCollection();

        expect(collectionMock).toHaveBeenCalledWith("weapons");
        expect(get).toHaveBeenCalledTimes(1);
        expect(result).toEqual([weaponRequest]);
    });

    it("should return a shell document when it exists", async () => {
        const get = jest.fn().mockResolvedValue({
            exists: true,
            data: () => shellData,
        });
        const doc = jest.fn().mockReturnValue({ get });
        collectionMock.mockReturnValue({ doc });

        const result = await getShellDocument("Assassin");

        expect(collectionMock).toHaveBeenCalledWith("shells");
        expect(doc).toHaveBeenCalledWith("Assassin");
        expect(result).toEqual(shellData);
    });

    it("should return null when a weapon document does not exist", async () => {
        const get = jest.fn().mockResolvedValue({
            exists: false,
        });
        const doc = jest.fn().mockReturnValue({ get });
        collectionMock.mockReturnValue({ doc });

        const result = await getWeaponDocument("Missing Weapon");

        expect(collectionMock).toHaveBeenCalledWith("weapons");
        expect(doc).toHaveBeenCalledWith("Missing Weapon");
        expect(result).toBeNull();
    });

    it("should return null when a faction document has no data", async () => {
        const get = jest.fn().mockResolvedValue({
            exists: true,
            data: () => undefined,
        });
        const doc = jest.fn().mockReturnValue({ get });
        collectionMock.mockReturnValue({ doc });

        const result = await getFactionDocument("UESC");

        expect(collectionMock).toHaveBeenCalledWith("factions");
        expect(doc).toHaveBeenCalledWith("UESC");
        expect(result).toBeNull();
    });

    it("should add a shell document using the shell name as the document id", async () => {
        const set = jest.fn().mockResolvedValue(undefined);
        const doc = jest.fn().mockReturnValue({ set });
        collectionMock.mockReturnValue({ doc });

        const result = await addShellDocument(shellRequest);

        expect(collectionMock).toHaveBeenCalledWith("shells");
        expect(doc).toHaveBeenCalledWith(shellRequest.shell_name);
        expect(set).toHaveBeenCalledWith(shellData);
        expect(result).toEqual(shellData);
    });

    it("should add a faction document using the faction name as the document id", async () => {
        const faction = {
            name: "UESC",
            lore: "Human military faction.",
        };
        const set = jest.fn().mockResolvedValue(undefined);
        const doc = jest.fn().mockReturnValue({ set });
        collectionMock.mockReturnValue({ doc });

        const result = await addFactionDocument(faction);

        expect(collectionMock).toHaveBeenCalledWith("factions");
        expect(doc).toHaveBeenCalledWith(faction.name);
        expect(set).toHaveBeenCalledWith(faction);
        expect(result).toEqual(faction);
    });

    it("should update a shell document and return the updated data", async () => {
        const update = jest.fn().mockResolvedValue(undefined);
        const get = jest
            .fn()
            .mockResolvedValueOnce({ exists: true })
            .mockResolvedValueOnce({
                data: () => ({
                    ...shellData,
                    agility: 95,
                }),
            });
        const doc = jest.fn().mockReturnValue({ get, update });
        collectionMock.mockReturnValue({ doc });

        const result = await updateShellDocument("Assassin", { agility: 95 });

        expect(collectionMock).toHaveBeenCalledWith("shells");
        expect(doc).toHaveBeenCalledWith("Assassin");
        expect(update).toHaveBeenCalledWith({ agility: 95 });
        expect(result).toEqual({
            ...shellData,
            agility: 95,
        });
    });

    it("should return null when updating a missing shell document", async () => {
        const update = jest.fn();
        const get = jest.fn().mockResolvedValue({ exists: false });
        const doc = jest.fn().mockReturnValue({ get, update });
        collectionMock.mockReturnValue({ doc });

        const result = await updateShellDocument("Missing Shell", { agility: 95 });

        expect(result).toBeNull();
        expect(update).not.toHaveBeenCalled();
    });

    it("should delete a weapon document and return the deleted data", async () => {
        const deleteMock = jest.fn().mockResolvedValue(undefined);
        const get = jest.fn().mockResolvedValue({
            exists: true,
            data: () => weaponData,
        });
        const doc = jest.fn().mockReturnValue({
            get,
            delete: deleteMock,
        });
        collectionMock.mockReturnValue({ doc });

        const result = await deleteWeaponDocument("Bully SMG");

        expect(collectionMock).toHaveBeenCalledWith("weapons");
        expect(doc).toHaveBeenCalledWith("Bully SMG");
        expect(deleteMock).toHaveBeenCalledTimes(1);
        expect(result).toEqual(weaponData);
    });

    it("should wrap Firestore errors with repository context", async () => {
        const get = jest.fn().mockRejectedValue(new Error("Firestore unavailable"));
        collectionMock.mockReturnValue({ get });

        await expect(getShellCollection()).rejects.toThrow(
            "Failed to get shells collection: Firestore unavailable",
        );
    });
});
