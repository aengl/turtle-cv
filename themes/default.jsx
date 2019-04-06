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
      {Object.keys(props).map(key =>
        sections[key]
          ? React.createElement(sections[key], { key, data: props[key] })
          : null
      )}
    </main>

    <style jsx global>{`
      @import url('https://fonts.googleapis.com/css?family=Exo+2:200|Merriweather:300,700');

      :root {
        --background: white;
        --text-color: hsl(0, 0%, 15%);
        --theme-color: hsl(26, 100%, 50%);
        --light-color: hsl(0, 0%, 60%);
        --anchor-color: hsl(26, 100%, 25%);
        --small: 0.8em;
        --large: 1.2em;
        --bold: 700;
        --keyword-color: hsl(0, 0%, 30%);
        --keyword-background: hsl(0, 0%, 92%);
      }
      body {
        max-width: 800px;
        font-family: 'Merriweather', sans-serif;
        font-size: 16px;
        font-weight: 300;
        line-height: 1.4em;
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
        font-size: 3em;
      }
      h2 {
        margin: 2em 0 1.2em;
        font-size: 2em;
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
        list-style-type: disc;
      }
      li {
        margin: 0.2em 0;
      }
      section > ul {
        list-style: none;
        padding: 0;
      }
      section > ul > li {
        margin-bottom: 2.5em;
      }
      .light {
        color: var(--light-color);
      }
      .large {
        font-size: var(--large);
      }
    `}</style>
  </>
);

const Duration = ({ from, until }) => (
  <div className="light">{until ? `${from} to ${until}` : `Since ${from}`}</div>
);

/* ~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^
 * Profile
 * ~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^ */

export const Profile = props => (
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
          {props.location}
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
      <>
        <hr />
        <div className="summary">
          <ReactMarkdown>{props.summary}</ReactMarkdown>
        </div>
        <hr />
      </>
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
      }
      .details {
        margin: 1.8em 0;
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

export const sections = {
  /* ~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^
   * Work
   * ~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^ */

  work: ({ data }) => (
    <section>
      <h2>
        <i className="fa fa-suitcase" />
        Work History
      </h2>
      <ul>
        {data.map((props, i) => (
          <li key={i}>
            <p>
              <Duration from={props.from} until={props.until} />
            </p>
            {props.company && (
              <p>
                <a href={props.url} className="large">
                  {props.company}
                </a>
              </p>
            )}
            {props.position && <p>Position: {props.position}</p>}
            {props.summary && <ReactMarkdown>{props.summary}</ReactMarkdown>}
            {props.highlights && (
              <ul>
                {props.highlights.map((item, i) => (
                  <li key={i}>
                    <ReactMarkdown>{item.summary}</ReactMarkdown>
                    {item.keywords && (
                      <ul className="keywords">
                        {item.keywords.map(x => (
                          <li key={x}>{x}</li>
                        ))}
                      </ul>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
      <style jsx>{`
        ul.keywords {
          list-style: none;
          margin: 0.3em 0 0.8em;
          padding: 0;
        }
        ul.keywords > li {
          display: inline;
          color: var(--keyword-color);
          background-color: var(--keyword-background);
          border-radius: 5px;
          margin: 0.2em;
          padding: 0.3em 0.7em;
          font-size: var(--small);
        }
      `}</style>
    </section>
  ),

  /* ~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^
   * Education
   * ~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^ */

  education: ({ data }) => (
    <section>
      <h2>
        <i className="fa fa-graduation-cap" />
        Education
      </h2>
      <ul>
        {data.map((props, i) => (
          <li key={i}>
            <p>
              <Duration from={props.from} until={props.until} />
            </p>
            {props.institution && (
              <p>
                <a href={props.url} className="large">
                  {props.institution}
                </a>
              </p>
            )}
            {props.area && <p>{props.area}</p>}
            {props.degree && <p>Degree: {props.degree}</p>}
          </li>
        ))}
      </ul>
    </section>
  ),

  /* ~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^
   * Awards
   * ~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^ */

  awards: ({ data }) => (
    <section>
      <h2>
        <i className="fa fa-medal" />
        Awards
      </h2>
      <ul>
        {data.map((props, i) => (
          <li key={i}>
            {props.date && <p className="light">{props.date}</p>}
            <p>
              <a href={props.url} className="large">
                {props.name}
              </a>
            </p>
            {props.arwarder && <p>Arwarded by: {props.arwarder}</p>}
            {props.summary && <ReactMarkdown>{props.summary}</ReactMarkdown>}
          </li>
        ))}
      </ul>
    </section>
  ),

  /* ~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^
   * Publications
   * ~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^ */

  publications: ({ data }) => (
    <section>
      <h2>
        <i className="fa fa-pen-fancy" />
        Publications
      </h2>
      <ul>
        {data.map((props, i) => (
          <li key={i}>
            {props.date && <p className="light">{props.date}</p>}
            <p>
              <a href={props.url} className="large">
                {props.title}
              </a>
            </p>
            {props.summary && <ReactMarkdown>{props.summary}</ReactMarkdown>}
          </li>
        ))}
      </ul>
    </section>
  ),

  /* ~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^
   * Skills
   * ~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^ */

  skills: ({ data }) => (
    <section>
      <h2>
        <i className="fa fa-toolbox" />
        Skills
      </h2>
      <ul>
        {data.map((props, i) => (
          <li key={i}>
            <p>{props.name}</p>
            {props.level && <p className="light">{props.level}</p>}
            {props.keywords && (
              <ul className="keywords">
                {props.keywords.map(keyword => (
                  <li key={keyword}>{keyword}</li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </section>
  ),

  /* ~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^
   * Languages
   * ~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^ */

  languages: ({ data }) => (
    <section>
      <h2>
        <i className="fa fa-comments" />
        Languages
      </h2>
      <ul>
        {data.map((props, i) => (
          <li key={i}>
            <p>{props.name}</p>
            {props.level && <p className="light">{props.level}</p>}
          </li>
        ))}
      </ul>
    </section>
  ),
};
