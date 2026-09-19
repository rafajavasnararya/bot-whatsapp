from dataclasses import dataclass
@dataclass
class ImageDecision:
    category:str
    needs_human_review:bool
    reason:str
def triage_image(width:int,height:int,has_text:bool,is_blurry:bool)->ImageDecision:
    if width<400 or height<400:return ImageDecision("low_quality",True,"resolution_low")
    if is_blurry:return ImageDecision("low_quality",True,"possible_blur")
    if has_text:return ImageDecision("document_or_screenshot",True,"text_present")
    return ImageDecision("photo",True,"manual_review_required")
def compare_editing_style(*args,**kwargs)->ImageDecision:
    return ImageDecision("undetermined",True,"AI/manual/original attribution disabled without provenance")
