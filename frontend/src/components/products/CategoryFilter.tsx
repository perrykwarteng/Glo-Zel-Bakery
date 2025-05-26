import React from "react";

interface CategoryFilterProps {
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({}) => {
 

  return (
    <div className="mb-8 overflow-x-auto pb-2">
      <div className="flex space-x-2 min-w-max">
        {/* {categories.map((category) => (
          <button
            key={category}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
              selectedCategory === category
                ? 'bg-brown-700 text-white'
                : 'bg-wheat-100 text-brown-700 hover:bg-wheat-200'
            }`}
            onClick={() => onSelectCategory(category)}
          >
            {formatCategoryName(category)}
          </button>
        ))} */}
      </div>
    </div>
  );
};

export default CategoryFilter;
