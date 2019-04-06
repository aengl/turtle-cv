import React from 'react';
import { Helmet } from 'react-helmet';

export default ({ themes, script }) => (
  <>
    <Helmet>
      <title>Theme Gallery for turtle-cv</title>
      <meta name="charset" content="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
    </Helmet>

    <ul id="themes">
      {themes.map(({ name, html }) => (
        <li key={name} data-html={html}>
          {name}
        </li>
      ))}
    </ul>

    <iframe id="preview" />

    <style jsx global>{`
      html,
      body {
        height: 100%;
      }

      body {
        display: flex;
        font-size: 26px;
        font-family: Avenir, 'Segoe UI', sans-serif;
        margin: 0;
      }

      #themes {
        margin: 0.2em;
        padding: 0;
        overflow-y: scroll;
      }

      #themes li {
        cursor: pointer;
        list-style: none;
        padding: 0.2em 0.4em;
      }

      #themes li:hover {
        cursor: pointer;
        text-decoration: underline;
      }

      #preview {
        flex-grow: 1;
        border: 1px solid black;
        margin: 0.2em;
      }

      .selected {
        background-color: orange;
        border-radius: 5px;
      }
    `}</style>

    <script dangerouslySetInnerHTML={{ __html: script }} />
  </>
);
