import os
import csv
# import streamlit as st
import pandas as pd
from langchain.document_loaders import CSVLoader
from langchain.embeddings import  GPT4AllEmbeddings, CacheBackedEmbeddings
from langchain.vectorstores import Chroma
from langchain.storage import  LocalFileStore
from langchain.chains.conversational_retrieval.prompts import CONDENSE_QUESTION_PROMPT
import json
from pathlib import Path

fs = LocalFileStore("./llm_cache/")
csv_path = 'location.csv'
vectorstore = None
loader = CSVLoader(file_path=csv_path, encoding='utf-8')
documents = loader.load()

embeddings = GPT4AllEmbeddings()
embedder2 = CacheBackedEmbeddings.from_bytes_store(embeddings, fs)


def process_csv_in_chunks(csv_path, chunk_size=5461):
    # Load CSV in chunks
    chunk_iterator = pd.read_csv(csv_path, chunksize=chunk_size, encoding='utf-8')
    print(len(documents))
    global vectorstore
    if os.path.exists("./chroma_db/chroma.sqlite3"):
        print('loading db ............')
        vectorstore = Chroma(persist_directory="./chroma_db", embedding_function=embedder2)
    else:  
        for index, chunk in enumerate(chunk_iterator):
            print(f"Processing chunk {index + 1}...")
            start_idx = index * chunk_size
            end_idx = start_idx + len(chunk)
            if not vectorstore:
                vectorstore = Chroma.from_documents(documents[start_idx: end_idx], embedder2, persist_directory="./chroma_db")
            else:
                vectorstore = vectorstore.from_documents(documents[start_idx: end_idx], embedder2, persist_directory="./chroma_db")

process_csv_in_chunks(csv_path)
results = vectorstore.similarity_search_with_score(query="Đức Linh", k = 1)
print(results)