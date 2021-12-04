import { CategoryResolvers } from '../../generated/graphql-types';

const Category: CategoryResolvers = {
  products: (parent, _, ctx) => {
    console.log('Category > products');
    return ctx.prisma.category
      .findUnique({
        where: { id: parent.id },
      })
      .products();
  },
};

export default Category;
