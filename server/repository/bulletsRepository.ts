import type { BulletModel } from '$/commonTypesWithClient/models';
import { bulletIdParser, userIdParser } from '$/service/idParsers';
import { prismaClient } from '$/service/prismaClient';
import type { Bullet } from '@prisma/client';
import { z } from 'zod';

const toBulletModel = (prismaBullet: Bullet): BulletModel => ({
  id: bulletIdParser.parse(prismaBullet.id),
  createdPosition: z
    .object({
      x: z.number().min(0),
      y: z.number().min(0),
    })
    .parse(prismaBullet.createdPosition),
  direction: z.number().min(0).max(360).parse(prismaBullet.direction),
  type: z.number().min(0).parse(prismaBullet.type),
  playerId: prismaBullet.playerId === null ? undefined : userIdParser.parse(prismaBullet.playerId),
  createdAt: prismaBullet.createdAt.getTime(),
});

let change = true;

type Find = { body: BulletModel; hasChange: boolean };

type FindAll = { body: BulletModel[]; hasChange: boolean };
export const bulletsRepository = {
  findAll: async (): Promise<FindAll> => {
    const hasChange = change;
    change = !change;
    const prismaBullets = await prismaClient.bullet.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return { body: prismaBullets.map(toBulletModel), hasChange };
  },
  find: async (id: string): Promise<Find | null> => {
    const hasChange = change;
    change = !change;
    const prismaBullet = await prismaClient.bullet.findUnique({ where: { id } });
    if (prismaBullet === null) return null;
    return { body: toBulletModel(prismaBullet), hasChange };
  },
  delete: async (id: string): Promise<void> => {
    try {
      await prismaClient.bullet.delete({ where: { id } }).then(() => (change = true));
    } catch (error) {
      console.log(error);
    }
  },
  create: async (bullet: BulletModel) => {
    await prismaClient.bullet
      .create({
        data: {
          id: bullet.id,
          createdPosition: bullet.createdPosition,
          direction: bullet.direction,
          type: bullet.type,
          playerId: bullet.playerId,
          createdAt: new Date(bullet.createdAt),
        },
      })
      .then(() => (change = true));
  },
};
