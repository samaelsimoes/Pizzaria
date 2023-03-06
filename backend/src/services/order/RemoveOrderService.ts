import prismaClient from "../../prisma";

interface OrderRequest {
    order_id: string;
}

class RemoveOrderService {
    async execute( { order_id }: OrderRequest) {

        // APÓS VER PARA FAZER UM UPDATE PARA MUDAR STATUS E NAO MOSTRAR MAIS, NAO PODEMOS EXCLUIR REGISTROS
        const order = await prismaClient.order.delete({
            where: {
                id: order_id
            }
        });

        return order;
    }
}

export { RemoveOrderService }
