import { ProductResolvers } from '../../generated/graphql-types';

const Product: ProductResolvers = {
  images: async (product, _, ctx) => {
    const p = await ctx.prisma.product.findUnique({
      where: { id: product.id },
      select: { images: true },
    });

    return JSON.parse(p!.images);
  },
  colors: (product, _, ctx) => {
    console.log('Product > colors');
    return ctx.prisma.product
      .findUnique({ where: { id: product.id } })
      .colors();
  },
  sizes: (product, _, ctx) => {
    console.log('Product > sizes');
    return ctx.prisma.product.findUnique({ where: { id: product.id } }).sizes();
  },
  tags: (product, _, ctx) => {
    return ctx.prisma.product.findUnique({ where: { id: product.id } }).tags();
  },
  reviews: (product, _, ctx) => {
    console.log('Product > reviews');
    return ctx.prisma.product
      .findUnique({ where: { id: product.id } })
      .reviews();
  },
};

export default Product;
