/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Search, 
  ShoppingCart, 
  User, 
  Menu, 
  X, 
  ArrowRight, 
  Star,
  Instagram,
  Facebook,
  Twitter,
  ChevronRight
} from 'lucide-react';

// --- Types ---
interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  image: string;
  sale?: boolean;
}

interface CartItem extends Product {
  quantity: number;
}

interface Category {
  id: string;
  name: string;
  image: string;
  link?: string;
}

// --- Sample Data ---
const CATEGORIES: Category[] = [
  {
    id: 'electronics',
    name: 'Electronics',
    image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?q=80&w=800&auto=format&fit=crop',
    link: 'https://fashion.thetrendhunt.store/collections/frontpage'
  },
  {
    id: 'fashion',
    name: 'Fashion',
    image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?q=80&w=800&auto=format&fit=crop',
    link: 'https://fashion.thetrendhunt.store/collections/fashion'
  }
];

// --- Components ---

function AnnouncementBar() {
  return (
    <div className="bg-brand-cyan text-brand-bg py-2.5 px-4 overflow-hidden relative border-b border-black/5">
      <div className="flex whitespace-nowrap animate-marquee">
        <div className="flex shrink-0 items-center justify-around gap-12 px-4 text-xs md:text-sm font-black uppercase tracking-widest">
          <span>🔥 Free Shipping Across India</span>
          <span>💎 Cash On Delivery Available</span>
          <span>⚡ Fast Delivery</span>
          <span>🔥 Free Shipping Across India</span>
          <span>💎 Cash On Delivery Available</span>
          <span>⚡ Fast Delivery</span>
        </div>
      </div>
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 25s linear infinite;
        }
      `}</style>
    </div>
  );
}

function Header({ cartCount, onCartClick }: { cartCount: number, onCartClick: () => void }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = ['Home', 'Electronics', 'Fashion', 'Contact'];

  return (
    <header className="sticky top-0 z-50 bg-brand-bg/90 backdrop-blur-xl border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-brand-blue to-brand-cyan rounded-xl flex items-center justify-center transform hover:rotate-6 transition-transform">
            <span className="text-white font-bold text-xl">T</span>
          </div>
          <span className="font-display font-black text-2xl tracking-tighter text-white">
            THE<span className="text-brand-cyan">TREND</span>HUNT
          </span>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-10">
          {navItems.map((item) => {
            const isFashion = item === 'Fashion';
            const isElectronics = item === 'Electronics';
            const isContact = item === 'Contact';
            const isExternal = isFashion || isElectronics || isContact;
            
            let href = `#${item.toLowerCase()}`;
            if (isFashion) href = 'https://fashion.thetrendhunt.store/collections/fashion';
            if (isElectronics) href = 'https://fashion.thetrendhunt.store/collections/frontpage';
            if (isContact) href = 'https://fashion.thetrendhunt.store/pages/contact';

            return (
              <a 
                key={item} 
                href={href} 
                target={isExternal ? "_blank" : undefined}
                rel={isExternal ? "noopener noreferrer" : undefined}
                className="text-xs font-bold tracking-widest uppercase text-white/50 hover:text-brand-cyan transition-all"
                id={`nav-${item.toLowerCase()}`}
              >
                {item}
              </a>
            );
          })}
        </nav>

      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-brand-bg border-t border-white/10 overflow-hidden"
          >
            <nav className="flex flex-col p-4 gap-4">
              {navItems.map((item) => {
                const isFashion = item === 'Fashion';
                const isElectronics = item === 'Electronics';
                const isContact = item === 'Contact';
                const isExternal = isFashion || isElectronics || isContact;
                
                let href = `#${item.toLowerCase()}`;
                if (isFashion) href = 'https://fashion.thetrendhunt.store/collections/fashion';
                if (isElectronics) href = 'https://fashion.thetrendhunt.store/collections/frontpage';
                if (isContact) href = 'https://fashion.thetrendhunt.store/pages/contact';

                return (
                  <a 
                    key={item} 
                    href={href} 
                    target={isExternal ? "_blank" : undefined}
                    rel={isExternal ? "noopener noreferrer" : undefined}
                    className="text-lg font-medium py-2 border-b border-white/5"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item}
                  </a>
                );
              })}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function TrustBar() {
  const features = [
    { title: 'Global Shipping', desc: 'Secure delivery worldwide' },
    { title: 'Premium Quality', desc: 'Curated premium brands' },
    { title: 'Secure Payment', desc: '100% encrypted checkout' },
    { title: '24/7 Support', desc: 'Expert assistance anytime' }
  ];

  return (
    <div className="py-12 border-y border-white/5 bg-white/[0.01]">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8">
        {features.map((f, i) => (
          <div key={i} className="text-center group">
            <h4 className="text-white font-bold text-sm mb-1 group-hover:text-brand-cyan transition-colors">{f.title}</h4>
            <p className="text-white/40 text-xs font-medium tracking-tight">{f.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function Hero() {
  return (
    <section className="relative h-[85vh] flex items-center justify-center overflow-hidden">
      {/* Background with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?q=80&w=2000&auto=format&fit=crop" 
          className="w-full h-full object-cover"
          alt="Hero background"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-brand-bg/60 z-10" />
        <div className="absolute inset-0 bg-gradient-to-b from-brand-bg/20 via-transparent to-brand-bg z-10" />
      </div>

      {/* Content */}
      <div className="relative z-20 max-w-5xl mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <div className="inline-flex items-center gap-2 bg-brand-cyan/10 border border-brand-cyan/20 px-4 py-2 rounded-full mb-8">
            <span className="w-2 h-2 bg-brand-cyan rounded-full animate-pulse" />
            <span className="text-brand-cyan font-bold tracking-widest uppercase text-[10px]">Premium Collection 2026</span>
          </div>
          <h1 className="font-display font-black text-5xl sm:text-7xl md:text-9xl text-white mb-10 leading-[0.9] tracking-tighter italic">
            DEFINING <br/> <span className="text-brand-cyan">MODERN</span> STYLE
          </h1>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button 
              className="button bg-white text-brand-bg px-12 py-5 text-sm font-black uppercase tracking-widest shadow-2xl hover:bg-brand-cyan hover:text-white" 
              id="hero-cta"
              onClick={() => document.getElementById('categories')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Shop Now
            </button>
            <button className="button border border-white/20 text-white px-12 py-5 text-sm font-black uppercase tracking-widest hover:bg-white/10 transition-all">
              Our Story
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function Categories() {
  return (
    <section className="py-24 px-4 bg-white/[0.02]" id="categories">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-end justify-between mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-2">Shop by Category</h2>
            <div className="w-20 h-1 bg-brand-cyan" />
          </div>
          <button className="hidden sm:flex items-center gap-2 text-white/60 hover:text-brand-cyan transition-colors group">
            View All <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {CATEGORIES.map((cat, idx) => (
            <motion.a
              key={cat.id}
              href={cat.link || `#${cat.id}`}
              target={cat.link ? "_blank" : undefined}
              rel={cat.link ? "noopener noreferrer" : undefined}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="group relative h-[450px] rounded-3xl overflow-hidden cursor-pointer shadow-3xl shadow-black/50 border border-white/5 block"
            >
              <img 
                src={cat.image} 
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                alt={cat.name}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-bg via-brand-bg/20 to-transparent opacity-90 transition-opacity group-hover:opacity-100" />
              <div className="absolute inset-0 flex flex-col justify-end p-10">
                <p className="text-brand-cyan font-bold tracking-[0.2em] uppercase text-xs mb-3">Collection</p>
                <h3 className="text-4xl font-display font-black text-white mb-6 leading-none">{cat.name}</h3>
                <div className="flex items-center gap-3 text-white font-bold text-sm">
                  Explore <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform" />
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}

function CartDrawer({ 
  isOpen, 
  onClose, 
  items, 
  onUpdateQuantity, 
  onCheckout 
}: { 
  isOpen: boolean, 
  onClose: () => void, 
  items: CartItem[], 
  onUpdateQuantity: (id: string, delta: number) => void,
  onCheckout: () => void
}) {
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-brand-bg z-[101] shadow-2xl flex flex-col border-l border-white/10"
          >
            <div className="p-6 border-b border-white/10 flex items-center justify-between">
              <h2 className="text-2xl font-display font-bold">Your Cart</h2>
              <button 
                onClick={onClose} 
                className="p-2 hover:bg-white/10 rounded-full transition-colors"
                id="close-cart"
              >
                <X size={24} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center">
                  <ShoppingCart size={64} className="text-white/10 mb-4" />
                  <p className="text-white/50 mb-8">Your cart is as empty as a new server.</p>
                  <button 
                    onClick={onClose}
                    className="button border border-brand-cyan text-brand-cyan px-8 py-3"
                  >
                    Start Shopping
                  </button>
                </div>
              ) : (
                items.map((item) => (
                  <div key={item.id} className="flex gap-4">
                    <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 border border-white/10">
                      <img src={item.image} className="w-full h-full object-cover" alt={item.name} />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-sm mb-1">{item.name}</h3>
                      <p className="text-brand-cyan font-bold text-sm mb-3">₹{item.price.toLocaleString()}</p>
                      <div className="flex items-center gap-4">
                        <div className="flex items-center border border-white/20 rounded-lg">
                          <button 
                            onClick={() => onUpdateQuantity(item.id, -1)}
                            className="px-3 py-1 hover:bg-white/10 transition-colors"
                          >-</button>
                          <span className="w-8 text-center text-xs">{item.quantity}</span>
                          <button 
                            onClick={() => onUpdateQuantity(item.id, 1)}
                            className="px-3 py-1 hover:bg-white/10 transition-colors"
                          >+</button>
                        </div>
                        <button 
                          onClick={() => onUpdateQuantity(item.id, -item.quantity)}
                          className="text-xs text-rose-500 hover:underline"
                        >Remove</button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {items.length > 0 && (
              <div className="p-6 border-t border-white/10 bg-white/[0.02]">
                <div className="flex justify-between mb-2">
                  <span className="text-white/50">Subtotal</span>
                  <span className="font-bold">₹{total.toLocaleString()}</span>
                </div>
                <div className="flex justify-between mb-6">
                  <span className="text-white/50">Shipping</span>
                  <span className="text-brand-cyan uppercase text-xs font-bold tracking-widest flex items-center gap-1">
                    Free
                  </span>
                </div>
                <div className="flex justify-between mb-8 text-xl font-bold border-t border-white/10 pt-4">
                  <span>Total</span>
                  <span className="text-brand-blue">₹{total.toLocaleString()}</span>
                </div>
                <button 
                  className="button w-full bg-brand-blue py-4 font-bold text-lg flex items-center justify-center gap-2"
                  onClick={onCheckout}
                >
                  Checkout <ArrowRight size={20} />
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

function CheckoutModal({ 
  isOpen, 
  onClose, 
  total 
}: { 
  isOpen: boolean, 
  onClose: () => void, 
  total: number 
}) {
  const [step, setStep] = useState<'details' | 'payment'>('details');

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
            onClick={onClose}
          />
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="relative w-full max-w-2xl bg-brand-bg rounded-3xl overflow-hidden border border-white/10 shadow-3xl shadow-cyan-500/10"
          >
            <div className="p-8 border-b border-white/10 flex justify-between items-center bg-white/[0.02]">
              <h2 className="text-3xl font-display font-bold">
                {step === 'details' ? 'Shipping Details' : 'Payment Method'}
              </h2>
              <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full">
                <X size={24} />
              </button>
            </div>

            <div className="p-8">
              {step === 'details' ? (
                <div className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-white/50 uppercase tracking-widest mb-2">First Name</label>
                      <input type="text" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-brand-cyan transition-colors" placeholder="John" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-white/50 uppercase tracking-widest mb-2">Last Name</label>
                      <input type="text" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-brand-cyan transition-colors" placeholder="Doe" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-white/50 uppercase tracking-widest mb-2">Address</label>
                    <input type="text" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-brand-cyan transition-colors" placeholder="Street Address, Area" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-white/50 uppercase tracking-widest mb-2">City</label>
                      <input type="text" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-brand-cyan transition-colors" placeholder="Mumbai" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-white/50 uppercase tracking-widest mb-2">PIN Code</label>
                      <input type="text" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-brand-cyan transition-colors" placeholder="400001" />
                    </div>
                  </div>
                  <button 
                    onClick={() => setStep('payment')}
                    className="button w-full bg-brand-cyan text-brand-bg py-4 font-bold text-lg mt-8"
                  >
                    Continue to Payment
                  </button>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="flex flex-col gap-4">
                    <button className="flex items-center justify-between p-6 bg-white/5 border border-brand-cyan rounded-2xl group hover:bg-brand-cyan/5 transition-all">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-brand-cyan rounded-full flex items-center justify-center text-brand-bg">
                           <Star size={24} className="fill-brand-bg" />
                        </div>
                        <div className="text-left">
                          <p className="font-bold text-white">Razorpay (Cards/UPI/Netbanking)</p>
                          <p className="text-xs text-white/50">Fastest and safe payments</p>
                        </div>
                      </div>
                      <div className="w-6 h-6 border-4 border-brand-cyan rounded-full" />
                    </button>
                    <button className="flex items-center justify-between p-6 bg-white/5 border border-white/10 rounded-2xl group hover:border-brand-blue transition-all">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center text-white/70">
                           <ArrowRight size={24} />
                        </div>
                        <div className="text-left">
                          <p className="font-bold text-white">Cash On Delivery (COD)</p>
                          <p className="text-xs text-white/50">Pay when you receive</p>
                        </div>
                      </div>
                      <div className="w-6 h-6 border border-white/30 rounded-full" />
                    </button>
                  </div>
                  
                  <div className="p-6 bg-brand-blue/10 rounded-2xl border border-brand-blue/20 flex justify-between items-center mt-8">
                    <div>
                      <p className="text-xs font-bold text-brand-blue uppercase tracking-widest">Total Amount</p>
                      <p className="text-2xl font-bold">₹{total.toLocaleString()}</p>
                    </div>
                    <button 
                      className="button bg-brand-blue px-10 py-4 font-bold"
                      onClick={() => {
                        alert('Order Placed Successfully! 🎉');
                        onClose();
                      }}
                    >
                      Complete Order
                    </button>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

function Footer() {
  const footerLinks = [
    { title: 'Shop', links: ['Electronics', 'Fashion'] },
    { title: 'Company', links: ['About Us', 'Contact', 'Refund Policy', 'Privacy Policy'] },
  ];

  return (
    <footer className="bg-black py-20 px-4 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between gap-12">
        <div className="max-w-sm">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-8 h-8 bg-brand-blue rounded flex items-center justify-center transform rotate-12">
              <span className="text-white font-bold text-lg -rotate-12">TH</span>
            </div>
            <span className="font-display font-bold text-xl tracking-tighter text-white">
              The<span className="text-brand-cyan">Trend</span>Hunt
            </span>
          </div>
          <p className="text-white/40 mb-8 leading-relaxed">
            Leading destination for premium electronics and urban fashion essentials. We bring the trend to your doorstep.
          </p>
          <div className="flex gap-4">
            <a href="#" className="p-3 bg-white/5 rounded-full text-white/50 hover:text-white hover:bg-brand-blue transition-all">
              <Instagram size={20} />
            </a>
            <a href="#" className="p-3 bg-white/5 rounded-full text-white/50 hover:text-white hover:bg-brand-blue transition-all">
              <Facebook size={20} />
            </a>
            <a href="#" className="p-3 bg-white/5 rounded-full text-white/50 hover:text-white hover:bg-brand-blue transition-all">
              <Twitter size={20} />
            </a>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-12 sm:gap-24">
          {footerLinks.map((col) => (
            <div key={col.title}>
              <h4 className="font-bold text-white mb-6 uppercase text-sm tracking-widest">{col.title}</h4>
              <ul className="space-y-4">
                {col.links.map((link) => {
                  const isContact = link === 'Contact';
                  const href = isContact ? 'https://fashion.thetrendhunt.store/pages/contact' : '#';
                  const target = isContact ? '_blank' : undefined;
                  const rel = isContact ? 'noopener noreferrer' : undefined;

                  return (
                    <li key={link}>
                      <a 
                        href={href} 
                        target={target}
                        rel={rel}
                        className="text-white/40 hover:text-brand-cyan transition-colors text-sm"
                      >
                        {link}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-white/30 text-xs">
        <div className="flex flex-col md:flex-row items-center gap-4">
          <p>© 2026 TheTrendHunt. All rights reserved.</p>
          <span className="hidden md:block text-white/10">|</span>
          <a href="mailto:rajzq1235@gmail.com" className="hover:text-brand-cyan transition-colors flex items-center gap-2">
            rajzq1235@gmail.com
          </a>
        </div>
        <div className="flex gap-8">
          <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          <a href="#" className="hover:text-white transition-colors">Shipping Information</a>
        </div>
      </div>
    </footer>
  );
}

export default function App() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  const addToCart = (product: Product) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const updateQuantity = (id: string, delta: number) => {
    setCartItems(prev => {
      return prev.map(item => {
        if (item.id === id) {
          const newQty = Math.max(0, item.quantity + delta);
          return { ...item, quantity: newQty };
        }
        return item;
      }).filter(item => item.quantity > 0);
    });
  };

  const handleCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const cartTotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  return (
    <div className="min-h-screen bg-brand-bg text-white selection:bg-brand-cyan selection:text-brand-bg font-sans antialiased">
      <AnnouncementBar />
      <Header cartCount={cartCount} onCartClick={() => setIsCartOpen(true)} />
      <Hero />
      <TrustBar />
      <Categories />
      <Footer />

      <CartDrawer 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        items={cartItems}
        onUpdateQuantity={updateQuantity}
        onCheckout={handleCheckout}
      />

      <CheckoutModal 
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        total={cartTotal}
      />
    </div>
  );
}
