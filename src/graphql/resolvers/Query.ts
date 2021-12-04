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

    // Sort
    const orderBy = { [args.sort]: args.order };

    // Filter
    let where = undefined;
    if (args.filter) {
      const { category, color, size, tag } = args.filter;
      where = {
        category: { category: category ?? undefined },
        colors: { some: { color: color ?? undefined } },
        sizes: { some: { size: size ?? undefined } },
        tags: { some: { tag: tag ?? undefined } },
      };
    }

    // Pagination
    const { take, skip } = args;

    return ctx.prisma.product.findMany({
      where,
      orderBy,
      take,
      skip,
    });
  },
  categories: (_0, _1, ctx) => {
    return ctx.prisma.category.findMany();
  },
  colors: (_0, _1, ctx) => {
    return ctx.prisma.color.findMany();
  },
  sizes: (_0, _1, ctx) => {
    return ctx.prisma.size.findMany();
  },
  tags: (_0, _1, ctx) => {
    return ctx.prisma.tag.findMany();
  },
};

export default Query;
