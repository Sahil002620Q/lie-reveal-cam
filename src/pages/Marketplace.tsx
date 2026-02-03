import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import MarketplaceHeader from '@/components/marketplace/MarketplaceHeader';
import MarketplaceHero from '@/components/marketplace/MarketplaceHero';
import ProductFilters from '@/components/marketplace/ProductFilters';
import ProductGrid from '@/components/marketplace/ProductGrid';
import ProductModal from '@/components/marketplace/ProductModal';
import { Product, FilterState } from '@/types/marketplace';

const mockProducts: Product[] = [
  {
    id: '1',
    title: 'iPhone 14 Pro Max',
    brand: 'Apple',
    model: 'A2894',
    category: 'smartphone',
    condition: 'broken',
    price: 350,
    location: 'New York, NY',
    description: 'Cracked screen but fully functional. Battery health 89%.',
    image: 'https://images.unsplash.com/photo-1678685888221-cda773a3dcdb?w=400',
    status: 'active',
    createdAt: new Date().toISOString(),
  },
  {
    id: '2',
    title: 'MacBook Pro 16"',
    brand: 'Apple',
    model: 'M2 Pro',
    category: 'laptop',
    condition: 'used',
    price: 1200,
    location: 'San Francisco, CA',
    description: 'Excellent condition, minor scratches on lid. Includes charger.',
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400',
    status: 'active',
    createdAt: new Date().toISOString(),
  },
  {
    id: '3',
    title: 'Samsung Galaxy S23 Ultra',
    brand: 'Samsung',
    model: 'SM-S918B',
    category: 'smartphone',
    condition: 'new',
    price: 899,
    location: 'Los Angeles, CA',
    description: 'Brand new, sealed in box. Full warranty included.',
    image: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=400',
    status: 'active',
    createdAt: new Date().toISOString(),
  },
  {
    id: '4',
    title: 'Dell XPS 15',
    brand: 'Dell',
    model: '9520',
    category: 'laptop',
    condition: 'for_parts',
    price: 150,
    location: 'Chicago, IL',
    description: 'Does not power on. Good for parts harvesting.',
    image: 'https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=400',
    status: 'active',
    createdAt: new Date().toISOString(),
  },
  {
    id: '5',
    title: 'Sony WH-1000XM5',
    brand: 'Sony',
    model: 'WH-1000XM5',
    category: 'headphones',
    condition: 'used',
    price: 220,
    location: 'Seattle, WA',
    description: 'Like new condition. All accessories included.',
    image: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=400',
    status: 'active',
    createdAt: new Date().toISOString(),
  },
  {
    id: '6',
    title: 'iPad Pro 12.9"',
    brand: 'Apple',
    model: 'M2 Chip',
    category: 'tablet',
    condition: 'broken',
    price: 400,
    location: 'Austin, TX',
    description: 'Screen damaged but touch works. Comes with Magic Keyboard.',
    image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400',
    status: 'active',
    createdAt: new Date().toISOString(),
  },
];

const Marketplace = () => {
  const [filters, setFilters] = useState<FilterState>({
    category: '',
    condition: '',
    search: '',
    sortBy: 'newest',
  });
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [showFilters, setShowFilters] = useState(false);

  const filteredProducts = mockProducts.filter((product) => {
    if (filters.category && product.category !== filters.category) return false;
    if (filters.condition && product.condition !== filters.condition) return false;
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      return (
        product.title.toLowerCase().includes(searchLower) ||
        product.brand.toLowerCase().includes(searchLower) ||
        product.description.toLowerCase().includes(searchLower)
      );
    }
    return true;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (filters.sortBy) {
      case 'price_low':
        return a.price - b.price;
      case 'price_high':
        return b.price - a.price;
      case 'newest':
      default:
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    }
  });

  return (
    <div className="min-h-screen bg-background">
      <MarketplaceHeader />
      <MarketplaceHero />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Mobile Filter Toggle */}
          <motion.button
            whileTap={{ scale: 0.98 }}
            onClick={() => setShowFilters(!showFilters)}
            className="lg:hidden flex items-center justify-between w-full p-4 bg-card border border-border rounded-xl"
          >
            <span className="font-semibold text-foreground">🔍 Filters & Sort</span>
            <motion.span
              animate={{ rotate: showFilters ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              ▼
            </motion.span>
          </motion.button>

          {/* Filters Sidebar */}
          <AnimatePresence>
            {(showFilters || window.innerWidth >= 1024) && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="lg:w-72 flex-shrink-0"
              >
                <ProductFilters filters={filters} setFilters={setFilters} />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Product Grid */}
          <div className="flex-1">
            <ProductGrid 
              products={sortedProducts} 
              onSelectProduct={setSelectedProduct} 
            />
          </div>
        </div>
      </main>

      {/* Product Modal */}
      <ProductModal 
        product={selectedProduct} 
        onClose={() => setSelectedProduct(null)} 
      />
    </div>
  );
};

export default Marketplace;
