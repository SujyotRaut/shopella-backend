import { UserResolvers } from '../../generated/graphql-types';

const User: UserResolvers = {
  reviews: (parent, _, ctx) => {
    console.log('User > reviews');
    return ctx.prisma.user.findUnique({ where: { id: parent.id } }).reviews();
  },
};

export default User;
