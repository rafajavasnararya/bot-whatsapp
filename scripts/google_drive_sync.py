from pathlib import Path
import os
MANAGED_DIR=Path(os.getenv('REPORT_DIR','reports'));REPLACE_EXISTING=os.getenv('REPLACE_EXISTING','true').lower()=='true'
def managed_name(brand,kind):return ''.join(c if c.isalnum() else '_' for c in brand)+'_'+kind+'.xlsx'
def sync_plan(brand,kind):return {'filename':managed_name(brand,kind),'mode':'replace-or-create' if REPLACE_EXISTING else 'create'}
if __name__=='__main__':
    for b in ['Nararya Garage','Nararya Studio','Hilekros Products','Nararya Store','NEXOVONARSA Corporation']:print(sync_plan(b,'finance'))