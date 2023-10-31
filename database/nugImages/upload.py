import os
import shutil
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import time
from tqdm import tqdm

driver = webdriver.Chrome()

# Get list of all files in the folder
folder_path = "clear-bg"
files = [os.path.abspath(os.path.join(folder_path, f)) for f in os.listdir(
    folder_path) if os.path.isfile(os.path.join(folder_path, f)) and f.endswith('.png') and not f.startswith('.DS_Store')]

driver.get("http://localhost:3000/api/uploadfiles")


def move_files(files):
    # Create 'uploaded' directory if it doesn't exist
    if not os.path.exists('uploaded'):
        os.makedirs('uploaded')

    # Move files to 'uploaded' directory
    for file in files:
        shutil.move(file, 'uploaded')


start_time = time.time()
total_files = len(files)

batch_size = 300

with open('upload_log.txt', 'a') as f:
    for i in tqdm(range(0, total_files, batch_size)):
        # Find the file input element in the form
        file_input = WebDriverWait(driver, 10).until(
            EC.presence_of_element_located((By.NAME, 'files')))

        # Join the files with '\n' to create a string that can be inputted into the file input field
        files_batch = '\n'.join(files[i:i+batch_size])

        # Send the string of file paths to the file input field
        file_input.send_keys(files_batch)

        # Find the submit button and click it to upload the files
        submit_button = WebDriverWait(driver, 10).until(
            EC.presence_of_element_located((By.NAME, 'submit')))
        submit_button.click()

        # Wait for the success message to appear
        WebDriverWait(driver, 200).until(
            EC.text_to_be_present_in_element((By.ID, 'status'), 'success'))

        # Move the uploaded files to 'uploaded' folder
        move_files(files[i:i+batch_size])

        # Write to log file

        for file in files[i:i+5]:
            f.write(f"{time.strftime('%H:%M:%S')} - Uploaded file {os.path.basename(file)} with url http://localhost:3000/api/uploadfiles/{os.path.basename(file)}\n")

        # Refresh the page
        driver.refresh()

driver.quit()
