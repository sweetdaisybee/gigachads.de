# gigachads.de

## Installation

    git clone https://github.com/gigachads-de/gigachads.de.git
    cd gigachads.de
    docker build -t gigachads:1.0.0 .

## .env Variables

### TZ | string
    Default: Etc/UTC
    Europe/Berlin
### NODE_ENV | string
    Default: none
    dev | prod
### FASTIFY_HOST | string
    Default: ::
    Examples: 127.0.0.1 | 0.0.0.0 | :: // Somehow this doesn't work :(
### FASTIFY_PORT | string
    Default: 3000
    Examples: 3000 | 5000
### CORS_ORIGIN | string
    Default: none
    Examples: *
### CORS_CREDENTIALS | boolean
    Default: true
    Examples: true | false
### CORS_METHODS | string[]
    Default: none
    Examples: GET,HEAD,POST,PUT,DELETE,CONNECT,OPTIONS,TRACE,PATCH
### CORS_MAX_AGE | number
    Default: 86400
    Examples: 86400
### COOKIE_SECRET  | string
    Default: none
    Examples: supersecurepassword
### COOKIE_NAME  | string
    Default: gigachads
    Examples: gigachads
### JWT_SECRET  | string
    Default: none
    Examples: supersecurepassword
### REDIS_ENABLED
    Default: true
    Example: true | false
### REDIS_HOST | string
    Default: none
    Examples: gigachads-redis | 172.16.0.50
### REDIS_PASSWORD | string
    Default: none
    Examples: supersecurepassword
### REDIS_PORT | number
    Default: 6379
    Examples: 6379
### REDIS_IP_FAMILY | number
    Default: 4
    Examples: 4 | 6
### LOG_ENABLED | boolean
    Default: true
    Examples: true | false
### LOG_LEVEL | string
    Default: info
    Examples: fatal | error | warn | info | debug | trace
### ADMIN_USERNAME | string
    Default: none
    Examples: Example
### ADMIN_PASSWORD | string
    Default: none
    Examples: supersecurepassword
### ADMIN_EMAIL | string
    Default: none
    Examples: example@example.com