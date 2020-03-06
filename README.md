# Rogue Sound

![Node.js CI](https://github.com/rogue-sound/rogue-sound-web/workflows/Node.js%20CI/badge.svg)

Rogue Sound is a social music sharing website where you can play music with friends and listen to it in real time thanks to the Spotify API.

_image_

## Features

- Connect with your Spotify account, no login / registration needed (Spotify Premium required).
- Listen to music synchronized together with everyone else in the room.
- Search songs directly in the Spotify library to be added to the room queue.
- Choose the playback device directly from the browser, all Spotify available devices supported.

## Core Team
 
<table border="0">
  <tr>
    <td align="center"><a href="https://github.com/jmolla31"><img style="border-radius:50%;border:1px solid #9cb0a4;background-size:cover;overflow:hidden;" src="https://avatars3.githubusercontent.com/u/33100083?s=460&v=4" width="60px;" alt="jmolla31"/><br /><sub><b>jmolla31</b></sub></a></td>
    <td align="center"><a href="https://github.com/pabravil"><img style="border-radius:50%;border:1px solid #9cb0a4;background-size:cover;overflow:hidden;" src="https://avatars2.githubusercontent.com/u/9166688?s=460&v=4" width="60px;" alt="pabravil"/><br /><sub><b>pabravil</b></sub></a></td>
    <td align="center"><a href="https://github.com/bonavida"><img style="border-radius:50%;border:1px solid #9cb0a4;background-size:cover;overflow:hidden;" src="https://avatars2.githubusercontent.com/u/8061481?s=460&v=4" width="60px;" alt="bonavida"/><br /><sub><b>bonavida</b></sub></a></td>
    <td align="center"><a href="https://github.com/cesarandex"><img style="border-radius:50%;border:1px solid #9cb0a4;background-size:cover;overflow:hidden;" src="https://avatars2.githubusercontent.com/u/1353358?s=460&v=4" width="60px;" alt="cesarandex"/><br /><sub><b>cesarandex</b></sub></a></td>
    <td align="center"><a href="https://github.com/MateoBeMo"><img style="border-radius:50%;border:1px solid #9cb0a4;background-size:cover;overflow:hidden;" src="https://avatars1.githubusercontent.com/u/15815193?s=460&v=4" width="60px;" alt="MateoBeMo"/><br /><sub><b>MateoBeMo</b></sub></a></td>
  </tr>
</table>

## Contributing

If you want to contribute to this project, please follow the [frontend development guidelines](https://github.com/rogue-sound/development-guidelines/blob/master/FRONTEND_DEVELOPMENT_GUIDELINES.md).

---

## Local development

### Requirements

- node 12.xx.x
- npm 6.x.x

### Installation

Clone the repository locally:

```bash
git clone https://github.com/rogue-sound/rogue-sound-web.git
```

And install all the dependencies:

```bash
cd rogue-sound-web
npm install
```

### Running the app on localhost

In order to make the application work, you need a `.env` file in the root directory with the following format:

```
CLIENT_ID=XXXXXXXXXXXXXXXXXXXXXXXXXX
REDIRECT_URI=http://localhost:8080
```

where `CLIENT_ID` is the id of your registered application in the [Spotify for Developers web](https://developer.spotify.com/dashboard) and `REDIRECT_URI` is the url that Spotify will use to redirect after the authentication.

To run the app in dev mode with hot-reloader, run the following command:

```bash
npm start
```

and now you only need to visit http://localhost:8080 in your browser of choice.

### About i18n

## Building the app

