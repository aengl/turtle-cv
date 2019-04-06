import React from 'react';
import { Helmet } from 'react-helmet';
import ReactMarkdown from 'react-markdown';

exports.default = props => (
  <>
    <Helmet>
      <title>{props.profile.name}</title>
      <link
        rel="stylesheet"
        href="https://use.fontawesome.com/releases/v5.8.1/css/all.css"
        integrity="sha384-50oBUHEmvpQ+1lW4y57PTFmhCaXp0ML5d60M1M7uH2+nqUivzIebhndOJK28anvf"
        crossorigin="anonymous"
      />
      <meta name="charset" content="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
    </Helmet>
    <main>
      <Profile {...props.profile} social={props.social} />
      {props.work && <Work items={props.work} />}
    </main>

    <style jsx global>{`
      @import url('https://fonts.googleapis.com/css?family=Exo+2:200|Merriweather:300,500');

      :root {
        --background: white;
        --text-color: black;
        --theme-color: hsl(26, 100%, 50%);
        --light-color: #999;
        --anchor-color: hsl(26, 100%, 25%);
        --small-font: 0.8em;
        --weight-bold: 500;
      }

      body {
        max-width: 800px;
        font-family: 'Merriweather', sans-serif;
        font-size: 20px;
        font-weight: 300;
        line-height: 1.2em;
        margin: 0 auto;
        padding: 5vh 10vw;
        background: var(--background);
        color: var(--text-color);
      }

      hr {
        border: 0;
        height: 0;
        border-top: 1px solid rgba(0, 0, 0, 0.1);
        border-bottom: 1px solid rgba(255, 255, 255, 0.3);
        margin: 1.2em 0;
      }

      i {
        margin-right: 0.4em;
      }

      h1 {
        margin: 0.4em 0;
        font-size: 2.4em;
      }
      h2 {
        margin: 2em 0 1.2em;
        font-size: 1.6em;
      }
      h1,
      h2 {
        color: var(--theme-color);
        text-transform: uppercase;
        font-weight: 200;
        font-family: 'Exo 2', sans-serif;
        line-height: 1.1em;
      }

      a {
        text-decoration: none;
        color: var(--anchor-color);
      }
      a:hover {
        color: var(--theme-color);
      }

      p {
        margin: 0.5em 0;
      }

      ul {
        padding-left: 25px;
        margin: 0.4em 0;
      }
      li p {
        margin: 0;
      }
    `}</style>
  </>
);

const Profile = props => (
  <section>
    <h1>{props.name}</h1>
    {props.label && <div className="label">{props.label}</div>}
    <ul className="details">
      {props.email && (
        <li>
          <i className="fa fa-envelope" />
          <a href={props.email}>{props.email}</a>
        </li>
      )}
      {props.website && (
        <li>
          <i className="fa fa-globe" />
          <a href={props.website}>{props.website}</a>
        </li>
      )}
      {props.location && (
        <li>
          <i className="fa fa-home" />
          <span>{props.location}</span>
        </li>
      )}
      {props.social && (
        <div className="social">
          {props.social.map(({ network, url }) => (
            <a key={network} href={url}>
              <i className={`fab fa-${network.toLowerCase()}`} />
            </a>
          ))}
        </div>
      )}
    </ul>
    {props.summary && (
      <div className="summary">
        <hr />
        <ReactMarkdown source={props.summary} />
        <hr />
      </div>
    )}
    <style jsx>{`
      .label {
        margin: 0.2em 0;
        text-transform: uppercase;
        color: var(--light-color);
      }
      .summary {
        text-align: justify;
        margin: 2.2em 0;
        font-size: var(--small-font);
      }
      .details {
        margin: 1.8em 0;
        font-size: var(--small-font);
        list-style: none;
        padding: 0;
      }
      .details li {
        margin: 0.2em;
      }
      .social {
        margin: 1.2rem 0;
        font-size: 3em;
      }
      .social i {
        color: var(--light-color);
        transition: all 0.4s ease;
      }
      .social i:hover {
        color: var(--theme-color);
        transform: scale(1.2);
      }
    `}</style>
  </section>
);

const Work = ({ items }) => (
  <section className="work">
    <ul>
      {items.map((props, i) => (
        <li key={i}>
          {props.company && <a href={props.url}>{props.company}</a>}
        </li>
      ))}
    </ul>
    <style jsx>{`
      .highlights {
        margin: 0.4em 0 0 0;
      }
      ul {
        list-style: none;
        padding: 0;
      }
      ul.keywords {
        list-style: none;
        margin: 0.3em 0 0.8em;
        padding: 0;
      }
      ul.keywords > li {
        display: inline;
        color: hsl(0, 0%, 30%);
        background-color: hsl(0, 0%, 92%);
        border-radius: 5px;
        margin: 0.2em;
        padding: 0.3em 0.7em;
        font-size: 0.8em;
      }
    `}</style>
  </section>
);
