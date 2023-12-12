import re

text = '096202014769 Họ và tên / Full name:'
numbers = re.sub(r'[^0-9]', '', text)

print(numbers)
