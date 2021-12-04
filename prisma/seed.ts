import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import path from 'path';

const prisma = new PrismaClient();
const COLORS = [
  '#9BB7D4',
  '#1B7340',
  '#E9897E',
  '#0072B5',
  '#FDAC53',
  '#B55A30',
  '#A0DAA9',
  '#F19828',
  '#D2386C',
  '#926AA6',
  '#FF0000',
  '#FFFFFF',
  '#000000',
  '#964B00',
  '#FFFF00',
  '#FFC0CB',
];

interface ReviewJSON {
  reviewer_name: string;
  review_rating: number;
  review_date: string;
  review: string;
}

interface ProductJSON {
  id: string;
  name: string;
  brand: string;
  sizes: Array<string>;
  colors: Array<string>;
  images: Array<string>;
  rating: number;
  rating_count: number;
  reviews: Array<ReviewJSON>;
  category: string;
  discount: number;
  original_price: number;
  discounted_price: number;
  tags: Array<string>;
}

async function main() {
  const data: Array<ProductJSON> = JSON.parse(
    fs.readFileSync(path.resolve(__dirname, 'data.json'), 'utf-8')
  );

  const products = data.map(mapFunc);

  for (const product of products) {
    await createProduct(product);
    for (const review of product.reviews) {
      await createReview(review, product.id);
    }
  }

  console.log(
    `${await prisma.product.count()}/${products.length} Products created`
  );
}

async function createProduct(product: ProductJSON) {
  const colors = [
    COLORS[getRandomInt(0, COLORS.length)],
    COLORS[getRandomInt(0, COLORS.length)],
    COLORS[getRandomInt(0, COLORS.length)],
  ];

  product.colors = colors;

  await prisma.product.upsert({
    where: { id: product.id },
    update: {},
    create: {
      id: product.id,
      name: product.name,
      brand: product.brand,
      discount: product.discount,
      originalPrice: product.original_price,
      discountedPrice: product.discounted_price,
      rating: product.rating,
      ratingCount: product.rating_count,
      category: {
        connectOrCreate: {
          where: { category: product.category },
          create: { category: product.category },
        },
      },
      images: {
        connectOrCreate: product.images.map((image) => ({
          where: { image },
          create: { image },
        })),
      },
      colors: {
        connectOrCreate: product.colors.map((color) => ({
          where: { color },
          create: { color },
        })),
      },
      sizes: {
        connectOrCreate: product.sizes.map((size) => ({
          where: { size },
          create: { size },
        })),
      },
      tags: {
        connectOrCreate: product.tags.map((tag) => ({
          where: { tag },
          create: { tag },
        })),
      },
    },
  });
}

async function createReview(review: ReviewJSON, productId: string) {
  const email = `${review.reviewer_name.replace(' ', '.')}@gmail.com`;
  await prisma.review.create({
    data: {
      rating: review.review_rating,
      review: review.review,
      reviewer: {
        connectOrCreate: {
          where: { email },
          create: {
            name: review.reviewer_name,
            email,
            password: 'password',
          },
        },
      },
      product: { connect: { id: productId } },
    },
  });
}

function mapFunc(product: ProductJSON) {
  // Convert rating string to number
  product.rating = parseFloat(`${product.rating}`);

  // Convert rating_count string to number
  const temp = `${product.rating_count}`.split(' ')[0];
  const count = temp.endsWith('k') ? parseFloat(temp) * 1000 : parseInt(temp);
  product.rating_count = count;

  // Convert discount string to number
  const discount = parseInt(`${product.discount}`.replace('(', ''));
  product.discount = discount;

  // Remove unnecessary data from size
  const sizes = product.sizes.map((size) => size.split(' ')[0]);
  product.sizes = sizes;

  // Convert original_price string to number
  const original_price = parseInt(`${product.original_price}`.split(' ')[1]);
  product.original_price = original_price;

  // Convert discounted_price string to number
  const discounted_price = parseInt(
    `${product.discounted_price}`.split(' ')[1]
  );
  product.discounted_price = discounted_price;

  // Convert review_rating string to number
  product.reviews = product.reviews.map((review) => {
    review.review_rating = parseFloat(`${review.review_rating}`);
    return review;
  });

  return product;
}

function getRandomInt(min: number, max: number) {
  min = Math.ceil(min);
  max = Math.floor(max);

  // The maximum is exclusive and the minimum is inclusive
  return Math.floor(Math.random() * (max - min) + min);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
