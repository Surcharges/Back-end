export function RateCalculator(
  totalAmount: number,
  surchargeAmount: number
): number {
  const purchaseAmount = totalAmount - surchargeAmount
  return Math.round((surchargeAmount / purchaseAmount) * 100)
}