# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

 [@vitejs/pluginreact](https://github.com/vitejs/vitepluginreact/blob/main/packages/pluginreact/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
 [@vitejs/pluginreactswc](https://github.com/vitejs/vitepluginreactswc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

 Configure the toplevel `parserOptions` property like this:

```js
   parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
   },
```

 Replace `plugin:@typescripteslint/recommended` to `plugin:@typescripteslint/recommendedtypechecked` or `plugin:@typescripteslint/stricttypechecked`
 Optionally add `plugin:@typescripteslint/stylistictypechecked`
 Install [eslintpluginreact](https://github.com/jsxeslint/eslintpluginreact) and add `plugin:react/recommended` & `plugin:react/jsxruntime` to the `extends` list
