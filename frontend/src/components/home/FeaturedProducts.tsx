import React from "react";

import ProductGrid from "../products/ProductGrid";
import { getFeaturedProducts } from "../../data/products";

const FeaturedProducts: React.FC = () => {
  const featuredProducts = getFeaturedProducts();

  return (
    <section className="bg-wheat-50 py-16">
      <div className="container-custom">
        <div className="flex justify-between items-center mb-8">
          <h2 className="font-display text-3xl text-[#b71c1c]">
            Our Featured Breads
          </h2>
        </div>

        <ProductGrid products={featuredProducts} />
      </div>
    </section>
  );
};

export default FeaturedProducts;
