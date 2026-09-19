const brands=[
 "Nararya Garage","Nararya Store","Hilekros Products",
 "Hilekros Studio","Nararya Studio","Nexovonarsa Corporation"
];
const host=document.querySelector("#brands");
for(const brand of brands){
 const card=document.createElement("article");
 card.className="brand";
 card.innerHTML="<h2>"+brand+"</h2><p class='muted'>Sales • Members • Catalog • Operations</p><button>Open module</button>";
 host?.appendChild(card);
}
document.querySelector("#status")!.textContent=
 "ONLINE\nTimezone: Asia/Jakarta\nQuiet hours: 23:00–05:00 WIB\nApproved groups only";
