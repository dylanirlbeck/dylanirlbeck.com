/*
 * A short script to generate the HTML for a new post written in Markdown. Based
 * on the input file path, insert HTML into a file in writing/ with the same
 * name.
 *
 * Example: yarn post path/to/markdown.md "Post title"
 */
const fs = require("fs");
const Path = require("path");
const Showdown = require("showdown");
const prettier = require("prettier");

const [markdownFile, postTitle] = process.argv.slice(2);

if (markdownFile == null) {
  console.error("No markdown file provided!");
  return;
} else if (postTitle == null) {
  console.error("No post title provided!");
  return;
}

const markdown = fs.readFileSync(markdownFile).toString();
const converter = new Showdown.Converter();
const htmlFromMarkdown = converter.makeHtml(markdown);

const fullHtml = `
  <!DOCTYPE html>
  <html>
    <head>
      <meta charset="utf-8" />
      <title>${postTitle} • Dylan Irlbeck</title>
      <link href="styles.css" rel="stylesheet" />
      <link
        href="https://fonts.googleapis.com/css?family=Inter"
        rel="stylesheet"
      />
    </head>
    <body>
      <div id="name">
        <a href="/"><span>Dylan Irlbeck</span></a>
      </div>
      <ul>
        <li><a href="/writing.html">Writing</a></li>
        <li><a href="/highlights.html">Highlights</a></li>
        <li><a href="/books.html">Books</a></li>
      </ul>
      <div id="page">
        <div id="content">
          ${htmlFromMarkdown}
        </div>
      </div>
    </body>
  </html>
`;

/*
 * Get the file name (without extension) for a given file.
 *
 * Example: markdown/human-centered.md -> human-centered.
 *
 * Source: https://futurestud.io/tutorials/node-js-get-a-file-name-with-or-without-extension
 */
const getFileName = (filePath) => Path.parse(filePath).name;

const outputFilePath = `writing/${getFileName(markdownFile)}.html`;

fs.writeFileSync(outputFilePath, prettier.format(fullHtml, { parser: "html" }));
