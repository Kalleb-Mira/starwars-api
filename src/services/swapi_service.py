from adapters.http_client import get

def get_resource(resource, search=None):
    url = f"https://swapi.dev/api/{resource}/"

    if search:
        url += f"?search={search}"

    return get(url)
