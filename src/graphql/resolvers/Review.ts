import { ReviewResolvers } from '../../generated/graphql-types';

const Review: ReviewResolvers = {
  product: (parent, _, ctx) => {
    console.log('Review > product');
    return ctx.prisma.review.findUnique({ where: { id: parent.id } }).product();
  },
  reviewer: (parent, _, ctx) => {
    console.log('Review > reviewer');
    return ctx.prisma.review
      .findUnique({ where: { id: parent.id } })
      .reviewer();
  },
};

export default Review;
