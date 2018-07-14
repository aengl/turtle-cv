# turtle-cv

<!-- TOC depthFrom:2 -->

- [Introduction](#introduction)
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
- [Usage](#usage)
- [Installation](#installation)
- [Themes](#themes)
- [Contributing](#contributing)
- [License](#license)

<!-- /TOC -->

## Introduction

`turtle-cv` is a YAML-based CV site generator.

- **Data-oriented**: All data for your CV should be contained in a [single file](__tests__/cv.yml) that is completely design agnostic, and thus easy to maintain.

- **Extensible**: All design decisions are made by themes, which are [Pug templates](https://github.com/pugjs/pug). You can easily hack an existing theme without cloning the repository. A theme can be based on another, simply adjusting some colors (check the [dark theme](themes/dark) for reference).

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

This project requires a recent version of [nodejs](https://nodejs.org/en/) installed. Everything >= 8 should work, but only the latest version is tested.

## Getting Started

All you need to get your CV website is to create a [YAML](https://en.wikipedia.org/wiki/YAML) file that contains the relevant information. What you can write in the YAML depends somewhat on the theme that you'll be using.

The best way to get going is to copy [Donatello's CV YAML](https://github.com/aengl/turtle-cv/blob/master/__tests__/cv.yml) and adapt it to your needs.

Here's a command to get you started:

```
wget https://raw.githubusercontent.com/aengl/turtle-cv/master/__tests__/cv.yml
```

## Usage

You can generate the CV without even checking out this project. It's ancient turtle magic ✨🐢✨! Just run the following in your terminal:

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

Themes are [Pug templates](https://github.com/pugjs/pug), usually coupled with a CSS file.

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

## Contributing

The main purpose of this repository is to provide a painless experience for generating CVs. Bugfixes, improvements and additional themes are welcome as long as they adhere to that goal.

The usual way to contribute is to fork the project, make changes on your fork and then create a pull request.

But you're also welcome to create an issue in this repository, where you link to your theme.

## License

`turtle-cv` is licensed via [The Unlicense](LICENSE), so you can do with it whatever you want. 💛
