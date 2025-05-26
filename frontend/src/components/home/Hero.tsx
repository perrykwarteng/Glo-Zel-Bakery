import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Wheat, ChefHat, Clock } from "lucide-react";
import Bread from "../../asset/bread.png";

const Hero: React.FC = () => {
  return (
    <section className="relative min-h-screen bg-gradient-to-b from-wheat-50 to-wheat-100">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/1070946/pexels-photo-1070946.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')] bg-cover bg-center opacity-10"></div>
        <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-wheat-50 to-transparent"></div>
      </div>

      <div className="container-custom relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-screen py-10">
          <div className="animate-rise">
            <h1 className="font-display text-5xl lg:text-7xl font-bold text-gray-900 leading-tight mb-6">
              Glo-Zel Bread, <span className="text-[#f59e0b]">Crafted</span>{" "}
              with Passion
            </h1>

            <p className="text-lg text-brown-700 mb-8 max-w-xl leading-relaxed">
              Experience the perfect blend of traditional baking methods and
              modern creativity. Every loaf tells a story of dedication and
              craftsmanship.
            </p>

            <div className="flex flex-wrap gap-6 mb-12">
              <Link to="/order" className="btn-primary text-lg">
                Order Now
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </div>

            <div className="grid grid-cols-3 gap-6">
              <div className="bg-white/80 backdrop-blur-sm p-4 rounded-lg">
                <ChefHat className="w-8 h-8 text-orange-500 mb-2" />
                <h3 className="font-medium text-brown-800">Master Bakers</h3>
                <p className="text-sm text-brown-600">Expert artisans</p>
              </div>
              <div className="bg-white/80 backdrop-blur-sm p-4 rounded-lg">
                <Wheat className="w-8 h-8 text-red-600 mb-2" />
                <h3 className="font-medium text-brown-800">Fresh Daily</h3>
                <p className="text-sm text-brown-600">Baked every morning</p>
              </div>
              <div className="bg-white/80 backdrop-blur-sm p-4 rounded-lg">
                <Clock className="w-8 h-8 text-orange-500 mb-2" />
                <h3 className="font-medium text-brown-800">Fast Delivery</h3>
                <p className="text-sm text-brown-600">Same day possible</p>
              </div>
            </div>
          </div>

          <div className="relative hidden lg:block">
            <div className="absolute -top-12 -left-12 w-64 h-64 bg-red-600/10 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-12 -right-12 w-64 h-64 bg-orange-500/10 rounded-full blur-3xl"></div>
            <img
              src={Bread}
              alt="Fresh artisan bread"
              className="w-full h-[600px] object-cover rounded-2xl shadow-2xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
