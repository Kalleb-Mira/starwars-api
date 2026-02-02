from services.swapi_service import get_resource
from domain.filters import filter_by_min_population
from utils.response import success, error

def handle_request(request):
    resource = request.args.get("type")
    search = request.args.get("search")
    min_population = request.args.get("min_population")

    if not resource:
        return error("tipo é obrigatorio", 400)

    try:
        data = get_resource(resource, search)

        filtered = data.get("results", [])

        if resource == "planets" and min_population:
            filtered = filter_by_min_population(filtered, min_population)

        data["results"] = filtered
        data["count"] = len(filtered)

        return success(data)

    except Exception as e:
        return error(str(e), 500)
