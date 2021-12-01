import { ColorResolvers } from '../../generated/graphql-types';

const Color: ColorResolvers = {
  products: (parent, _, ctx) => {
    console.log('Color > products');
    return ctx.prisma.color
      .findUnique({
        where: { id: parent.id },
      })
      .products();
  },
};

export default Color;
