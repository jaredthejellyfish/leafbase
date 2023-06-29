class ReducedStrain:
    def __init__(
        self,
        id: str,
        name: str,
        category: str,
        averageRating: float,
        thcPercent: int,
        description: str,
        **kwargs,
    ):
        self.id = id
        self.name = name
        self.category = category
        self.averageRating = averageRating
        self.thcPercent = thcPercent
        self.description = description
