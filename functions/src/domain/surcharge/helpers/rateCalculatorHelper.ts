export function rateCalculatorHelper(
  rate: number | undefined, 
  totalAmount: number, 
  surchargeAmount: number
): number { 
  if (typeof rate === 'undefined' || rate <= 0) {
    throw new Error('Invalid input: rate amount must be greater than 0.');
  } else {
    if (surchargeAmount <= 0 || totalAmount <= 0) {
      throw new Error('Invalid input: surchargeAmount and totalAmount must be greater than 0.');
    }
    const purchaseAmount = totalAmount - surchargeAmount
    if (purchaseAmount <= 0) {
      throw new Error('Invalid input: purchaseAmount amount must be greater than 0.');
    }
    const rate = (surchargeAmount / purchaseAmount) * 100
    return Number(rate.toFixed(1))
  }
}
