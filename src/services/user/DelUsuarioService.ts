import prismaClient from "../../prisma";

class DelUsuarioService {
    async execute(id: number) {

     const deleteUsuario = await prismaClient.cadastroUser.delete({
        where: {
            id: id
        }
     })

     return deleteUsuario
 }
}

export default DelUsuarioService