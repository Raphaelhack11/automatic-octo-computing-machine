import React, { useState, useEffect, useCallback } from 'react';

// --- Global Data and Constants ---

const NAVY = '#0A192F';
const BLUE = '#0077B6';
const GRAY_ACCENT = '#4A4E69';
const CARS = [
  // Added 'priceValue' for easy math in the purchase flow
  { id: 1, name: "BYD Atto 3", range: "250-315 mi", price: "$29,990", availableInUSA: true, color: 'bg-purple-600', priceValue: 29990 },
  { id: 2, name: "BYD Dolphin", range: "200-280 mi", price: "$21,990", availableInUSA: true, color: 'bg-emerald-600', priceValue: 21990 },
  { id: 7, name: "BYD Yuan Plus", range: "180-240 mi", price: "$19,990", availableInUSA: true, color: 'bg-pink-600', priceValue: 19990 },
  { id: 3, name: "BYD Seal", range: "300-360 mi", price: "$35,990", availableInUSA: false, color: 'bg-red-600', priceValue: 35990 },
  { id: 4, name: "BYD Han", range: "320-380 mi", price: "$39,990", availableInUSA: false, color: 'bg-orange-600', priceValue: 39990 },
  { id: 5, name: "BYD Qin PLUS", range: "200-330 mi", price: "$25,990", availableInUSA: false, color: 'bg-cyan-600', priceValue: 25990 },
  { id: 6, name: "BYD Tang", range: "260-340 mi", price: "$41,900", availableInUSA: false, color: 'bg-indigo-600', priceValue: 41900 },
];
const FALLBACK_IMAGE = "https://placehold.co/600x400/94a3b8/ffffff?text=BYD+Image";

const CRYPTO_WALLETS = {
    'Bitcoin': { address: 'bc1q4c6f7xzsekkpvd2guwkaww4m7se9yjlrxnrjc7', network: 'BTC' },
    'Ethereum': { address: '0x08cfe6ddc3b58b0655dd1c9214bcfddbd3855cca', network: 'ETH' },
    'Litecoin': { address: 'ltc1qattx7q06hrjs7x8jkruyhjw7pavklwetg0j3wl', network: 'LTC' },
    'USDT_ERC20': { address: '0x08cFE6DDC3b58B0655dD1c9214BcfdDBD3855CCA', network: 'ERC-20' },
};

// --- CORE UI COMPONENTS ---

function CopyToClipboard({ text }) {
    const [copied, setCopied] = useState(false);
    
    const handleCopy = () => {
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <button 
            onClick={handleCopy}
            className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-800 transition-colors font-medium ml-4 focus:outline-none"
        >
            {copied ? 'Copied! ✅' : 'Copy Address'}
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2v-2m-8-3l4-4m0 0l-4-4m4 4H4"></path>
            </svg>
        </button>
    );
}

function Nav({ current, onChange, purchaseActive }) {
  const pages = ['Home', 'Inventory', 'Pre-Order', 'About', 'Contact'];

  return (
    <nav className={`sticky top-0 z-20 shadow-lg`} style={{backgroundColor: NAVY}}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center gap-2">
            <div className="text-white font-extrabold text-2xl tracking-wide">BYD HUBS</div>
            <span className="hidden sm:inline text-xs text-gray-400 border-l border-gray-600 pl-2">Official Dealer</span>
          </div>

          <div className="flex overflow-x-auto whitespace-nowrap -mx-2 sm:mx-0 p-2 sm:p-0">
            {pages.map((p) => (
              <button
                key={p}
                onClick={() => !purchaseActive && onChange(p)}
                disabled={purchaseActive}
                className={`flex-shrink-0 px-3 py-2 rounded-lg text-sm font-semibold transition-all duration-200 mx-1
                  ${current === p 
                    ? `text-white bg-blue-700 shadow-md` 
                    : 'text-gray-300 hover:bg-gray-800 hover:text-white'}
                  ${purchaseActive ? 'opacity-50 cursor-not-allowed' : ''}`
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
    <header className={`py-16`} style={{backgroundColor: NAVY}}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col-reverse md:flex-row items-center gap-8">
        
        <div className="flex-1 text-center md:text-left">
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white leading-snug">
            Drive Your Electric Future with <span style={{color: BLUE}}>BYD</span>
          </h1>
          <p className="mt-4 text-lg text-gray-300 max-w-xl mx-auto md:mx-0">
            Explore BYD's full lineup of innovative, high-quality electric vehicles.
          </p>
          <div className="mt-8 flex justify-center md:justify-start gap-4">
            <button 
                onClick={() => onChange('Inventory')}
                className={`inline-flex items-center px-8 py-3 rounded-xl text-base font-semibold shadow-xl transition-colors`}
                style={{backgroundColor: BLUE, color: 'white'}}
                >
              View Inventory
            </button>
            <button 
                onClick={() => onChange('Pre-Order')}
                className={`inline-flex items-center px-8 py-3 border-2 rounded-xl text-base font-semibold transition-colors`}
                style={{borderColor: BLUE, color: BLUE}}
                >
              Reserve a Model
            </button>
          </div>
        </div>

        <div className="w-full md:w-1/2 p-4 bg-gray-900 rounded-2xl shadow-2xl">
          <img 
            src="https://placehold.co/800x450/1F2937/ffffff?text=BYD+Hero+Car+Showcase" 
            alt="BYD Car Showcase" 
            className="w-full h-56 object-cover rounded-xl" 
            onError={(e) => { e.target.src = FALLBACK_IMAGE; }}
          />
          <div className="mt-4 text-xs text-gray-500 text-center">
            Zero Emissions. Uncompromised Performance.
          </div>
        </div>
      </div>
    </header>
  );
}

function Card({ car, onPurchase }){
  return (
    <article className="bg-white shadow-xl rounded-xl overflow-hidden border border-gray-200 transform hover:shadow-2xl hover:-translate-y-1 transition duration-300">
      
      <div className="h-44 flex items-center justify-center relative">
        <img 
          src={car.img} 
          alt={car.name} 
          className="object-cover h-full w-full" 
          onError={(e) => { e.target.src = FALLBACK_IMAGE; }} 
        />
        <div className={`absolute top-0 right-0 p-1.5 text-xs font-semibold text-white uppercase rounded-bl-lg`} style={{backgroundColor: car.color || BLUE}}>
            {car.name.split(' ').pop()}
        </div>
      </div>

      <div className="p-5">
        <h3 className="text-2xl font-bold text-gray-900">{car.name}</h3>
        <p className="text-sm text-gray-600 mt-2">
          Range: <span className="font-semibold text-gray-800">{car.range}</span>
        </p>
        <p className="text-sm text-gray-600">
          Starting Price: <span className="font-bold text-lg" style={{color: BLUE}}>{car.price}</span>
        </p>
        
        <div className="mt-4 flex items-center justify-between pt-3 border-t border-gray-100">
          <span 
            className={`text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider 
              ${car.availableInUSA 
                ? 'bg-green-100 text-green-700' 
                : 'bg-yellow-100 text-yellow-800'}`
            }>
            {car.availableInUSA ? 'In Stock' : 'Future/Pre-Order'}
          </span>
          
          <div className="flex gap-2">
            <button className={`px-4 py-1.5 text-sm border rounded-full font-semibold transition-colors`} style={{borderColor: BLUE, color: BLUE}}>
              Details
            </button>
            
            {car.availableInUSA ? (
                <button 
                  onClick={() => onPurchase(car)}
                  className={`px-4 py-1.5 text-sm rounded-full text-white font-semibold transition-colors`}
                  style={{backgroundColor: BLUE}}
                  >
                  Purchase
                </button>
            ) : (
                <button 
                  className={`px-4 py-1.5 text-sm rounded-full text-white font-semibold transition-colors`}
                  style={{backgroundColor: GRAY_ACCENT}}
                  >
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
      <h2 className="text-3xl font-bold text-gray-900 border-b-4 inline-block pb-2" style={{borderColor: BLUE}}>Current Inventory</h2>
      <p className="text-gray-600 mt-3 max-w-2xl">
        The models below are currently available in the U.S. and ready for immediate delivery.
      </p>

      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {availableCars.map(car => (
            <Card key={car.id} car={car} onPurchase={onPurchase} />
        ))}
      </div>
    </section>
  );
}

function PreOrder(){
  const preOrderCars = CARS.filter(c => !c.availableInUSA);
  return (
    <section id="preorder" className="max-w-7xl mx-auto px-4 py-12 sm:py-16 bg-gray-100 rounded-2xl my-6 shadow-inner border border-gray-200">
      <h2 className="text-3xl font-bold text-gray-900 border-b-4 inline-block pb-2" style={{borderColor: BLUE}}>Upcoming Models & Pre-Orders</h2>
      <p className="text-gray-600 mt-3 max-w-2xl">
        Secure your place in line for future models not yet available in the U.S. market.
      </p>

      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {preOrderCars.map(car => (
          <article key={car.id} className="bg-white rounded-xl shadow-lg border p-5 transition-transform hover:scale-[1.02] duration-300">
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
                <button className={`flex-1 py-2 rounded-full border text-sm font-semibold transition-colors`} style={{borderColor: BLUE, color: BLUE}}>
                  Place Deposit
                </button>
                <button className={`flex-1 py-2 rounded-full text-white text-sm font-semibold transition-colors`} style={{backgroundColor: BLUE}}>
                  Full Details
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>

      <div className="mt-12 p-6 rounded-lg border-l-4 shadow-md" style={{backgroundColor: 'white', borderColor: BLUE}}>
        <h4 className="font-bold text-lg text-gray-800">Reservation Guarantee</h4>
        <p className="text-gray-600 mt-2 text-sm">
          All deposits are fully refundable until the final purchase agreement is signed. Secure your spot risk-free.
        </p>
      </div>
    </section>
  );
}

function About(){
  return (
    <section className="max-w-7xl mx-auto px-4 py-12 sm:py-16">
      <h2 className="text-3xl font-bold text-gray-900 border-b-4 inline-block pb-2" style={{borderColor: BLUE}}>Our Commitment to Electrification</h2>
      <p className="text-gray-600 mt-3 max-w-2xl">
        BYD Motor Hubs is an authorized partner bringing BYD's innovative and affordable electric vehicle line to local drivers, focusing on quality service and sustainable transport.
      </p>

      <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Mission Card */}
        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
          <h3 className="font-bold text-xl" style={{color: BLUE}}>Our Mission</h3>
          <p className="text-gray-700 mt-3">To make cutting-edge, affordable electric vehicles accessible to everyone, backed by trusted local service and support.</p>
        </div>
        
        {/* Location Card */}
        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
          <h3 className="font-bold text-xl" style={{color: BLUE}}>Visit Us</h3>
          <address className="not-italic text-gray-700 mt-3">
            <strong>BYD Motor Hubs Main Office</strong><br />
            123 Electric Avenue, Suite 100<br />
            Charge City, CA 90210
          </address>
        </div>
        
        {/* Hours Card */}
        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
          <h3 className="font-bold text-xl" style={{color: BLUE}}>Hours of Operation</h3>
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

  const handleSubmit = (e) => {
    e.preventDefault();
    setTimeout(() => {
        setIsSubmitted(true);
        e.target.reset(); 
        setTimeout(() => setIsSubmitted(false), 5000);
    }, 500);
  };
  
  return (
    <section id="contact" className="max-w-7xl mx-auto px-4 py-12 sm:py-16">
      <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 p-6 sm:p-10">
        <h2 className="text-3xl font-bold text-gray-900 border-b-4 inline-block pb-2" style={{borderColor: BLUE}}>Get in Touch</h2>
        <p className="text-gray-600 mt-3">
          Book a test drive or ask any questions about BYD's electric lineup.
        </p>

        {isSubmitted && (
            <div className="mt-6 p-4 bg-green-50 text-green-800 border border-green-300 rounded-lg font-medium" role="alert">
                Thank you! Your message has been sent successfully.
            </div>
        )}

        <form className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-6" onSubmit={handleSubmit}>
          
          <input 
            required 
            name="name" 
            placeholder="Full name" 
            className="p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition-colors" 
          />
          <input 
            required 
            name="email" 
            type="email" 
            placeholder="Email address" 
            className="p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition-colors" 
          />
          <input 
            name="phone" 
            placeholder="Phone number (optional)" 
            className="p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition-colors" 
          />
          <select 
            required
            name="interest" 
            className="p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition-colors bg-white appearance-none text-gray-700"
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
            className="p-3 border border-gray-300 rounded-lg col-span-1 sm:col-span-2 focus:ring-blue-500 focus:border-blue-500 transition-colors" 
            rows={5}
          ></textarea>
          
          <div className="col-span-1 sm:col-span-2 flex justify-end">
            <button 
              type="submit" 
              className={`px-8 py-3 text-white rounded-full font-semibold text-lg shadow-xl transition-all duration-300`}
              style={{backgroundColor: BLUE}}
              disabled={isSubmitted}
            >
              {isSubmitted ? 'Message Sent! ✅' : 'Send Message'}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}


// --- NEW PURCHASE FLOW COMPONENT (10 Steps) ---

function PurchaseFlow({ car, flowStep, setFlowStep, purchaseFormData, setFormData, onComplete }) {
  const depositAmount = 1000.00;
  const totalSteps = 10;
  const [selectedCrypto, setSelectedCrypto] = useState('');

  const handleFormChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmitStep1 = (e) => {
    e.preventDefault();
    setFlowStep(2); 
  };
  
  const handleCryptoSelect = (e) => {
    const cryptoKey = e.target.value;
    setSelectedCrypto(cryptoKey);
    if (cryptoKey) {
        setFlowStep(4);
    }
  };

  const LoadingStep = ({ nextStep }) => {
    const [timeLeft, setTimeLeft] = useState(8);
    useEffect(() => {
      if (timeLeft > 0) {
        const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
        return () => clearTimeout(timer);
      } else {
        setFlowStep(nextStep);
      }
    }, [timeLeft, nextStep, setFlowStep]);

    return (
      <div className="text-center p-8">
        <div className="animate-spin rounded-full h-16 w-16 border-b-4 mx-auto" style={{borderColor: BLUE}}></div>
        <h3 className="text-2xl font-semibold mt-6 text-gray-900">
          {flowStep === 5 ? 'Verifying Application Fee Payment...' : 'Verifying Final Payment...'}
        </h3>
        <p className="text-gray-600 mt-2">
          Please wait while we confirm the simulated transaction (T-{timeLeft}).
        </p>
      </div>
    );
  };

  const renderStepContent = () => {
    const isFinalPaymentStep = flowStep === 8;
    const paymentAmount = isFinalPaymentStep ? car.price : `$${depositAmount.toFixed(2)}`;
    const walletInfo = CRYPTO_WALLETS[selectedCrypto];

    switch (flowStep) {
      case 1: 
        return (
          <form onSubmit={handleSubmitStep1} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <h4 className="col-span-full font-bold text-xl mb-2" style={{color: BLUE}}>1. Customer Details</h4>
            <input required name="name" placeholder="Full Name *" onChange={handleFormChange} className="p-3 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500" />
            <input required name="email" type="email" placeholder="Email *" onChange={handleFormChange} className="p-3 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500" />
            <input required name="phone" placeholder="Phone *" onChange={handleFormChange} className="p-3 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500" />
            <input required name="address" placeholder="Street Address (for delivery) *" onChange={handleFormChange} className="p-3 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500" />
            <div className="col-span-full flex justify-end">
              <button type="submit" className={`px-6 py-2 text-white rounded-full font-semibold transition`} style={{backgroundColor: BLUE}}>
                Proceed to Fee Payment &rarr;
              </button>
            </div>
          </form>
        );

      case 2: 
        return (
          <div className="text-center p-6">
            <h4 className="font-bold text-2xl mb-4" style={{color: BLUE}}>2. Application Fee Required</h4>
            <div className="inline-block p-4 border-b-4 border-gray-200 mb-6">
                <p className="text-xl text-gray-700">A refundable application fee is required to reserve the vehicle.</p>
                <p className="text-5xl font-extrabold mt-3" style={{color: NAVY}}>${depositAmount.toFixed(2)}</p>
            </div>
            
            <button onClick={() => setFlowStep(3)} className={`mt-6 px-8 py-3 text-white rounded-full font-semibold text-lg shadow-lg transition`} style={{backgroundColor: BLUE}}>
                Select Payment Method &rarr;
            </button>
          </div>
        );
        
      case 3: 
        return (
          <div className="text-center p-6">
            <h4 className="font-bold text-xl mb-4" style={{color: BLUE}}>3. Select Crypto Payment Method</h4>
            <p className="text-gray-600 mb-6">Select a network to display the corresponding wallet address for the **${depositAmount.toFixed(2)}** fee.</p>

            <select onChange={handleCryptoSelect} value={selectedCrypto} className="w-full max-w-md p-3 border border-gray-300 rounded-lg bg-white appearance-none text-gray-700 font-medium">
                <option value="" disabled>-- Choose Cryptocurrency --</option>
                {Object.keys(CRYPTO_WALLETS).map(key => (
                    <option key={key} value={key}>{key}</option>
                ))}
            </select>
          </div>
        );
        
      case 4: 
        return (
          <div className="text-center p-6">
            <h4 className="font-bold text-xl mb-4" style={{color: BLUE}}>4. Send Application Fee Payment</h4>
            <p className="text-lg text-gray-700 mb-4">Send exactly **${depositAmount.toFixed(2)}** to the following {selectedCrypto} address:</p>
            
            <div className="mt-4 p-5 bg-gray-100 rounded-xl border border-blue-300 mx-auto max-w-xl shadow-inner">
              <p className="font-mono text-base break-all text-gray-800">{walletInfo.address}</p>
              <div className="flex justify-center mt-3">
                  <CopyToClipboard text={walletInfo.address} />
              </div>
            </div>
            
            <p className="text-sm text-gray-500 mt-2">Network: {walletInfo.network}</p>
            
            <button onClick={() => setFlowStep(5)} className={`mt-8 px-6 py-2 text-white rounded-full font-semibold transition`} style={{backgroundColor: BLUE}}>
              I Have Sent the Payment &rarr;
            </button>
          </div>
        );

      case 5: 
        return <LoadingStep nextStep={6} />;

      case 6: 
        const deliveryAddress = `${purchaseFormData.address}`;
        return (
          <div className="text-center p-6">
            <h4 className="font-bold text-2xl mb-4 text-green-600">6. Application Approved!</h4>
            <p className="text-lg text-gray-700">Your application is approved. Review your final delivery details for the **{car.name}**.</p>
            
            <div className="mt-6 p-5 bg-green-50 rounded-xl border border-green-300 text-left mx-auto max-w-lg shadow-md">
                <p className="font-semibold text-gray-800">Recipient: {purchaseFormData.name}</p>
                <p className="font-semibold text-gray-800">Email: {purchaseFormData.email}</p>
                <p className="font-semibold text-gray-800 mt-3">Delivery Location: <span className="text-green-700 font-medium">{deliveryAddress}</span></p>
            </div>

            <button onClick={() => setFlowStep(7)} className={`mt-6 px-6 py-2 text-white rounded-full font-semibold transition`} style={{backgroundColor: BLUE}}>
              Confirm & Proceed to Final Car Payment &rarr;
            </button>
          </div>
        );

      case 7: 
        return (
          <div className="text-center p-6">
            <h4 className="font-bold text-xl mb-4" style={{color: BLUE}}>7. Select Final Car Payment Method</h4>
            <p className="text-lg text-gray-700">Final Price: <span className="font-extrabold text-3xl" style={{color: NAVY}}>{car.price}</span></p>
            <p className="text-gray-600 mt-2 mb-6">Select a network to display the corresponding wallet address for the final payment.</p>

            <select onChange={(e) => { setSelectedCrypto(e.target.value); setFlowStep(8); }} value={selectedCrypto} className="w-full max-w-md p-3 border border-gray-300 rounded-lg bg-white appearance-none text-gray-700 font-medium">
                <option value="" disabled>-- Choose Cryptocurrency --</option>
                {Object.keys(CRYPTO_WALLETS).map(key => (
                    <option key={key} value={key}>{key}</option>
                )}
            </select>
          </div>
        );
        
      case 8: 
        return (
          <div className="text-center p-6">
            <h4 className="font-bold text-xl mb-4" style={{color: BLUE}}>8. Send Final Payment</h4>
            <p className="text-lg text-gray-700 mb-4">Send exactly **{car.price}** to the following {selectedCrypto} address:</p>
            
            <div className="mt-4 p-5 bg-gray-100 rounded-xl border border-blue-300 mx-auto max-w-xl shadow-inner">
              <p className="font-mono text-base break-all text-gray-800">{walletInfo.address}</p>
              <div className="flex justify-center mt-3">
                  <CopyToClipboard text={walletInfo.address} />
              </div>
            </div>
            
            <p className="text-sm text-gray-500 mt-2">Network: {walletInfo.network}</p>

            <button onClick={() => setFlowStep(9)} className={`mt-8 px-6 py-2 text-white rounded-full font-semibold transition`} style={{backgroundColor: BLUE}}>
              I Have Sent the Final Payment &rarr;
            </button>
          </div>
        );
        
      case 9: 
        return <LoadingStep nextStep={10} />;

      case 10: 
        const finalDeliveryAddress = `${purchaseFormData.address}`;
        return (
          <div className="text-center p-6">
            <h4 className="font-bold text-2xl mb-4 text-green-600">10. Purchase Complete! 🎉</h4>
            <p className="text-lg text-gray-700">Your **{car.name}** purchase is confirmed.</p>
            
            <div className="mt-6 p-5 bg-green-50 rounded-xl border border-green-300 text-left mx-auto max-w-lg shadow-md">
                <p className="font-semibold text-gray-800">Car: {car.name}</p>
                <p className="font-semibold text-gray-800">Delivery Address: {finalDeliveryAddress}</p>
                <p className="font-bold text-green-700 mt-3">Expected Delivery Window: 7-10 Business Days</p>
            </div>

            <button onClick={onComplete} className={`mt-6 px-6 py-2 text-white rounded-full font-semibold transition`} style={{backgroundColor: NAVY}}>
              Return to Inventory
            </button>
          </div>
        );

      default:
        return <div className="text-center p-6">Purchase flow error. <button onClick={onComplete}>Start Over</button></div>;
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 sm:py-16">
        <div className="bg-white rounded-2xl shadow-2xl p-6 sm:p-10 border-t-8 border-blue-600">
            <div className="flex justify-between items-center mb-6 border-b pb-4">
                <h2 className="text-2xl font-bold text-gray-900">
                    <span style={{color: BLUE}}>Purchase Flow:</span> {car.name}
                </h2>
                <span className={`text-xl font-bold ${flowStep >= totalSteps ? 'text-green-600' : 'text-blue-600'}`}>
                    Step {flowStep} / {totalSteps}
                </span>
            </div>
            
            {renderStepContent()}
        </div>
    </div>
  );
}


// --- MAIN APP COMPONENT ---

export default function App(){ 
  const [page, setPage] = useState('Home');
  const [selectedCar, setSelectedCar] = useState(null);
  const [purchaseStep, setPurchaseStep] = useState(0); 
  const [purchaseFormData, setPurchaseFormData] = useState({});

  const startPurchase = (car) => {
    setSelectedCar(car);
    setPurchaseStep(1); 
    setPage('Inventory');
  };

  const endPurchaseFlow = () => {
    setSelectedCar(null);
    setPurchaseStep(0); 
    setPurchaseFormData({}); 
    setPage('Inventory');
  };

  const renderPage = () => {
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
    
    switch (page) {
      case '
