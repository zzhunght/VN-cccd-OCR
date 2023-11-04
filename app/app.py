from asyncio import SendfileNotAvailableError
import base64
import json

import os

import cv2
from fastapi.responses import FileResponse
import numpy as np

from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI, File, HTTPException, Response, UploadFile
app = FastAPI()
from model.model import OCRProcessor
from handle.word import don_xin_tam_vang, don_xin_dk_tam_tru, so_yeu_ly_lich
from handle.excel import TrichXuat_excel, add_row_self, save_excel
from schema.schema import PredictInput, PredictInputExcel

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
    # file_path = r'D:\learn\VN-cccd-OCR\app\handle\dir_save\so-yeu-ly-lich.docx'
    file_path = 'handle/dir_save/so-yeu-ly-lich.docx'
    return FileResponse(file_path, media_type="application/vnd.openxmlformats-officedocument.wordprocessingml.document")

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
    # file_path = r'D:\learn\VN-cccd-OCR\app\handle\dir_save\don_xin_tam_vang.docx'
    file_path = 'handle\dir_save\don_xin_tam_vang.docx'
    return FileResponse(file_path, media_type="application/vnd.openxmlformats-officedocument.wordprocessingml.document")


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
    # file_path = r'D:\learn\VN-cccd-OCR\app\handle\dir_save\don_xin_dk_tam_tru.docx'
    # file_path = r'C:\workspace\doanhethongthongminh\VN-cccd-OCR\app\app\handle\dir_save\don_xin_dk_tam_tru.docx'
    file_path = 'handle\dir_save\don_xin_dk_tam_tru.docx'
    return FileResponse(file_path, media_type="application/vnd.openxmlformats-officedocument.wordprocessingml.document")

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
    # file_path = r'D:\learn\VN-cccd-OCR\app\handle\dir_save\TrichXuatThongTin.xlsx'
    # file_path = r'C:\workspace\doanhethongthongminh\VN-cccd-OCR\app\app\handle\dir_save\TrichXuatThongTin.xlsx'
    file_path = 'handle/dir_save/TrichXuatThongTin.xlsx'
    return FileResponse(file_path, media_type="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet")

    # chua duoc su dung 
@app.post("/excel-existing")
def predict(body: PredictInputExcel):

    if body.chip_front is None or body.chip_back is None:
        raise HTTPException(status_code=400, detail="Vui lòng điền đầy đủ 2 mặt cả trước lẫn sau!")

    chip_back_img = img_process_b64_to_rgb(body.chip_back)
    chip_front_img = img_process_b64_to_rgb(body.chip_front)
    excel_data = body.excel_file

    # output_path = r'D:\learn\VN-cccd-OCR\app\handle\temp_folder\TrichXuatThongTinCoSan.xlsx'
    output_path = 'handle/temp_folder/TrichXuatThongTinCoSan.xlsx'
    # output_path = r'C:\workspace\doanhethongthongminh\VN-cccd-OCR\app\handle\temp_folder\TrichXuatThongTinCoSan.xlsx'
    save_excel(excel_data, output_path)
    
    processor1 = OCRProcessor(chip_front_img)
    processor2 = OCRProcessor(chip_back_img)
    result_front = processor1.predict()
    result_back = processor2.predict() 
    add_row_self(json.dumps(result_front), json.dumps(result_back))
    # file_path = r'D:\learn\VN-cccd-OCR\app\handle\dir_save\TrichXuatThongTinCoSan.xlsx'
    # file_path = r'C:\workspace\doanhethongthongminh\VN-cccd-OCR\app\app\handle\dir_save\TrichXuatThongTinCoSan.xlsx'
    file_path = 'handle/dir_save/TrichXuatThongTinCoSan.xlsx'
    return FileResponse(file_path, media_type="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet")