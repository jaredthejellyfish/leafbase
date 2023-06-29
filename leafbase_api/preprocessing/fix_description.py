from typing import List
from leafbase_api.classes import Strain
from leafbase_api.database import DatabaseAccessor
from concurrent.futures import ThreadPoolExecutor
import openai


class FixDescription:
    def __init__(self, url: str, key: str, openai_key: str) -> None:
        self.url, self.key = url, key
        self.all_strains = DatabaseAccessor(url, key).get_all_strains()
        openai.api_key = openai_key

    def get_strains_without_description(self) -> List[Strain]:
        return [strain for strain in self.all_strains if not strain.description]

    def generate_description_from_short_description(self, shortDescription) -> str:
        completion = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=[
                {
                    "role": "system",
                    "content": "You are a robot designed to generate descriptions from summarized descriptions your user gives you. The maximum length for said descriptions will be 100 words.  In your description do not include any marketing / CTA related things, try to be as natural and unbiased as possible.",
                },
                {"role": "user", "content": shortDescription},
            ],
        )
        return completion.choices[0].message.content

    def update_record(self, strain: Strain) -> None:
        if strain.shortDescription:
            strain.description = self.generate_description_from_short_description(
                strain.shortDescription
            )
        else:
            strain.description = f"If you've smoked, dabbed, or otherwise enjoyed this strain, {strain.name}, before let us know! Leave a review."

        DatabaseAccessor(self.url, self.key).update_strain(strain)

    def update_all_records(self) -> None:
        print("Updating all record with a missing description...")
        with ThreadPoolExecutor() as executor:
            executor.map(self.update_record, self.get_strains_without_description())
        print("Done")
