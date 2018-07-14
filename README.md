# turtle-cv

<!-- TOC depthFrom:2 -->

- [Introduction](#introduction)
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
- [Usage](#usage)
- [Installation](#installation)

<!-- /TOC -->

## Introduction

`turtle-cv` is a YAML-based CV site generator.

- **Data-oriented**: All data for your CV should be contained in a single file that is completely design agnostic, and thus easy to maintain.

- **Extensible**: All design decisions are made by themes, which are [Pug templates](https://github.com/pugjs/pug). You can easily hack an existing theme without cloning the repository.

- **Simple**: All you need is your YAML file. The CLI can be used without installation, as long as you have `nodejs` installed.

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

You can generate the CV without even checking out this project. It's black turtle magic ✨🐢✨! Just run the following in your terminal:

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
