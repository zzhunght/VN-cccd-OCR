from pydantic import BaseModel


class PredictInput(BaseModel):
    chip_front : str