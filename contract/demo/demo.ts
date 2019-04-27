const CURRENCY = 'XAS'
const EMPTY_ADDRESS = ''
const MAX_AMOUNT = BigInt(1000 * (10 ** 8))

// 自定义状态类型
class PayState {
  // 转账次数
  payTimes: number
  // 转账总额
  amount: bigint
  constructor() {
    this.payTimes = 0
    this.amount = BigInt(0)
  }
}

// 数据接口类型
interface MaxAmountInfo {
  address?: string
  amount?: bigint
  payTimes?: number
}

// 合约类
export class TestContract extends AschContract {
  // 合约收到的转账, 公开属性
  payStateOfAddress: Mapping<PayState>
  
  // 最大转账的地址，私有状态，外部不可查询
  private maxAmountAddress = EMPTY_ADDRESS
  // 收到的转账总额
  private total = BigInt(0)

  // 初始化方法
  constructor() {
    super()
    this.payStateOfAddress = new Mapping<PayState>()
    this.total = BigInt(0)
  }

  // 默认向合约转账自动调用的方法
  @payable({ isDefault : true })
  onPay(amount: bigint, currency: string) {  
    assert( currency === AVAIBLE_CURRENCY, `Support ${CURRENCY} only` )
    assert( amount > 0 && amount < MAX_AMOUNT , `Amount should greater than 0 and less than ${MAX_AMOUNT}`)

    const address = this.context.senderAddress
    const newAmount = this.payXAS(amount, address)
    if (this.getMaxAmount() < newAmount) {
      this.maxAmountAddress = address
    }
  }

  @constant
  getMaxInfo(): MaxAmountInfo {
    const address = this.maxAmountAddress
    if (address === EMPTY_ADDRESS) return { }

    const { payTimes, amount } = this.payStateOfAddress[address]!
    return { address, payTimes, amount }
  }

  @constant
  getTotal(): bigint {
    return this.total
  }

  // 内部方法，外部不可访问（下同）
  private payXAS(amount: bigint, address: string) : bigint {
    let payState = this.payStateOfAddress[address]
    if (!payState) {
      payState = new PayState()
      this.payStateOfAddress[address] = payState
    }

    payState.payTimes += 1
    payState.amount += amount
    this.total += amount

    return payState.amount
  }

  private getMaxAmount() : bigint {
    return (this.maxAmountAddress === EMPTY_ADDRESS) ?
      BigInt(0) :
      this.getPayInfo(this.maxAmountAddress).amount
  }

  private getPayInfo(address: string) : PayState {
    return this.payStateOfAddress[address] || new PayState()
  }
}