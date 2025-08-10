export interface InvoiceItem {
  id: number;
  description: string;
  qty: number;
  rate: number;
}

export interface InvoiceData {
  addressLine1: string;
  addressLine2: string;
  phone: string;
  invoiceTo: string;
  invoiceDate: string;
  items: InvoiceItem[];
  discount: number;
  footer: string;
}