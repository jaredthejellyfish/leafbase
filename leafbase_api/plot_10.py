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

# Use only a subset of 10 vectors
vectors = vectors[:10]
strain_names = strain_names[:10]

pca = PCA(n_components=2)
reduced_vectors = pca.fit_transform(vectors)

for i, strain in enumerate(strain_names):
    plt.scatter(reduced_vectors[i, 0], reduced_vectors[i, 1])
    plt.text(reduced_vectors[i, 0], reduced_vectors[i, 1], strain)

plt.title("Strain Similarity Plot")
plt.xlabel("Component 1")
plt.ylabel("Component 2")
plt.show()
