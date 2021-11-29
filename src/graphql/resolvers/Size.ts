import { SizeResolvers } from '../../generated/graphql-types';

const Size: SizeResolvers = {
  products: (size, _, ctx) => {
    console.log('Size > products');
    return null;
  },
};

export default Size;
