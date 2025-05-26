import React from "react";
import { Link } from "react-router-dom";
import { BreadProduct } from "../../types/product";

interface ProductCardProps {
  product: BreadProduct;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <Link
      to={`/`}
      className="bread-card group bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300"
    >
      <div className="relative h-56 overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
      </div>
      <div className="p-4">
        <div className="flex justify-between items-start">
          <h3 className="font-display text-lg font-bold text-[#b71c1c] mb-1">
            {product.name}
          </h3>
        </div>
        <p className="text-[#021729] text-sm mb-3 line-clamp-2">
          {product.description}
        </p>
      </div>
    </Link>
  );
};

export default ProductCard;
