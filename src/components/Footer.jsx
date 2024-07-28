import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaLinkedin, FaGithub, FaEnvelope } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="bg-teal-800 text-gray-100 py-10">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col sm:flex-row justify-between items-center">
                    <nav className="mb-6 sm:mb-0">
                        <ul className="flex space-x-6">
                            <li>
                                <NavLink to='/about' className="hover:text-blue-300">About us</NavLink>
                            </li>
                            <li>
                                <NavLink to='/contact' className="hover:text-blue-300">Contact</NavLink>
                            </li>
                        </ul>
                    </nav>
                    <div className="flex space-x-6">
                        <a href='https://www.linkedin.com/in/arijit-bouri/' target='_blank' rel='noopener noreferrer' className="hover:text-blue-300">
                            <FaLinkedin size={30} />
                        </a>
                        <a href='https://github.com/arijitbouri0' target='_blank' rel='noopener noreferrer' className="hover:text-blue-300">
                            <FaGithub size={30} />
                        </a>
                        <a href='mailto:arijitbouri0@gmail.com' target='_blank' rel='noopener noreferrer' className="hover:text-blue-300">
                            <FaEnvelope size={30} />
                        </a>
                    </div>
                </div>
                <div className="mt-6 text-center border-t border-blue-800 pt-6">
                    <p>© 2024 - All rights reserved by Arijit Bouri</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
