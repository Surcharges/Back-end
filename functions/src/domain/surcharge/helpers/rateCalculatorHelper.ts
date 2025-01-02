export function rateCalculatorHelper(
  rate: number | undefined, 
  totalAmount: number, 
  surchargeAmount: number
): number { 
  if (typeof rate === 'undefined' || rate <= 0) {
    const purchaseAmount = totalAmount - surchargeAmount;

    if (purchaseAmount <= 0) {
      throw new Error('Invalid input: purchaseAmount amount must be greater than 0.');
    }
    if (surchargeAmount <= 0) {
      throw new Error('Invalid input: surchargeAmount amount must be greater than 0.');
    }
    return Math.round((surchargeAmount / purchaseAmount) * 100);
  }

  return rate;
}
