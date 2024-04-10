import prismaClient from "../../prisma";

class GetUsuarioByIdService{
  async execute(id:number){
    const usuario = await prismaClient.cadastroUser.findUnique({
      where:{id: id}  
    })

    if(!usuario) {
      throw new Error("Usuário não encontrado")
    }

    return usuario
  }
}

export default GetUsuarioByIdService