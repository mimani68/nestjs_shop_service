/*

Write typescript class with below structure

A) if the Product is POD, then Calculate the cost for POD products considering the following:
 - Tax: 10% (transport agency share).
 - Shipping: 5% (Printful's share).
 - SKU Costs: The costs associated with SKUs are also part of (Printful's share).

B) If the product is Physical then Calculate the cost for Physical products considering the following:
 - Tax: 10% (Producer's share).
 - Shipping:
Self-Managed Shipping: A fixed amount entered during the creation, with the entire amount being the(Producer's share).
Easy Post Shipping: 5% is the DropLink's share.

C) If the product is Digital Product: No shipping or tax considerations.

*/

import { ProductType } from "src/product/product.schema";
export type shippingType = 'Self-Managed Shipping' | 'Easy Post Shipping'

export class ProductCostCalculator {

    private shippingCost: number;

    constructor( shippingCost: number ) {
        this.shippingCost = shippingCost
    }

    public calculateCost(productType: ProductType, shippingType?: shippingType, skuCosts?: number): number {
      if (productType.toLowerCase() === 'pod') {
        // Calculate cost for POD products
        const tax = 0.10; // 10% tax (transport agency share)
        const shipping = 0.05; // 5% shipping (Printful's share)
        const totalCost = skuCosts * (1 + tax + shipping);
        return totalCost;
      } else if (productType.toLowerCase() === 'physical') {
        // Calculate cost for Physical products
        let totalCost = 0;
        const tax = 0.10; // 10% tax (Producer's share)
        if (shippingType.toLowerCase() === 'self-managed shipping') {
          // Self-Managed Shipping
          // A fixed amount entered during the creation, with the entire amount being the (Producer's share)
          totalCost += this.shippingCost; // Assuming shippingCost is defined elsewhere
        } else if (shippingType.toLowerCase() === 'easy post shipping') {
          // Easy Post Shipping
          // 5% is the DropLink's share
          const shipping = 0.05;
          totalCost += (this.shippingCost * (1 + shipping));
        }
        totalCost *= (1 + tax);
        return totalCost;
      } else if (productType.toLowerCase() === 'digital') {
        // No shipping or tax considerations for Digital Product
        return 0; // Assuming digital products have no cost
      } else {
        throw new Error('Invalid product type');
      }
    }
  }
  