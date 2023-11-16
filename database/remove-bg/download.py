import csv
import requests
import concurrent.futures
import os

# Open the file
with open('strains.csv', 'r') as f:
    # Use csv reader to read the file
    reader = csv.reader(f)
    
    # Read each line into a list as a list
    data = list(reader)

files = []

for row in data:
    files.append({"id": row[0], "url": row[9]})

def download_image(file):
    url = file['url']
    file_name = file['id'] + url[url.rfind('.'):]
    
    response = requests.get(url)

    # Ensure downloads directory exists
    if not os.path.exists('downloads'):
        os.makedirs('downloads')

    # Write the file to downloads directory
    with open(os.path.join('downloads', file_name), 'wb') as f:
        f.write(response.content)

# Use ThreadPoolExecutor to download images in parallel
with concurrent.futures.ThreadPoolExecutor() as executor:
    executor.map(download_image, files)