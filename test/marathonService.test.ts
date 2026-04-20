jest.mock("../src/api/v1/repositories/repositories", () => ({
    getShellCollection: jest.fn(),
    getWeaponCollection: jest.fn(),
    getFactionsCollection: jest.fn(),
    getShellDocument: jest.fn(),
    getWeaponDocument: jest.fn(),
    getFactionDocument: jest.fn(),
    addShellDocument: jest.fn(),
    addWeaponDocument: jest.fn(),
    addFactionDocument: jest.fn(),
    updateShellDocument: jest.fn(),
    updateWeaponDocument: jest.fn(),
    updateFactionDocument: jest.fn(),
    deleteShellDocument: jest.fn(),
    deleteWeaponDocument: jest.fn(),
    deleteFactionDocument: jest.fn(),
    addMapImageDocument: jest.fn(),
    getMapDocument: jest.fn(),
}));

import {
    createFactionService,
    createMapService,
    createShellService,
    createWeaponService,
    deleteFactionService,
    deleteShellService,
    deleteWeaponService,
    getAllFactionsService,
    getAllShellsService,
    getAllWeaponsService,
    getFactionByNameService,
    getHealthStatusService,
    getMapService,
    getShellByNameService,
    getWeaponByNameService,
    updateFactionByNameService,
    updateShellByNameService,
    updateWeaponByNameService,
} from "../src/api/v1/services/services";
import * as repositories from "../src/api/v1/repositories/repositories";
import { HTTP_STATUS } from "../src/constants/httpsConstants";
import { Shell } from "../src/api/v1/models/shellModel";
import { ShellRequest } from "../src/api/v1/models/shellRequest";
import { Weapons } from "../src/api/v1/models/weaponsModel";
import { WeaponsRequest } from "../src/api/v1/models/weaponsRequest";
import { Factions } from "../src/api/v1/models/factionsModel";

const mockedRepositories = repositories as jest.Mocked<typeof repositories>;

const shell: Shell = {
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
    ...shell,
};

const weapon: Weapons = {
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
    ...weapon,
};

const faction: Factions = {
    name: "UESC",
    lore: "Human military faction.",
};

describe("getHealthStatusService", () => {

    beforeEach(() => {
        jest.useFakeTimers();
    });

    afterEach(() => {
        jest.useRealTimers();
    });

    it("should return a valid health check response object", () => {
        const result = getHealthStatusService();

        expect(result).toHaveProperty("status");
        expect(result).toHaveProperty("uptime");
        expect(result).toHaveProperty("timestamp");
        expect(result).toHaveProperty("version");
    });

    it("should return status 200", () => {
        const result = getHealthStatusService();

        expect(result.status).toBe(HTTP_STATUS.OK);
    });

    it("should return a valid ISO timestamp", () => {
        const fixedDate = new Date("2024-01-01T00:00:00.000Z");
        jest.setSystemTime(fixedDate.getTime());

        const result = getHealthStatusService();

        expect(result.timestamp).toBe("2024-01-01T00:00:00.000Z");
    });

    it("should return the correct version", () => {
        const result = getHealthStatusService();

        expect(result.version).toBe("1.0.0");
    });

    it("should return a valid uptime as a number", () => {
        const result = getHealthStatusService();

        expect(typeof result.uptime).toBe("number");
        expect(result.uptime).toBeGreaterThanOrEqual(0);
    });
});

describe("marathon services", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("should return all shells from the repository", async () => {
        mockedRepositories.getShellCollection.mockResolvedValue([shellRequest]);

        const result = await getAllShellsService();

        expect(mockedRepositories.getShellCollection).toHaveBeenCalledTimes(1);
        expect(result).toEqual([shellRequest]);
    });

    it("should return all weapons from the repository", async () => {
        mockedRepositories.getWeaponCollection.mockResolvedValue([weaponRequest]);

        const result = await getAllWeaponsService();

        expect(mockedRepositories.getWeaponCollection).toHaveBeenCalledTimes(1);
        expect(result).toEqual([weaponRequest]);
    });

    it("should return all factions from the repository", async () => {
        mockedRepositories.getFactionsCollection.mockResolvedValue([faction]);

        const result = await getAllFactionsService();

        expect(mockedRepositories.getFactionsCollection).toHaveBeenCalledTimes(1);
        expect(result).toEqual([faction]);
    });

    it("should return a shell by name", async () => {
        mockedRepositories.getShellDocument.mockResolvedValue(shell);

        const result = await getShellByNameService("Assassin");

        expect(mockedRepositories.getShellDocument).toHaveBeenCalledWith("Assassin");
        expect(result).toEqual(shell);
    });

    it("should return null when a weapon is not found", async () => {
        mockedRepositories.getWeaponDocument.mockResolvedValue(null);

        const result = await getWeaponByNameService("Missing Weapon");

        expect(mockedRepositories.getWeaponDocument).toHaveBeenCalledWith("Missing Weapon");
        expect(result).toBeNull();
    });

    it("should return a faction by name", async () => {
        mockedRepositories.getFactionDocument.mockResolvedValue(faction);

        const result = await getFactionByNameService("UESC");

        expect(mockedRepositories.getFactionDocument).toHaveBeenCalledWith("UESC");
        expect(result).toEqual(faction);
    });

    it("should create a shell through the repository", async () => {
        mockedRepositories.addShellDocument.mockResolvedValue(shell);

        const result = await createShellService(shellRequest);

        expect(mockedRepositories.addShellDocument).toHaveBeenCalledWith(shellRequest);
        expect(result).toEqual(shell);
    });

    it("should create a weapon through the repository", async () => {
        mockedRepositories.addWeaponDocument.mockResolvedValue(weapon);

        const result = await createWeaponService(weaponRequest);

        expect(mockedRepositories.addWeaponDocument).toHaveBeenCalledWith(weaponRequest);
        expect(result).toEqual(weapon);
    });

    it("should create a faction through the repository", async () => {
        mockedRepositories.addFactionDocument.mockResolvedValue(faction);

        const result = await createFactionService(faction);

        expect(mockedRepositories.addFactionDocument).toHaveBeenCalledWith(faction);
        expect(result).toEqual(faction);
    });

    it("should update a shell by name", async () => {
        const updatedShell = {
            ...shell,
            agility: 95,
        };
        mockedRepositories.updateShellDocument.mockResolvedValue(updatedShell);

        const result = await updateShellByNameService("Assassin", updatedShell);

        expect(mockedRepositories.updateShellDocument).toHaveBeenCalledWith("Assassin", updatedShell);
        expect(result).toEqual(updatedShell);
    });

    it("should wrap shell update repository errors", async () => {
        mockedRepositories.updateShellDocument.mockRejectedValue(new Error("Firestore failed"));

        await expect(updateShellByNameService("Assassin", shell)).rejects.toThrow(
            "Failed to update post Assassin: Firestore failed",
        );
    });

    it("should update a weapon by name", async () => {
        const updatedWeapon = {
            ...weapon,
            damage: 50,
        };
        mockedRepositories.updateWeaponDocument.mockResolvedValue(updatedWeapon);

        const result = await updateWeaponByNameService("Bully SMG", updatedWeapon);

        expect(mockedRepositories.updateWeaponDocument).toHaveBeenCalledWith("Bully SMG", updatedWeapon);
        expect(result).toEqual(updatedWeapon);
    });

    it("should update a faction by name", async () => {
        const updatedFaction = {
            ...faction,
            lore: "Updated faction lore.",
        };
        mockedRepositories.updateFactionDocument.mockResolvedValue(updatedFaction);

        const result = await updateFactionByNameService("UESC", updatedFaction);

        expect(mockedRepositories.updateFactionDocument).toHaveBeenCalledWith("UESC", updatedFaction);
        expect(result).toEqual(updatedFaction);
    });

    it("should delete a shell by name", async () => {
        mockedRepositories.deleteShellDocument.mockResolvedValue(shell);

        const result = await deleteShellService("Assassin");

        expect(mockedRepositories.deleteShellDocument).toHaveBeenCalledWith("Assassin");
        expect(result).toEqual(shell);
    });

    it("should delete a weapon by name", async () => {
        mockedRepositories.deleteWeaponDocument.mockResolvedValue(weapon);

        const result = await deleteWeaponService("Bully SMG");

        expect(mockedRepositories.deleteWeaponDocument).toHaveBeenCalledWith("Bully SMG");
        expect(result).toEqual(weapon);
    });

    it("should delete a faction by name", async () => {
        mockedRepositories.deleteFactionDocument.mockResolvedValue(faction);

        const result = await deleteFactionService("UESC");

        expect(mockedRepositories.deleteFactionDocument).toHaveBeenCalledWith("UESC");
        expect(result).toEqual(faction);
    });

    it("should convert a map image buffer to base64 before creating the map", async () => {
        const file = {
            buffer: Buffer.from("map image"),
        } as Express.Multer.File;
        const expectedMap = {
            map_name: "Perimeter",
            map_image: "bWFwIGltYWdl",
        };
        mockedRepositories.addMapImageDocument.mockResolvedValue(expectedMap);

        const result = await createMapService(file, "Perimeter");

        expect(mockedRepositories.addMapImageDocument).toHaveBeenCalledWith(expectedMap);
        expect(result).toEqual(expectedMap);
    });

    it("should return a map by name", async () => {
        const map = {
            map_name: "Perimeter",
            map_image: "bWFwIGltYWdl",
        };
        mockedRepositories.getMapDocument.mockResolvedValue(map);

        const result = await getMapService("Perimeter");

        expect(mockedRepositories.getMapDocument).toHaveBeenCalledWith("Perimeter");
        expect(result).toEqual(map);
    });
});
