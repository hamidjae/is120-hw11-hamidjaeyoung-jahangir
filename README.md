# is120-hw11-hamidjaeyoung-jahangir: JavaScript API

This homework uses JavaScript to call a Dragon Ball API to automatically populate character cards, and allow users to save their favorite cards.

## Why is it important that we only make one API call for this page? How does that affect you as a frontend developer and how does that affect the API developers?

It is important to make only one API call in order to make the website more efficient. Multiple API calls mean the browser has to fetch information from the API host every single time, which can cause unneeded delay. To fix this, calling relevant information once and storing it is far more efficient as there is no awaiting required for information back and forth. As a frontend developer, we should be optimal in our approaches considering how slow websites can get when code is unoptimized. For the API developers, it puts less strain on their hosting servers if less calls are made at any given moment. There are 58 characters. My code only fetches information once, so I only call the API once. If I were to fetch all 58 instead, I would be x58'ing the strain on the servers, and that number only grows even more absurd the more people actually start using my website.

## Why is local storage useful in this scenario? Can you think of other instances where it would be useful?

Local Storage is useful because it allows information to persist in the browser's cache, enabling data to be saved beyond a refresh. This means that users can safely favorite their cards, and then click off and back on and see all of their favorites still populated, saving them the trouble of re-favoriting them. In my code, another instance where local storage would be useful would maybe be cacheing the actual API characters? As it stands, my code calls the API on load. However, this means that every time I refresh, the API is called again. Perhaps if local storage detects characters already present inside an array or a dictionary, I would not need to call the API again and instead just reference the information already present. Of course, this runs the risk of data being out of sync with the actual API's information, but this is once place where it would be optimized with further thought.

## What would break if a user's favorites referenced an item the API no longer returns? How could you fix that?

From how I see my code, my code would result in the user's specific favorite character disappearing from the Favorites tab, as if it didn't exist to begin with. Specifically, the line
const favoriteCharacters = characters.filter(function (character) {
  return favoriteIds.includes(character.id);
});

would result in favoriteIds having a character ID that doesn't exist, and localStorage would have data that is completely useless. One way I think I could fix this is implementing a comparison between the local favorite IDs and API character IDs, and eliminating invalid IDs and implementing a "Missing Character" card in its place, with the character ID. This would let the user know that their favorite character card has vanished, and cleans up useless information inside my code.



