import os
import multiprocessing
from functools import partial
import rembg
import numpy as np
from PIL import Image

# Define the function to remove background from an image


def remove_background(image_path, output_folder):
    try:
        # Check if the file has already been processed
        output_path = os.path.join(output_folder, os.path.splitext(
            os.path.basename(image_path))[0] + '.png')  # Save as PNG
        if os.path.exists(output_path):
            print(f"Skipping {image_path} as it has already been processed.")
            return

        input_image = Image.open(image_path)
        input_array = np.array(input_image)
        output_array = rembg.remove(input_array)
        output_image = Image.fromarray(output_array)
        output_image.save(output_path)
        print(f"Saved {output_path}")
    except Exception as e:
        print(f"Error processing {image_path}: {e}")


def preprocess_skipped_files(image_files, output_folder):
    for image_path in image_files:
        output_path = os.path.join(output_folder, os.path.splitext(
            os.path.basename(image_path))[0] + '.png')  # Save as PNG
        if os.path.exists(output_path):
            print(
                f"Preprocessing {image_path} as it has already been processed.")
            remove_background(image_path, output_folder)


def main():
    # Get all files in the downloads folder
    downloads_folder = 'downloads/'
    output_folder = 'clear-bg/'
    image_files = [os.path.join(downloads_folder, f) for f in os.listdir(downloads_folder) if os.path.isfile(os.path.join(downloads_folder, f))]

    # Remove files that have already been processed
    image_files = [f for f in image_files if not os.path.exists(os.path.join(output_folder, os.path.splitext(os.path.basename(f))[0] + '.png'))]

    if (len(image_files) == 0):
        print("No files to process.")
        return

    # Create a pool of processes
    pool = multiprocessing.Pool()

    # Use map to apply the function to all image files
    remove_background_func = partial(remove_background, output_folder=output_folder)
    pool.map(remove_background_func, image_files)

    # Close the pool and wait for all processes to finish
    pool.close()
    pool.join()



if __name__ == '__main__':
    multiprocessing.freeze_support()
    main()
    print("Done!")
