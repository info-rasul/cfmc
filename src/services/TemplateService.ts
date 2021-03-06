import { templates } from './data/templates';

async function delay(delayTime = 200) {
  await new Promise((resolve) => setTimeout(resolve, delayTime));
}

const getPageTemplate = async (template = 'light'): Promise<object> => {
  await delay();
  console.log(template);
  return templates;
};

// eslint-disable-next-line import/prefer-default-export
export const TemplateService = {
  getPageTemplate,
};
