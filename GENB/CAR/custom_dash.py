import logging
logger = logging.getLogger(__name__)
from grappelli.dashboard import modules, Dashboard

class CustomIndexDashboard(Dashboard):
    def init_with_context(self, context):
        try:
            self.children.append(modules.ModelList(
                title="Справочники",
                models=[
                    'CAR.models.Color',
                    'CAR.models.BodyType',
                    'CAR.models.Brand',
                    'CAR.models.Model',
                    'CAR.models.EngineVolume',
                    'CAR.models.Feature',
                ],
            ))
        except Exception as e:
            logger.error(f"Error initializing dashboard: {e}")
