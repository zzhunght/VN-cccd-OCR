import base64
import json

import cv2
import numpy as np

from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI, File, UploadFile
app = FastAPI()
from model.model import OCRProcessor
from handle.word import don_xin_tam_vang, don_xin_dk_tam_tru, so_yeu_ly_lich
from handle.excel import TrichXuat_excel
from schema.schema import PredictInput

origins = [
    "http://localhost.tiangolo.com",
    "https://localhost.tiangolo.com",
    "http://localhost",
    "http://localhost:8080",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


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


@app.post("/word-soyeu")
def predict(body: PredictInput):
    # print('item :' , body)
    # Decode base64 to an image
    image_data = base64.b64decode(body.chip_front)
    np_array = np.frombuffer(image_data, np.uint8)
    image_bgr = cv2.imdecode(np_array, cv2.IMREAD_COLOR)
    image_rgb = cv2.cvtColor(image_bgr, cv2.COLOR_BGR2RGB)

    processor = OCRProcessor(image_rgb)
    result = processor.predict()
    so_yeu_ly_lich(json.dumps(result))
    return {"result": "done>?"}

@app.post("/word-tamvang")
def predict(body: PredictInput):
    # print('item :' , body)
    # Decode base64 to an image
    image_data = base64.b64decode(body.chip_front)
    np_array = np.frombuffer(image_data, np.uint8)
    image_bgr = cv2.imdecode(np_array, cv2.IMREAD_COLOR)
    image_rgb = cv2.cvtColor(image_bgr, cv2.COLOR_BGR2RGB)

    processor = OCRProcessor(image_rgb)
    result = processor.predict()
    don_xin_tam_vang(json.dumps(result))
    return {"result": "done>?"}

@app.post("/word-tamtru")
def predict(body: PredictInput):
    # print('item :' , body)
    # Decode base64 to an image
    image_data = base64.b64decode(body.chip_front)
    np_array = np.frombuffer(image_data, np.uint8)
    image_bgr = cv2.imdecode(np_array, cv2.IMREAD_COLOR)
    image_rgb = cv2.cvtColor(image_bgr, cv2.COLOR_BGR2RGB)

    processor = OCRProcessor(image_rgb)
    result = processor.predict()
    don_xin_dk_tam_tru(json.dumps(result))
    return {"result": "done>?"}

@app.post("/excel-one")
def predict(body: PredictInput):
    # print('item :' , body)
    # Decode base64 to an image
    image_data = base64.b64decode(body.chip_front)
    np_array = np.frombuffer(image_data, np.uint8)
    image_bgr = cv2.imdecode(np_array, cv2.IMREAD_COLOR)
    image_rgb = cv2.cvtColor(image_bgr, cv2.COLOR_BGR2RGB)

    processor = OCRProcessor(image_rgb)
    result = processor.predict()
    TrichXuat_excel(json.dumps(result))
    return {"result": result}