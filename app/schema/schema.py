from pydantic import BaseModel


class PredictInput(BaseModel):
    chip_front : str
    chip_back : str

class PredictInputExcel(BaseModel):
    chip_front : str
    chip_back : str
    excel_file : str
