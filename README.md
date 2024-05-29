# EN-JP Dict

This is a Japanese word search application that allows users to search for Japanese words and view their meanings, readings, tags, frequency, and other information. The app consists of a backend API built with Express.js and TypeScript, and a frontend user interface built with Angular.

## Backend

The backend is an Express.js server that provides an API endpoint for searching Japanese words. The word data is loaded from JSON files containing term banks. The main components of the backend are:

- `dictionaryController.ts`: Contains the logic for searching words and returning the results.
- `dictionary.ts`: Defines the API route for the word search endpoint.
- `app.ts`: Sets up the Express.js application and middleware.
- `index.ts`: Starts the server and listens for incoming requests.

The backend also includes a preprocessing script (`preprocess.ts`) that adds romaji readings to the term bank data using the Kuroshiro library.

## Frontend

The frontend is an Angular application that provides a user interface for searching Japanese words and displaying the results. The main components of the frontend are:

- `word-search.component.ts`: Contains the logic for handling user input, making API requests, and displaying search results.
- `word-search.component.html`: Defines the HTML template for the word search component.
- `word-search.component.scss`: Contains the styles for the word search component.
- `word.service.ts`: Provides a service for making HTTP requests to the backend API.
- `tag-explanation.component.ts`: Displays explanations for tags when hovering over them.

The frontend also includes features such as:
- Pagination of search results
- Customizable background image
- Tag explanations on hover
- Color-coded result items

## Setup and Usage

1. Clone the repository.
2. Install the dependencies for both the backend and frontend using `npm install`.
3. Start the backend server by running `npm start` in the `back` directory.
4. Start the frontend development server by running `ng serve` in the `front` directory.
5. Access the application in a web browser at `http://localhost:4200`.

Enter a Japanese word in the search box and click the "Search" button or press Enter. The app will display the matching results with their readings, meanings, tags, and other information. Use the pagination controls to navigate through the results.

## Data

The word data is stored in JSON files in the `back/src/data` directory. The `index.json` file contains an index of the available term banks. The `tag_bank_1.json` file contains explanations for the tags used in the word data. The `term_bank_*.json` files contain the actual word data.

## Dependencies

- Express.js
- TypeScript
- Angular
- Kuroshiro
- kuromoji

## License

### JMdict and JMnedict

The original XML files - JMdict.xml, JMdict_e.xml, and JMnedict.xml - are the property of the Electronic Dictionary Research and Development Group, and are used in conformance with the Group's license. Project started in 1991 by Jim Breen.

All derived files are distributed under the same [license](https://www.edrdg.org/edrdg/licence.html), as the original license requires it.

This project is open-source and available under the [MIT License](LICENSE).
