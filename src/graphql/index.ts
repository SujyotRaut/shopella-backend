import fs from 'fs';
import path from 'path';
import { Resolvers } from '../generated/graphql-types';
import Color from './resolvers/Color';
import Product from './resolvers/Product';
import Query from './resolvers/Query';
import Review from './resolvers/Review';
import Size from './resolvers/Size';
import Tag from './resolvers/Tag';
import User from './resolvers/User';

const typeDefsPath = path.join(__dirname, 'typedefs');

let graphqlTypes = '';
fs.readdirSync(typeDefsPath).forEach((fileName) => {
  if (!(fileName.endsWith('.gql') || fileName.endsWith('.graphql'))) return;
  const filePath = path.join(typeDefsPath, fileName);
  graphqlTypes += fs.readFileSync(filePath, 'utf-8');
});

export { graphqlTypes as typeDefs };

export const resolvers: Resolvers = {
  Product,
  Review,
  Color,
  Query,
  User,
  Size,
  Tag,
};
