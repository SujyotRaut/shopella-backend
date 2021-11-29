import { ReviewResolvers } from '../../generated/graphql-types';

const Review: ReviewResolvers = {
  product: (review, _, ctx) => {
    console.log('Review > product');
    return null;
  },
  reviewer: (review, _, ctx) => {
    console.log('Review > reviewer');
    return null;
  },
};

export default Review;
