from openpyxl import Workbook
from pathlib import Path
def build(rows,path='reports/pembelian.xlsx'):
 Path(path).parent.mkdir(parents=True,exist_ok=True);wb=Workbook();ws=wb.active;ws.title='Pembelian';ws.append(['ID','Member ID','Brand','Produk','Harga','Status','Tanggal'])
 for r in rows:ws.append([r.get(k,'') for k in ['id','member_id','brand','item','price','status','purchased_at']])
 wb.save(path);return path
if __name__=='__main__':build([])