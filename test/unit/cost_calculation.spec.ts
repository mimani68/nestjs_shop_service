import { ProductCostCalculator } from "src/class/cost/calculator";

describe('ProductCostCalculator', () => {
  describe('calculateCost', () => {
    test('should calculate cost for POD products with given SKU costs', () => {
      const calculator = new ProductCostCalculator(10);
      const cost = calculator.calculateCost('POD', undefined, 100);
      expect(cost).toBeCloseTo(115, 2); // 100 * (1 + 0.10 + 0.05) = 115
    });

    test('should calculate cost for Physical products with Self-Managed Shipping', () => {
      const calculator = new ProductCostCalculator(20);
      const cost = calculator.calculateCost('Physical', 'Self-Managed Shipping');
      expect(cost).toBe(20); // Assuming shipping cost is directly added to the total cost
    });

    test('should calculate cost for Physical products with Easy Post Shipping', () => {
      const calculator = new ProductCostCalculator(30);
      const cost = calculator.calculateCost('Physical', 'Easy Post Shipping');
      expect(cost).toBeCloseTo(31.5, 2); // 30 * (1 + 0.10) * (1 + 0.05) = 31.5
    });

    test('should return 0 for Digital products', () => {
      const calculator = new ProductCostCalculator(0);
      const cost = calculator.calculateCost('Digital');
      expect(cost).toBe(0);
    });

    test('should throw error for invalid product type', () => {
      const calculator = new ProductCostCalculator(0);
      expect(() => calculator.calculateCost('InvalidType')).toThrow('Invalid product type');
    });
  });
});
