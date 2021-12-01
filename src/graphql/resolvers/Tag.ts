import { TagResolvers } from '../../generated/graphql-types';

const Tag: TagResolvers = {
  products: (parent, _, ctx) => {
    console.log('Tag > products');
    return ctx.prisma.tag
      .findUnique({
        where: { id: parent.id },
      })
      .products();
  },
};

export default Tag;
