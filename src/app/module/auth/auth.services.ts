import status from "http-status";
import { User, UserStatus } from "../../../generated/prisma/client";
import AppError from "../../errorHelpers/AppError";
import { auth } from "../../lib/auth";
import { prisma } from "../../lib/prisma";

interface RegisterPatientPayload {
  name: string;
  email: string;
  password: string;
}

const registerPatient = async (payload: RegisterPatientPayload) => {
  const { name, email, password } = payload;

  const data = await auth.api.signUpEmail({
    body: {
      name,
      email,
      password,
      // others default values will be set automatically
    },
  });

  if (!data.user) {
     throw new AppError(status.BAD_REQUEST, "Failed to register patient");
  }


  try {
      const patient = await prisma.$transaction(async (tx) => {
    const patientTx = await tx.patient.create({
      data: {
        userID: data.user.id,
        name: payload.name,
        email: payload.email,

      },
    });

    return patientTx;
  });

  return {
    ...data,
    patient,
  };
  } catch (error) {
    console.log("Transaction Error : ", error);
    await prisma.user.delete({
      where: {
        id: data.user.id,
      },
    });
    throw new Error("Failed to create patient record, user deleted");
  }

};

interface ILoginUserPayload {
  email: string;
  password: string;
}

const loginUser = async (payload: ILoginUserPayload) => {
  const { email, password } = payload;

  const data = await auth.api.signInEmail({
    body: {
      email,
      password,
    },
  });

  if (!data.user) {
    
    throw new AppError(status.UNAUTHORIZED, "Invalid email or password");
  }

  if (data.user.status === UserStatus.BLOCKED) {
    throw new AppError(status.FORBIDDEN, "User is blocked");
  }

  if (data.user.isDeleted || data.user.status === UserStatus.DELETED) {
     throw new AppError(status.NOT_FOUND, "User is deleted");
  }

  return data;
};

export const AuthService = {
  registerPatient,
  loginUser,
};
