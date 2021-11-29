import { TagResolvers } from '../../generated/graphql-types';

const Tag: TagResolvers = {
  products: (tag, _, ctx) => {
    console.log('Tag > products');
    return null;
  },
};

export default Tag;
