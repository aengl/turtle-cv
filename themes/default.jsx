import React from 'react';

exports.default = props => {
  const { profile } = props;
  return (
    <>
      <main>
        <Profile {...profile} />
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
};

const Profile = props => (
  <section>
    <h1>{props.name}</h1>
    {props.label && <div className="label">{props.label}</div>}
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
      }
      .details > * {
        margin: 0.2em 0;
      }
    `}</style>
  </section>
);
