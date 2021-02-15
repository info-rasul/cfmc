import { MainResponse } from '@/models';
import { items } from './data/items';

async function delay(delayTime = 200) {
  await new Promise((resolve) => setTimeout(resolve, delayTime));
}

const init = async (): Promise<MainResponse> => {
  await delay();
  return items;
};

// eslint-disable-next-line import/prefer-default-export
export const MainService = {
  init,
};
