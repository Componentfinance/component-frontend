import BigNumber from "bignumber.js"
import { Shell } from "./web3Classes"

const REVERTED = '3.963877391197344453575983046348115674221700746820753546331534351508065746944e+75'


export default class SwapEngine {

    async viewOriginSwap (originIndex, targetIndex, amount) {

        let origin = this.assets[originIndex]
        let target = this.assets[targetIndex]

        let originAmount = origin.getAllFormatsFromDisplay(amount)

        let targetAmount = await this.shell.viewOriginSwap(
            origin.address,
            target.address,
            originAmount.raw
        )
        
        if (!targetAmount || targetAmount.toString() == REVERTED) {

            throw(new Error("Reverted"))

        } else {
            
            return {
                originAmount: originAmount,
                targetAmount: target.getAllFormatsFromRaw(targetAmount)
            }

        }

    }

    async viewTargetSwap (originIndex, targetIndex, amount) {

        let origin = this.assets[originIndex]
        let target = this.assets[targetIndex]

        let targetAmount = target.getAllFormatsFromDisplay(amount)

        let originAmount = await this.shell.viewTargetSwap(
            origin.address,
            target.address,
            targetAmount.raw
        )
        
        if (!originAmount || originAmount.toString() == REVERTED) {
            
            throw(new Error("Reverted"))

        } else {

            return {
                originAmount: origin.getAllFormatsFromRaw(originAmount),
                targetAmount: targetAmount,
            }

        }

    }

    executeOriginSwap (originIndex, targetIndex, originAmount, minTargetAmount) {

        let origin = this.assets[originIndex]
        let target = this.assets[targetIndex]

        originAmount = origin.getAllFormatsFromDisplay(originAmount)

        let minTarget = target.getNumeraireFromDisplay(minTargetAmount).multipliedBy(new BigNumber(.99))

        let deadline = Math.floor(Date.now() /1000 + 900)

        return this.shell.originSwap(
            origin.address,
            target.address,
            originAmount.raw,
            target.getRawFromNumeraire(minTarget),
            deadline
        )

    }

    executeTargetSwap (originIndex, targetIndex, maxOriginAmount, targetAmount) {

        let origin = this.assets[originIndex]
        let target = this.assets[targetIndex]

        targetAmount = target.getAllFormatsFromDisplay(targetAmount)

        let maxOrigin =  origin.getNumeraireFromDisplay(maxOriginAmount).multipliedBy(new BigNumber(1.01))

        let deadline = Math.floor(Date.now() / 1000 + 900)

        return this.shell.targetSwap(
            origin.address,
            target.address,
            origin.getRawFromNumeraire(maxOrigin),
            targetAmount.raw,
            deadline
        )
        
    }

    


}