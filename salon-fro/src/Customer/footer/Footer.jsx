import React from "react";
import { FaInstagram, FaTwitter, FaMapMarkerAlt, FaPhone, FaEnvelope } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();

  const explore = [
    { label: "Home", path: "/" },
    { label: "Browse Salons", path: "/salons" },
    { label: "My Bookings", path: "/bookings" },
    { label: "Become a Partner", path: "/register" },
  ];

  const company = ["About Us", "Careers", "Privacy Policy", "Terms of Service"];

  return (
    <footer className="bg-[#1a1210] text-[#f4ede8] mt-20">
      <div className="max-w-7xl mx-auto px-6 py-14 grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Brand */}
        <div>
          <h2 className="text-2xl font-bold text-[#e8a87c]">Salon Service</h2>
          <p className="mt-3 text-sm text-[#c9bcb4] leading-relaxed">
            Discover and book beauty & wellness experiences near you — curated
            salons, trusted stylists, effortless booking.
          </p>
          <div className="flex gap-4 mt-5">
            <a href="#" aria-label="Instagram" className="hover:text-[#e8a87c] transition-colors">
              <FaInstagram size={20} />
            </a>
            <a href="#" aria-label="Twitter" className="hover:text-[#e8a87c] transition-colors">
              <FaTwitter size={20} />
            </a>
          </div>
        </div>

        {/* Explore */}
        <div>
          <h3 className="text-sm font-semibold tracking-wider uppercase text-[#e8a87c] mb-4">
            Explore
          </h3>
          <ul className="space-y-2 text-sm text-[#c9bcb4]">
            {explore.map((item) => (
              <li key={item.path}>
                <span
                  onClick={() => navigate(item.path)}
                  className="cursor-pointer hover:text-white transition-colors"
                >
                  {item.label}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Company */}
        <div>
          <h3 className="text-sm font-semibold tracking-wider uppercase text-[#e8a87c] mb-4">
            Company
          </h3>
          <ul className="space-y-2 text-sm text-[#c9bcb4]">
            {company.map((item) => (
              <li key={item}>
                <a href="#" className="hover:text-white transition-colors">
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-sm font-semibold tracking-wider uppercase text-[#e8a87c] mb-4">
            Get in Touch
          </h3>
          <ul className="space-y-3 text-sm text-[#c9bcb4]">
            <li className="flex items-center gap-2">
              <FaMapMarkerAlt size={16} className="text-[#e8a87c] shrink-0" />
              Cuttack, Odisha, India
            </li>
            <li className="flex items-center gap-2">
              <FaPhone size={16} className="text-[#e8a87c] shrink-0" />
              +91 91234 56780
            </li>
            <li className="flex items-center gap-2">
              <FaEnvelope size={16} className="text-[#e8a87c] shrink-0" />
              support@salonservice.com
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-[#3a2e29] py-5 text-center text-xs text-[#9a8b83]">
        © {new Date().getFullYear()} Salon Service. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;