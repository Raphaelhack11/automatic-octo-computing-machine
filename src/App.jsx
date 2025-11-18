import React, { useState, useEffect, useCallback } from 'react';

// --- Global Data and Constants ---

const NAVY = '#0A192F';
const BLUE = '#0077B6';
const GRAY_ACCENT = '#4A4E69';

// 1. Placeholder for safety if the main image fails
const FALLBACK_IMAGE = "https://placehold.co/600x400/e0f2fe/0369a1?text=BYD+Car"; 

// --- STATIC IMAGE PATHS (with cache-busting parameter ?v=2 for forced reload) ---
const IMAGE_ATTO_3 = "1000307655.jpg";
const IMAGE_DOLPHIN = "1000307656.jpeg";
const IMAGE_YUAN_PLUS = "1000307661.jpeg";
const IMAGE_SEAL = "1000307658.jpg";
const IMAGE_HAN = "1000307659.jpg";
const IMAGE_QIN_PLUS = "1000307660.jpg";
const IMAGE_TANG = "1000307621.jpg"; 


const CARS = [
  // Each car now references its unique image path with the cache buster
  { id: 1, name: "BYD Atto 3", range: "250-315 mi", price: "$29,990", availableInUSA: true, color: 'bg-purple-600', priceValue: 29990, img: IMAGE_ATTO_3 },
  { id: 2, name: "BYD Dolphin", range: "200-280 mi", price: "$21,990", availableInUSA: true, color: 'bg-emerald-600', priceValue: 21990, img: IMAGE_DOLPHIN },
  { id: 7, name: "BYD Yuan Plus", range: "180-240 mi", price: "$19,990", availableInUSA: true, color: 'bg-pink-600', priceValue: 19990, img: IMAGE_YUAN_PLUS },
  { id: 3, name: "BYD Seal", range: "300-360 mi", price: "$35,990", availableInUSA: false, color: 'bg-red-600', priceValue: 35990, img: IMAGE_SEAL },
  { id: 4, name: "BYD Han", range: "320-380 mi", price: "$39,990", availableInUSA: false, color: 'bg-orange-600', priceValue: 39990, img: IMAGE_HAN },
  { id: 5, name: "BYD Qin PLUS", range: "200-330 mi", price: "$25,990", availableInUSA: false, color: 'bg-cyan-600', priceValue: 25990, img: IMAGE_QIN_PLUS },
  { id: 6, name: "BYD Tang", range: "260-340 mi", price: "$41,900", availableInUSA: false, color: 'bg-indigo-600', priceValue: 41900, img: IMAGE_TANG },
];

const CRYPTO_WALLETS = {
    'Bitcoin': { address: 'bc1q4c6f7xzsekkpvd2guwkaww4m7se9yjlrxnrjc7', network: 'BTC' },
    'Ethereum': { address: '0x08cfe6ddc3b58b0655dd1c9214bcfddbd3855cca', network: 'ETH' },
    'Litecoin': { address: 'ltc1qattx7q06hrjs7x8jkruyhjw7pavklwetg0j3wl', network: 'LTC' },
    'USDT_ERC20': { address: '0x08cFE6DDC3b58b0655dD1c9214BcfdDBD3855CCA', network: 'ERC-20' },
};

// --- UPDATED STATIC CAR DETAILS ---
const CAR_DETAILS = {
  // --- INVENTORY CARS (New additions) ---
  "BYD Atto 3": {
    title: "The Dynamic Adventure SUV (Yuan Plus in some regions)",
    summary: "The BYD Atto 3 is a globally popular compact SUV known for its dynamic driving experience and high safety ratings. It features a unique, gym-inspired interior design and utilizes the highly efficient Blade Battery, making it a reliable and fun choice for daily commuting and weekend adventures.",
    features: ["Blade Battery Technology", "5-Star Safety Rating", "Rotatable 12.8-inch Infotainment Screen"],
    image: IMAGE_ATTO_3,
  },
  "BYD Dolphin": {
    title: "The Urban Electric Hatchback",
    summary: "The BYD Dolphin is a versatile and affordable electric hatchback, perfectly suited for urban environments. Its compact size, competitive range, and unique 'Ocean Aesthetic' design make it a standout choice for those seeking a practical, efficient, and stylish entry-level EV.",
    features: ["Affordable Price Point", "Compact and Nimble Handling", "Panoramic Glass Roof Option"],
    image: IMAGE_DOLPHIN,
  },
  "BYD Yuan Plus": {
    title: "The Value-Focused Crossover",
    summary: "The Yuan Plus (marketed as the Atto 3 in many international markets) is a capable electric crossover that offers an excellent balance of space, technology, and value. Its spacious cabin and respectable range make it a strong option for families and those needing more utility without a premium price tag.",
    features: ["Spacious Cabin and Cargo", "Reliable Range Performance", "Built on e-Platform 3.0"],
    image: IMAGE_YUAN_PLUS,
  },
  // --- PRE-ORDER CARS (Existing) ---
  "BYD Seal": {
    title: "The Performance Sedan Challenger",
    summary: "The BYD Seal is an all-electric sports sedan designed to compete directly with models like the Tesla Model 3. It features BYD's advanced e-Platform 3.0, blade battery technology, and a rear-wheel-drive or all-wheel-drive setup, delivering thrilling acceleration and a long range, making it a highly anticipated entry in the premium EV segment.",
    features: ["CTB (Cell-to-Body) Structure", "High-Performance AWD Option", "Sleek Aerodynamic Design"],
    image: IMAGE_SEAL,
  },
  "BYD Han": {
    title: "Luxury Flagship EV",
    summary: "As BYD's flagship luxury sedan, the Han embodies premium design, technology, and performance. It is equipped with the revolutionary Blade Battery for maximum safety and a luxurious, spacious interior, positioning it as a strong contender in the executive EV class. It represents the pinnacle of BYD's engineering and design.",
    features: ["Luxurious Interior Materials", "Blade Battery Technology", "Exceptional NVH isolation"],
    image: IMAGE_HAN,
  },
  "BYD Qin PLUS": {
    title: "The Accessible Hybrid/EV",
    summary: "The Qin PLUS is a highly popular, affordable sedan, often offered in both pure EV and DM-i (Plug-in Hybrid) configurations. It focuses on efficiency, value, and practicality for the mass market. Its competitive price point and dependable performance make it an ideal choice for urban and first-time EV buyers.",
    features: ["DM-i Super Hybrid Option", "Outstanding Fuel Efficiency", "Mass-Market Affordability"],
    image: IMAGE_QIN_PLUS,
  },
  "BYD Tang": {
    title: "Premium 7-Seater SUV",
    summary: "The Tang is BYD's large, premium SUV, available as an all-electric or plug-in hybrid (DM-p/i) 7-seater. It offers substantial power, a comfortable family-focused interior, and a sleek, modern exterior design overseen by a global design team. It's built for those needing space, luxury, and all-electric capability.",
    features: ["7-Seater Configuration", "High Safety Rating", "Powerful Electric Motors"],
    image: IMAGE_TANG,
  },
};
// --- END UPDATED STATIC CAR DETAILS ---


// --- CORE UI COMPONENTS ---

function CopyToClipboard({ text }) {
    const [copied, setCopied] = useState(false);
    
    const handleCopy = () => {
        // Using document.execCommand('copy') for better compatibility in iframe environments
        const el = document.createElement('textarea');
        el.value = text;
        document.body.appendChild(el);
        el.select();
        document.execCommand('copy');
        document.body.removeChild(el);

        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <button 
            onClick={handleCopy}
            className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-800 transition-colors font-medium focus:outline-none"
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
      {/* MOBILE FIX: Use px-2 for tighter mobile padding */}
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8"> 
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center gap-2">
            {/* MOBILE FIX: Smaller font size for logo on tiny screens */}
            <div className="text-white font-extrabold text-xl sm:text-2xl tracking-wide">BYD HUBS</div> 
            {/* MOBILE FIX: Hide "Official Dealer" on very small screens */}
            <span className="hidden md:inline text-xs text-gray-400 border-l border-gray-600 pl-2">Official Dealer</span>
          </div>

          {/* This is already mobile-friendly with overflow-x-auto, but use -mx-1 for tighter button spacing */}
          <div className="flex overflow-x-auto whitespace-nowrap -mx-1 sm:mx-0 p-2 sm:p-0">
            {pages.map((p) => (
              <button
                key={p}
                onClick={() => !purchaseActive && onChange(p)}
                disabled={purchaseActive}
                className={`flex-shrink-0 px-2 py-1.5 sm:px-3 sm:py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all duration-200 mx-1
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
  // Using the Atto 3 image as the main Hero image
  const HERO_IMAGE = IMAGE_ATTO_3; 
  return (
    // MOBILE FIX: Reduce top/bottom padding
    <header className={`py-10 md:py-16`} style={{backgroundColor: NAVY}}> 
      {/* MOBILE FIX: Use tighter horizontal padding */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col-reverse md:flex-row items-center gap-8">
        
        <div className="flex-1 text-center md:text-left">
          {/* MOBILE FIX: Reduce font size */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-snug"> 
            Drive Your Electric Future with <span style={{color: BLUE}}>BYD</span>
          </h1>
          {/* MOBILE FIX: Reduce font size */}
          <p className="mt-4 text-base sm:text-lg text-gray-300 max-w-xl mx-auto md:mx-0"> 
            Explore BYD's full lineup of innovative, high-quality electric vehicles.
          </p>
          {/* MOBILE FIX: Stack buttons vertically on mobile (flex-col) and make them full width (w-full) */}
          <div className="mt-8 flex flex-col sm:flex-row justify-center md:justify-start gap-3 sm:gap-4">
            <button 
                onClick={() => onChange('Inventory')}
                className={`w-full sm:w-auto inline-flex items-center px-6 py-3 rounded-xl text-base font-semibold shadow-xl transition-colors`}
                style={{backgroundColor: BLUE, color: 'white'}}
                >
              View Inventory
            </button>
            <button 
                onClick={() => onChange('Pre-Order')}
                className={`w-full sm:w-auto inline-flex items-center px-6 py-3 border-2 rounded-xl text-base font-semibold transition-colors`}
                style={{borderColor: BLUE, color: BLUE}}
                >
              Reserve a Model
            </button>
          </div>
        </div>

        {/* Ensure the image container doesn't take up too much width on mobile */}
        <div className="w-full md:w-1/2 p-4 bg-gray-900 rounded-2xl shadow-2xl">
          <img 
            src={HERO_IMAGE} 
            alt="BYD Car Showcase" 
            className="w-full h-48 sm:h-56 object-cover rounded-xl" // MOBILE FIX: Slightly smaller height
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

// --- UPDATED Card component to accept onShowDetails prop ---
function Card({ car, onPurchase, onShowDetails }){
  return (
    <article className="bg-white shadow-xl rounded-xl overflow-hidden border border-gray-200 transform hover:shadow-2xl hover:-translate-y-1 transition duration-300">
      
      <div className="h-40 sm:h-44 flex items-center justify-center relative"> {/* MOBILE FIX: Slightly smaller height */}
        <img 
          // Uses car.img which is set in the global CARS array (with cache buster)
          src={car.img} 
          alt={car.name} 
          className="object-cover h-full w-full" 
          onError={(e) => { e.target.src = FALLBACK_IMAGE; }} 
        />
        <div className={`absolute top-0 right-0 p-1.5 text-xs font-semibold text-white uppercase rounded-bl-lg`} style={{backgroundColor: car.color || BLUE}}>
            {car.name.split(' ').pop()}
        </div>
      </div>

      <div className="p-4 sm:p-5"> {/* MOBILE FIX: Reduce padding */}
        <h3 className="text-xl sm:text-2xl font-bold text-gray-900">{car.name}</h3> {/* MOBILE FIX: Reduce font size */}
        <p className="text-sm text-gray-600 mt-2">
          Range: <span className="font-semibold text-gray-800">{car.range}</span>
        </p>
        <p className="text-sm text-gray-600">
          Starting Price: <span className="font-bold text-lg" style={{color: BLUE}}>{car.price}</span>
        </p>
        
        <div className="mt-4 flex items-center justify-between pt-3 border-t border-gray-100">
          <span 
            className={`text-xs font-semibold px-2 py-0.5 sm:px-3 sm:py-1 rounded-full uppercase tracking-wider 
              ${car.availableInUSA 
                ? 'bg-green-100 text-green-700' 
                : 'bg-yellow-100 text-yellow-800'}`
            }>
            {car.availableInUSA ? 'In Stock' : 'Future/Pre-Order'}
          </span>
          
          <div className="flex gap-2">
            <button 
              onClick={() => onShowDetails(car)} // New handler for Details button
              className={`px-3 py-1 sm:px-4 sm:py-1.5 text-xs sm:text-sm border rounded-full font-semibold transition-colors`} 
              style={{borderColor: BLUE, color: BLUE}}
            >
              Details
            </button>
            
            {car.availableInUSA ? (
                <button 
                  onClick={() => onPurchase(car)}
                  className={`px-3 py-1 sm:px-4 sm:py-1.5 text-xs sm:text-sm rounded-full text-white font-semibold transition-colors`}
                  style={{backgroundColor: BLUE}}
                  >
                  Purchase
                </button>
            ) : (
                <button 
                  className={`px-3 py-1 sm:px-4 sm:py-1.5 text-xs sm:text-sm rounded-full text-white font-semibold transition-colors`}
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
// --- END UPDATED Card component ---

// --- UPDATED Inventory component to manage DetailsModal state ---
function Inventory({ onPurchase }){
  const availableCars = CARS.filter(c => c.availableInUSA);
  const [selectedCarForDetails, setSelectedCarForDetails] = useState(null); // New state

  return (
    <section id="inventory" className="max-w-7xl mx-auto px-4 py-10 sm:py-16"> {/* MOBILE FIX: Tighter vertical padding */}
      <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 border-b-4 inline-block pb-2" style={{borderColor: BLUE}}>Current Inventory</h2>
      <p className="text-sm sm:text-base text-gray-600 mt-3 max-w-2xl"> {/* MOBILE FIX: Smaller font size */}
        The models below are currently available in the U.S. and ready for immediate delivery.
      </p>

      <div className="mt-8 sm:mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"> {/* MOBILE FIX: Tighter gap */}
        {availableCars.map(car => (
            <Card 
                key={car.id} 
                car={car} 
                onPurchase={onPurchase} 
                onShowDetails={setSelectedCarForDetails} // Pass the setter
            />
        ))}
      </div>

      {/* Render Details Modal for Inventory Cars */}
      <DetailsModal 
        car={selectedCarForDetails}
        details={selectedCarForDetails ? CAR_DETAILS[selectedCarForDetails.name] : null}
        onClose={() => setSelectedCarForDetails(null)}
      />
    </section>
  );
}
// --- END UPDATED Inventory component ---

// --- DetailsModal COMPONENT (No changes needed, already global) ---
function DetailsModal({ car, details, onClose }) {
  if (!car || !details) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-75 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-lg w-full transform transition-all duration-300">
        <div className="relative">
          <img 
            src={details.image} 
            alt={car.name} 
            className="w-full h-48 object-cover rounded-t-xl"
            onError={(e) => { e.target.src = FALLBACK_IMAGE; }}
          />
          <button 
            onClick={onClose}
            className="absolute top-3 right-3 bg-white p-2 rounded-full shadow-lg text-gray-800 hover:bg-gray-100 transition"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
          </button>
        </div>
        
        <div className="p-6">
          <h3 className="text-2xl font-bold text-gray-900" style={{color: BLUE}}>{car.name} Details: {details.title}</h3>
          <p className="text-sm text-gray-600 mt-2">Est. Price: <span className="font-semibold">{car.price}</span> | Range: <span className="font-semibold">{car.range}</span></p>

          <p className="mt-4 text-gray-700 leading-relaxed text-base">{details.summary}</p>

          <div className="mt-5">
            <h4 className="font-bold text-lg mb-2 text-gray-800">Key Features:</h4>
            <ul className="list-disc list-inside text-gray-600 text-sm grid grid-cols-2 gap-y-1">
              {details.features.map((f, i) => <li key={i}>{f}</li>)}
            </ul>
          </div>

          <div className="mt-6 flex justify-end">
            <button onClick={onClose} className={`px-4 py-2 rounded-full text-white font-semibold transition`} style={{backgroundColor: NAVY}}>
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
// --- END DetailsModal COMPONENT ---

// --- DepositFlow Component (No changes needed, already working for PreOrder) ---
function DepositFlow({ car, onComplete }) {
  const [depositAmount, setDepositAmount] = useState(500);
  const [confirmed, setConfirmed] = useState(false);
  const btcWallet = CRYPTO_WALLETS['Bitcoin'];

  const handleDepositChange = (e) => {
    const value = parseInt(e.target.value);
    if (value >= 500 && value <= 10000) {
      setDepositAmount(value);
    } else if (e.target.value === '') {
      setDepositAmount('');
    }
  };

  const handleConfirm = () => {
    if (depositAmount >= 500 && depositAmount <= 10000) {
      setConfirmed(true);
      // In a real app, this would initiate a timer for payment confirmation
    }
  };
  
  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-75 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full transform transition-all duration-300 border-t-8 border-blue-600 p-6 sm:p-8">
            <h2 className="text-xl sm:text-2xl font-bold mb-4 border-b pb-2" style={{color: BLUE}}>
                Pre-Order Deposit: {car.name}
            </h2>
            
            {!confirmed ? (
                <>
                    <p className="text-base text-gray-700 mb-6">
                        Secure your **{car.name}** with a fully refundable deposit. Enter an amount between **$500** and **$10,000** below.
                    </p>

                    <div className="mb-6">
                        <label htmlFor="deposit" className="block text-sm font-medium text-gray-700 mb-2">Deposit Amount ($)</label>
                        <input
                            id="deposit"
                            type="number"
                            value={depositAmount}
                            onChange={handleDepositChange}
                            min="500"
                            max="10000"
                            step="100"
                            required
                            className="w-full p-3 border-2 border-gray-300 rounded-lg text-lg font-bold text-center focus:border-blue-500 focus:ring-blue-500"
                        />
                        <p className={`mt-2 text-xs ${depositAmount >= 500 && depositAmount <= 10000 ? 'text-green-600' : 'text-red-600'}`}>
                            Current Deposit: ${depositAmount}
                        </p>
                    </div>

                    <div className="flex justify-between gap-3">
                        <button onClick={onComplete} className="flex-1 py-2 rounded-full border text-sm font-semibold transition-colors" style={{borderColor: NAVY, color: NAVY}}>
                            Cancel
                        </button>
                        <button 
                            onClick={handleConfirm} 
                            disabled={!(depositAmount >= 500 && depositAmount <= 10000)}
                            className={`flex-1 py-2 rounded-full text-white text-sm font-semibold transition-colors ${depositAmount >= 500 && depositAmount <= 10000 ? '' : 'opacity-50 cursor-not-allowed'}`} 
                            style={{backgroundColor: BLUE}}>
                            Confirm Deposit Amount
                        </button>
                    </div>
                </>
            ) : (
                <div className="text-center">
                    <h3 className="font-bold text-xl sm:text-2xl mb-4" style={{color: BLUE}}>Send Deposit Payment</h3>
                    <p className="text-sm sm:text-lg text-gray-700 mb-4">
                        Send exactly **${depositAmount}** to the following **Bitcoin** address:
                    </p>
                    
                    <div className="mt-4 p-4 sm:p-5 bg-gray-100 rounded-xl border border-blue-300 mx-auto max-w-xl shadow-inner">
                        <p className="font-mono text-xs sm:text-base break-all text-gray-800">{btcWallet.address}</p>
                        <div className="flex justify-center mt-3">
                            <CopyToClipboard text={btcWallet.address} />
                        </div>
                    </div>
                    
                    <p className="text-xs sm:text-sm text-gray-500 mt-2">Network: {btcWallet.network} (BTC)</p>

                    <div className="mt-8 flex justify-between gap-3">
                        <button onClick={onComplete} className="flex-1 py-2 rounded-full border text-sm font-semibold transition-colors" style={{borderColor: NAVY, color: NAVY}}>
                            Payment Sent (Simulated)
                        </button>
                        <button onClick={() => setConfirmed(false)} className={`flex-1 py-2 rounded-full text-white text-sm font-semibold transition-colors`} style={{backgroundColor: GRAY_ACCENT}}>
                            Change Amount
                        </button>
                    </div>
                </div>
            )}
        </div>
    </div>
  );
}
// --- END DepositFlow Component ---


// --- PreOrder component (Only minor internal reference change) ---
function PreOrder(){
  const preOrderCars = CARS.filter(c => !c.availableInUSA);
  // State for modal
  const [selectedCarForDetails, setSelectedCarForDetails] = useState(null);
  const [selectedCarForDeposit, setSelectedCarForDeposit] = useState(null);

  return (
    <section id="preorder" className="max-w-7xl mx-auto px-4 py-10 sm:py-16 bg-gray-100 rounded-2xl my-6 shadow-inner border border-gray-200">
      <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 border-b-4 inline-block pb-2" style={{borderColor: BLUE}}>Upcoming Models & Pre-Orders</h2>
      <p className="text-sm sm:text-base text-gray-600 mt-3 max-w-2xl">
        Secure your place in line for future models not yet available in the U.S. market.
      </p>

      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {preOrderCars.map(car => (
          <article key={car.id} className="bg-white rounded-xl shadow-lg border p-4 sm:p-5 transition-transform hover:scale-[1.02] duration-300">
            <div className="h-32 sm:h-40 bg-gray-100 flex items-center justify-center rounded-lg overflow-hidden">
              <img 
                src={car.img} 
                alt={car.name} 
                className="object-cover h-full w-full" 
                onError={(e) => { e.target.src = FALLBACK_IMAGE; }} 
              />
            </div>
            <div className="mt-4">
              <h3 className="font-bold text-lg sm:text-xl text-gray-900">{car.name}</h3>
              <p className="text-xs sm:text-sm text-gray-500 mt-1">Expected Range: {car.range} • Est. Price: {car.price}</p>
              <div className="mt-4 flex gap-3">
                <button 
                  onClick={() => setSelectedCarForDeposit(car)} // Open Deposit Flow
                  className={`flex-1 py-2 rounded-full border text-sm font-semibold transition-colors`} 
                  style={{borderColor: BLUE, color: BLUE}}
                >
                  Place Deposit
                </button>
                <button 
                  onClick={() => setSelectedCarForDetails(car)} // Open Details Modal
                  className={`flex-1 py-2 rounded-full text-white text-sm font-semibold transition-colors`} 
                  style={{backgroundColor: BLUE}}
                >
                  Full Details
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>

      <div className="mt-10 sm:mt-12 p-4 sm:p-6 rounded-lg border-l-4 shadow-md" style={{backgroundColor: 'white', borderColor: BLUE}}>
        <h4 className="font-bold text-lg text-gray-800">Reservation Guarantee</h4>
        <p className="text-gray-600 mt-2 text-sm">
          All deposits are fully refundable until the final purchase agreement is signed. Secure your spot risk-free.
        </p>
      </div>

      {/* Render Details Modal */}
      <DetailsModal 
        car={selectedCarForDetails}
        details={selectedCarForDetails ? CAR_DETAILS[selectedCarForDetails.name] : null}
        onClose={() => setSelectedCarForDetails(null)}
      />
      
      {/* Render Deposit Flow */}
      {selectedCarForDeposit && (
        <DepositFlow 
          car={selectedCarForDeposit}
          onComplete={() => setSelectedCarForDeposit(null)}
        />
      )}
    </section>
  );
}
// --- END PreOrder component ---

function About(){
  return (
    <section className="max-w-7xl mx-auto px-4 py-10 sm:py-16">
      <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 border-b-4 inline-block pb-2" style={{borderColor: BLUE}}>Our Commitment to Electrification</h2>
      <p className="text-sm sm:text-base text-gray-600 mt-3 max-w-2xl">
        BYD Motor Hubs is an authorized partner bringing BYD's innovative and affordable electric vehicle line to local drivers, focusing on quality service and sustainable transport.
      </p>

      <div className="mt-8 sm:mt-10 grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
        {/* Mission Card */}
        <div className="bg-white p-5 rounded-xl shadow-lg border border-gray-100">
          <h3 className="font-bold text-xl" style={{color: BLUE}}>Our Mission</h3>
          <p className="text-gray-700 mt-3 text-sm">To make cutting-edge, affordable electric vehicles accessible to everyone, backed by trusted local service and support.</p>
        </div>
        
        {/* Location Card */}
        <div className="bg-white p-5 rounded-xl shadow-lg border border-gray-100">
          <h3 className="font-bold text-xl" style={{color: BLUE}}>Visit Us</h3>
          <address className="not-italic text-gray-700 mt-3 text-sm">
            <strong>BYD Motor Hubs Main Office</strong><br />
            123 Electric Avenue, Suite 100<br />
            Charge City, CA 90210
          </address>
        </div>
        
        {/* Hours Card */}
        <div className="bg-white p-5 rounded-xl shadow-lg border border-gray-100">
          <h3 className="font-bold text-xl" style={{color: BLUE}}>Hours of Operation</h3>
          <p className="text-gray-700 mt-3 text-sm">
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
    <section id="contact" className="max-w-7xl mx-auto px-4 py-10 sm:py-16">
      <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 p-6 sm:p-10">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 border-b-4 inline-block pb-2" style={{borderColor: BLUE}}>Get in Touch</h2>
        <p className="text-gray-600 mt-3 text-sm sm:text-base">
          Book a test drive or ask any questions about BYD's electric lineup.
        </p>

        {isSubmitted && (
            <div className="mt-6 p-4 bg-green-50 text-green-800 border border-green-300 rounded-lg font-medium" role="alert">
                Thank you! Your message has been sent successfully.
            </div>
        )}

        {/* The grid layout is inherently mobile-friendly as it collapses to one column by default */}
        <form className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6" onSubmit={handleSubmit}>
          
          <input 
            required 
            name="name" 
            placeholder="Full name" 
            onChange={() => {}}
            className="p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition-colors text-sm" 
          />
          <input 
            required 
            name="email" 
            type="email" 
            placeholder="Email address" 
            onChange={() => {}}
            className="p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition-colors text-sm" 
          />
          <input 
            name="phone" 
            placeholder="Phone number (optional)" 
            onChange={() => {}}
            className="p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition-colors text-sm" 
          />
          <select 
            required
            name="interest" 
            onChange={() => {}}
            className="p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition-colors bg-white appearance-none text-gray-700 text-sm"
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
            onChange={() => {}}
            className="p-3 border border-gray-300 rounded-lg col-span-1 sm:col-span-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-sm" 
            rows={4} // MOBILE FIX: Smaller default rows
          ></textarea>
          
          <div className="col-span-1 sm:col-span-2 flex justify-end">
            <button 
              type="submit" 
              className={`px-6 py-2 text-white rounded-full font-semibold text-base sm:text-lg shadow-xl transition-all duration-300`} // MOBILE FIX: Slightly smaller button on mobile
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
    // Setting flow step to 4 happens in case 3's select onChange listener for smoother flow
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
      <div className="text-center p-6 sm:p-8">
        <div className="animate-spin rounded-full h-12 w-12 sm:h-16 sm:w-16 border-b-4 mx-auto" style={{borderColor: BLUE}}></div>
        <h3 className="text-xl sm:text-2xl font-semibold mt-4 sm:mt-6 text-gray-900">
          {flowStep === 5 ? 'Verifying Application Fee Payment...' : 'Verifying Final Payment...'}
        </h3>
        <p className="text-sm sm:text-base text-gray-600 mt-2">
          Please wait while we confirm the simulated transaction (T-{timeLeft}).
        </p>
      </div>
    );
  };

  const renderStepContent = () => {
    const walletInfo = CRYPTO_WALLETS[selectedCrypto] || {};

    switch (flowStep) {
      case 1: 
        return (
          <form onSubmit={handleSubmitStep1} className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            <h4 className="col-span-full font-bold text-xl mb-2" style={{color: BLUE}}>1. Customer Details</h4>
            <input required name="name" placeholder="Full Name *" onChange={handleFormChange} className="p-3 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500 text-sm" />
            <input required name="email" type="email" placeholder="Email *" onChange={handleFormChange} className="p-3 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500 text-sm" />
            <input required name="phone" placeholder="Phone *" onChange={handleFormChange} className="p-3 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500 text-sm" />
            <input required name="address" placeholder="Street Address (for delivery) *" onChange={handleFormChange} className="p-3 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500 text-sm" />
            <div className="col-span-full flex justify-end">
              <button type="submit" className={`px-4 py-2 text-white rounded-full font-semibold transition text-sm`} style={{backgroundColor: BLUE}}>
                Proceed to Fee Payment &rarr;
              </button>
            </div>
          </form>
        );

      case 2: 
        return (
          <div className="text-center p-4 sm:p-6">
            <h4 className="font-bold text-xl sm:text-2xl mb-4" style={{color: BLUE}}>2. Application Fee Required</h4>
            <div className="inline-block p-4 border-b-4 border-gray-200 mb-6">
                <p className="text-lg sm:text-xl text-gray-700">A refundable application fee is required to reserve the vehicle.</p>
                <p className="text-4xl sm:text-5xl font-extrabold mt-3" style={{color: NAVY}}>${depositAmount.toFixed(2)}</p>
            </div>
            
            <button onClick={() => setFlowStep(3)} className={`mt-6 px-6 py-3 text-white rounded-full font-semibold text-lg shadow-lg transition`} style={{backgroundColor: BLUE}}>
                Select Payment Method &rarr;
            </button>
          </div>
        );
        
      case 3: 
        return (
          <div className="text-center p-4 sm:p-6">
            <h4 className="font-bold text-xl mb-4" style={{color: BLUE}}>3. Select Crypto Payment Method</h4>
            <p className="text-sm sm:text-base text-gray-600 mb-6">Select a network to display the corresponding wallet address for the **${depositAmount.toFixed(2)}** fee.</p>

            <select onChange={(e) => { handleCryptoSelect(e); setFlowStep(4); }} value={selectedCrypto} className="w-full max-w-md p-3 border border-gray-300 rounded-lg bg-white appearance-none text-gray-700 font-medium text-sm">
                <option value="" disabled>-- Choose Cryptocurrency --</option>
                {Object.keys(CRYPTO_WALLETS).map(key => (
                    <option key={key} value={key}>{key}</option>
                ))}
            </select>
          </div>
        );
        
      case 4: 
        return (
          <div className="text-center p-4 sm:p-6">
            <h4 className="font-bold text-xl mb-4" style={{color: BLUE}}>4. Send Application Fee Payment</h4>
            <p className="text-sm sm:text-lg text-gray-700 mb-4">Send exactly **${depositAmount.toFixed(2)}** to the following {selectedCrypto} address:</p>
            
            <div className="mt-4 p-4 sm:p-5 bg-gray-100 rounded-xl border border-blue-300 mx-auto max-w-xl shadow-inner">
              <p className="font-mono text-xs sm:text-base break-all text-gray-800">{walletInfo.address}</p>
              <div className="flex justify-center mt-3">
                  <CopyToClipboard text={walletInfo.address} />
              </div>
            </div>
            
            <p className="text-xs sm:text-sm text-gray-500 mt-2">Network: {walletInfo.network}</p>
            
            <button onClick={() => setFlowStep(5)} className={`mt-8 px-6 py-2 text-white rounded-full font-semibold transition text-sm`} style={{backgroundColor: BLUE}}>
              I Have Sent the Payment &rarr;
            </button>
          </div>
        );

      case 5: 
        return <LoadingStep nextStep={6} />;

      case 6: 
        const deliveryAddress = `${purchaseFormData.address}`;
        return (
          <div className="text-center p-4 sm:p-6">
            <h4 className="font-bold text-xl sm:text-2xl mb-4 text-green-600">6. Application Approved!</h4>
            <p className="text-sm sm:text-lg text-gray-700">Your application is approved. Review your final delivery details for the **{car.name}**.</p>
            
            <div className="mt-6 p-4 sm:p-5 bg-green-50 rounded-xl border border-green-300 text-left mx-auto max-w-lg shadow-md text-sm">
                <p className="font-semibold text-gray-800">Recipient: {purchaseFormData.name}</p>
                <p className="font-semibold text-gray-800">Email: {purchaseFormData.email}</p>
                <p className="font-semibold text-gray-800 mt-3">Delivery Location: <span className="text-green-700 font-medium">{deliveryAddress}</span></p>
            </div>

            <button onClick={() => setFlowStep(7)} className={`mt-6 px-6 py-2 text-white rounded-full font-semibold transition text-sm`} style={{backgroundColor: BLUE}}>
              Confirm & Proceed to Final Car Payment &rarr;
            </button>
          </div>
        );

      case 7: 
        return (
          <div className="text-center p-4 sm:p-6">
            <h4 className="font-bold text-xl mb-4" style={{color: BLUE}}>7. Select Final Car Payment Method</h4>
            <p className="text-lg text-gray-700">Final Price: <span className="font-extrabold text-3xl" style={{color: NAVY}}>{car.price}</span></p>
            <p className="text-sm sm:text-base text-gray-600 mt-2 mb-6">Select a network to display the corresponding wallet address for the final payment.</p>

            <select onChange={(e) => { setSelectedCrypto(e.target.value); setFlowStep(8); }} value={selectedCrypto} className="w-full max-w-md p-3 border border-gray-300 rounded-lg bg-white appearance-none text-gray-700 font-medium text-sm">
                <option value="" disabled>-- Choose Cryptocurrency --</option>
                {Object.keys(CRYPTO_WALLETS).map(key => (
                    <option key={key} value={key}>{key}</option>
                ))}
            </select>
          </div>
        );
        
      case 8: 
        return (
          <div className="text-center p-4 sm:p-6">
            <h4 className="font-bold text-xl mb-4" style={{color: BLUE}}>8. Send Final Payment</h4>
            <p className="text-sm sm:text-lg text-gray-700 mb-4">Send exactly **{car.price}** to the following {selectedCrypto} address:</p>
            
            <div className="mt-4 p-4 sm:p-5 bg-gray-100 rounded-xl border border-blue-300 mx-auto max-w-xl shadow-inner">
              <p className="font-mono text-xs sm:text-base break-all text-gray-800">{walletInfo.address}</p>
              <div className="flex justify-center mt-3">
                  <CopyToClipboard text={walletInfo.address} />
              </div>
            </div>
            
            <p className="text-xs sm:text-sm text-gray-500 mt-2">Network: {walletInfo.network}</p>

            <button onClick={() => setFlowStep(9)} className={`mt-8 px-6 py-2 text-white rounded-full font-semibold transition text-sm`} style={{backgroundColor: BLUE}}>
              I Have Sent the Final Payment &rarr;
            </button>
          </div>
        );
        
      case 9: 
        return <LoadingStep nextStep={10} />;

      case 10: 
        const finalDeliveryAddress = `${purchaseFormData.address}`;
        return (
          <div className="text-center p-4 sm:p-6">
            <h4 className="font-bold text-xl sm:text-2xl mb-4 text-green-600">10. Purchase Complete! 🎉</h4>
            <p className="text-sm sm:text-lg text-gray-700">Your **{car.name}** purchase is confirmed.</p>
            
            <div className="mt-6 p-4 sm:p-5 bg-green-50 rounded-xl border border-green-300 text-left mx-auto max-w-lg shadow-md text-sm">
                <p className="font-semibold text-gray-800">Car: {car.name}</p>
                <p className="font-semibold text-gray-800">Delivery Address: {purchaseFormData.name}, {finalDeliveryAddress}</p>
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
    // MOBILE FIX: Tighter horizontal padding on the main container
    <div className="max-w-4xl mx-auto px-2 sm:px-4 py-8 sm:py-16"> 
        <div className="bg-white rounded-2xl shadow-2xl p-4 sm:p-10 border-t-8 border-blue-600"> {/* MOBILE FIX: Tighter interior padding */}
            <div className="flex justify-between items-center mb-4 border-b pb-4">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900"> {/* MOBILE FIX: Smaller font size */}
                    <span style={{color: BLUE}}>Purchase Flow:</span> {car.name}
                </h2>
                <span className={`text-base sm:text-xl font-bold ${flowStep >= totalSteps ? 'text-green-600' : 'text-blue-600'}`}> {/* MOBILE FIX: Smaller font size */}
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
    // Don't change the page here, let the PurchaseFlow component render over the Inventory page
  };

  const endPurchaseFlow = () => {
    setSelectedCar(null);
    setPurchaseStep(0); 
    setPurchaseFormData({}); 
    setPage('Inventory');
  };

  const renderPage = () => {
    if (purchaseStep > 0 && selectedCar) {
      // If purchase is active, always render the PurchaseFlow component
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
    
    // Otherwise, render the selected page
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
            {/* Display Hero followed by Inventory on the main page */}
            <Hero onChange={setPage} />
            <Inventory onPurchase={startPurchase} />
          </main>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <Nav 
        current={page} 
        onChange={setPage} 
        purchaseActive={purchaseStep > 0}
      />
      
      <main className="pb-8 sm:pb-12"> {/* MOBILE FIX: Tighter bottom padding */}
        {renderPage()}
      </main>

      <footer className="border-t mt-8 sm:mt-12 text-white" style={{backgroundColor: NAVY}}> {/* MOBILE FIX: Tighter top margin */}
        <div className="max-w-7xl mx-auto px-4 py-6 sm:py-8 flex flex-col md:flex-row justify-between items-center gap-3 sm:gap-4"> {/* MOBILE FIX: Tighter padding and gap */}
          <div className="text-xs sm:text-sm text-gray-400">
            © {new Date().getFullYear()} BYD Motor Hubs. All rights reserved.
          </div>
          <div className="flex gap-4">
            <a href="#" className="text-xs sm:text-sm text-blue-400 hover:text-blue-500 transition-colors">Privacy Policy</a>
            <a href="#" className="text-xs sm:text-sm text-blue-400 hover:text-blue-500 transition-colors">Terms of Use</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
