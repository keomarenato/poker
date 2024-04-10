
import prismaClient from '../../prisma';
import CampeonatoService from '../../services/campeonato/CampeonatoService'

import { Request, Response } from 'express';

class CampeonatoController {
  async criarCampeonato(req: Request, res: Response) {
    try {
      const { nome, data } = req.body;
      const novoCampeonato = CampeonatoService.criarCampeonato(nome, new Date(data));
      return res.status(201).json(novoCampeonato);
    } catch (error) {
      console.error('Erro ao criar campeonato:', error);
      return res.status(400).json({ mensagem: 'Erro ao criar campeonato' });
    }
  }


  async listarCampeonatosEParticipantes(req: Request, res: Response) {
    try {
      // Chamar o serviço que busca os campeonatos e suas partidas com participantes
      const campeonatos = await CampeonatoService.listarCampeonatosEParticipantes();
      res.json(campeonatos);
    } catch (error) {
      console.error('Erro ao listar campeonatos:', error);
      res.status(500).json({ mensagem: error.message });
    }
  }

  async atualizarStatusCampeonato(req: Request, res: Response) {
    try {

      const campeonatoId = parseInt(req.params.id);
      if(isNaN(campeonatoId)) {
        return res.status(400).json({message: 'ID inválido'})
      }

      const campeonatoAtualizado = await CampeonatoService.atualizarStatusCampeonato(campeonatoId)
      res.json(campeonatoAtualizado)


    } catch (error) {
      console.error('Erro ao atualizar o status do campeonato:', error);
    res.status(500).json({ message: 'Erro ao atualizar o status do campeonato' })
    }
  }

  async atualizarStatusCampeonatoPorFalse(req: Request, res: Response) {
    try {

      const campeonatoId = parseInt(req.params.id);
      if(isNaN(campeonatoId)) {
        return res.status(400).json({message: 'ID inválido'})
      }

      const campeonatoAtualizado = await CampeonatoService.atualizarStatusCampeonatoPorFalse(campeonatoId)
      res.json(campeonatoAtualizado)


    } catch (error) {
      console.error('Erro ao atualizar o status do campeonato:', error);
    res.status(500).json({ message: 'Erro ao atualizar o status do campeonato' })
    }
  }

  async listarAtivos(req, res) {
    try {
      const campeonatosAtivos = await CampeonatoService.listarCampeonatosAtivos();
      res.json(campeonatosAtivos);
    } catch (error) {
      console.error('Erro ao listar campeonatos ativos:', error);
      res.status(500).json({ error: 'Erro ao listar campeonatos ativos' });
    }
  }

  async listarInativos(req, res) {
    try {
      const campeonatosInativos = await CampeonatoService.listarCampeonatosInativos();
      res.json(campeonatosInativos);
    } catch (error) {
      console.error('Erro ao listar campeonatos ativos:', error);
      res.status(500).json({ error: 'Erro ao listar campeonatos ativos' });
    }
  }


  async listarCampeonatosFinalizados(req, res) {
    try {
      const campeonatosFinalizados = await CampeonatoService.listarCampeonatosFinalizados()
      res.status(200).json(campeonatosFinalizados)
    } catch (error) {
      console.error('Erro ao listar campeonatos finalizados:', error);
      res.status(500).json({ error: 'Erro ao listar campeonatos finalizados' });
    }
  }


  async buscarCampeonato(req: Request, res: Response) {
    // O ID é obtido dos parâmetros da rota
    const campeonatoId = parseInt(req.params.campeonatoId);

    // Verifica se o ID é um número válido
    if (isNaN(campeonatoId)) {
      return res.status(400).json({ mensagem: 'O ID do campeonato deve ser um número válido.' });
    }

    try {
      const campeonato = await CampeonatoService.buscarCampeonatoPorId(campeonatoId);
      res.json(campeonato);
    } catch (error) {
      console.error('Erro ao buscar campeonato:', error);
      // Altera a resposta de acordo com o erro
      if (error.message.includes('não encontrado')) {
        res.status(404).json({ mensagem: error.message });
      } else {
        res.status(500).json({ mensagem: error.message });
      }
    }
  }

  async editarCampeonato(req: Request, res: Response) {
    try {
      const { campeonatoId } = req.params;
      const dadosAtualizados = req.body;
      const campeonato = await CampeonatoService.editarCampeonato(parseInt(campeonatoId), dadosAtualizados);
      return res.json(campeonato);
    } catch (error) {
      return res.status(400).json({ mensagem: error.message });
    }
  }

  async deletarCampeonato(req: Request, res: Response) {
    try {
      const { campeonatoId } = req.params;
      await CampeonatoService.deletarCampeonato(parseInt(campeonatoId));
      return res.status(204).send();
    } catch (error) {
      console.error('Erro ao deletar campeonato:', error);
      res.status(500).json({ message: 'Erro ao tentar deletar o campeonato', error: error.message });
      return res.status(500).json({ mensagem: 'Erro ao deletar campeonato' });

    }
  }


  async adicionarPartida(req: Request, res: Response) {
    const campeonatoId = parseInt(req.params.campeonatoId);
    const { participanteId, dataPartida, valorPartida } = req.body
    const { participantesIds } = req.body;

    if (isNaN(campeonatoId) || !participantesIds) {
      return res.status(400).json({ mensagem: 'Dados de campeonatoId e participantesIds são necessários.' });
    }

    try {
      const partida = await CampeonatoService.adicionarPartidaAoCampeonato(campeonatoId, participantesIds, dataPartida, valorPartida);
      return res.status(201).json(partida);
    } catch (error) {
      console.error('Erro ao adicionar partida:', error);
      return res.status(500).json({ mensagem: error.message });
    }
  }

  async editarValorTotalPartida(partidaId: number, valorTotal: number): Promise<any> {
    try {
      // Aqui você deve implementar a lógica para atualizar o valor total da partida com o ID fornecido
      const partidaAtualizada = await CampeonatoService.editarValorTotalPartida(partidaId, valorTotal);
      console.log('ValorTotal recebido:', valorTotal);
      return partidaAtualizada
    } catch (error) {
      console.log(error)
    }
  }

  async removerParticipanteDaPartidaController(req: Request, res: Response) {
    const partidaId = parseInt(req.params.partidaId);
    const participanteId = parseInt(req.params.participanteId);

    if (isNaN(partidaId) || isNaN(participanteId)) {
      return res.status(400).json({ error: 'ID da partida ou do participante inválido' });
    }

    try {
      await CampeonatoService.removerParticipanteDaPartida(partidaId, participanteId);
      res.status(200).json({ message: 'Participante removido com sucesso da partida' });
    } catch (error) {
      console.error('Erro no controller ao remover participante da partida:', error);
      res.status(500).json({ error: `Erro ao remover participante da partida: ${error.message}` });
    }
  }


  async calcularEAtualizarValorTotal(req, res) {
    try {
      const campeonatoId = parseInt(req.params.id)

      await CampeonatoService.calcularEAtualizarValorTotalCampeonato(campeonatoId)

      res.status(200).send({ message: "Valor total atualizado com sucesso" })
    } catch (error) {
      res.status(500).send({ message: error.message })
    }
  }



  // model RegistroCampeonato
  async criarRegistroCampeonato(req, res) {
    const { campeonatoId } = req.body;

    try {
      const novoRegistro = await CampeonatoService.criarRegistroCampeonato(campeonatoId);
      res.json(novoRegistro);
    } catch (error) {
      console.error('Erro ao criar registro de campeonato:', error);
      res.status(500).send('Erro ao criar registro de campeonato');
    }
  }


  async listarRegistrosCampeonatosComParticipantes(req: Request, res: Response) {
    try {
      // Chama o método do serviço que faz a consulta ao banco de dados
      const registrosComParticipantes = await CampeonatoService.listarRegistrosCampeonatosComParticipantes();

      // Envia a resposta com os dados em formato JSON
      res.json(registrosComParticipantes);
    } catch (error) {
      // Em caso de erro, envia uma resposta de erro com status HTTP 500
      res.status(500).send(`Erro ao listar registros de campeonatos com participantes: ${error.message}`);
    }
  }

  async deletarRegistroCampeonato(req, res) {
    const { id } = req.params; // Verifique se está usando req.params para extrair o ID

    try {
      await CampeonatoService.deletarRegistroCampeonato(Number(id));
      res.status(200).send({ message: 'Registro de campeonato deletado com sucesso.' });
    } catch (error) {
      console.error('Erro ao deletar registro de campeonato:', error);
      res.status(500).send({ error: 'Erro ao deletar registro de campeonato' });
    }
  }
}



export default CampeonatoController;
