import { ColorResolvers } from '../../generated/graphql-types';

const Color: ColorResolvers = {
  products: async (color, _, ctx) => {
    console.log('Color > products');
    return null;
  },
};

export default Color;
