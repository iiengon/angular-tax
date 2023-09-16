
export class TaxData {
  data: any;
  public filingType?: string;
  public month?: string;
  public year?: string;
  public saleAmount?: number;
  public taxAmount?: number;
  public surcharge?: number;
  public penalty?: number;
  public totalAmount?: number;


  constructor(data: any) {
    console.log(data);
    this.filingType = data.filingType;
    this.month = data.month;
    this.year = data.year;
    this.saleAmount = parseFloat(data.saleAmount.replace('THB', ''));
    this.taxAmount = parseFloat(data.taxAmount.replace('THB', ''));
    this.surcharge = data.penalty != '' ? parseFloat(data.surcharge.replace('THB', '')) : 0;
    this.penalty = data.penalty != '' ? parseFloat(data.penalty.replace('THB', '')) : 0;
    this.totalAmount = data.penalty != '' ? parseFloat(data.totalAmount.replace('THB', '')) : 0;

  }
}
