from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
import jwt
from app.core.security.jwks_client import JWKSClient
from app.core.config import settings
from typing import Annotated


security = HTTPBearer()

jwks_client = JWKSClient(
    jwks_url=f"{settings.supabase_url}/auth/v1/.well-known/jwks.json"
)

def get_current_user_id(
    credentials: Annotated[HTTPAuthorizationCredentials, Depends(security)],
) -> str:
    token = credentials.credentials
    try:
        unverified_header = jwt.get_unverified_header(token)
        kid = unverified_header.get("kid")
        if not kid:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid token header",
            )
        signing_key = jwks_client.get_signing_key(kid)
        payload = jwt.decode(
            token,
            signing_key,
            algorithms=["ES256"],
            audience="authenticated",
            issuer=f"{settings.supabase_url}/auth/v1",
        )
        return payload["sub"]
    except Exception as e:
        print("JWT ERROR:", e)
        raise
