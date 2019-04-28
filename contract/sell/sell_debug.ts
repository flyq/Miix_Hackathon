const DEV = 'ADXEbSc8N8yV76oA4hvKDBFtiqumsjTT5a'
const InitName = '妖灵蛋'
const InitIntro = '这是一个妖灵蛋，你可以买下它并通过上传三次元图片来孵化妖灵'

class IdolBase {
    id: string
    owner: string
    state: boolean  // false 表示蛋，true 表示已经是图片状态
    name: string // 妖灵名字
    intro: string // 简介
    address: string // 图片地址，state为false时，地址为空，这时前端用蛋代替图片显示
    isOnsell: boolean
    constructor(_id: string, _owner: string, _name: string, _intro: string) {
        this.id = _id
        this.owner = _owner
        this.state = false
        this.name = _name
        this.intro = _intro
        this.address = ''
        this.isOnsell = false
    }
}

class Auction {
    seller: string
    startPrice: BigInt
    endPrice: BigInt
    duration: number
    startedAt: number
    constructor(_seller: string, _startPrice: BigInt, _endPrice: BigInt, _duration: number, _startedAt: number) {
        this.seller = _seller
        this.startPrice = _startPrice
        this.endPrice = _endPrice
        this.duration = _duration
        this.startedAt = _startedAt
    }
}

interface IdolBaseInfo {
    id: string
    owner: string
    state: boolean
    name: string
    intro: string
    address: string
    isOnsell: boolean
}

interface AuctionInfo {
    seller: string
    startPrice: BigInt
    endPrice: BigInt
    duration: number
    startedAt: number
}

export class Idol extends AschContract {
    idolAmount: number
    isOnsellAmount: number

    idToIdol: Mapping<IdolBase>
    userToOwnedId: Mapping<Vector<string>>

    onsellToId: Vector<string>
    idToAuction: Mapping<Auction>

    constructor() {
        super()
        this.idolAmount = 0
        this.isOnsellAmount = 0
        this.idToIdol = new Mapping<IdolBase>()
        this.userToOwnedId = new Mapping<Vector<string>>()
        this.onsellToId = new Vector<string>()
        this.idToAuction = new Mapping<Auction>()
    }

    newIdol() {
        assert(this.context.senderAddress === DEV)
        const _id = String(this.idolAmount + 1);
        this.idToIdol[_id] = new IdolBase(_id, DEV, InitName,InitIntro)

        this.idolAmount++
        
        if(this.userToOwnedId[DEV] === undefined) {
            this.userToOwnedId[DEV] = new Vector<string>()
        }
        const temp = this.userToOwnedId[DEV]
        temp.push(_id)
    }

    @payable
    buyIdol(amount: bigint, currency: string, _id: string) : void {
        assert(this.idToAuction[_id] != undefined) 
        assert(this.idToIdol[_id] != undefined)
        //this.idToAuction[_id].owner = this.context.senderAddress
    }

    sellIdol(_id: string, _startPrice: bigint, _endingPrice: bigint, _duration: number) : void {
        const temp = this.idToIdol[_id]
        assert(temp != undefined)
        assert(this.context.senderAddress === temp.owner)  // idol 存在且是owner在操作
        assert(temp.boolean === false) // idol 不能处于出售状态
        this.isOnsellAmount++
        this.onsellToId.push(_id)
        this.idToAuction[_id] = new Auction(this.context.senderAddress, _startPrice, _endingPrice, _duration, 0)
    }

    unlockEgg(_id: string, _address: string) : void {
        assert(this.idToIdol[_id] != undefined)
        const temp = this.idToIdol[_id]
        temp.address = _address
    }

    @constant
    getCurrentPrice(_id: string) : BigInt {
        assert(this.idToAuction[_id] != undefined])
        const temp = this.idToAuction[_id]
        const _startPrice = temp.startPrice

        return _startPrice
    } 

    @constant
    getIdolInfo(_id: string) : IdolBaseInfo {
        const temp = this.idToIdol[_id]
        const _owner = temp.owner
        const _state = temp.state
        const _name = temp.name
        const _intro = temp.intro
        const _address = temp.address
        const _isOnsell = temp.isOnsell

        return {_id, _owner, _state, _name, _intro, _address, _isOnsell}
    }

    @constant
    getAuctionInfo(_id: string) : AuctionInfo {
        assert(this.idToAuction[_id] != undefined)
        const temp = this.idToAuction[_id]
        const _seller = temp.seller
        const _startPrice = temp.startPrice
        const _endPrice = temp.endPrice
        const _duration = temp.duration
        const _startedAt = temp.startedAt

        return { _seller, _startPrice, _endPrice, _duration, _startedAt }
    }

    @constant
    getTotal() : number {
        const _amount1 = this.idolAmount

        return _amount1
    }

    @constant
    getSellAmount() : number {
        const _amount = this.isOnsellAmount
        return _amount
    }
}
