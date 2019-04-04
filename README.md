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

- **Extensible**: All design decisions are made by themes, which are [Pug templates](https://github.com/pugjs/pug). You can easily hack an existing theme without even cloning the repository. A theme can be [based on another](themes/dark/theme.pug), simply [adjusting some colors](themes/dark/theme.css). Multiple languages are [supported as well](themes/default/text.pug).

- **Simple**: All you need is your YAML file. The CLI can be used without installation, as long as you have `nodejs` installed.

- **Modern**: All themes are responsive and designed for current-gen browsers. `turtle-cv` prefers simple, clean code over browser compatibility.

In short, `turtle-cv` turns this

```
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

This project requires a recent version of [Node.js](https://nodejs.org/en/) installed. Everything `>= 8` should work, but only the latest version is tested.

## Getting Started

All you need to get your CV website is to create a [YAML](https://en.wikipedia.org/wiki/YAML) file that contains the relevant information. What you can write in the YAML depends somewhat on the theme that you'll be using.

The best way to get going is to copy [Donatello's CV YAML](https://github.com/aengl/turtle-cv/blob/master/__tests__/cv.yml) and adapt it to your needs.

Here's a command to get you started:

```
wget https://raw.githubusercontent.com/aengl/turtle-cv/master/__tests__/cv.yml
```

Check out the [schema file](/schema/schema.yml) for all supported attributes.

## Usage

You can generate the CV without even cloning this project. It's ancient turtle magic ✨🐢✨! Just run the following in your terminal:

```
npx https://github.com/aengl/turtle-cv cv.yml
```

Just make sure that your `cv.yml` actually exists. Turtle magic isn't _that_ powerful.

You should now be the proud owner of a `cv.html`. Go and host it on [GitHub pages](https://pages.github.com/) and you're good to go!

One more useful hint:

Especially when using `npx`, it's very helpful to enable watch mode, which will automatically compile the HTML file whenever you change and save the YAML file.

```
npx https://github.com/aengl/turtle-cv cv.yml --watch
```

## Installation

If you find yourself using `npx` a lot, it probably makes more sense to install the project. Simply run:

```
npm install --global https://github.com/aengl/turtle-cv
```

You can now convert the yml simply by typing:

```
turtle-cv cv.yml
```

## Themes

Themes are [Pug templates](https://github.com/pugjs/pug), usually coupled with a CSS file, and optionally a language file (YAML) for localisation.

If you just want to use another theme, you can reference it by name using the `-t` option:

```
turtle-cv cv.yml -t dark
```

Or using `npx`:

```
npx https://github.com/aengl/turtle-cv cv.yml -t dark
```

You can browse all available themes in the [🌠 Theme Gallery](https://aengl.github.io/turtle-cv/gallery).

If you want to write your own theme, or make a simple adjustment to an existing one, the best way to start is to download it from the [themes folder](themes). If the theme extends another theme (the Pug file starts with an `extends` directive) you will have to download that theme as well and put it in a sibling folder.

Make a few adjustments and use it by adding a `-t` option like this:

```
turtle-cv cv.yml -t /path/to/my_theme
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

```
turtle-cv cv.yml -l de
```

Well, sort of. Chances are your language isn't supported by the theme yet, but it's pretty easy to [hack it in](themes/default/text.pug).

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

```
yarn dev __tests__/cv.yml -o __tests__/cv.html
```

Don't forget to update tests, snapshots and the gallery:

```
yarn test -u
yarn create:gallery
```

## License

`turtle-cv` is licensed via [The Unlicense](LICENSE), so you can do with it whatever you want. 💛
