import { ProductResolvers } from '../../generated/graphql-types';

const Product: ProductResolvers = {
  images: (parent, _, ctx) => {
    console.log('Product > images');
    return ctx.prisma.product
      .findUnique({
        where: { id: parent.id },
      })
      .images()
      .then((images) => images.map((image) => image.image));
  },
  colors: (parent, _, ctx) => {
    console.log('Product > colors');
    return ctx.prisma.product.findUnique({ where: { id: parent.id } }).colors();
  },
  sizes: (parent, _, ctx) => {
    console.log('Product > sizes');
    return ctx.prisma.product.findUnique({ where: { id: parent.id } }).sizes();
  },
  tags: (parent, _, ctx) => {
    return ctx.prisma.product.findUnique({ where: { id: parent.id } }).tags();
  },
  reviews: (parent, _, ctx) => {
    console.log('Product > reviews');
    return ctx.prisma.product
      .findUnique({ where: { id: parent.id } })
      .reviews();
  },
};

export default Product;
