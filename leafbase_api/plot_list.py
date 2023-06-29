import numpy as np
import matplotlib.pyplot as plt
from sklearn.decomposition import PCA
from .classes import ReducedStrain
from .database import DatabaseAccessor
from dotenv import load_dotenv
import os

load_dotenv()

url: str = os.getenv("DB_URL")
key: str = os.getenv("DB_API_KEY")
openai_key: str = os.getenv("OPENAI_API_KEY")

vectors = np.load("leafbase_api/strain_vectors.npy")

strains = DatabaseAccessor(url, key).get_all_strains()
strain_names = [strain.name for strain in strains]

# Take a list of 10 names as input
input_names = [
    "White Widow",
    "Amnesia",
    "Bubba Kush",
    "Cherry Pie",
    "GG4",
    "Somango",
    "Gelato",
    "Sour Diesel",
    "GSC",
    "Pink Runtz",
    "Chocolope",
    "Trainwreck",
    "Jack Herer",
]

if input_names == []:
    input_names = [input("Enter a name: ") for _ in range(5)]

# Filter strain_names to only include names in input_names
strain_names = [name for name in strain_names if name in input_names]
vectors = [vectors[i] for i in range(len(strain_names))]

pca = PCA(n_components=2)
reduced_vectors = pca.fit_transform(vectors)

for i, strain in enumerate(strain_names):
    plt.scatter(reduced_vectors[i, 0], reduced_vectors[i, 1])
    plt.text(reduced_vectors[i, 0], reduced_vectors[i, 1], strain)

plt.title("Strain Similarity Plot")

# Remove axis numbers
plt.xticks([])
plt.yticks([])

plt.show()
