import os
from supabase import create_client, Client
from typing import List
from ..classes import Strain


class DatabaseAccessor:
    def __init__(self, url: str, key: str) -> None:
        self.supabase: Client = create_client(url, key)

    def get_all_strains(self) -> List[Strain]:
        strains: List[Strain] = []
        start = 0
        limit = 1000

        while True:
            data = (
                self.supabase.table("strains")
                .select("*")
                .range(start, start + limit - 1)
                .execute()
            )
            if not data.data:
                break

            for strain in data.data:
                strains.append(Strain(**strain))

            start += limit

        return strains

    def update_strain(self, strain: Strain) -> None:
        update_dict = {k: v for k, v in strain.__dict__.items() if v is not None}
        self.supabase.table("strains").update(update_dict).eq("slug", strain.slug).execute()
