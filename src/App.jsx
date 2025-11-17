import React, { useState } from 'react';

// BYD Motor Hubs - Single-file React app (App.jsx)
// - Tailwind CSS classes used (assumed available)
// - Responsive, accessible, modern layout for a dealership site
// - Placeholder images are used via placehold.co and fallbacks for reliability.
// - Navigation is handled via React state.

const CARS = [
  { id: 1, name: "BYD Atto 3", range: "250-315 mi", price: "$29,990", availableInUSA: true, img: "https://placehold.co/600x400/8b5cf6/ffffff?text=Atto+3" },
  { id: 2, name: "BYD Dolphin", range: "200-280 mi", price: "$21,990", availableInUSA: true, img: "https://placehold.co/600x400/10b981/ffffff?text=Dolphin" },
  { id: 3, name: "BYD Seal", range: "300-360 mi", price: "$35,990", availableInUSA: false, img: "https://placehold.co/600x400/ef4444/ffffff?text=Seal" },
  { id: 4, name: "BYD Han", range: "320-380 mi", price: "$39,990", availableInUSA: false, img: "https://placehold.co/600x400/f97316/ffffff?text=Han" },
  { id: 5, name: "BYD Qin PLUS", range: "200-330 mi", price: "$25,990", availableInUSA: false, img: "https://placehold.co/600x400/06b6d4/ffffff?text=Qin+PLUS" },
  { id: 6, name: "BYD Tang", range: "260-340 mi", price: "$41,900", availableInUSA: false, img: "https://placehold.co/600x400/3b82f6/ffffff?text=Tang" },
  { id: 7, name: "BYD Yuan Plus", range: "180-240 mi", price: "$19,990", availableInUSA: true, img: "https://placehold.co/600x400/c026d3/ffffff?text=Yuan+Plus" },
  { id: 8, name: "BYD Song Pro", range: "210-290 mi", price: "$23,490", availableInUSA: false, img: "https://placehold.co/600x400/059669/ffffff?text=Song+Pro" },
  { id: 9, name: "BYD e6 (Van)", range: "150-200 mi", price: "$18,500", availableInUSA: false, img: "https://placehold.co/600x400/7c3aed/ffffff?text=e6" },
  { id: 10, name: "BYD DOLPHIN Sport", range: "220-300 mi", price: "$24,990", availableInUSA: false, img: "https://placehold.co/600x400/fbbf24/ffffff?text=Dolphin+Sport" },
  { id: 11, name: "BYD Seal U", range: "280-340 mi", price: "$37,990", availableInUSA: false, img: "https://placehold.co/600x400/e11d48/ffffff?text=Seal+U" },
  { id: 12, name: "BYD Atto GT", range: "270-330 mi", price: "$33,990", availableInUSA: false, img: "https://placehold.co/600x400/22c3e3/ffffff?text=Atto+GT" },
  { id: 13, name: "BYD e5", range: "160-210 mi", price: "$17,990", availableInUSA: false, img: "https://placehold.co/600x400/4f46e5/ffffff?text=e5" },
  { id: 14, name: "BYD L3 Sedan", range: "180-230 mi", price: "$16,990", availableInUSA: false, img: "https://placehold.co/600x400/be123c/ffffff?text=L3+Sedan" },
  { id: 15, name: "BYD Blade Concept", range: "—", price: "TBD", availableInUSA: false, img: "https://placehold.co/600x400/d97706/ffffff?text=Blade+Concept" }
];

// Fallback placeholder image URL
const FALLBACK_IMAGE = "https://placehold.co/600x400/94a3b8/ffffff?text=BYD+Image";

function Nav({ current, onChange }) {
  const pages = ['Home', 'Inventory', 'Pre-Order', 'About', 'Contact'];

  return (
    <nav className="bg-white sticky top-0 z-10 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          
          {/* Logo/Brand */}
          <div className="flex items-center gap-2">
            <div className="text-red-600 font-extrabold text-xl tracking-wider">BYD HUBS</div>
            <span className="hidden sm:inline text-xs text-gray-500 border-l pl-2">Official Dealer</span>
          </div>

          {/* Navigation Links (Mobile/Desktop) */}
          <div className="flex overflow-x-auto whitespace-nowrap -mx-2 sm:mx-0 p-2 sm:p-0">
            {pages.map((p) => (
              <button
                key={p}
                onClick={() => onChange(p)}
                className={`flex-shrink-0 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 mx-1
                  ${current === p 
                    ? 'bg-red-600 text-white shadow-lg' 
                    : 'text-red-700 hover:bg-red-50 hover:text-red-800'}`
                }>
                {p}
              </button>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}

function Hero({ onChange }) {
  return (
    <header className="bg-gray-100 dark:bg-gray-800">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8 flex flex-col-reverse md:flex-row items-center gap-8">
        
        <div className="flex-1 text-center md:text-left">
          <h1 className="text-3xl sm:text-5xl font-extrabold text-gray-900 dark:text-white leading-tight">
            Drive Your Electric Future with <span className="text-red-600">BYD</span>
          </h1>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-300 max-w-xl mx-auto md:mx-0">
            Explore BYD's full lineup, reserve upcoming models, and schedule a test drive today at your local Motor Hub.
          </p>
          <div className="mt-8 flex justify-center md:justify-start gap-4">
            <button 
                onClick={() => onChange('Inventory')}
                className="inline-flex items-center px-8 py-3 bg-red-600 text-white rounded-xl text-base font-semibold shadow-xl hover:bg-red-700 transition-colors">
              View Inventory
            </button>
            <button 
                onClick={() => onChange('Pre-Order')}
                className="inline-flex items-center px-8 py-3 border-2 border-red-600 text-red-600 rounded-xl text-base font-semibold hover:bg-red-50 transition-colors">
              Reserve a Model
            </button>
          </div>
        </div>

        {/* Hero Image Block */}
        <div className="w-full md:w-1/2 p-4 bg-white dark:bg-gray-900 rounded-3xl shadow-2xl transform hover:scale-[1.01] transition-transform duration-500">
          <img 
            src="https://placehold.co/800x450/334155/ffffff?text=BYD+Hero+Car+Showcase" 
            alt="BYD Car Showcase" 
            className="w-full h-56 object-cover rounded-2xl" 
            onError={(e) => { e.target.src = FALLBACK_IMAGE; }}
          />
          <div className="mt-4 text-xs text-gray-500 text-center">
            Placeholder image. Replace with a high-quality photo of the BYD Atto 3 or Seal.
          </div>
        </div>
      </div>
    </header>
  );
}

function Card({ car }){
  return (
    <article className="bg-white shadow-lg rounded-xl overflow-hidden border border-gray-100 transform hover:shadow-2xl hover:-translate-y-1 transition duration-300">
      
      {/* Image with fallback */}
      <div className="h-44 bg-gray-100 flex items-center justify-center">
        <img 
          src={car.img} 
          alt={car.name} 
          className="object-cover h-full w-full" 
          onError={(e) => { e.target.src = FALLBACK_IMAGE; }} 
        />
      </div>

      <div className="p-5">
        <h3 className="text-xl font-bold text-gray-900">{car.name}</h3>
        <p className="text-sm text-gray-500 mt-2">
          Range: <span className="font-medium text-gray-700">{car.range}</span>
        </p>
        <p className="text-sm text-gray-500">
          Starting Price: <span className="font-medium text-red-600">{car.price}</span>
        </p>
        
        <div className="mt-4 flex items-center justify-between pt-3 border-t border-gray-100">
          {/* Status Chip (FIXED SYNTAX HERE) */}
          <span 
            className={`text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider 
              ${car.availableInUSA 
                ? 'bg-green-100 text-green-700' 
                : 'bg-yellow-100 text-yellow-800'}`
            }>
            {car.availableInUSA ? 'In Stock' : 'Future/Pre-Order'}
          </span>
          
          <div className="flex gap-2">
            <button className="px-4 py-1.5 text-sm border rounded-full border-red-600 text-red-600 hover:bg-red-50 transition-colors">
              Details
            </button>
            <button className="px-4 py-1.5 text-sm rounded-full bg-red-600 text-white hover:bg-red-700 transition-colors">
              Contact
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}

function Inventory(){
  const availableCars = CARS.filter(c => c.availableInUSA);
  return (
    <section id="inventory" className="max-w-7xl mx-auto px-4 py-12 sm:py-16">
      <h2 className="text-3xl font-bold text-gray-900 border-b-2 border-red-600 inline-block pb-1">Current Inventory</h2>
      <p className="text-gray-600 mt-3 max-w-2xl">
        The models below are currently available in the U.S. and ready for immediate delivery.
      </p>

      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {availableCars.length > 0 ? (
          availableCars.map(car => (
            <Card key={car.id} car={car} />
          ))
        ) : (
          <p className="text-lg text-gray-500 col-span-full py-8 text-center">
            No models currently available for immediate purchase. Please check the Pre-Order section.
          </p>
        )}
      </div>
    </section>
  );
}

function PreOrder(){
  const preOrderCars = CARS.filter(c => !c.availableInUSA);
  return (
    <section id="preorder" className="max-w-7xl mx-auto px-4 py-12 sm:py-16 bg-red-50 rounded-2xl my-6 shadow-inner">
      <h2 className="text-3xl font-bold text-red-700 border-b-2 border-red-700 inline-block pb-1">Upcoming Models & Pre-Orders</h2>
      <p className="text-gray-700 mt-3 max-w-2xl">
        These future models are not yet certified for the U.S. market. Place a fully refundable deposit today to secure your place in line.
      </p>

      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {preOrderCars.map(car => (
          <article key={car.id} className="bg-white rounded-xl shadow-lg border p-4 transition-transform hover:scale-[1.02] duration-300">
            <div className="h-40 bg-gray-100 flex items-center justify-center rounded-lg overflow-hidden">
              <img 
                src={car.img} 
                alt={car.name} 
                className="object-cover h-full w-full" 
                onError={(e) => { e.target.src = FALLBACK_IMAGE; }} 
              />
            </div>
            <div className="mt-4">
              <h3 className="font-bold text-xl text-gray-900">{car.name}</h3>
              <p className="text-sm text-gray-500 mt-1">Expected Range: {car.range} • Est. Price: {car.price}</p>
              <div className="mt-4 flex gap-3">
                <button className="flex-1 py-2 rounded-full border border-red-600 text-red-600 text-sm font-semibold hover:bg-red-50 transition-colors">
                  Reserve Now
                </button>
                <button className="flex-1 py-2 rounded-full bg-red-600 text-white text-sm font-semibold hover:bg-red-700 transition-colors">
                  Full Details
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>

      <div className="mt-12 p-6 bg-red-100 rounded-lg border border-red-200">
        <h4 className="font-bold text-lg text-red-800">Reservation Process</h4>
        <ul className="list-disc ml-5 text-gray-700 mt-2 text-sm space-y-1">
          <li>A small, refundable deposit (typically $500) secures your spot.</li>
          <li>We will notify you immediately once the car is certified and a delivery window is confirmed.</li>
          <li>Deposits are fully applied to the final purchase price.</li>
        </ul>
      </div>
    </section>
  );
}

function About(){
  return (
    <section className="max-w-7xl mx-auto px-4 py-12 sm:py-16">
      <h2 className="text-3xl font-bold text-gray-900 border-b-2 border-red-600 inline-block pb-1">Our Commitment to Electrification</h2>
      <p className="text-gray-600 mt-3 max-w-2xl">
        BYD Motor Hubs is dedicated to promoting sustainable transportation. We are an authorized partner bringing BYD's innovative and affordable electric vehicle line to local drivers.
      </p>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Mission Card */}
        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
          <h3 className="font-bold text-xl text-red-600">Our Mission</h3>
          <p className="text-gray-700 mt-3">To make cutting-edge, affordable electric vehicles accessible to everyone, backed by trusted local service and support.</p>
        </div>
        
        {/* Location Card */}
        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
          <h3 className="font-bold text-xl text-red-600">Visit Us</h3>
          <address className="not-italic text-gray-700 mt-3">
            <strong>BYD Motor Hubs Main Office</strong><br />
            123 Electric Avenue, Suite 100<br />
            Charge City, CA 90210
          </address>
        </div>
        
        {/* Hours Card */}
        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
          <h3 className="font-bold text-xl text-red-600">Hours of Operation</h3>
          <p className="text-gray-700 mt-3">
            Monday - Friday: 9:00 AM – 7:00 PM<br />
            Saturday: 10:00 AM – 5:00 PM<br />
            Sunday: Closed
          </p>
        </div>
      </div>
    </section>
  );
}

function Contact(){
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isError, setIsError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsError(false);
    
    // Simulate API call delay
    setTimeout(() => {
        // In a real application, you'd handle form data submission here.
        // For this demo, we assume success.
        console.log("Form data simulated to be sent:", new FormData(e.target));
        setIsSubmitted(true);

        // Optionally reset the form after successful submission
        e.target.reset(); 

        // Hide success message after a few seconds
        setTimeout(() => setIsSubmitted(false), 5000);
    }, 500);
  };
  
  return (
    <section id="contact" className="max-w-7xl mx-auto px-4 py-12 sm:py-16">
      <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 p-6 sm:p-10">
        <h2 className="text-3xl font-bold text-gray-900 border-b-2 border-red-600 inline-block pb-1">Get in Touch</h2>
        <p className="text-gray-600 mt-3">
          Book a test drive, request a quote, or ask any questions about BYD's electric lineup.
        </p>

        {isSubmitted && (
            <div className="mt-4 p-4 bg-green-100 text-green-800 border border-green-200 rounded-lg font-medium" role="alert">
                Thank you! Your message has been sent successfully. We will be in touch soon.
            </div>
        )}
        
        {isError && (
            <div className="mt-4 p-4 bg-red-100 text-red-800 border border-red-200 rounded-lg font-medium" role="alert">
                Oops! There was an error sending your message. Please try again or call us directly.
            </div>
        )}

        <form className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-6" onSubmit={handleSubmit}>
          
          <input 
            required 
            name="name" 
            placeholder="Full name" 
            className="p-3 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500 transition-colors" 
          />
          <input 
            required 
            name="email" 
            type="email" 
            placeholder="Email address" 
            className="p-3 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500 transition-colors" 
          />
          <input 
            name="phone" 
            placeholder="Phone number (optional)" 
            className="p-3 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500 transition-colors" 
          />
          <select 
            required
            name="interest" 
            className="p-3 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500 transition-colors bg-white appearance-none"
          >
            <option value="" disabled selected>Select Inquiry Type *</option>
            <option>Schedule a Test Drive</option>
            <option>Request Pricing / Quote</option>
            <option>Pre-Order Reservation Inquiry</option>
            <option>General Support</option>
          </select>
          <textarea 
            required
            name="message" 
            placeholder="Your detailed message..." 
            className="p-3 border border-gray-300 rounded-lg col-span-1 sm:col-span-2 focus:ring-red-500 focus:border-red-500 transition-colors" 
            rows={5}
          ></textarea>
          
          <div className="col-span-1 sm:col-span-2 flex justify-end">
            <button 
              type="submit" 
              className="px-8 py-3 bg-red-600 text-white rounded-full font-semibold text-lg shadow-xl hover:bg-red-700 transition-all duration-300"
              disabled={isSubmitted}
            >
              {isSubmitted ? 'Message Sent!' : 'Send Message'}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

export default function App(){ 
  const [page, setPage] = useState('Home');

  // Simple state-based navigation mapping
  const renderPage = () => {
    switch (page) {
      case 'Inventory':
        return <Inventory />;
      case 'Pre-Order':
        return <PreOrder />;
      case 'About':
        return <About />;
      case 'Contact':
        return <Contact />;
      case 'Home':
      default:
        return (
          <main>
            <Inventory />
            <PreOrder />
            <About />
            <Contact />
          </main>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 font-sans">
      <Nav current={page} onChange={setPage} />
      <Hero onChange={setPage} />
      
      {/* Conditionally render main content based on page state */}
      <main className="pb-12">
        {renderPage()}
      </main>

      <footer className="border-t mt-12 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 py-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-sm text-gray-400">
            © {new Date().getFullYear()} BYD Motor Hubs. All rights reserved.
          </div>
          <div className="flex gap-4">
            <a href="#" className="text-sm text-red-400 hover:text-red-500 transition-colors">Privacy Policy</a>
            <a href="#" className="text-sm text-red-400 hover:text-red-500 transition-colors">Terms of Use</a>
          </div>
        </div>
      </footer>
    </div>
  );
   }
