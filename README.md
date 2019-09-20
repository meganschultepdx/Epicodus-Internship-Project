# EPICODUS INTERNSHIP COMPANY PARTNER SCRAPER TOOL

#### By Megan Schulte & Brian Hensley Aug/Sept 2019

## Description

This was an internal company tool created during a five week internship. The back-end is built as an independent API with C#/EF Core/Sqlite; the front-end is built in React with Hooks and Typescript and makes get requests to the backend API to access the sqlite database. The main function of the tool is to use album upcs to make scrapes (currently a GET request to an API) of company partners to get information on whether an album that has been submitted to that partner is currently live on their site. It performs and displays Scans for an entered upc that are made up of a list of scrapes from all active partners. At a glance the UI displays the most recent scan with date and live/notlive as well as a table with the history of scans/scrapes for the entered upc. We started a dataset page with a table that would display all scrapes for a specific upc but were not able to finish the filter/sort function for the table in the time of our internship.

## Setup/Installation Requirements

- clone project from [GitHub](https://github.com/meganschultepdx/Epicodus-Internship-Project)
- Run \$ _npm install_ in the PartnerScraper directory to install necessary packages
- Run \$ _dotnet ef migrations add newMigration_ in the PartnerScraper directory
- Run \$ _dotnet ef database update_ in the PartnerScraper directory to create the database
- Run \$ _dotnet run_ to start the project on Local Server
- Navigate to https://localhost:5001/ in your browser
- Enter an album's UPC in the search bar to get that UPC's scrape history
- After searching click _SCRAPE NOW!_ to do a new scrape and see if it's currently live on iTunes

## Database Tables

![](Client/src/assets/img/db.png)

## Known Bugs

No known bugs

## Support and contact details

Create a pull request on GitHub.

## Technologies Used

- React with hooks
- Typescript
- C#
- .NET 2.1
- Entity Framework Core 2
- SQLite
- Webpack
- npm
- HTML
- CSS
- Material-UI

### License

License: LGPLv3
Notice (under REDISTRIBUTION RULES & COPYRIGHT): No making money, no redistributing on websites without permission

Copyright (c) 2019 Brian Hensley & Megan Schulte
