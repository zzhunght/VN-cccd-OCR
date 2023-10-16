import base64
import json

import cv2
import numpy as np

from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI, File, HTTPException, UploadFile
app = FastAPI()
from model.model import OCRProcessor
from handle.word import don_xin_tam_vang, don_xin_dk_tam_tru, so_yeu_ly_lich
from handle.excel import TrichXuat_excel
from schema.schema import PredictInput

from helper.func import img_process_b64_to_rgb

origins = [
    "http://localhost.tiangolo.com",
    "https://localhost.tiangolo.com",
    "http://localhost",
    "http://localhost:8080",
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=['*'],
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
    if body.chip_front is None or body.chip_back is None:
        raise HTTPException(status_code=400,detail="Vui lòng điền đầy đủ 2 mặt cả trước lẫn sau!")

    chip_back_img = img_process_b64_to_rgb(body.chip_back)
    chip_front_img = img_process_b64_to_rgb(body.chip_front)
    
    processor1 = OCRProcessor(chip_front_img)
    processor2 = OCRProcessor(chip_back_img)
    result_front = processor1.predict()  
    result_back = processor2.predict()  
    return {"result": {
        "font":result_front,
        "back": result_back
    }}


@app.post("/word-soyeu")
def predict(body: PredictInput):
    # print('item :' , body)
    # Decode base64 to an image
    if body.chip_front is None or body.chip_back is None:
        raise HTTPException(status_code=400, detail="Vui lòng điền đầy đủ 2 mặt cả trước lẫn sau!")

    chip_back_img = img_process_b64_to_rgb(body.chip_back)
    chip_front_img = img_process_b64_to_rgb(body.chip_front)

    processor1 = OCRProcessor(chip_front_img)
    processor2 = OCRProcessor(chip_back_img)
    result_front = processor1.predict()
    result_back = processor2.predict()
    so_yeu_ly_lich(json.dumps(result_front), json.dumps(result_back))
    return {""}

@app.post("/word-tamvang")
def predict(body: PredictInput):
    if body.chip_front is None or body.chip_back is None:
        raise HTTPException(status_code=400, detail="Vui lòng điền đầy đủ 2 mặt cả trước lẫn sau!")

    chip_back_img = img_process_b64_to_rgb(body.chip_back)
    chip_front_img = img_process_b64_to_rgb(body.chip_front)

    processor1 = OCRProcessor(chip_front_img)
    processor2 = OCRProcessor(chip_back_img)
    result_front = processor1.predict()
    result_back = processor2.predict()
    don_xin_tam_vang(json.dumps(result_front), json.dumps(result_back))
    return {"result": "done>?"}

@app.post("/word-tamtru")
def predict(body: PredictInput):
    if body.chip_front is None or body.chip_back is None:
        raise HTTPException(status_code=400, detail="Vui lòng điền đầy đủ 2 mặt cả trước lẫn sau!")

    chip_back_img = img_process_b64_to_rgb(body.chip_back)
    chip_front_img = img_process_b64_to_rgb(body.chip_front)

    processor1 = OCRProcessor(chip_front_img)
    processor2 = OCRProcessor(chip_back_img)
    result_front = processor1.predict()
    result_back = processor2.predict()
    don_xin_dk_tam_tru(json.dumps(result_front), json.dumps(result_back))
    return {"result": "done>?"}

@app.post("/excel-one")
def predict(body: PredictInput):
    if body.chip_front is None or body.chip_back is None:
        raise HTTPException(status_code=400, detail="Vui lòng điền đầy đủ 2 mặt cả trước lẫn sau!")

    chip_back_img = img_process_b64_to_rgb(body.chip_back)
    chip_front_img = img_process_b64_to_rgb(body.chip_front)

    processor1 = OCRProcessor(chip_front_img)
    processor2 = OCRProcessor(chip_back_img)
    result_front = processor1.predict()
    result_back = processor2.predict()
    TrichXuat_excel(json.dumps(result_front), json.dumps(result_back))
    return {"result_front": result_front, "result_back": result_back}

@app.post("/excel-existing")
def predict(body: PredictInput):

    filename = 'ajsjhdbashd.xlsx'
    if body.chip_front is None or body.chip_back is None:
        raise HTTPException(status_code=400, detail="Vui lòng điền đầy đủ 2 mặt cả trước lẫn sau!")

    chip_back_img = img_process_b64_to_rgb(body.chip_back)
    chip_front_img = img_process_b64_to_rgb(body.chip_front)

    processor1 = OCRProcessor(chip_front_img)
    processor2 = OCRProcessor(chip_back_img)
    result_front = processor1.predict()
    result_back = processor2.predict()
    add_row_self(filename,json.dumps(result_front), json.dumps(result_back))
    return {"result_front": result_front, "result_back": result_back}