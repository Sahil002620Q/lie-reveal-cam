import { motion, AnimatePresence } from 'framer-motion';
import { Package } from 'lucide-react';
import { Product } from '@/types/marketplace';
import ProductCard from './ProductCard';

interface ProductGridProps {
  products: Product[];
  onSelectProduct: (product: Product) => void;
}

const ProductGrid = ({ products, onSelectProduct }: ProductGridProps) => {
  if (products.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center justify-center py-20 text-center"
      >
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <Package className="w-20 h-20 text-muted-foreground/50 mb-4" />
        </motion.div>
        <h3 className="text-xl font-semibold text-foreground mb-2">No products found</h3>
        <p className="text-muted-foreground">Try adjusting your filters or search terms</p>
      </motion.div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
      <AnimatePresence mode="popLayout">
        {products.map((product, index) => (
          <motion.div
            key={product.id}
            layout
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
          >
            <ProductCard
              product={product}
              onClick={() => onSelectProduct(product)}
              index={index}
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default ProductGrid;
