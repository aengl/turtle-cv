# turtle-cv

<!-- TOC depthFrom:2 -->

- [Introduction](#introduction)
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
- [Usage](#usage)
- [Installation](#installation)
- [Themes](#themes)
- [Schema](#schema)
- [Languages](#languages)
- [Printing & PDF](#printing--pdf)
- [Contributing](#contributing)
- [License](#license)

<!-- /TOC -->

## Introduction

`turtle-cv` is a YAML-based CV site generator.

- **Data-oriented**: All data for your CV should be contained in a [single file](__tests__/cv.yml) that is completely design agnostic, and thus easy to maintain.

- **Extensible**: All design decisions are made by themes, which are statically rendered [React](https://reactjs.org/) components. A theme can easily be [based on another](themes/dark.jsx). Multiple languages are [supported as well](themes/default.jsx#L137).

- **Simple**: All you need is your YAML file. The CLI can be used without installation, as long as you have `Node.js` installed.

- **Modern**: All themes are responsive and designed for current-gen browsers. `turtle-cv` prefers simple, clean code over browser compatibility.

In short, `turtle-cv` turns this

```yaml
profile:
  name: Donatello
  label: Ninja Turtle
  email: donatello@tmnt.com
  ...

social:
  - network: GitHub
    url: https://github.com/donatello
  ...

work:
  - company: TMNT
    position: Ninja
    from: September 2001
    ...
```

into

![Default theme](https://aengl.github.io/static/turtle-cv/default.png)

You can browse all available themes in the [🌠 Theme Gallery](https://aengl.github.io/turtle-cv/gallery).

## Prerequisites

This project requires a recent version of [Node.js](https://nodejs.org/en/) installed. Everything `>= 10` should work, but only the latest version is tested.

## Getting Started

All you need to get your CV website is to create a [YAML](https://en.wikipedia.org/wiki/YAML) file that contains the relevant information. What you can write in the YAML depends somewhat on the theme that you'll be using.

The best way to get going is to copy [Donatello's CV YAML](https://github.com/aengl/turtle-cv/blob/master/__tests__/cv.yml) and adapt it to your needs.

Here's a command to get you started:

```sh
wget https://raw.githubusercontent.com/aengl/turtle-cv/master/__tests__/cv.yml
```

Check out the [schema file](/schema/schema.yml) for all supported attributes.

## Usage

You can generate the CV without even cloning this project. It's ancient turtle magic ✨🐢✨! Just run the following in your terminal:

```sh
npx turtle-cv cv.yml
```

Just make sure that your `cv.yml` actually exists. Turtle magic isn't _that_ powerful.

You should now be the proud owner of a `cv.html`. Go and host it on [GitHub Pages](https://pages.github.com/) and you're good to go!

One more useful hint:

Especially when using `npx`, it's very helpful to enable watch mode, which will automatically compile the HTML file whenever you change and save the YAML file.

```
npx turtle-cv cv.yml --watch
```

## Installation

If you find yourself using `npx` a lot, it probably makes more sense to install the project. Simply run:

```sh
npm install --global turtle-cv
```

You can now convert the yml simply by typing:

```sh
turtle-cv cv.yml
```

If you'd rather not install it globally, you can use this `package.json` to get you started with your CV project:

```json
{
  "name": "cv",
  "private": true,
  "dependencies": {
    "turtle-cv": "latest"
  },
  "scripts": {
    "build": "turtle-cv cv.yml -o index.html",
    "dev": "open index.html && turtle-cv cv.yml -o index.html --watch"
  }
}
```

This setup is especially nifty when using a repository that is published via [Github Pages](https://pages.github.com).

## Themes

Themes are [React](https://reactjs.org/) components and make heavy use of [JSX](https://reactjs.org/docs/introducing-jsx.html), which gets transpiled by [Babel](https://babeljs.io/) during runtime.

If you just want to use another theme, you can reference it by name using the `-t` option:

```sh
turtle-cv cv.yml -t dark
```

Or using `npx`:

```sh
npx https://github.com/aengl/turtle-cv cv.yml -t dark
```

You can browse all available themes in the [🌠 Theme Gallery](https://aengl.github.io/turtle-cv/gallery).

If you want to write your own theme, or make a simple adjustment to an existing one, the best way to start is to have a look at the [existing themes](themes). Your theme file can live right next to your CV file and still import parts of existing themes using the `theme://` URI in an `import` ([example](themes/dark.jsx)).

Make a few adjustments and use it by adding a `-t` option like this:

```sh
turtle-cv cv.yml -t /path/to/my_theme
```

CSS is coded right into the JSX using [styled-jsx](https://github.com/zeit/styled-jsx), though you can use any other CSS-in-JS of your choice.

If you want to use NPM modules beyond the ones that this project supports, you can create a `package.json` in your theme folder and import dependencies as usual.

When extending themes, the cusomisation options depend on the individual theme. For the default theme, you can easily change colors, fonts and individual section. Here is an example:

```jsx
import React from 'react';
import DarkTheme from 'theme://dark';

export default props => (
  <>
    <DarkTheme
      {...props}
      fonts={{
        body: {
          family: 'Dosis',
          weight: 300,
          weightBold: 700,
        },
        header: {
          family: 'Indie Flower',
          weight: 400,
        },
      }}
      sections={{
        profile: ({ data }) => (
          <>
            <h1>{data.name}</h1>
            <p>Look at my custom profile!</p>
          </>
        ),
      }}
    />
    <style jsx global>{`
      :root {
        --text-color: hotpink;
      }
    `}</style>
  </>
);
```

Just save it as `my-theme.jsx` where your CV YAML sits and try it out with:

```sh
turtle-cv cv.yml -t my-theme
```

## Schema

It is recommended to validate your CV against the [schema file](/schema/schema.yml) to get suggestions and error annotations. `turtle-cv` uses the [JSON Schema draft](http://json-schema.org/), which should be supported by every major editor through plugins.

Here is how to set it up in Visual Studio Code:

1.  Install [YAML Support by Red Hat](https://marketplace.visualstudio.com/items?itemName=redhat.vscode-yaml)
1.  [Open Workspace settings](https://code.visualstudio.com/docs/getstarted/settings)
1.  Add the following `yaml` configuration in your settings:

    ```
    {
      ...
      "yaml.validate": true,
      "yaml.schemas": {
        "https://aengl.github.io/turtle-cv/schema/schema.json": "/*"
      }
    }
    ```

## Languages

Want to have a non-English CV? We got you covered!

```sh
turtle-cv cv.yml -l de
```

Well, sort of. Chances are your language isn't supported by the theme yet, but it's pretty easy to [hack it in](themes/default.jsx#L137).

The language code is specified using [ISO 639-1](https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes).

## Printing & PDF

Themes come with support for printing. Simply open the CV in a browser and print the page — no further adjustments should be necessary. PDFs can be generated by printing to PDF.

Not all browsers have good support for print styling, however. It is recommended to use Google Chrome for printing.

## Contributing

The main purpose of this repository is to provide a painless experience for generating CVs. Bugfixes, improvements and additional themes are welcome as long as they adhere to that goal.

The usual way to contribute is to fork the project, make changes on your fork and then create a pull request.

But you're also welcome to create an issue in this repository, where you link to your theme.

A note on themes: you are welcome to support attributes in your theme that are not in the schema. You don't have to support everything there is in the schema either, but the subset used in the [example CV](__tests__/cv.yml) needs to be fully supported.

To preview your changes on the example CV, run:

```sh
yarn dev __tests__/cv.yml -o __tests__/cv.html
```

Don't forget to update tests, snapshots and the gallery:

```sh
yarn test -u
yarn create:gallery
```

## License

`turtle-cv` is licensed via [The Unlicense](LICENSE), so you can do with it whatever you want. 💛
