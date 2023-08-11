import type { EnemyModel } from '$/commonTypesWithClient/models';
import { enemyIdParser } from '$/service/idParsers';
import { prismaClient } from '$/service/prismaClient';
import type { Enemy } from '@prisma/client';
import { z } from 'zod';

const toEnemyModel = (prismaEnemy: Enemy): EnemyModel => ({
  id: enemyIdParser.parse(prismaEnemy.id),
  createdPosition: z
    .object({
      x: z.number().min(0),
      y: z.number().min(0),
    })
    .parse(prismaEnemy.createdPosition),
  type: z.number().min(0).parse(prismaEnemy.type),
  createdAt: prismaEnemy.createdAt.getTime(),
});

let change = true;

type Find = { body: EnemyModel; hasChange: boolean };

type FindAll = { body: EnemyModel[]; hasChange: boolean };

export const enemiesRepository = {
  create: async (enemy: EnemyModel): Promise<EnemyModel> => {
    const prismaEnemy = await prismaClient.enemy
      .create({
        data: {
          id: enemy.id,
          createdPosition: enemy.createdPosition,
          type: enemy.type,
          createdAt: new Date(enemy.createdAt),
        },
      })
      .then((enemy) => {
        change = true;
        return enemy;
      });
    return toEnemyModel(prismaEnemy);
  },
  findAll: async (): Promise<FindAll> => {
    const hasChange = change;
    change = false;
    const prismaEnemies = await prismaClient.enemy.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return { body: prismaEnemies.map(toEnemyModel), hasChange };
  },
  find: async (id: string): Promise<Find | null> => {
    const hasChange = change;
    change = false;
    const prismaEnemy = await prismaClient.enemy.findUnique({ where: { id } });
    return prismaEnemy !== null ? { body: toEnemyModel(prismaEnemy), hasChange } : null;
  },
  delete: async (id: string): Promise<void> => {
    await prismaClient.enemy.delete({ where: { id } }).then(() => (change = true));
  },
};
