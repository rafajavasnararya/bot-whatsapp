from openpyxl import Workbook
from pathlib import Path
def build(rows,path='reports/penjualan.xlsx'):
 Path(path).parent.mkdir(parents=True,exist_ok=True);wb=Workbook();ws=wb.active;ws.title='Penjualan';ws.append(['ID','Tanggal','Brand','Produk','Harga','Status'])
 for r in rows: ws.append([r.get(k,'') for k in ['id','date','brand','item','price','status']])
 ws.freeze_panes='A2';wb.save(path);return path
if __name__=='__main__':build([])