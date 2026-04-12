/**
 * @openapi
 * components:
 *   schemas:
 *     Factions:
 *       type: object
 *       required:
 *         - name
 *         - lore
 *       properties:
 *         name:
 *           type: string
 *           description: The name of the faction
 *           example: "CYBERACME"
 *         lore:
 *           type: string
 *           description: The lore and background of the faction
 *           example: "The industry leader in AI."
 *       example:
 *         name: "CYBERACME"
 *         lore: "The industry leader in AI."
 */
export interface Factions {
    name: string,
    lore: string
}