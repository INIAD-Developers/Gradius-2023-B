import type { BulletModel } from '$/commonTypesWithClient/models';

export type Methods = {
  get: {
    query: {
      display: number;
    };
    resBody: { body: BulletModel[]; hasChange: boolean };
  };
  post: {
    resBody: BulletModel | null;
  };
};
