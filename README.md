# CD BABY PARTNER SCRAPER

#### By Megan Schulte & Brian Hensley Aug/Sept 2019

## Description

This was an internal tool created for CD Baby during a five week internship. It is built with a C#/EF Core/Sqlite

## Setup/Installation Requirements

- clone project from https://cdbaby.visualstudio.com/_git/PartnerScraperTool
- Run $ _npm install_ in the PartnerScraper directory to install necessary packages
- Run $ _dotnet ef migrations add newMigration_ in the PartnerScraper directory
- Run $ _dotnet ef database update_ in the PartnerScraper directory to create the database
- Run $ _dotnet run_ to start the project on Local Server
- Navigate to https://localhost:5001/ in your browser
- Enter an album's UPC in the search bar to get that UPC's scrape history
- After searching click _SCRAPE NOW!_ to do a new scrape and see if it's currently live on iTunes

## Screen Shots of running project

## Features



# Current Features:



## Known Bugs

- Clicking back in the browser does not refresh the data tables to the current UPC.

## Support and contact details

Create a pull request on GitHub.

## Technologies Used

- C#
- .NET 2.1
- Entity Framework Core 2
- SQLite
- Typescript
- React
- Webpack
- npm
- HTML
- CSS
- Material-UI

### License

Restricted use

Copyright (c) 2019 Megan Schulte & Brian Hensley
