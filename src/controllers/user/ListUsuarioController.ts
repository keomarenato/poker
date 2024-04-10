import {Request, Response} from 'express'
import ListUsuarioService from '../../services/user/ListUsuarioService' 

class ListUsuarioController {
  async handle(req: Request, res:Response) {
    
    const listUsuarioService = new ListUsuarioService()

    const listarUsuarios = await listUsuarioService.execute() 

    return res.json(listarUsuarios)
  }
}

export {ListUsuarioController}