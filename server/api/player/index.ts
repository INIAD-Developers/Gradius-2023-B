import type { PlayerModel } from '$/commonTypesWithClient/models';
import type { MoveTo } from '$/useCase/playerUseCase';

export type Methods = {
  get: {
    query: {
      display: number;
    };
    resBody: { body: PlayerModel[]; hasChange: boolean };
  };
  post: {
    reqBody: {
      moveTo: MoveTo;
    };
    resBody: PlayerModel | null;
  };
};
