import prismaClient from "../../prisma";

interface UsuarioUpdateData {
    nome?: string;
    fone?: number;
    cpf?: number;
    cep?: string;
    logradouro?: string
    numero?: string
    bairro?: string
    localidade?: string
    uf?: string

}

class EditarUsuarioService {
 async execute(id: number, newData: UsuarioUpdateData) {

    const updatedUsuario = await prismaClient.cadastroUser.update({
        where: {
          id: id
        },
        data: newData
    })

    return updatedUsuario
 }
}

export default EditarUsuarioService