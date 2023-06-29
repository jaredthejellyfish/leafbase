from typing import List
from leafbase_api.classes import Strain
from leafbase_api.database import DatabaseAccessor
from concurrent.futures import ThreadPoolExecutor


class FixRating:
    def __init__(self, url: str, key: str) -> None:
        self.url, self.key = url, key
        self.all_strains = DatabaseAccessor(url, key).get_all_strains()

    def get_strains_without_rating(self) -> List[Strain]:
        return [
            strain
            for strain in self.all_strains
            if not strain.averageRating and strain.averageRating != 0
        ]

    def update_record(self, strain: Strain) -> None:
        strain.averageRating = 0
        DatabaseAccessor(self.url, self.key).update_strain(strain)

    def update_all_records(self) -> None:
        print("Updating all record with a missing rating...")
        with ThreadPoolExecutor() as executor:
            executor.map(self.update_record, self.get_strains_without_rating())
        print("Done")
