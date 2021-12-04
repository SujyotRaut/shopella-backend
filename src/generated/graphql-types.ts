import { GraphQLResolveInfo } from 'graphql';
import { Context } from '..';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type RequireFields<T, K extends keyof T> = { [X in Exclude<keyof T, K>]?: T[X] } & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Category = {
  __typename?: 'Category';
  category?: Maybe<Scalars['String']>;
  id: Scalars['Int'];
  products?: Maybe<Array<Product>>;
};

export type Color = {
  __typename?: 'Color';
  color?: Maybe<Scalars['String']>;
  id: Scalars['Int'];
  products?: Maybe<Array<Product>>;
};

export type Product = {
  __typename?: 'Product';
  brand?: Maybe<Scalars['String']>;
  category?: Maybe<Category>;
  colors?: Maybe<Array<Color>>;
  discount?: Maybe<Scalars['Float']>;
  discountedPrice?: Maybe<Scalars['Float']>;
  id: Scalars['ID'];
  images?: Maybe<Array<Scalars['String']>>;
  name?: Maybe<Scalars['String']>;
  originalPrice?: Maybe<Scalars['Float']>;
  rating?: Maybe<Scalars['Float']>;
  ratingCount?: Maybe<Scalars['Int']>;
  reviews?: Maybe<Array<Review>>;
  sizes?: Maybe<Array<Size>>;
  tags?: Maybe<Array<Tag>>;
};

export type ProductFilter = {
  category?: InputMaybe<Scalars['String']>;
  color?: InputMaybe<Scalars['String']>;
  size?: InputMaybe<Scalars['String']>;
  tag?: InputMaybe<Scalars['String']>;
};

export enum ProductSort {
  Discount = 'discount',
  DiscountedPrice = 'discountedPrice',
  Id = 'id',
  Name = 'name',
  OriginalPrice = 'originalPrice',
  Rating = 'rating',
  RatingCount = 'ratingCount'
}

export type Query = {
  __typename?: 'Query';
  categories?: Maybe<Array<Category>>;
  colors?: Maybe<Array<Color>>;
  me?: Maybe<User>;
  product?: Maybe<Product>;
  products?: Maybe<Array<Product>>;
  sizes?: Maybe<Array<Size>>;
  tags?: Maybe<Array<Tag>>;
};


export type QueryProductArgs = {
  id: Scalars['ID'];
};


export type QueryProductsArgs = {
  filter?: InputMaybe<ProductFilter>;
  order?: SortOrder;
  skip?: InputMaybe<Scalars['Int']>;
  sort?: ProductSort;
  take?: InputMaybe<Scalars['Int']>;
};

export type Review = {
  __typename?: 'Review';
  id: Scalars['ID'];
  product?: Maybe<Product>;
  rating?: Maybe<Scalars['Float']>;
  review?: Maybe<Scalars['String']>;
  reviewer?: Maybe<User>;
};

export type Size = {
  __typename?: 'Size';
  id: Scalars['Int'];
  products?: Maybe<Array<Product>>;
  size?: Maybe<Scalars['String']>;
};

export enum SortOrder {
  Asc = 'asc',
  Desc = 'desc'
}

export type Tag = {
  __typename?: 'Tag';
  id: Scalars['Int'];
  products?: Maybe<Array<Product>>;
  tag?: Maybe<Scalars['String']>;
};

export type User = {
  __typename?: 'User';
  email?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
  reviews?: Maybe<Array<Review>>;
};



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  Category: ResolverTypeWrapper<Category>;
  Color: ResolverTypeWrapper<Color>;
  Float: ResolverTypeWrapper<Scalars['Float']>;
  ID: ResolverTypeWrapper<Scalars['ID']>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  Product: ResolverTypeWrapper<Product>;
  ProductFilter: ProductFilter;
  ProductSort: ProductSort;
  Query: ResolverTypeWrapper<{}>;
  Review: ResolverTypeWrapper<Review>;
  Size: ResolverTypeWrapper<Size>;
  SortOrder: SortOrder;
  String: ResolverTypeWrapper<Scalars['String']>;
  Tag: ResolverTypeWrapper<Tag>;
  User: ResolverTypeWrapper<User>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Boolean: Scalars['Boolean'];
  Category: Category;
  Color: Color;
  Float: Scalars['Float'];
  ID: Scalars['ID'];
  Int: Scalars['Int'];
  Product: Product;
  ProductFilter: ProductFilter;
  Query: {};
  Review: Review;
  Size: Size;
  String: Scalars['String'];
  Tag: Tag;
  User: User;
};

export type CategoryResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Category'] = ResolversParentTypes['Category']> = {
  category?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  products?: Resolver<Maybe<Array<ResolversTypes['Product']>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ColorResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Color'] = ResolversParentTypes['Color']> = {
  color?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  products?: Resolver<Maybe<Array<ResolversTypes['Product']>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ProductResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Product'] = ResolversParentTypes['Product']> = {
  brand?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  category?: Resolver<Maybe<ResolversTypes['Category']>, ParentType, ContextType>;
  colors?: Resolver<Maybe<Array<ResolversTypes['Color']>>, ParentType, ContextType>;
  discount?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  discountedPrice?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  images?: Resolver<Maybe<Array<ResolversTypes['String']>>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  originalPrice?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  rating?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  ratingCount?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  reviews?: Resolver<Maybe<Array<ResolversTypes['Review']>>, ParentType, ContextType>;
  sizes?: Resolver<Maybe<Array<ResolversTypes['Size']>>, ParentType, ContextType>;
  tags?: Resolver<Maybe<Array<ResolversTypes['Tag']>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  categories?: Resolver<Maybe<Array<ResolversTypes['Category']>>, ParentType, ContextType>;
  colors?: Resolver<Maybe<Array<ResolversTypes['Color']>>, ParentType, ContextType>;
  me?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  product?: Resolver<Maybe<ResolversTypes['Product']>, ParentType, ContextType, RequireFields<QueryProductArgs, 'id'>>;
  products?: Resolver<Maybe<Array<ResolversTypes['Product']>>, ParentType, ContextType, RequireFields<QueryProductsArgs, 'order' | 'skip' | 'sort' | 'take'>>;
  sizes?: Resolver<Maybe<Array<ResolversTypes['Size']>>, ParentType, ContextType>;
  tags?: Resolver<Maybe<Array<ResolversTypes['Tag']>>, ParentType, ContextType>;
};

export type ReviewResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Review'] = ResolversParentTypes['Review']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  product?: Resolver<Maybe<ResolversTypes['Product']>, ParentType, ContextType>;
  rating?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  review?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  reviewer?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SizeResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Size'] = ResolversParentTypes['Size']> = {
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  products?: Resolver<Maybe<Array<ResolversTypes['Product']>>, ParentType, ContextType>;
  size?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TagResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Tag'] = ResolversParentTypes['Tag']> = {
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  products?: Resolver<Maybe<Array<ResolversTypes['Product']>>, ParentType, ContextType>;
  tag?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserResolvers<ContextType = Context, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = {
  email?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  reviews?: Resolver<Maybe<Array<ResolversTypes['Review']>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = Context> = {
  Category?: CategoryResolvers<ContextType>;
  Color?: ColorResolvers<ContextType>;
  Product?: ProductResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Review?: ReviewResolvers<ContextType>;
  Size?: SizeResolvers<ContextType>;
  Tag?: TagResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
};

