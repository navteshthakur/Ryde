import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faTwitter, faInstagram, faLinkedinIn } from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
    return (
        <footer className="bg-gray-800 text-white py-12 px-6 mt-8">
            <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 text-center md:text-left">
                {/* Column 1: About Section */}
                <div className="space-y-4">
                    <h3 className="text-lg font-bold">About Us</h3>
                    <p className="text-sm text-gray-400 leading-relaxed">
                        Welcome to Ryde, your go-to platform for creating and managing rides. Whether you're commuting or traveling, we make it convenient for you.
                    </p>
                </div>

                {/* Column 2: Quick Links */}
                <div className="space-y-4">
                    <h3 className="text-lg font-bold">Quick Links</h3>
                    <ul className="space-y-3">
                        <li>
                            <a href="/" className="hover:underline hover:text-[#a04d4d] transition">Home</a>
                        </li>
                        <li>
                            <a href="/createride" className="hover:underline hover:text-[#a04d4d] transition">Create a Ride</a>
                        </li>
                        <li>
                            <a href="/viewride" className="hover:underline hover:text-[#a04d4d] transition">View Rides</a>
                        </li>
                        <li>
                            <a href="/contact" className="hover:underline hover:text-[#a04d4d] transition">Contact Us</a>
                        </li>
                    </ul>
                </div>

                {/* Column 3: Contact Info */}
                <div className="space-y-4">
                    <h3 className="text-lg font-bold">Contact Us</h3>
                    <p className="text-sm text-gray-400">
                        123 Ryde Avenue, Toronto, Canada
                    </p>
                    <p className="text-sm text-gray-400">
                        Email: <a href="mailto:navtesht@ryde.com" className="hover:underline hover:text-[#a04d4d]">navtesht@ryde.com</a>
                    </p>
                    <p className="text-sm text-gray-400">
                        Phone: +123 456 7890
                    </p>
                </div>
            </div>

            {/* Divider */}
            <div className="border-t border-gray-700 my-8 mx-6"></div>

            {/* Social Media Links */}
            <div className="flex justify-center space-x-8 mb-6">
                <a href="#" className="text-gray-400 hover:text-[#a04d4d] transition text-xl">
                    <FontAwesomeIcon icon={faFacebookF} />
                </a>
                <a href="#" className="text-gray-400 hover:text-[#a04d4d] transition text-xl">
                    <FontAwesomeIcon icon={faTwitter} />
                </a>
                <a href="#" className="text-gray-400 hover:text-[#a04d4d] transition text-xl">
                    <FontAwesomeIcon icon={faInstagram} />
                </a>
                <a href="#" className="text-gray-400 hover:text-[#a04d4d] transition text-xl">
                    <FontAwesomeIcon icon={faLinkedinIn} />
                </a>
            </div>

            {/* Footer Bottom */}
            <div className="text-center text-gray-500 text-sm">
                © {new Date().getFullYear()} Ryde. All rights reserved.
            </div>
        </footer>
    );
};

export default Footer;
