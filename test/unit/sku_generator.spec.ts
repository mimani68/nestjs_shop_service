import { SkuGenerator } from "src/class/sku/generator";

describe('SkuGenerator test', () => {
  it('should generate the correct code for physical type', () => {
    const skuGenerator = new SkuGenerator('123', 'physical', 'large', 'red');
    expect(skuGenerator.generateCode()).toBe('phy-large-red-123');
  });

  it('should generate the correct code for pod type', () => {
    const skuGenerator = new SkuGenerator('456', 'pod', '', '');
    expect(skuGenerator.generateCode()).toBe('pod-456');
  });

  it('should generate the correct code for digital type', () => {
    const skuGenerator = new SkuGenerator('789', 'digital', '', '');
    expect(skuGenerator.generateCode()).toBe('digital-789');
  });
});
