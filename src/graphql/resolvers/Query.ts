import { QueryResolvers } from '../../generated/graphql-types';

const Query: QueryResolvers = {
  me: (_0, _1, ctx) => {
    console.log('Query > me');
    return null;
  },
  product: async (_, args, ctx) => {
    console.log('Query > product');
    return ctx.prisma.product.findUnique({
      where: { id: args.id },
      select: {
        id: true,
        name: true,
        brand: true,
        // images: true,
        category: true,
        discount: true,
        price: true,
        rating: true,
        ratingCount: true,
      },
    });
  },
  products: (_, args, ctx) => {
    console.log('Query > products');
    return null;
  },
};

export default Query;
