import { Partida, PrismaClient } from '@prisma/client';
const prismaClient = new PrismaClient();
import { Request, Response } from 'express';



class CampeonatoService {
    async criarCampeonato(nome: string, data: Date) {
        try {
            const novoCampeonato = await prismaClient.campeonato.create({
                data: {
                    nome: nome,
                    data: data.toISOString(), // Converter para o formato ISO-8601
                }
            });
            return novoCampeonato;
        } catch (error) {
            console.error('Erro ao criar campeonato:', error);
            throw new Error('Erro ao criar campeonato');
        }
    }

    async listarCampeonatosEParticipantes(): Promise<any> {
        try {
            // Buscar todos os campeonatos
            const campeonatos = await prismaClient.campeonato.findMany({
                include: {
                    partidas: {
                        include: {
                            participantes: true, // Incluir participantes para cada partida
                        },
                    },
                },
            });

            return campeonatos;
        } catch (error) {
            console.error('Erro ao listar campeonatos e participantes:', error);
            throw new Error('Erro ao listar campeonatos e participantes');
        }
    }


    async atualizarStatusCampeonato(campeonatoId: number): Promise<any> {
        try {
            const campeonato = await prismaClient.campeonato.update({
                where: { id: campeonatoId },
                data: { deletado: true }
            })

            return campeonato
        } catch (error) {
            console.error('Erro ao atualizar o status do campeonato:', error);
            throw new Error('Erro ao atualizar o status do campeonato');
        }
    }

    async atualizarStatusCampeonatoPorFalse(campeonatoId: number): Promise<any> {
        try {
            const campeonato = await prismaClient.campeonato.update({
                where: { id: campeonatoId },
                data: { deletado: false }
            })

            return campeonato
        } catch (error) {
            console.error('Erro ao atualizar o status do campeonato:', error);
            throw new Error('Erro ao atualizar o status do campeonato');
        }
    }

    async listarCampeonatosAtivos(): Promise<any> {
        try {
            // Buscar campeonatos não finalizados
            const campeonatosAtivos = await prismaClient.campeonato.findMany({
                where: {
                    deletado: false,
                },
                include: {
                    partidas: {
                        include: {
                            participantes: true,
                        },
                    },
                },
            });

            return campeonatosAtivos;
        } catch (error) {
            console.error('Erro ao listar campeonatos ativos:', error);
            throw new Error('Erro ao listar campeonatos ativos');
        }
    }


    async listarCampeonatosInativos(): Promise<any> {
        try {
            // Buscar campeonatos não finalizados
            const campeonatosAtivos = await prismaClient.campeonato.findMany({
                where: {
                    deletado: false,
                },
                include: {
                    partidas: {
                        include: {
                            participantes: true,
                        },
                    },
                },
            });

            return campeonatosAtivos;
        } catch (error) {
            console.error('Erro ao listar campeonatos ativos:', error);
            throw new Error('Erro ao listar campeonatos ativos');
        }
    }



    // Listar os campeonatos True
    async listarCampeonatosFinalizados(): Promise<any> {
        try {
            const campeonatosFinalizados = await prismaClient.campeonato.findMany({
                where: {
                    deletado: true
                },
                include: {
                    partidas: {
                        include: {
                            participantes: true
                        }
                    }
                }
            })

            return campeonatosFinalizados
        } catch (error) {
            throw new Error('Erro ao listar campeonatos finalizados');
        }
    }


    async buscarCampeonatoPorId(campeonatoId: number) {
        try {
            const campeonato = await prismaClient.campeonato.findUnique({
                where: { id: campeonatoId },
                include: {
                    partidas: {
                        include: {
                            participantes: true, // Inclui os participantes para cada partida
                        },
                    },
                }
            });

            if (!campeonato) {
                throw new Error(`Campeonato com ID ${campeonatoId} não encontrado.`);
            }
            return campeonato;
        } catch (error) {
            console.error('Erro ao buscar campeonato por ID:', error);
            throw new Error(`Erro ao buscar campeonato por ID: ${error.message}`);
        }
    }

    async editarCampeonato(campeonatoId: number, dadosAtualizados: {
        nome?: string,
        data?: Date,
        valorTotal?: number | null
    }) {
        try {
            const campeonatoAtualizado = await prismaClient.campeonato.update({
                where: { id: campeonatoId },
                data: dadosAtualizados,
            });
            return campeonatoAtualizado;
        } catch (error) {
            console.error('Erro ao editar campeonato:', error);
            throw new Error('Erro ao editar campeonato');
        }
    }

    async deletarCampeonato(campeonatoId: number) {
        try {
            const partidas = await prismaClient.partida.findMany({
                where: { campeonatoId: campeonatoId }
            })

            //Exclua todas as partidas associadas
            await Promise.all(partidas.map(async (partida) => {
                await prismaClient.partida.delete({
                    where: { id: partida.id }
                })
            }))

            // Exclua o campeonato
            await prismaClient.campeonato.delete({
                where: { id: campeonatoId }
            })

        } catch (error) {
            console.error('Erro ao deletar campeonato:', error);
            throw new Error('Erro ao deletar campeonato');

        }
    }

    async deletarPartidasPorCampeonato(cameponatosId) {
        
    }


    async calcularEAtualizarValorTotalCampeonato(campeonatoId: number): Promise<void> {
        try {
            const partidas = await prismaClient.partida.findMany({
                where: { campeonatoId: campeonatoId },
                select: { valor: true }
            })


            // Somar os valores das partidas, considerando apenas partidas com valor definido
            const valorTotal = partidas.reduce((acc, partida) => {
                return acc + (partida.valor ?? 0)
            }, 0)

            // Atualizar o valorTotal do campeonato
            await prismaClient.campeonato.update({
                where: { id: campeonatoId },
                data: { valorTotal: valorTotal }
            })

            console.log(`Valor total atualizado para o campeonato ${campeonatoId}: ${valorTotal}`);

        } catch (error) {
            console.error('Erro ao calcular e atualizar valor total do campeonato:', error);
            throw new Error(`Erro ao calcular e atualizar valor total do campeonato: ${error.message}`);
        }
    }



    // Criar Partida dentro do campeonato
    async adicionarPartidaAoCampeonato(campeonatoId: number, participantesIds: number[], dataPartida: Date, valorPartida: number | null): Promise<any> {
        if (!Array.isArray(participantesIds)) {
            throw new Error('participantesIds deve ser um array');
        }

        try {
            const partida = await prismaClient.partida.create({
                data: {
                    campeonato: { connect: { id: campeonatoId } },
                    data: dataPartida,
                    valor: valorPartida,
                    participantes: {
                        connect: participantesIds.map(id => ({ id })),
                    },
                },
            });
            return partida;
        } catch (error) {
            console.error('Erro ao adicionar partida ao campeonato:', error);
            throw new Error(`Erro ao adicionar partida ao campeonato: ${error.message}`);
        }
    }

    
    async editarValorTotalPartida(partidaId: number, valorTotal: number): Promise<any> {
        try {
            const partidaAtualizada = await prismaClient.partida.update({
                where: { id: partidaId },
                data: { valor: valorTotal }
            });
            return partidaAtualizada;
        } catch (error) {
            console.error('Erro ao editar valor total da partida:', error);
            throw new Error(`Erro ao editar valor total da partida: ${error.message}`);
        }
    }


    async finalizarCampeonato(campeonatoId: number): Promise<any> {
        try {
            // Marca o campeonato como deletado
            const campeonatoFinalizado = await prismaClient.campeonato.update({
                where: { id: campeonatoId },
                data: { deletado: true },
            });

            // Cria um novo registro no modelo RegistroCampeonato, se necessário

            return campeonatoFinalizado;
        } catch (error) {
            console.error('Erro ao finalizar campeonato:', error);
            throw new Error('Erro ao finalizar campeonato.');
        }
    }



    async removerParticipanteDaPartida(partidaId: number, participanteId: number) {
        try {


            await prismaClient.partida.update({
                where: { id: partidaId },
                data: {
                    participantes: {
                        disconnect: [{ id: participanteId }]
                    }
                }
            });
        } catch (error) {
            console.error('Erro ao remover participante da partida:', error);
            throw new Error(`Erro ao remover participante da partida: ${error.message}`);
        }
    }


    // model RegistroCampeonato
    async criarRegistroCampeonato(campeonatoId: number): Promise<any> {
        try {
            // Calcula e atualiza o valor total do campeonato
            await this.calcularEAtualizarValorTotalCampeonato(campeonatoId);

            // Cria um novo registro de campeonato
            const campeonato = await prismaClient.campeonato.findUnique({
                where: { id: campeonatoId },
                select: { valorTotal: true }, // Seleciona apenas o valor total
            });

            const novoRegistro = await prismaClient.registroCampeonato.create({
                data: {
                    campeonatoId: campeonatoId,
                    valorTotal: campeonato.valorTotal, // Usa o valor total atualizado
                },
                include: {
                    campeonato: {
                        select: {
                            nome: true,
                            valorTotal: true,
                            participantes: {
                                select: {
                                    nome: true,
                                },
                            },
                        },
                    },
                },
            });

            // Atualiza o campo 'deletado' para true no modelo Campeonato
            await prismaClient.campeonato.update({
                where: { id: campeonatoId },
                data: { deletado: true },
            });

            return novoRegistro;
        } catch (error) {
            console.error('Erro ao criar registro de campeonato:', error);
            throw new Error('Erro ao criar registro de campeonato');
        }
    }


    async listarRegistrosCampeonatosComParticipantes() {
        try {
            const registros = await prismaClient.registroCampeonato.findMany({
                include: {
                    campeonato: {
                        include: {
                            partidas: {
                                include: {
                                    participantes: true,

                                }
                            }
                        }
                    }
                }
            });

            // Agora agregue todos os participantes das partidas para cada campeonato
            return registros.map(registro => {
                const participantes = registro.campeonato.partidas
                    .flatMap(partida => partida.participantes)
                return {
                    ...registro,
                    campeonato: {
                        ...registro.campeonato,
                        participantes // Isso substituirá a lista de partidas por uma lista de nomes de participantes
                    }
                };
            });
        } catch (error) {
            throw new Error(`Erro ao listar campeonatos e participantes: ${error.message}`);
        }
    }

    async deletarRegistroCampeonato(registroCampeonatoId) {
        console.log("ID para deleção:", registroCampeonatoId); // Adicione este log para debugar
        try {
            const deletarRegisto = await prismaClient.registroCampeonato.delete({
                where: { id: registroCampeonatoId },
            });
            return deletarRegisto;
        } catch (error) {
            console.error('Erro ao deletar registro de campeonato:', error);
            throw new Error('Erro ao deletar registro de campeonato');
        }
    }


}


export default new CampeonatoService();