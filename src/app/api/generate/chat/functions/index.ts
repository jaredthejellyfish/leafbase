import type OpenAI from 'openai';

import get_recommended_strains_data, {
  GetRecommendedStrainsDataSchema,
} from './get_recommended_strains_data';

const function_descriptions: OpenAI.Chat.Completions.ChatCompletionCreateParams.Function[] =
  [
    {
      name: 'get_recommended_strains_data',
      description:
        'Get the data for the recommended strains and put together a blob of text to send to the user.',
      parameters: {
        type: 'object',
        properties: {
          strains_names: {
            type: 'array',
            items: {
              type: 'string',
            },
            desciption: 'The names of the strains to get data for.',
          },
          recommendation_reason: {
            type: 'string',
            description:
              'The detailed reason for recommending the strains above.',
          },
        },
        required: ['strains_names', 'recommendation_reason'],
      },
    },
  ];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function runFunction(name: string, args: any) {
  switch (name) {
    case 'get_recommended_strains_data':
      const data = GetRecommendedStrainsDataSchema.parse(args);
      return await get_recommended_strains_data(
        data.strains_names,
        data.recommendation_reason,
      );
    default:
      throw new Error(`Function ${name} not found`);
  }
}

export default function_descriptions;
export { runFunction };
