import { User, UserStatus } from "../../../generated/prisma/client";
import { auth } from "../../lib/auth";
import { prisma } from "../../lib/prisma";

interface RegisterPatientPayload {
    name: string;
    email: string;
    password: string;
}

const registerPatient = async (payload: RegisterPatientPayload) => {
    const  {name, email, password} = payload;

    const data = await auth.api.signUpEmail({
        body: {
            name,
            email,
            password,
            // others default values will be set automatically
        }
    })

    if(!data.user) {
        throw new Error("Patient registration failed");
    }

    // Todo : create a patient record in the database with the user id from auth
    // const patient = await prisma.$transaction(async(tx) => {
    //     await tx.
    // })
    return data;
}

interface ILoginUserPayload {
    email: string;
    password: string;
}

const loginUser = async (payload: ILoginUserPayload) => {
    const { email, password } = payload;

    const data = await auth.api.signInEmail({
        body: {
            email,
            password
        }
    });

    if (!data.user) {
        throw new Error("Invalid email or password");
    }

    if (data.user.status === UserStatus.BLOCKED) {
        throw new Error("User is blocked");
    }

    if (data.user.isDeleted || data.user.status === UserStatus.DELETED) {
        throw new Error("User is deleted");
    }

    return data;
};

export const AuthService = {
    registerPatient,
    loginUser
};