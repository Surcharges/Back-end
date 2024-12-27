
export function rateCalculatorHelper(
  rate: number, 
  totalAmount: number, 
  surchargeAmount: number)
  { 
    let purchase = totalAmount - surchargeAmount
      if(rate === undefined){
        return surchargeAmount/purchase
      } else return rate
  }