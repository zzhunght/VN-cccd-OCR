import base64
import cv2
import numpy as np

from fastapi import FastAPI, File, UploadFile
app = FastAPI()
from model.model import OCRProcessor

from schema.schema import PredictInput
@app.get("/")
def read_root():
    return {"Hello": "World"} 

@app.post("/predict")
def predict(body: PredictInput):
    # print('item :' , body)
    # Decode base64 to an image
    image_data = base64.b64decode(body.chip_front)
    np_array = np.frombuffer(image_data, np.uint8)
    image_bgr = cv2.imdecode(np_array, cv2.IMREAD_COLOR)
    image_rgb = cv2.cvtColor(image_bgr, cv2.COLOR_BGR2RGB)
    
    processor = OCRProcessor(image_rgb)
    result = processor.predict()  
    return {"result": result}
