import json
import pandas as pd
import os

def check_exist(path):
    exists = os.path.exists(path)
    if exists:
        return True
    else:
        return False

def TrichXuat_excel(json_string):
    # Chuỗi JSON
    # Chuyển chuỗi JSON thành đối tượng Python
    data = json.loads(json_string)
    # Tạo DataFrame từ dữ liệu
    df = pd.DataFrame([data])
    # Lưu DataFrame vào tệp Excel
    df.to_excel(f'handle/dir_save/TrichXuatThongTin.xlsx', index=False)

