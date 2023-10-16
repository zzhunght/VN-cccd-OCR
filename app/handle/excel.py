import json
from openpyxl import load_workbook
import pandas as pd
import os

def check_exist(path):
    exists = os.path.exists(path)
    if exists:
        return True
    else:
        return False

def TrichXuat_excel(json_front, json_back):
    data_front = json.loads(json_front)
    data_back = json.loads(json_back)
    
    if 'type' in data_front:
        del data_front['type']
    if 'type' in data_back:
        del data_back['type']

    combined_data = {**data_front, **data_back}

    df = pd.DataFrame([combined_data])
    df.to_excel('handle/dir_save/TrichXuatThongTin.xlsx', index=False)

def add_row_self(filename, json_front, json_back):
    workbook = load_workbook(f'handle/dir_save/{filename}')
    # Select the active sheet
    sheet = workbook.active
    # Chuyển chuỗi JSON thành đối tượng Python
    data_front = json.loads(json_front)
    data_back = json.loads(json_back)
    
    if 'type' in data_front:
        del data_front['type']
    if 'type' in data_back:
        del data_back['type']

    combined_data = {**data_front, **data_back}
    # Tìm hàng trống đầu tiên trong cột 'A'
    next_row = 1
    while sheet[f'A{next_row}'].value is not None:
        next_row += 1

    # Tạo một từ điển ánh xạ các trường JSON với cột tương ứng
    column_mapping = {
        'name': 'A',
        'recent_location': 'B',
        'birth_day': 'C',
        'id': 'D',
        'expire_date': 'E',
        'nationality': 'F',
        'origin_location': 'G',
        'gender': 'H',
        'issue_place': 'I',
        'issue_date': 'J'
    }

    # Duyệt qua dữ liệu và điền vào các cột tương ứng
    for key, value in combined_data.items():
        if key in column_mapping:
            col = column_mapping[key]
            sheet[f'{col}{next_row}'] = value

    # Lưu lại tệp Excel
    workbook.save('handle/dir_save/TrichXuatThongTin.xlsx')


