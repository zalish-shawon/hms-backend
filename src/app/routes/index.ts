import { Router } from "express";
import { SpecialtyRoutes } from "../modules/specialty/specialty.route";
import { AuthRoutes } from "../modules/auth/auth.route";
import { UserRoute } from "../modules/user/user.route";
import { DoctorRoute } from "../modules/doctor/doctor.route";

const router = Router();


router.use("/specialties", SpecialtyRoutes)
router.use("/auth", AuthRoutes)
router.use("/users", UserRoute)
router.use("/doctors", DoctorRoute)

export const IndexRoutes = router