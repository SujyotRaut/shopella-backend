import { QueryResolvers } from '../../generated/graphql-types';

const Query: QueryResolvers = {
  me: (_0, _1, ctx) => {
    console.log('Query > me');
    return null;
  },
  product: async (_, args, ctx) => {
    console.log('Query > product');
    return ctx.prisma.product.findUnique({ where: { id: args.id } });
  },
  products: (_, args, ctx) => {
    console.log('Query > products');
    return ctx.prisma.product.findMany({ take: 10 });
  },
};

export default Query;
