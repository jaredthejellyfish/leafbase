from typing import Optional, Dict


class Strain:
    def __init__(
        self,
        id: str = None,
        slug: str = None,
        name: Optional[str] = None,
        subtitle: Optional[str] = None,
        category: Optional[str] = None,
        phenotype: Optional[str] = None,
        averageRating: Optional[float] = None,
        shortDescription: Optional[str] = None,
        description: Optional[str] = None,
        nugImage: Optional[str] = None,
        flowerImageSvg: Optional[str] = None,
        topTerpene: Optional[str] = None,
        thcPercent: Optional[float] = None,
        topEffect: Optional[str] = None,
        cannabinoids: Optional[Dict] = None,
        effects: Optional[Dict] = None,
        terps: Optional[Dict] = None,
    ) -> None:
        self.id = id
        self.slug = slug
        self.name = name
        self.subtitle = subtitle
        self.category = category
        self.phenotype = phenotype
        self.averageRating = averageRating
        self.shortDescription = shortDescription
        self.description = description
        self.nugImage = nugImage
        self.flowerImageSvg = flowerImageSvg
        self.topTerpene = topTerpene
        self.thcPercent = thcPercent
        self.topEffect = topEffect
        self.cannabinoids = cannabinoids
        self.effects = effects
        self.terps = terps

    def from_dict(d: dict) -> "Strain":
        return Strain(**d)

    def to_dict(self) -> dict:
        return self.__dict__
