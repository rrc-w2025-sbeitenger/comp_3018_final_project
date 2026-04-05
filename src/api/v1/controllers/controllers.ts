import { HTTP_STATUS } from "../../../constants/httpsConstants";
import { Request, Response }from "express";
import { successResponse } from "../models/responseModel"; 
import { HealthCheckResponse } from "../models/healthCheckResponse";
import { Shell } from "../models/shellModel";
import { Weapons } from "../models/weaponsModel";
import { Factions } from "../models/factionsModel";
import { getHealthStatusService,
          getAllShellsService,
           getAllWeaponsService,
            getAllFactionsService,
             getShellByNameService} from "../services/services";
import { string } from "node_modules/@types/yargs";

export const getHealthCheck = (req: Request, res: Response): void => {
    try{
        const healthStatus: HealthCheckResponse = getHealthStatusService();
        res.status(HTTP_STATUS.OK).json(successResponse(healthStatus));
    } catch (error){
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({message: "Internal Server Error"});
    }
}

export const getAllShells = async (req: Request, res:Response): Promise<void> => {
    try {
        const getAllShellsResult: Shell[] = await getAllShellsService();
        res.status(HTTP_STATUS.OK).json(successResponse(getAllShellsResult));
    } catch (error){
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({message: "Internal Server Error"});
    }
}

export const getAllWeapons = async (req: Request, res:Response): Promise<void> => {
    try {
        const getAllWeaponsResult: Weapons[] = await getAllWeaponsService();
        res.status(HTTP_STATUS.OK).json(successResponse(getAllWeaponsResult));
    } catch (error){
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({message: "Internal Server Error"});
    }
}

export const getAllFactions = async (req: Request, res:Response): Promise<void> => {
    try {
        const getAllFactionsResult: Factions[] = await getAllFactionsService();
        res.status(HTTP_STATUS.OK).json(successResponse(getAllFactionsResult));
    } catch (error){
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({message: "Internal Server Error"});
    }
}

export const getShellByName = (req:Request, res:Response): void => {
    const shellName: string = String(req.params.name);
    
    //! add validation

    const selectedShell: Shell = getShellByNameService(shellName);

    if(!selectedShell){
        res.status(HTTP_STATUS.NOT_FOUND).json({message: "Not Found."});
        return;
    } else {
        res.status(HTTP_STATUS.OK).json(selectedShell);
    }
}