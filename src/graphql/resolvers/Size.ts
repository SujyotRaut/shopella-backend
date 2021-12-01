import { SizeResolvers } from '../../generated/graphql-types';

const Size: SizeResolvers = {
  products: (parent, _, ctx) => {
    console.log('Size > products');
    return ctx.prisma.size
      .findUnique({
        where: { id: parent.id },
      })
      .products();
  },
};

export default Size;
