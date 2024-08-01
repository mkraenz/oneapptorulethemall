# Zuplo API Gateway

- [Zuplo Management API](https://dev.zuplo.com/docs/routes)

## Environment Variables and Secrets

This demonstrates how to do it programmatically. You can also do it via the Zuplo dashboard but it doesn't really show the selection of which branches when you do not have connected a repository for git sync.

From [docs](https://dev.zuplo.com/docs/routes#creates-a-variable)

```sh
ZUPLO_API_KEY=
ZUPLO_ORGANIZATION_ID=lavender_crooked_shrew
ZUPLO_PROJECT_ID=oneapptorulethemall
ZUPLO_BRANCH=dev # main, dev, or preview
curl --request POST \
  --url "https://dev.zuplo.com/v1/accounts/${ZUPLO_ORGANIZATION_ID}/projects/${ZUPLO_PROJECT_ID}/branches/${ZUPLO_BRANCH}/variables" \
  --header "Authorization: Bearer $ZUPLO_API_KEY" \
  --header 'Content-Type: application/json' \
  --data '
{
  "name": "BASE_URL",
  "isSecret": false,
  "value": "https://webhook.site/81c3e323-a694-471a-b081-82a2084af26a"
}
'
```

## Overview of Zuplo features

Users (public internet) -> API GW -> backend servers

zuplo API GW

- universal entry point to your APIS
- authentication offloading
- rate limiting
- hosted docs + openapi spec rendered
- api key management (for authentication) (e.g. like github personal access tokens)

## Authenticating the API Gw with your backend

## HMAC basic idea

shared secret secret-1234567
set on API GW (or more generally on server)
set on backend (or more generally on client)

create the request payload
hash using the secret
send the hash with the request (probably in header)

client side receives request
get the request payload
hash using the secret
compare the hash with the received hash

### Zuplos turn on HMAC

<https://zuplo.com/docs/articles/web-crypto-apis#hmac-signatures>

## My understanding of 'HMAC but asymmetric'

create public-private key pair
set private key on api gw
set public key on backend
create the request payload
hash using the private key
send the hash with the request (probably in header)

client side receives request
get the request payload
~~hash using the public key~~
compare the hash with the received hash

### Zero downtime secret rotation

client should be able to handle one of two or more secrets to enable

set new secret additionally to the existing secret on backend
backend tries to verify with the new secret
if verification fails, it tries with the old secret
now update secret in zuplo
