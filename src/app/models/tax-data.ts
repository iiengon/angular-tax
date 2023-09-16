
export class MapTaxDatas {
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
    this.saleAmount = parseFloat(data.saleAmount.replace(',', '').replace('THB', ''));
    this.taxAmount = parseFloat(data.taxAmount.replace(',', '').replace('THB', ''));
    this.surcharge = data.penalty != null ? parseFloat(data.surcharge.replace(',', '').replace('THB', '')) : 0;
    this.penalty = data.penalty != null ? parseFloat(data.penalty.replace(',', '').replace('THB', '')) : 0;
    this.totalAmount = data.penalty != null ? parseFloat(data.totalAmount.replace(',', '').replace('THB', '')) : 0;
  }
}

export interface TaxData {
  filingType?: string;
  month?: string;
  year?: string;
  saleAmount?: number;
  taxAmount?: number;
  surcharge?: number;
  penalty?: number;
  totalAmount?: number;
}
