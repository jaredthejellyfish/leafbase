from dotenv import load_dotenv
from . import DatabaseAccessor
from ..encoder import StrainVectorizer
import os
from sklearn.decomposition import PCA
import json
from ..classes import Strain

load_dotenv()

url: str = os.getenv("DB_URL")
key: str = os.getenv("DB_API_KEY")

current_directory = os.path.dirname(os.path.abspath(__file__))


class VectorDB:
    def __init__(self, url: str, key: str) -> None:
        self.dba = DatabaseAccessor(url, key)
        self.get_all_strains()
        self.vectorizer = StrainVectorizer(self.all_strains)
        self.all_vectors = [
            self.vectorizer.transform(strain) for strain in self.all_strains
        ]
        all_names = [strain.name for strain in self.all_strains]
        self.vector_dict = dict(zip(all_names, self.all_vectors))

    def liked_strains_spread(self, liked_strains: list) -> list:
        liked_strains_vectors = [self.vector_dict[name] for name in liked_strains]

        pca = PCA(n_components=2)
        reduced_vectors = pca.fit_transform(liked_strains_vectors)

        vectors_as_points = [
            {"name": name, "x": vector[0], "y": vector[1]}
            for vector, name in zip(reduced_vectors, liked_strains)
        ]

        return vectors_as_points

    def file_exists(self, file_name: str) -> bool:
        return os.path.isfile(file_name)

    def save_to_json(self, file_name: str = "all_strains.json") -> None:
        data = [strain.to_dict() for strain in self.all_strains]
        with open(file_name, "w") as json_file:
            json.dump(data, json_file)

    def get_strains_from_file(self, file_name: str) -> list:
        with open(file_name, "r") as json_file:
            data = json.load(json_file)
        strains = [Strain.from_dict(d=d) for d in data]
        return strains

    def get_all_strains(self) -> None:
        file_name = "all_strains.json"
        if self.file_exists(file_name):
            self.all_strains = self.get_strains_from_file(file_name)
        else:
            self.all_strains = self.dba.get_all_strains()
            self.save_to_json(file_name)


if __name__ == "__main__":
    vdb = VectorDB()
    liked_coords = vdb.liked_strains_spread(
        [
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
    )
    print(liked_coords)
