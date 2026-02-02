from flask import jsonify

CORS_HEADERS = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
}

def success(data, status=200):
    response = jsonify({"data": data})
    response.status_code = status

    for k, v in CORS_HEADERS.items():
        response.headers[k] = v

    return response

def error(message, status=400):
    response = jsonify({"error": message})
    response.status_code = status

    for k, v in CORS_HEADERS.items():
        response.headers[k] = v

    return response
