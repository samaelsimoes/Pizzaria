import prismaClient from '../../prisma';'../../prisma/index';
import { hash } from 'bcryptjs';

interface UserRequest {
    name: string,
    email: string,
    password: string
}

class CreateUserService {
    async execute({ name, email, password }: UserRequest) {
        if (!email) {
            throw new Error('Email incorrect')
        }

        //verificar se o email esta cadsatrado findfirs procura o primeiro ite,
        const userAlreadyExist = await prismaClient.user.findFirst({
            where: {
                email: email
            }
        });

        if (userAlreadyExist) {
            throw new Error("User already exist");
        }

        const passwordHash = await hash(password, 12);
        const user = await prismaClient.user.create({
            data: {
                name: name,
                email: email,
                password: passwordHash
            }, 
            select: {
                id: true,
                name: true,
                email: true,
            }
        });

        return user
    }
}

export { CreateUserService }
