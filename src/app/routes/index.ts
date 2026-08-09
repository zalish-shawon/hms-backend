import { Router } from "express";
import { SpecialtyRoutes } from "../module/specialty/specialty.route";
import { AuthRoutes } from "../module/auth/auth.route";
import { UserRoute } from "../module/user/user.route";
import { DoctorRoute } from "../module/doctor/doctor.route";

const router = Router();


router.use("/specialties", SpecialtyRoutes)
router.use("/auth", AuthRoutes)
router.use("/users", UserRoute)
router.use("/doctors", DoctorRoute)

export const IndexRoutes = router