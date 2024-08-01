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
