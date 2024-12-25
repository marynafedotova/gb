from grappelli.dashboard import modules, Dashboard

class CustomIndexDashboard(Dashboard):
    """
    Кастомна панель адміністратора.
    """

    def init_with_context(self, context):
        # Секція "Справочники"
        self.children.append(modules.ModelList(
            title="Справочники",
            models=[
                'CAR.models.Brand',
                'CAR.models.Model_car',
                'CAR.models.BodyType',
                'CAR.models.Feature',
                'CAR.models.Color',
                'CAR.models.Transmission',
                'CAR.models.FuelType',
                'CAR.models.EngineVolume',
            ],
            collapsible=True,
            column=1,
        ))

        # Секція "Автомобілі"
        self.children.append(modules.ModelList(
            title="Автомобілі",
            models=['CAR.models.Car'],
            collapsible=True,
            column=2,
        ))
