export function RateCalculator(
  totalAmount: number,
  surchargeAmount: number
): number {
  const purchaseAmount = totalAmount - surchargeAmount
  const rate = (surchargeAmount / purchaseAmount) * 100
  return Number(rate.toFixed(1))
}