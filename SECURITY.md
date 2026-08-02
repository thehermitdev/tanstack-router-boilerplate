# Security Policy

Do not report vulnerabilities in public issues. Use GitHub private vulnerability reporting when enabled, or contact the repository owner privately.

Never commit credentials, production endpoints containing secrets, access tokens, or real customer data. Client-side environment variables are public after bundling; only use `VITE_*` values for non-secret configuration.
