import BigNumber from 'bignumber.js';

export default class NumericFormats {
    
    getNumeraireFromDisplay (display) { 

      return new BigNumber(display === '' ? 0 : display);

    }

    getAllFormatsFromDisplay (display) {

      return {
        display: display,
        numeraire: this.getNumeraireFromDisplay(display),
        raw: this.getRawFromDisplay(display)
      }
      
    }

    getNumeraireFromRaw (raw) {

      const numeraire = new BigNumber(raw).dividedBy(10 ** this.decimals)

      return numeraire

    }


    getAllFormatsFromRaw (raw) {

      raw = new BigNumber(raw)

      return {
        raw: raw,
        display: this.getDisplayFromRaw(raw),
        numeraire: this.getNumeraireFromRaw(raw)
      }

    }

    getRawFromNumeraire (numeraire) {

      return numeraire.multipliedBy(10 ** this.decimals).toFixed()

    }

    getRawFromDisplay (display) {

      return new BigNumber(display).multipliedBy(10 ** this.decimals).toFixed()

    }

    getDisplayFromRaw (raw) {

      return Number(new BigNumber(raw).dividedBy(10 ** this.decimals).toFixed(2)).toLocaleString()

    }

    getDisplayFromNumeraire (numeraire, decimals) {

      return Number(numeraire.toFixed(decimals)).toLocaleString()

    }
}