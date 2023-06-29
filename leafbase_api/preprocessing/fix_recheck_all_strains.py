import json
import os
from leafbase_api.database import DatabaseAccessor
import time
from leafbase_api.classes import Strain
from concurrent.futures import ThreadPoolExecutor


class FixRecheckAllStrains:
    def __init__(self, url: str, key: str) -> None:
        self.url, self.key = url, key
        current_directory = os.path.dirname(os.path.abspath(__file__))
        with open(current_directory + "/data/leafbase.strains.json", "r") as file:
            self.strains = json.load(file)
        self.dba = DatabaseAccessor(url, key)

    def change_id_format(self, data):
        if "_id" in data:
            data["id"] = data["_id"]["$oid"]
            del data["_id"]
        return data

    def update_strain(self, strain):
        strain = self.change_id_format(strain)
        self.dba.update_strain(Strain(**strain))

    def update_all_strains(self):
        start_time = time.time()
        continue_input = input(
            "This script will update all strains in the database. Are you sure you want to continue? (y/n) "
        )
        if continue_input != "y":
            exit()

        with ThreadPoolExecutor() as executor:
            executor.map(self.update_strain, self.strains)

        end_time = time.time()
        print(f"Updated {len(self.strains)} strains in {end_time - start_time} seconds")
