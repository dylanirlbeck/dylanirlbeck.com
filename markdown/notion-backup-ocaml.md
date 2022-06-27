# Automated Notion backups with OCaml

A significant portion of my digital life is spent on
[Notion](https://notion.so). It's where I store my notes on interesting articles I read and fruitful conversations I have with others. It's where I keep my grocery
lists and workout plans, easily accessible from my phone when I'm out. But this
heavy reliance on Notion for both creation and storage of my ideas is problematic. For example, what happens if Notion goes down and my data is lost? What happens when there is a breach and my data is corrupted or stolen? What do I do if Notion unscrupulously locks me out of my account?

One way to minimize the impact I'd feel if any of these scenarios were to become
reality is to **own my data**. Without my data on-hand, I don't have the ability to switch to a different tool if I so choose. Notion does offer [a mechanism to backup your data](https://www.notion.so/help/back-up-your-data), but only by navigating to your settings page and clicking a button manually. This feature isn't terribly beneficial for me, however, given how much content I add to my Notion every hour, let alone every day. I needed an _automated_ way to back up my Notion at the frequency I wanted.

## `notion-backup-ocaml`

Recently, I came across a number of projects that reverse-engineered the
sequence of Notion
API calls that backs up user data. Using these projects as inspiration, I wrote my own OCaml program -- [`notion-backup-ocaml`](https://github.com/dylanirlbeck/notion-backup-ocaml)
-- that hits the Notion API ands download my data for me as a ZIP. Moreover, by configuring
[`launchd`](https://en.wikipedia.org/wiki/Launchd), a macOS utility for managing
daemons, I'm able to run this program at arbitrary time
intervals (currently set to every day at 9AM).

Usage is relatively straightforward, assuming that you have basic OCaml software
installed and the proper environment variables set:

```bash
> cd ~/notion-backup-ocaml && dune exec notion-backup-ocaml
Pages exported: 2017
Export created, downloading: https://s3.us-west-2...
Download complete: ../notion_backup.zip%
```

You can find detailed installation instructions, as well as the implementation in OCaml, [over on
GitHub](https://github.com/dylanirlbeck/notion-backup-ocaml)! And if you have ideas for how to improve this tool, or are just curious about OCaml in general, please don't hesitate to file an issue or [contact me](https://dylanirlbeck.com).
