import { ConditionCardOptions } from '../../types/types';

export default async (options: ConditionCardOptions): Promise<boolean> => {
  const { app } = options;

  const random: number = Math.random();
  const result: boolean = random > 0.5;
  app.log(`is_random_true_false: ${random} > 0.5 == ${result.toString()}`);
  return result;
};
