import { Request, Response } from 'express'
import DelUsuarioService from '../../services/user/DelUsuarioService' 

class DelUsuarioController {
  async handle(req: Request, res: Response) {
   const {id} = req.params  

   const dellUsuarioControler = new DelUsuarioService()

   try {
    await dellUsuarioControler.execute(parseInt(id))

    return res.json({message: "Usuario excluido com sucesso"})

   } catch (error) {
    return res.status(500).json({error: 'Erro ao excluir usuario'})
   }
 }
}

export {DelUsuarioController}