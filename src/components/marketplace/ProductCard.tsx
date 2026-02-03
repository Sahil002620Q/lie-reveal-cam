import { motion } from 'framer-motion';
import { MapPin, Tag, ArrowRight, Camera } from 'lucide-react';
import { Product } from '@/types/marketplace';

interface ProductCardProps {
  product: Product;
  onClick: () => void;
  index: number;
}

const conditionColors: Record<string, { bg: string; text: string }> = {
  new: { bg: 'bg-success/20', text: 'text-success' },
  used: { bg: 'bg-primary/20', text: 'text-primary' },
  broken: { bg: 'bg-destructive/20', text: 'text-destructive' },
  for_parts: { bg: 'bg-warning/20', text: 'text-warning' },
};

const ProductCard = ({ product, onClick, index }: ProductCardProps) => {
  const conditionStyle = conditionColors[product.condition] || conditionColors.used;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      whileHover={{ y: -8, scale: 1.02 }}
      onClick={onClick}
      className="group bg-card border border-border rounded-2xl overflow-hidden cursor-pointer hover:shadow-2xl hover:shadow-primary/10 transition-shadow duration-300"
    >
      {/* Image Container */}
      <div className="relative h-52 bg-secondary overflow-hidden">
        {product.image ? (
          <motion.img
            src={product.image}
            alt={product.title}
            className="w-full h-full object-cover"
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.4 }}
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center text-muted-foreground">
            <Camera className="w-12 h-12 mb-2 opacity-50" />
            <span className="text-sm">No Image</span>
          </div>
        )}

        {/* Status Badge */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3 + index * 0.1, type: 'spring' }}
          className="absolute top-3 right-3"
        >
          <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-success text-success-foreground shadow-lg">
            {product.status}
          </span>
        </motion.div>

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-card/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Content */}
      <div className="p-5">
        {/* Category & Price */}
        <div className="flex items-center justify-between mb-3">
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-primary/10 text-primary">
            <Tag className="w-3 h-3" />
            {product.category}
          </span>
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.4 + index * 0.1, type: 'spring' }}
            className="text-2xl font-bold text-foreground"
          >
            ${product.price}
          </motion.span>
        </div>

        {/* Title */}
        <h3 className="text-lg font-bold text-foreground mb-1 group-hover:text-primary transition-colors line-clamp-2">
          {product.title}
        </h3>
        <p className="text-sm text-muted-foreground mb-3">
          {product.brand} • {product.model}
        </p>

        {/* Details */}
        <div className="space-y-2 mb-4">
          <div className="flex items-center text-sm">
            <span className="text-muted-foreground w-24 flex-shrink-0">Condition:</span>
            <span className={`font-semibold uppercase text-xs px-2 py-0.5 rounded ${conditionStyle.bg} ${conditionStyle.text}`}>
              {product.condition.replace('_', ' ')}
            </span>
          </div>
          <div className="flex items-center text-sm">
            <span className="text-muted-foreground w-24 flex-shrink-0">Location:</span>
            <span className="text-foreground flex items-center gap-1">
              <MapPin className="w-3 h-3" />
              {product.location}
            </span>
          </div>
        </div>

        {/* View Details Button */}
        <motion.div
          whileHover={{ x: 4 }}
          className="flex items-center justify-center gap-2 py-3 border-t border-border text-primary font-semibold"
        >
          View Details
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
