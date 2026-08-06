import { Doctor } from "../../../generated/prisma/client";
import { prisma } from "../../lib/prisma";

const getAllDoctors = async () : Promise<Doctor[]> => {
  const doctors = await prisma.doctor.findMany({
    include: {
      user: true,
      specialties: {
        include: {
          specialty: true,
        },
      },
    },
  });
  return doctors;
};

export const DoctorService = {
    getAllDoctors,
}
