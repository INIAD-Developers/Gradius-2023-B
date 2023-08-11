import type { UserId } from '$/commonTypesWithClient/branded';
import type { PlayerModel } from '$/commonTypesWithClient/models';
import { userIdParser } from '$/service/idParsers';
import { prismaClient } from '$/service/prismaClient';
import type { Player } from '@prisma/client';
import { z } from 'zod';

const toPlayerModel = (prismaPlayer: Player): PlayerModel => ({
  id: userIdParser.parse(prismaPlayer.id),
  name: prismaPlayer.name,
  position: z
    .object({
      x: z.number().min(0),
      y: z.number().min(0),
    })
    .parse(prismaPlayer.position),
  health: z.number().min(0).max(100).parse(prismaPlayer.health),
  score: z.number().min(0).parse(prismaPlayer.score),
  team: z.enum(['red', 'blue']).parse(prismaPlayer.team),
  createdAt: prismaPlayer.createdAt.getTime(),
});

let change = true;

type FindAll = { body: PlayerModel[]; hasChange: boolean };

export const playersRepository = {
  save: async (player: PlayerModel): Promise<PlayerModel> => {
    const prismaPlayer = await prismaClient.player
      .upsert({
        where: { id: player.id },
        update: {
          name: player.name,
          position: player.position,
          health: player.health,
          score: player.score,
          team: player.team,
        },
        create: {
          id: player.id,
          name: player.name,
          position: player.position,
          health: player.health,
          score: player.score,
          team: player.team,
          createdAt: new Date(player.createdAt),
        },
      })
      .then((player) => {
        change = true;
        return player;
      });
    return toPlayerModel(prismaPlayer);
  },
  findAll: async (): Promise<FindAll> => {
    const hasChange = change;
    change = false;
    const prismaPlayers = await prismaClient.player.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return { body: prismaPlayers.map(toPlayerModel), hasChange };
  },
  findAllInTeam: async (team: string): Promise<FindAll> => {
    const hasChange = change;
    change = false;
    const prismaPlayers = await prismaClient.player.findMany({
      where: { team },
      orderBy: { createdAt: 'desc' },
    });
    return { body: prismaPlayers.map(toPlayerModel), hasChange };
  },
  find: async (id: UserId): Promise<PlayerModel | null> => {
    change = false;
    const prismaPlayer = await prismaClient.player.findUnique({ where: { id } });
    return prismaPlayer !== null ? toPlayerModel(prismaPlayer) : null;
  },
  delete: async (id: string): Promise<void> => {
    await prismaClient.player.delete({ where: { id } }).then(() => (change = true));
  },
};
