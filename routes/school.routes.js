import { Router } from "express";
import { postaddSchool, listSchools } from "../controller/school.controller.js";

const router = Router();

router.post("/addSchool", postaddSchool);
router.get("/listSchools", listSchools);

export default router;
