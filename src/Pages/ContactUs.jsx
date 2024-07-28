import React, { useState } from 'react';
import { FaInstagram, FaLinkedin, FaGithub, FaWizardsOfTheCoast } from 'react-icons/fa';
import emailjs from '@emailjs/browser'
import { ToastContainer,toast} from 'react-toastify';

const ContactForm = () => {
  const [formData,setFormData]=useState({
    name:"",
    email:"",
    message:""
  }
  )

  const handleChange=(event)=>{
    const {name,value}=event.target;
    setFormData({
      ...formData,
      [name]:value,
    });
  }
  const handleSubmit=(event)=>{
    event.preventDefault();

    emailjs.send('service_vg4gb1k', 'template_cozgudw', formData , 'mBNPOT6cCQkoJx-zC').then(
      (response) => {
        // console.log('SUCCESS!', response.status, response.text);
        setFormData({
          name:"",
          email:"",
          message:"",
        })
        toast.success("Thank you for your Message",{position:'top-center',autoClose:3000})
        
      },
      (error) => {
        toast.error(error,{position:'top-center',autoClose:3000})
        // console.log('FAILED...', error);
      },
    );
  }
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 py-28">
      <div className="bg-gray-800 text-white p-8 rounded-lg shadow-lg w-full max-w-lg md:max-w-2xl">
        <h2 className="text-2xl text-center mb-4">Contact Me</h2>
        <p className="text-center mb-6">
          Feel free to reach out to Me! Whether you have a question, feedback, or a collaboration proposal, we'd love to hear from you.
        </p>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <input
              type="text"
              placeholder="Name"
              className="p-2 bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
              name="name"
              id="name"
              required
              value={formData.name}
              onChange={handleChange}
            />
            <input
              type="email"
              placeholder="Email"
              className="p-2 bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
              name="email"
              id="email"
              required
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <textarea
            placeholder="Message"
            className="p-2 bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4 w-full"
            name="message"
            id="message"
            required
            value={formData.message}
            onChange={handleChange}
          ></textarea>
          <button
            type="submit"
            className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
          >
            Submit
          </button>
        </form>
        <div className="mt-8 text-center">
          <p>P.G. Men Students' Hall
          165/1, South Sinthee Road, Kolkata-700050</p>
          <div className="flex justify-center space-x-4 mt-4">
            <a href="https://www.instagram.com/imari_jit?igsh=YzljYTk10Dg3zg==" target='_blank' className="hover:text-blue-300">
            <FaInstagram size={30}/>
            </a>
            <a href='https://www.linkedin.com/in/arijit-bouri/' target='_blank' rel='noopener noreferrer' className="hover:text-blue-300">
              <FaLinkedin size={30} />
            </a>
            <a href='https://github.com/arijitbouri0' target='_blank' rel='noopener noreferrer' className="hover:text-blue-300">
              <FaGithub size={30} />
            </a>
          </div>
        </div>
      </div>
      <ToastContainer/>
    </div>
  );
};

export default ContactForm;
