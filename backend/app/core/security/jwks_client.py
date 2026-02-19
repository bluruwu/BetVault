import requests
from jwt.algorithms import ECAlgorithm
import time
from typing import Optional

class JWKSClient:
    def __init__(self, jwks_url: str, ttl: int = 3600):
        self.jwks_url = jwks_url
        self.ttl = ttl
        self._jwks: Optional[dict] = None
        self._last_refresh = 0

    def _fetch_jwks(self) -> dict:
        response = requests.get(self.jwks_url)
        response.raise_for_status()
        return response.json()

    def _refresh_if_needed(self):
        now = time.time()
        if (
            self._jwks is None
            or now - self._last_refresh > self.ttl
        ):
            self._jwks = self._fetch_jwks()
            self._last_refresh = now

    def get_signing_key(self, kid: str):
        self._refresh_if_needed()
        for key in self._jwks["keys"]:
            if key["kid"] == kid:
                return ECAlgorithm.from_jwk(key)

        self._jwks = self._fetch_jwks()
        self._last_refresh = time.time()

        for key in self._jwks["keys"]:
            if key["kid"] == kid:
                return ECAlgorithm.from_jwk(key)

        raise Exception("Signing Key not found")