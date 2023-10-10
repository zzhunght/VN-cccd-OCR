import json
import pandas as pd
import os
from openpyxl import load_workbook
import shutil

def check_exist(path):
    exists = os.path.exists(path)
    if exists:
        return True
    else:
        return False

def create_new(json_string):
    # Chuỗi JSON
    # Chuyển chuỗi JSON thành đối tượng Python
    data = json.loads(json_string)
    # Tạo DataFrame từ dữ liệu
    df = pd.DataFrame([data])
    # Lưu DataFrame vào tệp Excel
    df.to_excel('output2.xlsx', index=False)

# chua check add row new
def add_row_new(path,json_string):
    # Đường dẫn tới tệp Excel gốc
    original_path = path
    # Đường dẫn tới tệp Excel mới
    new_path = '../../new_file.xlsx'
    # Tạo bản sao của tệp Excel
    shutil.copy(original_path, new_path)
    # Load workbook của tệp mới
    workbook = load_workbook(new_path)
    sheet = workbook.active
    # Chuỗi JSON
    # Chuyển chuỗi JSON thành đối tượng Python
    data = json.loads(json_string)
    # Tìm hàng trống đầu tiên trong cột 'A'
    next_row = 1
    while sheet[f'A{next_row}'].value is not None:
        next_row += 1
    # Tạo một từ điển ánh xạ các trường JSON với cột tương ứng
    column_mapping = {
        'type': 'A',
        'name': 'B',
        'recent_location': 'C',
        'birth_day': 'D',
        'id': 'E',
        'expire_date': 'F',
        'nationality': 'G',
        'origin_location': 'H',
        'gender': 'I'
    }
    # Duyệt qua dữ liệu và điền vào các cột tương ứng
    for key, value in data.items():
        col = column_mapping[key]
        sheet[f'{col}{next_row}'] = value
    # Lưu lại tệp Excel mới
    workbook.save(new_path)
def add_row_self(path, json_string):
    workbook = load_workbook(path)
    # Select the active sheet
    sheet = workbook.active
    # Chuyển chuỗi JSON thành đối tượng Python
    data = json.loads(json_string)

    # Tìm hàng trống đầu tiên trong cột 'A'
    next_row = 1
    while sheet[f'A{next_row}'].value is not None:
        next_row += 1

    # Tạo một từ điển ánh xạ các trường JSON với cột tương ứng
    column_mapping = {
        'type': 'A',
        'name': 'B',
        'recent_location': 'C',
        'birth_day': 'D',
        'id': 'E',
        'expire_date': 'F',
        'nationality': 'G',
        'origin_location': 'H',
        'gender': 'I'
    }

    # Duyệt qua dữ liệu và điền vào các cột tương ứng
    for key, value in data.items():
        col = column_mapping[key]
        sheet[f'{col}{next_row}'] = value

    # Lưu lại tệp Excel
    workbook.save(path)

def main():
    if check_exist(path):
        add_row_self(path, json_string)
    else:
        create_new(json_string)

    # create new excel
    if check_exist(path):
        add_row_new(path, json_string)
    else:
        create_new(json_string)

if __name__ == '__main__':

    path = r'../../output2.xlsx'
    json_string = '{"type": "Mặt sau", "name": "PHAM DUY LONG", "recent_location": "S Trà Co, Thanh Cái, Qung NInh phó Móng Khu Trang Ginl Trà Co, Thanh Móng Cál, phó", "birth_day": "03/12/2006", "id": "022206004066", "expire_date": "0v12/2031", "nationality": "Việt Nam", "origin_location": "Hải Xuan, Thành phố Móng Cái, Quảng Ninh Hải Xuán, Thành phó Móng Cá", "gender": "Nam"}'
    #  add json_string to new row excel
    main()