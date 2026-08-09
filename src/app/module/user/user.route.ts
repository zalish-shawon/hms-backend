import { NextFunction, Request, Response, Router } from "express";
import { userController } from "./user.controller";
import { validateRequest } from "../../middleware/validateRequest";
import { createDoctorZodSchema } from "./user.validator";


const router = Router()

router.post('/create-doctor', validateRequest(createDoctorZodSchema), userController.createDoctor);
// router.post('/create-admin', userController.createDoctor);
// router.post('/create-superadmin', userController.createDoctor);


export const UserRoute = router;