import { config } from "dotenv";
import { TwitterApi } from "twitter-api-v2";

config();

const twitterClient = new TwitterApi({
    appKey: process.env.TWITTER_API_KEY,
    appSecret: process.env.TWITTER_API_SECRET,
    accessToken: process.env.TWITTER_ACCESS_TOKEN,
    accessSecret: process.env.TWITTER_ACCESS_SECRET,
    clientSecret: process.env.TWITTER_CLIENT_SECRET,
    clientId: process.env.TWITTER_CLIENT_ID,
});

export async function createPost(status) {
    const newPost = await twitterClient.v2.tweet(status);
    return {
        content: [
            {
                type: "text",
                text: `Tweeted: ${status}`,
            }
        ]
    }
}

export async function getPosts(status) {
    const user = await twitterClient.v2.me();
    const userId = user.data.id;

    const tweets = await twitterClient.v2.userTimeline(userId, {
        max_results: 100,
    });

    return {
        content: tweets.data.data.map(tweet => ({
            type: "text",
            text: tweet.text,
        }))
    };
}