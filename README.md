# Andrew Peterson EMD Test

Thanks for your consideration! This was a thoughtful, simple, open-ended test.

Some thoughts on what I would change in a production-esque environment:

## Frontend
- Just used Vite, my preferred simple FE scaffold.
- Implemented the frontend logic right in the main `App` component they provided. This obviously wouldn't scale for a larger app.
- No major stylesheet changes to the Vite default. Also used inline styles -- scaffolding proper, scalable styling requires more effort than needed for a couple `<span>` tags.
- Not debouncing or handling any potential async weirdness.
- Not using any more complex state management ie Redux.

## Backend
- Controllers and services are sometimes more useful as classes. I have a somewhat intermediate solution.
- Keeping error codes typed and simple (for FE i18n) is huge in my book. I have the controller weirdly returning something different when parsing the input type. Not optimal at scale but didn't want to hack in something intermediate.
- I much prefer proper error classes and middleware to handle it. I almost never return a non-200 from a controller directly, if possible.
- No integration testing for the endpoint itself. Didn't seem worth scaffolding for this test.
- I implemented [this rather magnificent gist](https://gist.github.com/ShirtlessKirk/2134376) for the Luhn algorithm almost directly, particularly the simple table for the results of any doubled->summed digits. I can explain the implementation and bitwise instructions.

I got caught up on some CORS weirdness (first time just using `fetch` and thought I was configuring it wrong) and this took me an hour longer than aniticipated, so I'm going to stop myself from obsessing over any small details ie naming conventions. Looking forward to reviewing with you all!