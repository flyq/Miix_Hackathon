import { AssertionError } from "assert";

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

    constructor() {
        super()
        this.idolAmount = 0
        this.isOnsellAmount = 0
        this.idToIdol = new Mapping<IdolBase>()
        this.userToOwnedId = new Mapping<Vector<string>>()
        this.onsellToId = new Vector<string>()
    }

    newIdol() {
        assert(this.context.senderAddress === DEV)
        const _id = string(this.idolAmount + 1);
        this.idToIdol[_id] = new IdolBase(_id, DEV, InitName,InitIntro)

        this.idolAmount++

        this.userToOwnedId[DEV].push(_id)
        

    }

    @payable
    buyIdol(amount: bigint, currency: string, _id: string) : void {
        assert()
    }

    sellIdol(_id: string, _startPrice: )
}
