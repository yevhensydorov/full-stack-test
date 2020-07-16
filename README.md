Random events generator project

## Setup and run the project

Clone the project to your local machine <br />
`git clone https://github.com/yevhensydorov/full-stack-test.git` <br />
<br />
Go to the project directory <br />
`cd full-stack-test` <br />
<br />
Install project dependencies <br />
`npm install` <br />
<br />
In the project directory, you need to create `.env` file with next value: <br />
`REACT_APP_API_SERVER_URL=LINK_FROM_THE_EMAIL` <br />
<br />
Run the project <br />
`yarn start` <br />
It'll run the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.
The page will reload if you make edits.<br />
You will also see any lint errors in the console.

## Tests

I've created `setupTests.js` file in the `/src` directory to add handy assertions to Jest. All tests located in the `/src/tests` directory. There are three basic tests which are checking if there is an event generator button, the page doesn't display event data if the user hasn't clicked on the button and page display event data if you click on the button. <br />

To run the tests you can use command <br />
`yarn test` <br />
It'll launch the test runner in the interactive watch mode.<br />

## Save event data to a remote data store

I've enhanced application to save the generated event data to the AWS located DynamoDB database. I've added fetch to the `usePageViewGenerator` in the `logic.tsx` file. Fetch code itself:

```js
fetch(`${API_SERVER_URL}`, {
  method: 'POST',
  headers: {
    'Content-type': 'application/json'
  },
  body: JSON.stringify({
    id: event.id,
    createdAt: event.created_at,
    title: event.page.title,
    description: event.page.description,
    tags: event.page.tags.join(', '),
    userId: event.user.id,
    userCreatedAt: event.user.created_at
  })
})
  .then((res) => res.json())
  // Enhance: Loading handling
  .then(() => {
    console.log('Message Added')
  })
// Enhance: Error handling
```

This code is doing POST request to the provided API_SERVER_URL, which is basically our events REST API from the AWS lambda. We are creating the body of the request using `event` constant data that was created before.

## Better message to the user

After clicking `Generate pageview` button user used to see `Last pageview` heading message. I've changed it to the `Last pageview that was saved to The Spectator Database` so the user will know that previous message has been saved to the database.

## Future improvements

If I had more time I'd add `Loading` and `Error` handling to the project. So the user will know that after clicking the `Generate pageview` button application is making the request and display spinner. Also, in case of the error, we need to send the message to the user stating that something went wrong.
