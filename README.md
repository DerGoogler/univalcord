# Univalcord

This is an simple app to load websites lol

## Options

In this section will you see how to add websites

Base folder: `C:\univalcord`

File name: `titlebar.json`

```json
[
  {
    "name": "Discord",
    "link": "https://discord.com/app",
    "titlebarColor": "#24292e",
    "stylesheet": {
      "source": "external",
      "file": "https://raw.githubusercontent.com/Gibbu/BetterDiscord-Themes/master/Slate/base.css"
    },
    "javascript": {
      "source": "internal",
      "file": "discord.js"
    }
  },
  {
    "name": "YouTube",
    "link": "https://www.youtube.com",
    "titlebarColor": "#212121",
    "stylesheet": {
      "source": "internal",
      "file": "youtube.css"
    },
    "javascript": {
      "source": "internal",
      "file": "youtube.js"
    }
  },
  {
    "name": "WhatsApp",
    "link": "https://web.whatsapp.com",
    "titlebarColor": "#1c2026",
    "stylesheet": {
      "source": "internal",
      "file": "whatsapp.css"
    },
    "javascript": {
      "source": "internal",
      "file": "whatsapp.js"
    }
  }
]
```

File name: `settings.json`

```json
{
  "titlebarColor": "#272727",
  "title": "Gay Simulator",
  "startUrl": "https://venge.io"
}
```
