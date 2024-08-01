# Project Setup Notes

## Result

An Nx mono repo (Integrated mode) using single version policy that contains

- `backend/` a nestjs backend app that publishes a REST API with OpenAPI documentation under.
- `api-gateway/` Zuplo API Gateway configuration and code that serves as entry point to the backend for any public traffic.

## Prerequisites

- pnpm `^8.12.1`
- node
- probably some more stuff

```sh
pnpm dlx create-nx-workspace@latest
# give it a name, say: oneapptorulethemall
# choose Integrated
# choose empty workspace
cd oneapptorulethemall
alias n="pnpm exec nx"
n add @nx/nest
n g @nx/nest:app backend
# we now have backend/ and backend-e2e/


```
