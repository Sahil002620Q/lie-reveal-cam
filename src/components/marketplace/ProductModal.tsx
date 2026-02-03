import { motion, AnimatePresence } from 'framer-motion';
import { X, MapPin, Tag, Calendar, MessageCircle, Heart, Share2, Camera } from 'lucide-react';
import { Product } from '@/types/marketplace';
import { Button } from '@/components/ui/button';

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
}

const conditionColors: Record<string, { bg: string; text: string }> = {
  new: { bg: 'bg-success/20', text: 'text-success' },
  used: { bg: 'bg-primary/20', text: 'text-primary' },
  broken: { bg: 'bg-destructive/20', text: 'text-destructive' },
  for_parts: { bg: 'bg-warning/20', text: 'text-warning' },
};

const ProductModal = ({ product, onClose }: ProductModalProps) => {
  if (!product) return null;

  const conditionStyle = conditionColors[product.condition] || conditionColors.used;

  return (
    <AnimatePresence>
      {product && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-card border border-border rounded-3xl shadow-2xl"
          >
            {/* Close Button */}
            <motion.button
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              onClick={onClose}
              className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-secondary hover:bg-destructive hover:text-destructive-foreground transition-colors"
            >
              <X className="w-5 h-5" />
            </motion.button>

            <div className="grid md:grid-cols-2 gap-0">
              {/* Image */}
              <div className="relative h-64 md:h-full min-h-[300px] bg-secondary">
                {product.image ? (
                  <motion.img
                    initial={{ scale: 1.1 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.5 }}
                    src={product.image}
                    alt={product.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center text-muted-foreground">
                    <Camera className="w-16 h-16 mb-2 opacity-50" />
                    <span>No Image</span>
                  </div>
                )}
                
                {/* Status Badge */}
                <span className="absolute top-4 left-4 px-4 py-1.5 rounded-full text-sm font-bold uppercase tracking-wider bg-success text-success-foreground shadow-lg">
                  {product.status}
                </span>
              </div>

              {/* Content */}
              <div className="p-6 md:p-8">
                {/* Category */}
                <div className="flex items-center gap-2 mb-4">
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-primary/10 text-primary">
                    <Tag className="w-3 h-3" />
                    {product.category}
                  </span>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold uppercase ${conditionStyle.bg} ${conditionStyle.text}`}>
                    {product.condition.replace('_', ' ')}
                  </span>
                </div>

                {/* Title & Price */}
                <h2 className="text-2xl font-bold text-foreground mb-2">{product.title}</h2>
                <p className="text-muted-foreground mb-4">
                  {product.brand} • {product.model}
                </p>

                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: 'spring' }}
                  className="text-4xl font-bold text-primary mb-6"
                >
                  ${product.price}
                </motion.div>

                {/* Description */}
                <div className="mb-6">
                  <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                    Description
                  </h3>
                  <p className="text-foreground leading-relaxed">{product.description}</p>
                </div>

                {/* Details */}
                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-3 text-muted-foreground">
                    <MapPin className="w-4 h-4" />
                    <span>{product.location}</span>
                  </div>
                  <div className="flex items-center gap-3 text-muted-foreground">
                    <Calendar className="w-4 h-4" />
                    <span>Listed {new Date(product.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-3">
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Button className="w-full h-12 bg-gradient-primary hover:opacity-90 shadow-glow-primary text-lg font-semibold gap-2">
                      <MessageCircle className="w-5 h-5" />
                      Contact Seller
                    </Button>
                  </motion.div>
                  
                  <div className="flex gap-3">
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="flex-1">
                      <Button variant="outline" className="w-full gap-2">
                        <Heart className="w-4 h-4" />
                        Save
                      </Button>
                    </motion.div>
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="flex-1">
                      <Button variant="outline" className="w-full gap-2">
                        <Share2 className="w-4 h-4" />
                        Share
                      </Button>
                    </motion.div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ProductModal;
