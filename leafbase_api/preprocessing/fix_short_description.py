from typing import List
from leafbase_api.classes import Strain
from leafbase_api.database import DatabaseAccessor
from concurrent.futures import ThreadPoolExecutor
import openai

openai.api_key = "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"

class FixShortDescription:
    def __init__(self, url: str, key: str, openai_key:str) -> None:
        self.url, self.key = url, key
        self.all_strains = DatabaseAccessor(url, key).get_all_strains()
        openai.api_key = openai_key

    def get_strains_without_short_description(self) -> List[Strain]:
        return [
            strain
            for strain in self.all_strains
            if not strain.shortDescription
            and strain.description
            and f"If you've smoked, dabbed, or otherwise enjoyed this strain, {strain.name}, before let us know! Leave a review."
            != strain.description
        ]

    def generate_short_description_from_description(self, description) -> str:
        completion = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=[
                {
                    "role": "system",
                    "content": "You are a robot designed to generate summarized descriptions from whatever input your user gives you. The maximum length for said descriptions will be 100 characters.  In your description do not include any marketing / CTA related things, try to be as natural and unbiased as possible.",
                },
                {"role": "user", "content": description},
            ],
        )
        return completion.choices[0].message.content

    def update_record(self, strain: Strain) -> None:
        strain.shortDescription = self.generate_short_description_from_description(
            strain.description
        )
        DatabaseAccessor(self.url, self.key).update_strain(strain)

    def update_all_records(self) -> None:
        print("Updating all record with a missing short description...")
        with ThreadPoolExecutor() as executor:
            executor.map(
                self.update_record, self.get_strains_without_short_description()
            )
        print("Done")
