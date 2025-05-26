import { BreadProduct } from "../types/product";

import wheatBread from "../asset/WheatBread.jpg";
import sugarBread from "../asset/SugarBread.jpg";
import brownBread from "../asset/brownbread.jpg";
import teaBread from "../asset/teaBread.jpg";
import butterBread from "../asset/butterbread.jpg";
import cakeBread from "../asset/cakebread.jpg";
export const products: BreadProduct[] = [
  {
    id: 1,
    name: "Wheat Bread",
    description:
      "Nutritious and hearty, our wheat bread is made with whole grain flour for a healthy, satisfying bite.",
    price: 6.0,
    image: wheatBread,
    featured: true,
  },
  {
    id: 2,
    name: "Sugar Bread",
    description:
      "Sweet and soft, our sugar bread is a favorite for breakfast or snacking. Slightly golden crust with a rich, sweet flavor.",
    price: 6.5,
    image: sugarBread,
    featured: true,
  },
  {
    id: 3,
    name: "Brown Bread",
    description:
      "Made with a blend of whole wheat and bran, this bread is perfect for those who love a slightly nutty taste and soft texture.",
    price: 6.0,
    image: brownBread,
    featured: true,
  },
  {
    id: 4,
    name: "Tea Bread",
    description:
      "A local favorite, our soft and slightly sweet tea bread pairs perfectly with hot beverages or spread with butter.",
    price: 5.0,
    image: teaBread,
    featured: true,
  },
  {
    id: 5,
    name: "Butter Bread",
    description:
      "Rich and fluffy with a golden crust, our butter bread is baked with real butter for a deliciously tender loaf.",
    price: 6.5,
    image: butterBread,
    featured: true,
  },
  {
    id: 6,
    name: "Cake Bread",
    description:
      "The perfect blend of bread and cake — soft, rich, and slightly sweet, ideal as a treat or dessert bread.",
    price: 7.0,
    image: cakeBread,
    featured: true,
  },
];

// Get featured products
export const getFeaturedProducts = (): BreadProduct[] => {
  return products.filter((product) => product.featured);
};
