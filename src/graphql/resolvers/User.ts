import { UserResolvers } from '../../generated/graphql-types';

const User: UserResolvers = {
  reviews: (user, _, ctx) => {
    console.log('User > reviews');
    return null;
  },
};

export default User;
