# Ernest

Ernest is a really minimal blog theme for hugo.

![](https://github.com/julian-klode/ernest/blob/master/images/tn.png)

## Getting Started

Clone this repository to your hugo theme directory.

```
mkdir themes
cd themes
git clone https://github.com/julian-klode/ernest.git
```

## Configuration

Take a look in the [exampleSite](https://github.com/julian-klode/ernest/tree/master/exampleSite) folder.

This directory contains an example config file and the content for the demo.
It serves as an example setup for your documentation.

Copy the `config.toml` in the root directory of your website. Overwrite the existing config file if necessary.

__[config.toml](https://github.com/julian-klode/ernest/blob/master/exampleSite/config.toml)__:

```toml
baseurl = "https://example.com"
languageCode = "en"
title = "Ernest"
theme = "ernest"
copyright = "&copy;  <a href=\"https://github.com/tanksuzuki\">Asuka Suzuki</a> 2016, <a href=\"https://github.com/julian-klode\">Julian Andres Klode</a> 2018"
disqusShortname = "shortname"
googleAnalytics = ""

[params]

[params.highlight]
style = "github"
languages = ["go", "dockerfile"]

[[params.social]]
url = "https://github.com/julian-klode"
fa_icon = "fa-github"

[[params.social]]
url = "https://twitter.com/julian-klode"
fa_icon = "fa-twitter"

[[params.social]]
url = "/index.xml"
fa_icon = "fa-rss"

```

## Build

```
hugo server
```

You can go to localhost:1313 and this theme should be visible.

## License

Ernest is licensed under the [MIT License](LICENSE.md).

## Author

[Asuka Suzuki](https://github.com/julian-klode)
