import React from 'react';
import { Link } from 'react-router-dom';
import { FaLeaf, FaChartLine, FaThermometerHalf, FaTint } from 'react-icons/fa';

const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      {/* Hero Section */}
      <section className="container mx-auto px-6 py-16 md:py-24">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-6">
              Monitor Your Plant Health
              <span className="text-green-600"> In Real-Time</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Track soil conditions, monitor plant health, and optimize growth with our comprehensive dashboard solution.
            </p>
            <Link
              to="/soil-data"
              className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-lg transition duration-300"
            >
              Get Started
            </Link>
          </div>
          <div className="md:w-1/2 mt-12 md:mt-0">
            <img 
              src="/plant-monitoring.svg" 
              alt="Plant Monitoring"
              className="w-full h-auto"
            />
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="bg-green-50 p-6 rounded-xl text-center">
              <div className="text-green-600 text-4xl mb-4">98%</div>
              <div className="text-gray-700">Accuracy Rate</div>
            </div>
            <div className="bg-green-50 p-6 rounded-xl text-center">
              <div className="text-green-600 text-4xl mb-4">24/7</div>
              <div className="text-gray-700">Monitoring</div>
            </div>
            <div className="bg-green-50 p-6 rounded-xl text-center">
              <div className="text-green-600 text-4xl mb-4">10k+</div>
              <div className="text-gray-700">Plants Monitored</div>
            </div>
            <div className="bg-green-50 p-6 rounded-xl text-center">
              <div className="text-green-600 text-4xl mb-4">15+</div>
              <div className="text-gray-700">Sensor Types</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
          Key Features
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition duration-300">
            <div className="text-green-600 text-3xl mb-4">
              <FaLeaf />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              Soil Analysis
            </h3>
            <p className="text-gray-600">
              Real-time monitoring of soil moisture, pH levels, and nutrients
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition duration-300">
            <div className="text-green-600 text-3xl mb-4">
              <FaChartLine />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              Growth Tracking
            </h3>
            <p className="text-gray-600">
              Track plant growth patterns and health indicators over time
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition duration-300">
            <div className="text-green-600 text-3xl mb-4">
              <FaThermometerHalf />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              Temperature Control
            </h3>
            <p className="text-gray-600">
              Monitor and maintain optimal growing temperatures
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition duration-300">
            <div className="text-green-600 text-3xl mb-4">
              <FaTint />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              Humidity Tracking
            </h3>
            <p className="text-gray-600">
              Keep track of ambient humidity levels for optimal growth
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-green-600 py-16">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-white mb-8">
            Ready to optimize your plant health?
          </h2>
          <Link
            to="/soil-data"
            className="bg-white text-green-600 font-bold py-3 px-8 rounded-lg hover:bg-gray-100 transition duration-300"
          >
            View Soil Data Dashboard
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;