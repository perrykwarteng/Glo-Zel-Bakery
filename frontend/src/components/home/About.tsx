import React from "react";

import profile from "../../../asset/Profile.jpg";
const About: React.FC = () => {
  return (
    <section id="about" className="py-16 bg-white">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1">
            <h2 className="font-display text-3xl text-[#b71c1c] mb-6">
              Our Baking Philosophy
            </h2>
            <p className="text-[#021729] mb-4 leading-relaxed">
              At Artisan Bakery, we believe that great bread requires time,
              patience, and respect for tradition. Our master bakers have spent
              years perfecting their craft, creating bread that honors
              centuries-old techniques while innovating for modern palates.
            </p>
            <p className="text-[#021729] mb-4 leading-relaxed">
              We source only the finest organic ingredients, supporting local
              farmers and sustainable agriculture. Our sourdough starter,
              lovingly maintained for over 20 years, gives our bread its
              distinctive flavor and character.
            </p>
            <p className="text-[#021729] mb-6 leading-relaxed">
              Each loaf is shaped by hand and allowed to develop naturally,
              without artificial additives or shortcuts. The result is bread
              with exceptional flavor, texture, and keeping quality—bread that
              nourishes both body and soul.
            </p>
            <div className="flex items-center space-x-6">
              <div className="text-center">
                <span className="block font-display text-4xl font-bold text-[#f59e0b]">
                  24
                </span>
                <span className="text-brown-900 text-sm">
                  Hour Fermentation
                </span>
              </div>
              <div className="text-center">
                <span className="block font-display text-4xl font-bold text-[#f59e0b]">
                  100%
                </span>
                <span className="text-brown-900 text-sm">Organic Flour</span>
              </div>
              <div className="text-center">
                <span className="block font-display text-4xl font-bold text-[#f59e0b]">
                  1995
                </span>
                <span className="text-brown-900 text-sm">Est. Since</span>
              </div>
            </div>
          </div>

          <div className="order-1 lg:order-2 relative">
            <div className="rounded-lg overflow-hidden shadow-xl">
              <img
                src={profile}
                alt="Baker shaping bread dough"
                className="w-full h-auto"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-wheat-100 rounded-full flex items-center justify-center p-4 shadow-lg">
              <div className="text-center">
                <span className="block font-display text-xl font-bold text-[#021729]">
                  Glo-Zel
                </span>
                <span className="block font-display text-sm text-brown-900">
                  Craftsmanship
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
