import React, { useState } from "react";
import { Phone, MapPin, Send } from "lucide-react";

const Contact: React.FC = () => {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormState({ name: "", email: "", message: "" });

      setTimeout(() => {
        setIsSubmitted(false);
      }, 5000);
    }, 1500);
  };

  return (
    <section id="contact" className="py-16 bg-wheat-50">
      <div className="container-custom">
        <h2 className="font-display text-3xl text-center text-[#b71c1c] mb-10">
          Get In Touch
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="bg-white p-8 rounded-lg shadow-md">
            {isSubmitted ? (
              <div className="text-center py-8 animate-rise">
                <div className="mx-auto w-16 h-16 bg-success-500 rounded-full flex items-center justify-center mb-4">
                  <Send className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-display text-xl text-brown-800 mb-2">
                  Thank You!
                </h3>
                <p className="text-brown-600">
                  Your message has been sent. We'll get back to you soon.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-brown-700 mb-1"
                  >
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formState.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-wheat-300 rounded-md focus:outline-none focus:ring-2 focus:ring-wheat-500"
                  />
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-brown-700 mb-1"
                  >
                    Your Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formState.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-wheat-300 rounded-md focus:outline-none focus:ring-2 focus:ring-wheat-500"
                  />
                </div>

                <div className="mb-6">
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-brown-700 mb-1"
                  >
                    Your Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    value={formState.message}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-wheat-300 rounded-md focus:outline-none focus:ring-2 focus:ring-wheat-500"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`btn-primary w-full py-3 ${
                    isSubmitting ? "opacity-75 cursor-not-allowed" : ""
                  }`}
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </button>
              </form>
            )}
          </div>

          <div>
            <p className="text-brown-700 mb-8 leading-relaxed">
              Have questions about our products, orders, or just want to say
              hello? We'd love to hear from you! Reach out through the form or
              using the contact information below.
            </p>

            <div className="space-y-6">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <MapPin className="w-6 h-6 text-[#f59e0b] mt-1" />
                </div>
                <div className="ml-4">
                  <h3 className="font-medium text-[#021729] mb-1">
                    Our Bakery
                  </h3>
                  <p className="text-brown-900">Israel Yellow House, Accra</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <Phone className="w-6 h-6 text-[#f59e0b] mt-1" />
                </div>
                <div className="ml-4">
                  <h3 className="font-medium text-[#021729] mb-1">Phone</h3>
                  <p className="text-brown-900">
                    0554099405 <br /> 0249607271
                  </p>
                </div>
              </div>

              {/* <div className="flex items-start">
                <div className="flex-shrink-0">
                  <Mail className="w-6 h-6 text-[#f59e0b] mt-1" />
                </div>
                <div className="ml-4">
                  <h3 className="font-medium text-brown-800 mb-1">Email</h3>
                  <p className="text-brown-600">hello@artisanbakery.com</p>
                </div>
              </div> */}

              <div>
                <h3 className="font-medium text-[#b71c1c] mb-2">Hours</h3>
                <div className="bg-wheat-100 p-4 rounded-md">
                  <div className="flex justify-between mb-2">
                    <span className="text-brown-900">Monday - Friday</span>
                    <span className="font-medium text-brown-900">
                      7:00 AM - 7:00 PM
                    </span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span className="text-brown-900">Saturday</span>
                    <span className="font-medium text-brown-900">
                      8:00 AM - 5:00 PM
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-brown-900">Sunday</span>
                    <span className="font-medium text-brown-900">
                      8:00 AM - 5:00 PM
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
