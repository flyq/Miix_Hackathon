const SPONSOR = 'SponsorAddress'   //发起人地址
const OFFERING_TOKEN = 'test.XXT'  //众筹得到的Token

interface FundingInfo {
  tokenAmount: bigint
  xasAmount: bigint
  bchAmount: bigint
}

class Funding {
  // 众筹得到的token数量
  tokenAmount: bigint
  // 参与众筹XAS数量
  xasAmount: bigint
  // 参与众筹BCH数量
  bchAmount: bigint
  constructor() {
    this.tokenAmount = BigInt(0)
    this.xasAmount = BigInt(0)
    this.bchAmount = BigInt(0)
  }
}

// 众筹合约类
export class SimpleCrowdFundgingContract extends AschContract {
  // 记录每个地址的众筹信息
  fundingOfAddress: Mapping<Funding> 
  // 兑换比例
  rateOfCurrency: Mapping<bigint>
  // 总可众筹token数量
  totalFundingToken: bigint
  // 剩余可众筹数量
  avalibleTokenAmount: bigint

  // 初始化方法，会在合约注册时被调用
  constructor() {
    super()

    this.rateOfCurrency = new Mapping<bigint>()
    this.rateOfCurrency['XAS'] = BigInt(100)    // 1 XAS = 100 token
    this.rateOfCurrency['BCH'] = BigInt(30000) // 1 BCH = 30000 token

    this.totalFundingToken = BigInt(0)
    this.avalibleTokenAmount = BigInt(0)
    this.fundingOfAddress = new Mapping<Funding>()
  }

  // 发起人初始注入token，只允许注入一次
  @payable
  payInitialToken(amount: bigint, currency: string): void {
    assert(this.context.senderAddress === SPONSOR, `invalid sponsor address`)
    assert(currency === OFFERING_TOKEN, `invalid offering currency, should be ${OFFERING_TOKEN}`)
    assert(this.totalFundingToken === BigInt(0), `initial ${OFFERING_TOKEN} has paied`)

    this.totalFundingToken = amount
    this.avalibleTokenAmount = amount
  }
  
  // 众筹逻辑
  @payable({ isDefault: true })
  crowdFunding(amount: bigint, currency: string) {
    assert(amount >= 0, 'amount must great than 0')
    assert(currency === 'XAS' || currency === 'BCH', `invalid currency '${currency}', please pay XAS or BCH`)
  
    const rate = this.rateOfCurrency[currency]!

    const tokenAmount = amount * rate
    assert(this.avalibleTokenAmount >= tokenAmount, `insuffient ${OFFERING_TOKEN}`)

    this.avalibleTokenAmount = this.avalibleTokenAmount - tokenAmount
    const partnerAddress = this.context!.senderAddress
    this.updateFunding(partnerAddress, amount, currency, tokenAmount)
    // 调用ASCH链转账
    this.transfer(partnerAddress, tokenAmount, OFFERING_TOKEN)
  }
  
  @constant
  getFunding(address: string): FundingInfo {
    return this.fundingOfAddress[address] || new Funding()
  }

  private updateFunding( address: string, amount: bigint, currency: string, tokenAmount: bigint) : void {
    const funding = this.getOrCreateFunding(address)
    funding.tokenAmount += tokenAmount

    if (currency === 'XAS') {
      funding.xasAmount += amount
    }
    else if (currency === 'BCH') {
      funding.bchAmount += amount
    }
  }
  
  private getOrCreateFunding( address: string ) : Funding {
    if (this.fundingOfAddress[address] === undefined) {
      this.fundingOfAddress[address] = new Funding()
    }
    return this.fundingOfAddress[address]!
  }
  
}