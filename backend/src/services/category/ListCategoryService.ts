import prismaClient from "../../prisma";

class ListCategoryService {
    async execute() {
        //Trazer tudo da minha lista e definindo os campos que quero
        const category = await prismaClient.category.findMany({
            select: {
                id: true,
                name: true
            }
        });

        return category;
    }
}

export { ListCategoryService }
