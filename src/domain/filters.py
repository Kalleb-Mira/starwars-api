
def filter_by_min_population(planets, min_population):
    filtered = planets

    if min_population:
        filtered = [
            p for p in planets
            if p.get("population", "0").isdigit()
            and int(p["population"]) >= int(min_population)
        ]

    return filtered
