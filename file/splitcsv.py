import pandas as pd

def split_csv(input_file, output_prefix, chunk_size):
    # Đọc tệp CSV vào DataFrame
    df = pd.read_csv(input_file)

    total_chunks = (df.shape[0] // chunk_size) + 1
    for i in range(total_chunks):
        start_idx = i * chunk_size
        end_idx = (i + 1) * chunk_size
        chunk_df = df.iloc[start_idx:end_idx, :]
        chunk_file = f"splitcsv_output/{output_prefix}_{i + 1}.csv"
        chunk_df.to_csv(chunk_file, index=False)

if __name__ == "__main__":
    name = 'dist'
    input_csv = "file/dist.csv"  # Tên của tệp CSV cần tách
    output_prefix = name  # Tiền tố cho các tệp kết quả
    chunk_size = 250  # Số hàng mỗi tệp nhỏ

    split_csv(input_csv, output_prefix, chunk_size)
