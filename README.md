# turtle-cv

A YAML-based CV site generator.

## Getting Started

All you need to get your CV website is to create a [YAML](https://en.wikipedia.org/wiki/YAML) file that contains the relevant information. What you can write in the YAML depends somewhat on the theme that you'll be using.

The best way to get going is to copy [Donatello's CV YAML](https://github.com/aengl/turtle-cv/blob/master/__tests__/cv.yml) that is used for integration testing all themes and adapt it to your needs.

Here's a command to get you started:

```
wget https://raw.githubusercontent.com/aengl/turtle-cv/master/__tests__/cv.yml
```

## Prerequisites

This project requires a recent version of [nodejs](https://nodejs.org/en/) installed. Everything >= 8 should work, but only the latest version is tested.

## Usage

You can generate the CV without even checking out this project. It's black turtle magic ✨🐢✨! Just run the following in your terminal:

```
npx https://github.com/aengl/turtle-cv cv.yml
```

Just make sure that your `cv.yml` actually exists. Turtle magic isn't _that_ powerful.

You should now be the proud owner of a `cv.html`. Go and host it on [GitHub pages](https://pages.github.com/) and you're good to go!
