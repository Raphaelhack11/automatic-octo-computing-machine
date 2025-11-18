import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Check, Copy, X, ChevronRight, Zap, Shield, Globe, Star, 
  ArrowRight, Car, Battery, Lock, Wallet 
} from 'react-icons/fa';

// ─────────────────────────────────────────────────────────────
// YOUR ORIGINAL IMAGE PATHS – 100% UNCHANGED
// ─────────────────────────────────────────────────────────────
const IMAGE_ATTO_3 = "1000307655.jpg";
const IMAGE_DOLPHIN = "1000307656.jpeg";
const IMAGE_YUAN_PLUS = "1000307661.jpeg";
const IMAGE_SEAL = "1000307658.jpg";
const IMAGE_HAN = "1000307659.jpg";
const IMAGE_QIN_PLUS = "1000307660.jpg";
const IMAGE_TANG = "1000307621.jpg";
const FALLBACK_IMAGE = "https://placehold.co/1200x800/e0f2fe/0369a1?text=BYD+EV";

const CARS = [
  { id: 1, name: "BYD Atto 3", range: "250-315 mi", price: "$29,990", availableInUSA: true, color: 'from-purple-600 to-purple-800', priceValue: 29990, img: IMAGE_ATTO_3 },
  { id: 2, name: "BYD Dolphin", range: "200-280 mi", price: "$21,990", availableInUSA: true, color: 'from-emerald-500 to-teal-600', priceValue: 21990, img: IMAGE_DOLPHIN },
  { id: 7, name: "BYD Yuan Plus", range: "180-240 mi", price: "$19,990", availableInUSA: true, color: 'from-pink-500 to-rose-600', priceValue: 19990, img: IMAGE_YUAN_PLUS },
  { id: 3, name: "BYD Seal", range: "300-360 mi", price: "$35,990", availableInUSA: false, color: 'from-red-600 to-rose-700', priceValue: 35990, img: IMAGE_SEAL },
  { id: 4, name: "BYD Han", range: "320-380 mi", price: "$39,990", availableInUSA: false, color: 'from-orange-500 to-red-600', priceValue: 39990, img: IMAGE_HAN },
  { id: 5, name: "BYD Qin PLUS", range: "200-330 mi", price: "$25,990", availableInUSA: false, color: 'from-cyan-500 to-blue-600', priceValue: 25990, img: IMAGE_QIN_PLUS },
  { id: 6, name: "BYD Tang", range: "260-340 mi", price: "$41,900", availableInUSA: false, color: 'from-indigo-600 to-purple-700', priceValue: 41900, img: IMAGE_TANG },
];

const CRYPTO_WALLETS = {
  'Bitcoin': { address: 'bc1q4c6f7xzsekkpvd2guwkaww4m7se9yjlrxnrjc7', network: 'BTC' },
  'Ethereum': { address: '0x08cfe6ddc3b58b0655dd1c9214bcfddbd3855cca', network: 'ETH' },
  'Litecoin': { address: 'ltc1qattx7q06hrjs7x8jkruyhjw7pavklwetg0j3wl', network: 'LTC' },
  'USDT_ERC20': { address: '0x08cFE6DDC3b58b0655dD1c9214BcfdDBD3855CCA', network: 'ERC-20' },
};

// ─────────────────────────────────────────────────────────────
// MODERN REUSABLE COMPONENTS
// ─────────────────────────────────────────────────────────────
const GlassCard = ({ children, className = "" }: any) => (
  <motion.div
    whileHover={{ y: -10, scale: 1.02 }}
    className={`bg-white/10 backdrop-blur-2xl border border-white/20 rounded-3xl shadow-2xl overflow-hidden ${className}`}
  >
    {children}
  </motion.div>
);

const CopyToClipboard = ({ text }: { text: string }) => {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <button onClick={copy} className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300 font-medium">
      {copied ? 'Copied!' : 'Copy Address'} <Copy className="w-5 h-5" />
    </button>
  );
};

export default function App() {
  const [page, setPage] = useState('Home');
  const [purchaseActive, setPurchaseActive] = useState(false);
  const [selectedCar, setSelectedCar] = useState<any>(null);
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState<any>({});
  const [selectedCrypto, setSelectedCrypto] = useState('');

  const startPurchase = (car: any) => {
    setSelectedCar(car);
    setPurchaseActive(true);
    setStep(1);
  };

  const endPurchase = () => {
    setPurchaseActive(false);
    setSelectedCar(null);
    setStep(0);
    setFormData({});
    setSelectedCrypto('');
    setPage('Inventory');
  };

  return (
    <>
      {/* Animated Background */}
      <div className="fixed inset-0 bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950 -z-10">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 via-transparent to-blue-600/20 animate-pulse" />
      </div>

      {/* Navigation */}
      <motion.nav initial={{ y: -100 }} animate={{ y: 0 }} className="fixed top-0 left-0 right-0 z-50 bg-black/40 backdrop-blur-2xl border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-6 flex justify-between items-center">
          <h1 className="text-4xl font-black tracking-tighter">
            BYD<span className="text-cyan-400">HUBS</span>
          </h1>
          <div className="hidden lg:flex gap-12 text-lg font-medium">
            {['Home', 'Inventory', 'Pre-Order', 'About', 'Contact'].map(p => (
              <button
                key={p}
                onClick={() => !purchaseActive && setPage(p)}
                className={`${page === p ? 'text-cyan-400' : 'hover:text-cyan-400'} transition`}
                disabled={purchaseActive}
              >
                {p}
              </button>
            ))}
          </div>
        </div>
      </motion.nav>

      <AnimatePresence mode="wait">
        {purchaseActive && selectedCar ? (
          <FullPurchaseFlow 
            key="flow"
            car={selectedCar}
            step={step}
            setStep={setStep}
            formData={formData}
            setFormData={setFormData}
            selectedCrypto={selectedCrypto}
            setSelectedCrypto={setSelectedCrypto}
            onComplete={endPurchase}
          />
        ) : (
          <>
            {/* Hero */}
            {page === 'Home' && (
              <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="relative h-screen flex items-center justify-center overflow-hidden">
                <img src={IMAGE_ATTO_3} alt="Hero" className="absolute inset-0 w-full h-full object-cover" onError={e => e.currentTarget.src = FALLBACK_IMAGE} />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/70" />
                <div className="relative text-center px-6 max-w-6xl z-10">
                  <motion.h1 initial={{ y: 60 }} animate={{ y: 0 }} className="text-6xl md:text-9xl font-black leading-tight">
                    Drive The<br /><span className="text-cyan-400">Electric Future</span>
                  </motion.h1>
                  <motion.p initial={{ y: 60 }} animate={{ y: 0 }} transition={{ delay: 0.2 }} className="text-2xl md:text-4xl mt-8 opacity-90">
                    Starting at $19,990 • Up to 380 miles range
                  </motion.p>
                  <motion.div initial={{ y: 60 }} animate={{ y: 0 }} transition={{ delay: 0.4 }} className="mt-16 flex flex-col sm:flex-row gap-8 justify-center">
                    <button onClick={() => setPage('Inventory')} className="px-16 py-8 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full text-2xl font-black shadow-2xl hover:shadow-cyan-500/50 transform hover:scale-105 transition">
                      Explore Inventory <ArrowRight className="inline ml-3" />
                    </button>
                    <button onClick={() => setPage('Pre-Order')} className="px-16 py-8 border-4 border-white/60 backdrop-blur rounded-full text-2xl font-black hover:bg-white/20 transition">
                      Reserve Future Models
                    </button>
                  </motion.div>
                </div>
              </motion.section>
            )}

            {/* Inventory */}
            {(page === 'Home' || page === 'Inventory') && (
              <section className="max-w-7xl mx-auto px-6 py-32">
                <motion.h2 initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} className="text-6xl font-black text-center mb-20">
                  Available Now in the USA
                </motion.h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                  {CARS.filter(c => c.availableInUSA).map((car, i) => (
                    <motion.div key={car.id} initial={{ opacity: 0, y: 60 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.15 }}>
                      <GlassCard>
                        <div className="relative group overflow-hidden">
                          <img src={car.img} alt={car.name} className="w-full h-80 object-cover group-hover:scale-110 transition duration-700" onError={e => e.currentTarget.src = FALLBACK_IMAGE} />
                          <div className={`absolute inset-0 bg-gradient-to-t ${car.color} opacity-80`} />
                          <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition" />
                          <div className="absolute bottom-8 left-8 right-8 text-white">
                            <h3 className="text-4xl font-black">{car.name}</h3>
                            <p className="text-5xl font-black mt-3">{car.price}</p>
                            <p className="text-xl mt-2 opacity-90">Range: {car.range}</p>
                            <button 
                              onClick={() => startPurchase(car)}
                              className="mt-8 w-full py-5 bg-white text-black rounded-full font-bold text-xl hover:bg-cyan-400 transition transform hover:scale-105"
                            >
                              Purchase Now
                            </button>
                          </div>
                        </div>
                      </GlassCard>
                    </motion.div>
                  ))}
                </div>
              </section>
            )}

            {/* Floating Reserve Bar */}
            <motion.div initial={{ y: 100 }} animate={{ y: 0 }} className="fixed bottom-8 left-1/2 -translate-x-1/2 z-40 bg-white/95 backdrop-blur-3xl shadow-2xl rounded-full px-12 py-8 flex items-center gap-10 border border-gray-300">
              <div className="flex items-center gap-6">
                <Car className="w-12 h-12 text-cyan-600" />
                <div>
                  <p className="font-bold text-black text-xl">Atto 3 • In Stock • Ready for Delivery</p>
                  <p className="text-4xl font-black text-black">$29,990</p>
                </div>
              </div>
              <button 
                onClick={() => startPurchase(CARS[0])}
                className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-12 py-6 rounded-full font-bold text-xl shadow-2xl hover:shadow-cyan-500/50 transform hover:scale-105 transition"
              >
                Reserve Now → $500 Deposit
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

// ─────────────────────────────────────────────────────────────
// FULL 10-STEP LUXURY PURCHASE FLOW (Your Original Logic, Modern Design)
// ─────────────────────────────────────────────────────────────
const FullPurchaseFlow = ({ car, step, setStep, formData, setFormData, selectedCrypto, setSelectedCrypto, onComplete }: any) => {
  const [timeLeft, setTimeLeft] = useState(8);

  useEffect(() => {
    if ((step === 5 || step === 9) && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0) {
      setStep(step === 5 ? 6 : 10);
      setTimeLeft(8);
    }
  }, [timeLeft, step, setStep]);

  const wallet = CRYPTO_WALLETS[selectedCrypto as keyof typeof CRYPTO_WALLETS] || {};

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/90 backdrop-blur-2xl">
      <GlassCard className="max-w-4xl w-full max-h-screen overflow-y-auto">
        <button onClick={onComplete} className="absolute top-8 right-8 text-white/70 hover:text-white z-10">
          <X className="w-10 h-10" />
        </button>

        <div className="p-12">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-5xl font-black">
              Purchase: <span className="text-cyan-400">{car.name}</span>
            </h2>
            <div className="text-3xl font-bold text-cyan-400">
              Step {step} / 10
            </div>
          </div>

          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div key="1" initial={{ opacity: 0, x: 100 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -100 }}>
                <h3 className="text-3xl font-bold mb-8">Customer Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {['name', 'email', 'phone', 'address'].map(field => (
                    <input
                      key={field}
                      placeholder={field === 'address' ? 'Delivery Address *' : field.charAt(0).toUpperCase() + field.slice(1) + ' *'}
                      onChange={e => setFormData({ ...formData, [field]: e.target.value })}
                      className="p-5 bg-white/10 border border-white/30 rounded-2xl text-lg placeholder-white/50"
                    />
                  ))}
                </div>
                <button onClick={() => setStep(2)} className="mt-10 w-full py-6 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full font-bold text-2xl">
                  Proceed to Application Fee <ArrowRight className="inline ml-4" />
                </button>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div key="2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-16">
                <h3 className="text-4xl font-black mb-8">Application Fee Required</h3>
                <p className="text-6xl font-black text-cyan-400">$1,000.00</p>
                <p className="text-xl mt-6 opacity-80">Fully refundable reservation fee</p>
                <button onClick={() => setStep(3)} className="mt-12 px-16 py-8 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full font-bold text-2xl">
                  Select Payment Method <ArrowRight className="inline ml-4" />
                </button>
              </motion.div>
            )}

            {[3, 7].includes(step) && (
              <motion.div key={step} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-16">
                <h3 className="text-4xl font-black mb-8">
                  {step === 3 ? 'Select Payment Method (Application Fee)' : 'Select Final Payment Method'}
                </h3>
                <select
                  onChange={e => { setSelectedCrypto(e.target.value); setStep(step === 3 ? 4 : 8); }}
                  className="w-full max-w-md mx-auto p-6 bg-white/10 border border-white/30 rounded-2xl text-xl"
                >
                  <option value="">Choose Cryptocurrency</option>
                  {Object.keys(CRYPTO_WALLETS).map(k => <option key={k} value={k}>{k}</option>)}
                </select>
              </motion.div>
            )}

            {[4, 8].includes(step) && (
              <motion.div key={step} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-16">
                <h3 className="text-4xl font-black mb-8">
                  Send {step === 4 ? '$1,000 Application Fee' : car.price}
                </h3>
                <div className="max-w-2xl mx-auto p-10 bg-white/10 rounded-3xl border border-white/30">
                  <p className="font-mono text-lg break-all text-cyan-300">{wallet.address}</p>
                  <div className="mt-6"><CopyToClipboard text={wallet.address || ''} /></div>
                  <p className="mt-4 text-white/70">Network: {wallet.network}</p>
                </div>
                <button onClick={() => setStep(step === 4 ? 5 : 9)} className="mt-12 px-16 py-8 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full font-bold text-2xl">
                  I Have Sent the Payment <ArrowRight className="inline ml-4" />
                </button>
              </motion.div>
            )}

            {[5, 9].includes(step) && (
              <motion.div key={step} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-32">
                <div className="animate-spin w-24 h-24 border-8 border-cyan-500 border-t-transparent rounded-full mx-auto mb-12" />
                <h3 className="text-4xl font-black">
                  {step === 5 ? 'Verifying Application Fee...' : 'Confirming Final Payment...'}
                </h3>
                <p className="text-2xl mt-8">Please wait... (T-{timeLeft})</p>
              </motion.div>
            )}

            {step === 6 && (
              <motion.div key="6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-20">
                <h3 className="text-6xl font-black text-green-400 mb-8">Application Approved!</h3>
                <p className="text-3xl">Proceed to final payment for your {car.name}</p>
                <button onClick={() => setStep(7)} className="mt-12 px-16 py-8 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full font-bold text-2xl">
                  Pay Final Amount <ArrowRight className="inline ml-4" />
                </button>
              </motion.div>
            )}

            {step === 10 && (
              <motion.div key="10" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-20">
                <h3 className="text-7xl font-black text-green-400 mb-8">Purchase Complete!</h3>
                <p className="text-4xl mb-12">Your {car.name} is confirmed!</p>
                <div className="max-w-xl mx-auto p-10 bg-green-500/20 rounded-3xl border border-green-500/50">
                  <p className="text-2xl font-bold">Delivery in 7-10 business days</p>
                  <p className="text-xl mt-4">{formData.name} • {formData.address}</p>
                </div>
                <button onClick={onComplete} className="mt-12 px-20 py-10 bg-white text-black rounded-full font-bold text-3xl">
                  Return to Site
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </GlassCard>
    </motion.div>
  );
};
