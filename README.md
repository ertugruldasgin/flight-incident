# Flight Incident Archive

A single-page application that provides structured and filterable access to historical airplane accidents. All data is collected from Wikipedia and manually organized into a unified JSON format.

## Project Overview

This project aims to present a comprehensive, searchable database of commercial aviation accidents and incidents from past to present. Users can browse through incidents by aircraft type, operator, or year, and view detailed information about each event.

The goal is **not** to provide a definitive or investigative platform, but rather to create a well-organized and educational reference site powered by public sources.

## Features

- SPA built with React and React Router.
- Tailwind CSS for styling with responsive dark/light theme.
- All data is stored in a local `crashes.json` file for performance.
- Manual data scraping from Wikipedia via a custom Node.js script.
- Search and filtering support (using FlexSearch).
- Detail page for each incident with aircraft type, date, location, fatalities, and summary.
- Manual data patches supported via `handwritten_crashes.json`.
- Scroll animations and transitions via Framer Motion.
- Hosted on Vercel.

## Tech Stack

- **Frontend:** React, Tailwind CSS, Framer Motion, React Router
- **Backend / Scraper:** Node.js, JSDOM, node-fetch
- **Search:** FlexSearch (lightweight in-browser search engine)

## Data Source

All data is extracted from [Wikipedia](https://en.wikipedia.org/wiki/List_of_accidents_and_incidents_involving_commercial_aircraft) using a parser that:

- Extracts incident entries, details, and first paragraph summaries.
- Outputs data to a structured JSON file for frontend use.

Data updates are **manual** to ensure performance and control.

## Scripts

### `scrapeIncidents.js`

Scrapes incidents from Wikipedia and generates a full `crashes.json`.

### `prependCrash.js`

Adds new incidents from `handwritten_crashes.json` to the beginning of `crashes.json`.

Have questions or suggestions? Reach out via flightincident@gmail.com
