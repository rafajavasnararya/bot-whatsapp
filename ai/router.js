const patterns = [
  ['greeting', /^(halo|hai|hi|hello|menu|start|pagi|siang|sore|malam)\b/i],
  ['order', /\b(order|pesan|pemesanan|beli|mau beli|checkout)\b/i],
  ['price', /\b(harga|price|berapa|biaya|tarif)\b/i],
  ['product', /\b(produk|mod|kodename|kd|karoseri|design|3d|jasa)\b/i],
  ['faq', /\b(faq|bantuan|help|cara|bagaimana)\b/i],
  ['call', /\b(telpon|telepon|panggilan|call)\b/i],
  ['admin', /\b(admin|cs|customer service|orang)\b/i],
  ['member', /\b(member|member resmi|verifikasi member|pendaftaran member)\b/i]
];
export async function routeIntent(text){for(const [name,pattern] of patterns)if(pattern.test(text))return{name,confidence:0.9,source:'rules'};return{name:'unknown',confidence:0.2,source:'rules'};}
