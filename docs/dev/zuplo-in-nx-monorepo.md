# Zuplo API in NX Monorepo

## Manual setup

- Create an account on zuplo.com.
- Create a project, say `oneapptorulethemall`.
- Go to Settings -> Zuplo API Keys -> Copy the default api key.
  - Note: There are two types of API Keys. This one is for managing Zuplo's control plane, so it is incredibly powerful. Keep it secure at all times! The other type is for access to your actual API that lives inside a Zuplo project. - TODO is this really true???
- Save the API key in an environment variable, say `ZUPLO_API_KEY`.

```sh
# from repository root
pnpm create zuplo-api@latest
# give it a name, say: api-gateway
cd api-gateway
npm install
```

## Connect local and remote

```sh
cd api-gateway
npx @zuplo/cli login
# browser will open asking you to authenticate

```

- <https://zuplo.com/docs/articles/custom-ci-cd>

More details [here](https://zuplo.com/docs/articles/local-development-services).

## Actual work

```sh
# from inside api-gateway/
npm run dev
npx @zuplo/cli list --apiKey "$ZUPLO_API_KEY"
```

## Fixing NX + Pnpm

When I first ran `nx serve backend` it told me

```log
NX   Failed to process project graph. Run "nx reset" to fix this.
```

Of course, `nx reset` did not resolve it so I ran `nx serve backend --verbose` to see the true culprit:

```log
NX   Failed to process project graph. Run "nx reset" to fix this. Please report the issue if you keep seeing it. See errors below.

Failed to process project graph.. Run "nx reset" to fix this. Please report the issue if you keep seeing it.
  An error occurred while processing files for the @nx/eslint/plugin plugin.
    - api-gateway/.eslintrc.js: Failed to load plugin 'import' declared in '.eslintrc.js': Cannot find module 'eslint-plugin-import'
  Require stack:
  - /home/myuser/programming/oneapptorulethemall/api-gateway/__placeholder__.js
      Error: Failed to load plugin 'import' declared in '.eslintrc.js': Cannot find module 'eslint-plugin-import'
      Require stack:
      - /home/myuser/programming/oneapptorulethemall/api-gateway/__placeholder__.js
          at Module._resolveFilename (node:internal/modules/cjs/loader:1152:15)
```

Then `pnpm add eslint-plugin-import --workspace-root`

Also create a file `pnpm-workspace.yaml` and add the following contents:

```yaml
packages:
  - 'backend'
  - 'backend-e2e'
  - '!api-gateway'
```
