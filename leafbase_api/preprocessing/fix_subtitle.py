from typing import List
from leafbase_api.classes import Strain
from leafbase_api.database import DatabaseAccessor
from concurrent.futures import ThreadPoolExecutor

class FixSubtitle:
    def __init__(self, url: str, key: str) -> None:
        self.url, self.key = url, key
        self.all_strains = DatabaseAccessor(url, key).get_all_strains()

    def get_strains_without_subtitle(self) -> List[Strain]:
        return [strain for strain in self.all_strains if not strain.subtitle]

    def generate_subtitle_from_name(self, name) -> str:
        name_template = "aka {name}"
        return name_template.format(name=name)

    def update_record(self, strain: Strain) -> None:
        strain.subtitle = self.generate_subtitle_from_name(strain.name)
        DatabaseAccessor(self.url, self.key).update_strain(strain)

    def update_all_records(self) -> None:
        print("Updating all record with a missing subtitle...")
        with ThreadPoolExecutor() as executor:
            executor.map(self.update_record, self.get_strains_without_subtitle())
        print("Done")
