import prismaClient from "../../prisma";

class ListUsuarioService {
  async execute() {

    const listUsuario = await prismaClient.cadastroUser.findMany({
      select: {
        id: true,
        nome: true,
        fone: true,
        cpf: true,
        cep: true,
        logradouro: true,
        numero: true,
        bairro: true,
        localidade: true,
        uf: true
      }  
    })

    return listUsuario
    
  }
}

export default ListUsuarioService