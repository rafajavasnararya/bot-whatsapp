export type Intent="greeting"|"catalog"|"price"|"order"|"payment"|"status"|"member"|"request"|"human"|"unknown";
const footer="PT NEXOVONARSACORPORATION - All Rights Reserved";
const r:Record<Intent,string>={
 greeting:"Halo, terima kasih sudah menghubungi layanan kami. Silakan sampaikan kebutuhan Anda.",
 catalog:"Siap. Sebutkan katalog yang dicari: Nararya Studio, Nararya Garage, Hilekros Products, atau Nararya Store.",
 price:"Siap kami cek. Mohon tulis nama produk/mod/KD dan versinya agar harga tidak keliru.",
 order:"Untuk order, kirim nama produk, versi, dan detail kebutuhan. Pesanan akan masuk antrean.",
 payment:"Silakan kirim bukti pembayaran yang terlihat jelas. Bukti akan diverifikasi sebelum pesanan diproses.",
 status:"Mohon kirim nomor order atau detail transaksi agar status dapat kami cek.",
 member:"Untuk Member Resmi, data hanya dikumpulkan setelah tujuan dan persetujuan pemrosesan dijelaskan.",
 request:"Silakan jelaskan request, platform, tipe produk/kendaraan, referensi, dan deadline.",
 human:"Baik, saya teruskan ke admin. Mohon bersabar karena pesan kami tangani satu per satu.",
 unknown:"Terima kasih. Saya belum menangkap kebutuhannya. Tulis katalog, harga, order, request, status, atau admin."
};
export const autoReply=(i:Intent,_s:string)=>`${r[i]}\n\n${footer}`;
