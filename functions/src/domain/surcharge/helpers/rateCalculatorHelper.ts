
export function rateCalculatorHelper(
  rate: number, 
  totalAmount: number, 
  surchargeAmount: number)
  { 
      if(rate === undefined || rate == 0){
        let purchase = totalAmount - surchargeAmount
        return surchargeAmount/purchase
      } else return rate
  }