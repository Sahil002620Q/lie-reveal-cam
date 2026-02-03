import { motion } from 'framer-motion';
import { RotateCcw } from 'lucide-react';
import { FilterState } from '@/types/marketplace';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

interface ProductFiltersProps {
  filters: FilterState;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
}

const conditions = [
  { value: '', label: 'All Conditions' },
  { value: 'new', label: 'New' },
  { value: 'used', label: 'Used' },
  { value: 'broken', label: 'Broken' },
  { value: 'for_parts', label: 'For Parts' },
];

const categories = [
  { value: '', label: 'All Categories' },
  { value: 'smartphone', label: 'Smartphones' },
  { value: 'laptop', label: 'Laptops' },
  { value: 'tablet', label: 'Tablets' },
  { value: 'headphones', label: 'Headphones' },
  { value: 'accessories', label: 'Accessories' },
];

const sortOptions = [
  { value: 'newest', label: 'Newest First' },
  { value: 'price_low', label: 'Price: Low to High' },
  { value: 'price_high', label: 'Price: High to Low' },
];

const ProductFilters = ({ filters, setFilters }: ProductFiltersProps) => {
  const resetFilters = () => {
    setFilters({
      category: '',
      condition: '',
      search: '',
      sortBy: 'newest',
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-card border border-border rounded-2xl p-6 sticky top-24"
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold text-foreground">Filters</h3>
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button
            variant="ghost"
            size="sm"
            onClick={resetFilters}
            className="text-primary hover:text-primary/80 gap-1"
          >
            <RotateCcw className="w-4 h-4" />
            Reset
          </Button>
        </motion.div>
      </div>

      {/* Category Filter */}
      <div className="mb-6">
        <Label className="text-sm font-medium text-muted-foreground mb-3 block">
          Category
        </Label>
        <select
          value={filters.category}
          onChange={(e) => setFilters({ ...filters, category: e.target.value })}
          className="w-full p-3 rounded-xl bg-secondary border border-border text-foreground focus:ring-2 focus:ring-primary transition-all"
        >
          {categories.map((cat) => (
            <option key={cat.value} value={cat.value}>
              {cat.label}
            </option>
          ))}
        </select>
      </div>

      {/* Condition Filter */}
      <div className="mb-6">
        <Label className="text-sm font-medium text-muted-foreground mb-3 block">
          Condition
        </Label>
        <RadioGroup
          value={filters.condition}
          onValueChange={(value) => setFilters({ ...filters, condition: value })}
          className="space-y-2"
        >
          {conditions.map((condition) => (
            <motion.div
              key={condition.value}
              whileHover={{ x: 4 }}
              className="flex items-center space-x-3"
            >
              <RadioGroupItem
                value={condition.value}
                id={`condition-${condition.value}`}
                className="border-muted-foreground data-[state=checked]:border-primary data-[state=checked]:bg-primary"
              />
              <Label
                htmlFor={`condition-${condition.value}`}
                className="text-sm text-muted-foreground hover:text-foreground cursor-pointer transition-colors"
              >
                {condition.label}
              </Label>
            </motion.div>
          ))}
        </RadioGroup>
      </div>

      {/* Sort By */}
      <div className="mb-6">
        <Label className="text-sm font-medium text-muted-foreground mb-3 block">
          Sort By
        </Label>
        <select
          value={filters.sortBy}
          onChange={(e) => setFilters({ ...filters, sortBy: e.target.value as FilterState['sortBy'] })}
          className="w-full p-3 rounded-xl bg-secondary border border-border text-foreground focus:ring-2 focus:ring-primary transition-all"
        >
          {sortOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      {/* Quick Stats */}
      <div className="pt-4 border-t border-border">
        <p className="text-xs text-muted-foreground text-center">
          Showing filtered results
        </p>
      </div>
    </motion.div>
  );
};

export default ProductFilters;
