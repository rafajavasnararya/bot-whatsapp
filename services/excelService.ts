export interface SalesRow{
 orderId:string;date:string;customer:string;
 business:"Nararya Studio"|"Nararya Garage"|"Hilekros Products"|"Nararya Store";
 item:string;category:string;quantity:number;price:number;
 paymentStatus:"pending"|"paid"|"refunded";
 fulfillmentStatus:"queued"|"processing"|"done"|"cancelled";
}
export const salesColumns=()=>["Order ID","Tanggal","Customer","Business","Item","Category","Qty","Harga","Status Pembayaran","Status Pengerjaan"];
export function salesToCsv(rows:SalesRow[]){return [salesColumns().join(","),...rows.map(r=>[r.orderId,r.date,r.customer,r.business,r.item,r.category,r.quantity,r.price,r.paymentStatus,r.fulfillmentStatus].map(csv).join(","))].join("\n");}
function csv(v:unknown){const s=String(v??"");return /[",\n]/.test(s)?`"${s.replaceAll('"','""')}"`:s;}
