import React, { useState, useEffect } from 'react';

// BYD Motor Hubs - Single-file React app (App.jsx)
// - Tailwind CSS classes used (assumed available via CDN/build process)

const CARS = [
  // Added 'priceValue' for easy math in the purchase flow
  { id: 1, name: "BYD Atto 3", range: "250-315 mi", price: "$29,990", availableInUSA: true, img: "https://placehold.co/600x400/8b5cf6/ffffff?text=Atto+3", priceValue: 29990 },
  { id: 2, name: "BYD Dolphin", range: "200-280 mi", price: "$21,990", availableInUSA: true, img: "https://placehold.co/600x400/10b981/ffffff?text=Dolphin", priceValue: 21990 },
  { id: 3, name: "BYD Seal", range: "300-360 mi", price: "$35,990", availableInUSA: false, img: "https://placehold.co/600x400/ef4444/ffffff?text=Seal", priceValue: 35990 },
  { id: 4, name: "BYD Han", range: "320-380 mi", price: "$39,990", availableInUSA: false, img: "https://placehold.co/600x400/f97316/ffffff?text=Han", priceValue: 39990 },
  { id: 5, name: "BYD Qin PLUS", range: "200-330 mi", price: "$25,990", availableInUSA: false, img: "https://placehold.co/600x400/06b6d4/ffffff?text=Qin+PLUS", priceValue: 25990 },
  { id: 6, name: "BYD Tang", range: "260-340 mi", price: "$41,900", availableInUSA: false, img: "https://placehold.co/600x400/3b82f6/ffffff?text=Tang", priceValue: 41900 },
  { id: 7, name: "BYD Yuan Plus", range: "180-240 mi", price: "$19,990", availableInUSA: true, img: "https://placehold.co/600x400/c026d3/ffffff?text=Yuan+Plus", priceValue: 19990 },
  { id: 8, name: "BYD Song Pro", range: "210-290 mi", price: "$23,490", availableInUSA: false, img: "https://placehold.co/600x400/059669/ffffff?text=Song+Pro", priceValue: 23490 },
  { id: 9, name: "BYD e6 (Van)", range: "150-200 mi", price: "$18,500", availableInUSA: false, img: "https://placehold.co/600x400/7c3aed/ffffff?text=e6", priceValue: 18500 },
  { id: 10, name: "BYD DOLPHIN Sport", range: "220-300 mi", price: "$24,990", availableInUSA: false, img: "https://placehold.co/600x400/fbbf24/ffffff?text=Dolphin+Sport", priceValue: 24990 },
  { id: 11, name: "BYD Seal U", range: "280-340 mi", price: "$37,990", availableInUSA: false, img: "https://placehold.co/600x400/e11d48/ffffff?text=Seal+U", priceValue: 37990 },
  { id: 12, name: "BYD Atto GT", range: "270-330 mi", price: "$33,990", availableInUSA: false, img: "https://placehold.co/600x400/22c3e3/ffffff?text=Atto+GT", priceValue: 33990 },
  { id: 13, name: "BYD e5", range: "160-210 mi", price: "$17,990", availableInUSA: false, img: "https://placehold.co/600x400/4f46e5/ffffff?text=e5", priceValue: 17990 },
  { id: 14, name: "BYD L3 Sedan", range: "180-230 mi", price: "$16,990", availableInUSA: false, img: "https://placehold.co/600x400/be123c/ffffff?text=L3+Sedan", priceValue: 16990 },
  { id: 15, name: "BYD Blade Concept", range: "—", price: "TBD", availableInUSA: false, img: "https://placehold.co/600x400/d97706/ffffff?text=Blade+Concept", priceValue: 0 }
];

// Fallback placeholder image URL
const FALLBACK_IMAGE = "https://placehold.co/600x400/94a3b8/ffffff?text=BYD+Image";

// --- CORE UI COMPONENTS ---

function Nav({ current, onChange, purchaseActive }) {
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

          {/* Navigation Links (Mobile/Desktop) - Disabled when purchaseActive is true */}
          <div className="flex overflow-x-auto whitespace-nowrap -mx-2 sm:mx-0 p-2 sm:p-0">
            {pages.map((p) => (
              <button
                key={p}
                onClick={() => !purchaseActive && onChange(p)} // Navigation Guard
                disabled={purchaseActive}
                className={`flex-shrink-0 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 mx-1
                  ${current === p 
                    ? 'bg-red-600 text-white shadow-lg' 
                    : 'text-red-700 hover:bg-red-50 hover:text-red-800'}
                  ${purchaseActive ? 'opacity-50 cursor-not-allowed' : ''}` // Styling for disabled state
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

function Card({ car, onPurchase }){
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
          {/* Status Chip */}
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
            {/* UPDATED: Purchase Button added */}
            {car.availableInUSA && (
                <button 
                  onClick={() => onPurchase(car)}
                  className="px-4 py-1.5 text-sm rounded-full bg-red-600 text-white hover:bg-red-700 transition-colors font-semibold">
                  Purchase
                </button>
            )}
            {!car.availableInUSA && (
                <button 
                  className="px-4 py-1.5 text-sm rounded-full bg-red-600 text-white hover:bg-red-700 transition-colors font-semibold">
                  Contact
                </button>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}

function Inventory({ onPurchase }){
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
            // Pass onPurchase to Card
            <Card key={car.id} car={car} onPurchase={onPurchase} />
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
        console.log("Form data simulated to be sent:", new FormData(e.target));
        setIsSubmitted(true);
        e.target.reset(); 
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
            <option value="" disabled defaultValue>Select Inquiry Type *</option>
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


// --- NEW PURCHASE FLOW COMPONENT (9 Steps) ---

function PurchaseFlow({ car, flowStep, setFlowStep, purchaseFormData, setFormData, onComplete }) {
  const depositAmount = 1000.00;
  // This constructs the full delivery address from Step 1 data
  const deliveryAddress = `${purchaseFormData.address}, ${purchaseFormData.state}, ${purchaseFormData.country}`;
  // Simulated Crypto Addresses
  const cryptoWalletAddress1 = "0xBYD1aB2cCdE3fF4gGhI5jJ6kKlL7mMnN8oOpP9qQrR0sStTuU1vV2wWxY3zZ4";
  const cryptoWalletAddress2 = "0xBYD2bBdE3fFgHhI5jJ6kKlL7mMnN8oOpP9qQrR0sStTuU1vV2wWxY3zZ4aB";
  
  const totalSteps = 9;

  // Handler for form input changes
  const handleFormChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // Handler for form submission (Step 1)
  const handleSubmitStep1 = (e) => {
    e.preventDefault();
    setFlowStep(2);
  };
  
  // Custom Component for the Loading Steps (4 & 8)
  const LoadingStep = ({ nextStep }) => {
    const [timeLeft, setTimeLeft] = useState(15);

    useEffect(() => {
      // Countdown timer for user feedback
      if (timeLeft > 0) {
        const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
        return () => clearTimeout(timer);
      } else {
        // Move to the next step after countdown
        setFlowStep(nextStep);
      }
    }, [timeLeft, nextStep]);

    return (
      <div className="text-center p-8">
        <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-red-600 mx-auto"></div>
        <h3 className="text-2xl font-semibold mt-6 text-gray-900">
          {flowStep === 4 ? 'Verifying Application Fee Payment...' : 'Verifying Final Payment...'}
        </h3>
        <p className="text-gray-600 mt-2">
          Please wait while we confirm the simulated crypto transaction.
        </p>
        <p className="text-sm text-gray-500 mt-4">
          Time remaining: **{timeLeft} seconds**
        </p>
      </div>
    );
  };

  // Rendering logic based on flowStep
  const renderStepContent = () => {
    switch (flowStep) {
      case 1: // Step 1: Application Form
        return (
          <form onSubmit={handleSubmitStep1} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <h4 className="col-span-full font-bold text-xl mb-4 text-red-600">Step 1: Application & Contact Form</h4>
            <input required name="name" placeholder="Full Name *" onChange={handleFormChange} defaultValue={purchaseFormData.name || ''} className="p-3 border rounded" />
            <input required name="email" type="email" placeholder="Email *" onChange={handleFormChange} defaultValue={purchaseFormData.email || ''} className="p-3 border rounded" />
            <input required name="phone" placeholder="Phone *" onChange={handleFormChange} defaultValue={purchaseFormData.phone || ''} className="p-3 border rounded" />
            <select required name="gender" onChange={handleFormChange} defaultValue={purchaseFormData.gender || ''} className="p-3 border rounded bg-white">
                <option value="" disabled>Gender *</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Non-Binary">Non-Binary</option>
                <option value="Prefer Not to Say">Prefer Not to Say</option>
            </select>
            <input required name="country" placeholder="Country *" onChange={handleFormChange} defaultValue={purchaseFormData.country || ''} className="p-3 border rounded" />
            <input required name="state" placeholder="State/Province *" onChange={handleFormChange} defaultValue={purchaseFormData.state || ''} className="p-3 border rounded" />
            <input required name="address" placeholder="Street Address (for delivery) *" onChange={handleFormChange} defaultValue={purchaseFormData.address || ''} className="p-3 border rounded col-span-full" />
            <div className="col-span-full flex justify-end">
              <button type="submit" className="px-6 py-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition">
                Proceed to Fee Payment &rarr;
              </button>
            </div>
          </form>
        );

      case 2: // Step 2: Application Fee Selection
        return (
          <div className="text-center p-6">
            <h4 className="font-bold text-xl mb-4 text-red-600">Step 2: Select Application Fee Payment Method</h4>
            <p className="text-lg">Application Fee: <span className="font-bold text-gray-900">${depositAmount.toFixed(2)}</span></p>
            
            <div className="mt-6 flex flex-col items-center gap-4">
              <button onClick={() => setFlowStep(3)} className="w-full max-w-sm py-3 bg-gray-900 text-white rounded-lg shadow-md hover:bg-gray-800 transition">
                Pay with Crypto (Simulated)
              </button>
              <button disabled className="w-full max-w-sm py-3 bg-gray-200 text-gray-500 rounded-lg cursor-not-allowed">
                Credit Card (Unavailable)
              </button>
            </div>
          </div>
        );

      case 3: // Step 3: Wallet Address Display (Deposit)
        return (
          <div className="text-center p-6">
            <h4 className="font-bold text-xl mb-4 text-red-600">Step 3: Complete Application Fee Payment</h4>
            <p className="text-lg text-gray-700">Please send exactly <span className="font-bold text-gray-900">${depositAmount.toFixed(2)}</span> in stablecoin (USDT/USDC) to the address below:</p>
            
            <div className="mt-4 p-4 bg-gray-100 rounded-lg border border-red-300">
              <p className="font-mono text-sm break-all text-red-700">{cryptoWalletAddress1}</p>
            </div>
            
            <p className="text-sm text-gray-500 mt-2">Network: Ethereum (ERC-20) / Binance Smart Chain (BEP-20)</p>
            
            <button onClick={() => setFlowStep(4)} className="mt-6 px-6 py-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition">
              I Have Sent the Payment &rarr;
            </button>
          </div>
        );
      
      case 4: // Step 4: Loading Screen 1
        return <LoadingStep nextStep={5} />;

      case 5: // Step 5: Delivery Info Confirmation
        return (
          <div className="text-center p-6">
            <h4 className="font-bold text-2xl mb-4 text-green-600">Step 5: Application Approved!</h4>
            <p className="text-lg text-gray-700">Your application has been successfully processed. Please confirm your delivery details before proceeding to final payment for your **{car.name}**.</p>
            
            <div className="mt-6 p-4 bg-green-50 rounded-lg border border-green-300 text-left mx-auto max-w-lg">
                <p className="font-semibold text-gray-800">Delivery Recipient: {purchaseFormData.name}</p>
                <p className="font-semibold text-gray-800">Contact Email: {purchaseFormData.email}</p>
                <p className="font-semibold text-gray-800 mt-3">Final Delivery Location:</p>
                <p className="text-red-700 font-medium">{deliveryAddress}</p>
            </div>

            <button onClick={() => setFlowStep(6)} className="mt-6 px-6 py-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition">
              Confirm & Proceed to Final Payment &rarr;
            </button>
          </div>
        );

      case 6: // Step 6: Final Car Payment Selection
        return (
          <div className="text-center p-6">
            <h4 className="font-bold text-xl mb-4 text-red-600">Step 6: Select Final Car Payment Method</h4>
            <p className="text-lg">Car Price: <span className="font-bold text-gray-900">{car.price}</span></p>
            
            <div className="mt-6 flex flex-col items-center gap-4">
              <button onClick={() => setFlowStep(7)} className="w-full max-w-sm py-3 bg-gray-900 text-white rounded-lg shadow-md hover:bg-gray-800 transition">
                Pay Full Amount with Crypto (Simulated)
              </button>
              <button disabled className="w-full max-w-sm py-3 bg-gray-200 text-gray-500 rounded-lg cursor-not-allowed">
                Wire Transfer (Unavailable)
              </button>
            </div>
          </div>
        );

      case 7: // Step 7: Wallet Address Display (Final Payment)
        return (
          <div className="text-center p-6">
            <h4 className="font-bold text-xl mb-4 text-red-600">Step 7: Complete Final Payment</h4>
            <p className="text-lg text-gray-700">Please send exactly <span className="font-bold text-gray-900">${car.priceValue}.00</span> in stablecoin (USDT/USDC) to the address below:</p>
            
            <div className="mt-4 p-4 bg-gray-100 rounded-lg border border-red-300">
              <p className="font-mono text-sm break-all text-red-700">{cryptoWalletAddress2}</p>
            </div>
            
            <p className="text-sm text-gray-500 mt-2">Note: For this simulation, the $1,000 application fee is considered a separate transaction and is not automatically deducted from this final amount.</p>

            <button onClick={() => setFlowStep(8)} className="mt-6 px-6 py-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition">
              I Have Sent the Final Payment &rarr;
            </button>
          </div>
        );

      case 8: // Step 8: Loading Screen 2
        return <LoadingStep nextStep={9} />;

      case 9: // Step 9: Confirmation
        return (
          <div className="text-center p-6">
            <h4 className="font-bold text-2xl mb-4 text-green-600">Step 9: Purchase Complete & Delivery Confirmed! 🎉</h4>
            <p className="text-lg text-gray-700">Congratulations, {purchaseFormData.name}! Your **{car.name}** purchase is confirmed.</p>
            
            <div className="mt-6 p-4 bg-green-50 rounded-lg border border-green-300 text-left mx-auto max-w-lg">
                <p className="font-semibold text-gray-800">Car Ordered: {car.name}</p>
                <p className="font-semibold text-gray-800">Delivery Address: {deliveryAddress}</p>
                <p className="text-red-700 font-medium mt-3">Expected Delivery Window: 7-10 Business Days</p>
                <p className="text-sm mt-3">A dedicated logistics coordinator will contact you at {purchaseFormData.phone} within 24 hours.</p>
            </div>

            <button onClick={onComplete} className="mt-6 px-6 py-2 bg-gray-600 text-white rounded-full hover:bg-gray-700 transition">
              Return to Inventory
            </button>
          </div>
        );

      default:
        // Fail-safe reset
        return <div className="text-center p-6">Purchase flow state error. <button onClick={onComplete}>Start Over</button></div>;
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 sm:py-16">
        <div className="bg-white rounded-2xl shadow-2xl p-6 sm:p-10 border-t-8 border-red-600">
            <div className="flex justify-between items-center mb-6 border-b pb-4">
                <h2 className="text-2xl font-bold text-gray-900">
                    <span className="text-red-600">Purchase Flow:</span> {car.name}
                </h2>
                <span className={`text-xl font-bold ${flowStep >= totalSteps ? 'text-green-600' : 'text-red-600'}`}>
                    Step {flowStep} / {totalSteps}
                </span>
            </div>
            
            {renderStepContent()}

            <div className="mt-8 pt-4 border-t text-sm text-gray-500 text-center">
                <p>Purchasing Process initiated for {car.name}. Total Price: {car.price}</p>
            </div>
        </div>
    </div>
  );
}


// --- MAIN APP COMPONENT ---

export default function App(){ 
  const [page, setPage] = useState('Home');
  const [selectedCar, setSelectedCar] = useState(null);
  const [purchaseStep, setPurchaseStep] = useState(0); // 0 = inactive, 1-9 = active
  const [purchaseFormData, setPurchaseFormData] = useState({});

  const startPurchase = (car) => {
    setSelectedCar(car);
    setPurchaseStep(1); // Start the 9-step flow
    setPage('Inventory'); // Keep the page state clean
  };

  const endPurchaseFlow = () => {
    setSelectedCar(null);
    setPurchaseStep(0); // Reset
    setPurchaseFormData({}); // Clear form data
    setPage('Inventory');
  };

  // State-based navigation mapping
  const renderPage = () => {
    // If purchaseStep is active, render the PurchaseFlow component
    if (purchaseStep > 0 && selectedCar) {
      return (
        <PurchaseFlow 
          car={selectedCar}
          flowStep={purchaseStep}
          setFlowStep={setPurchaseStep}
          purchaseFormData={purchaseFormData}
          setFormData={setPurchaseFormData}
          onComplete={endPurchaseFlow}
        />
      );
    }
    
    // Otherwise, render the standard page content
    switch (page) {
      case 'Inventory':
        return <Inventory onPurchase={startPurchase} />; 
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
            <Inventory onPurchase={startPurchase} />
            <PreOrder />
            <About />
            <Contact />
          </main>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 font-sans">
      <Nav 
        current={page} 
        onChange={setPage} 
        purchaseActive={purchaseStep > 0} // Pass flow status to Nav
      />
      
      {/* Hero is hidden when the Purchase Flow is active for a clean modal-like experience */}
      {purchaseStep === 0 && <Hero onChange={setPage} />}
      
      {/* Conditionally render main content or the purchase flow */}
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
