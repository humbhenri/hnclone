const axios = require('axios').default;

const topstories = 'https://hacker-news.firebaseio.com/v0/topstories.json';

export async function getTopStories() {
    const items = await axios.get(topstories);
    return items;
}

export async function getStoryDetails(id) {
    console.log(`Getting details for ${id}`);
    const storyDetails = `https://hacker-news.firebaseio.com/v0/item/${id}.json`;
    const item = await axios.get(storyDetails);
    return item;
}