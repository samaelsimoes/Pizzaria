import prismaClient from "../../prisma";

class DetailUserService {
    async execute(user_id: string) {
        // retornando todas as info do uusuario, buscando por id
        const user = await prismaClient.user.findFirst({
            where: {
                id: user_id
            },
            select: {
                id: true,
                name: true,
                email: true
            }
        });        
        return user;
    }
}

export { DetailUserService }
