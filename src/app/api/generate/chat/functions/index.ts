import get_recommended_strains_data, {
  GetRecommendedStrainsDataSchema,
} from './get_recommended_strains_data';
import recommend_strains, {
  RecommendStrainsDataSchema,
} from './recommend_strains';

type Message = {
  role: 'user' | 'system';
  content: string;
};

const function_descriptions = [
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
  {
    name: 'recommend_strains',
    description:
      'Find the strains that are most similar to the given strain and return them.',
    parameters: {
      type: 'object',
      properties: {
        strains_name: {
          type: 'string',
          desciption: 'The name of the strain to get the pairings for.',
        },
        limit: {
          type: 'number',
          description:
            'The maximum number of pairings to return. Defaults to 3.',
        },
      },
      required: ['strains_name', 'limit'],
    },
  },
];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function runFunction(name: string, args: any) {
  console.log('runFunction', name, args);
  switch (name) {
    case 'get_recommended_strains_data':
      const recommendedStrainsArgs =
        GetRecommendedStrainsDataSchema.parse(args);
      return {
        data: await get_recommended_strains_data(
          recommendedStrainsArgs.strains_names,
          recommendedStrainsArgs.recommendation_reason,
        ),
        system_message: {
          role: 'system',
          content: `Begin your message by stating the reason for recommending the strains. Ensure that the reason remains unchanged.
  
          List each recommended strain at the conclusion of your message.
          
          All the strains should be grouped together under a single tag. The format of the tag should be as follows: [strain:{"strains":[{"slug":"strain-slug","image":"/path/to/strain-image.jpg","name":"Strain Name"}]}]
          
          Within this tag, each strain should be represented by three components: 
          - "slug": This serves as the unique identifier for the strain. It should be formatted as "strain-slug".
          - "image": This is the pathway to the image of the strain. It should be formatted as "/path/to/strain-image.jpg".
          - "name": This is the name of the strain. It should be formatted as "Strain Name".
          
          Here are a couple of examples for better understanding:
          
          Example 1:
          [strain:{"strains":[{"slug":"blue-dream","image":"/images/blue-dream.jpg","name":"Blue Dream"}]}]
          
          Example 2:
          [strain:{"strains":[{"slug":"sour-diesel","image":"/images/sour-diesel.jpg","name":"Sour Diesel"}]}]
          
          Remember, all strains should be grouped under the same tag. So, if you have two strains, the format should be as follows:
          
          [strain:{"strains":[{"slug":"blue-dream","image":"/images/blue-dream.jpg","name":"Blue Dream"},{"slug":"sour-diesel","image":"/images/sour-diesel.jpg","name":"Sour Diesel"}]}]`,
        } as Message,
      };
    case 'recommend_strains':
      const recommendStrainsArgs = RecommendStrainsDataSchema.parse(args);
      return {
        data: await recommend_strains(
          recommendStrainsArgs.strains_name,
          recommendStrainsArgs.limit,
        ),
        system_message: {
          role: 'system',
          content: `Begin your message by stating the reason for recommending the strains.
  
          List each recommended strain at the conclusion of your message.
          
          All the strains should be grouped together under a single tag. The format of the tag should be as follows: [strain:{"strains":[{"slug":"strain-slug","image":"/path/to/strain-image.jpg","name":"Strain Name"}]}]
          
          Within this tag, each strain should be represented by three components: 
          - "slug": This serves as the unique identifier for the strain. It should be formatted as "strain-slug".
          - "image": This is the pathway to the image of the strain. It should be formatted as "/path/to/strain-image.jpg".
          - "name": This is the name of the strain. It should be formatted as "Strain Name".
          
          Here are a couple of examples for better understanding:
          
          Example 1:
          [strain:{"strains":[{"slug":"blue-dream","image":"/images/blue-dream.jpg","name":"Blue Dream"}]}]
          
          Example 2:
          [strain:{"strains":[{"slug":"sour-diesel","image":"/images/sour-diesel.jpg","name":"Sour Diesel"}]}]
          
          Remember, all strains should be grouped under the same tag. So, if you have two strains, the format should be as follows:
          
          [strain:{"strains":[{"slug":"blue-dream","image":"/images/blue-dream.jpg","name":"Blue Dream"},{"slug":"sour-diesel","image":"/images/sour-diesel.jpg","name":"Sour Diesel"}]}]`,
        } as Message,
      };
    default:
      throw new Error(`Function ${name} not found`);
  }
}

export default function_descriptions;
export { runFunction };
