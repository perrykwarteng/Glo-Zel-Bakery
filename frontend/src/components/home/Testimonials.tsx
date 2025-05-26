import React from "react";
import { Star } from "lucide-react";

interface Testimonial {
  id: number;
  name: string;
  quote: string;
  rating: number;
  image?: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Sarah Johnson",
    quote:
      "The sourdough bread is exceptional! It has the perfect balance of tang and depth. I've tried many bakeries, but Glo-Zel Bakery is my absolute favorite.",
    rating: 5,
  },
  {
    id: 2,
    name: "Michael Chen",
    quote:
      "Their whole wheat loaf has transformed my morning toast routine. It's hearty, nutritious, and has an incredible depth of flavor you just can't find in store-bought bread.",
    rating: 5,
  },
  {
    id: 3,
    name: "Emma Rodriguez",
    quote:
      "I ordered a selection of breads for a dinner party and my guests couldn't stop raving about them. The cranberry walnut loaf was the star of the show!",
    rating: 4,
  },
];

const Testimonials: React.FC = () => {
  return (
    <section className="py-16 bg-wheat-100">
      <div className="container-custom">
        <h2 className="font-display text-3xl text-center text-[#b71c1c] mb-10">
          What Our Customers Say
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < testimonial.rating
                        ? "text-wheat-600 fill-wheat-600"
                        : "text-wheat-300"
                    }`}
                  />
                ))}
              </div>

              <p className="text-brown-700 italic mb-4">
                "{testimonial.quote}"
              </p>

              <div className="flex items-center">
                <div className="w-10 h-10 bg-wheat-200 rounded-full flex items-center justify-center text-[#021729] font-medium">
                  {testimonial.name.charAt(0)}
                </div>
                <div className="ml-3">
                  <p className="font-medium text-[#021729]">
                    {testimonial.name}
                  </p>
                  <p className="text-xs text-brown-900">Verified Customer</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
