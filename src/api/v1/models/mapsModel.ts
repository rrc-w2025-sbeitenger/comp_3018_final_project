/**
 * @openapi
 * components:
 *   schemas:
 *     Maps:
 *       type: object
 *       required:
 *         - map_image
 *         - map_name
 *       properties:
 *         map_image:
 *           type: string
 *           description: The stored map image data
 *           example: "<base64 image data>"
 *         map_name:
 *           type: string
 *           description: The name of the map
 *           example: "Perimeter"
 *       example:
 *         map_image: "<base64 image data>"
 *         map_name: "Perimeter"
 */
export interface Maps {
    map_image: string,
    map_name: string
}
