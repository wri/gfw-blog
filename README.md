# GFW Blog

This is a headless CMS for GFW blog.

## Installation / setting up locally

Install deps

```bash
yarn
```

There is a bug inside frontity dev commands that when used with yarn symlinks to the packages folder do not work. To fix this we need to manually symlink the `./packages/mars-theme` to the `@frontity/mars-theme` registered in the `package.json`

```bash
cd packages/mars-theme && yarn link && cd .. && yarn link @frontity/mars-theme
```

Finally we can start the server!

```bash
yarn dev
```

This will set up the app running on port 3000.
