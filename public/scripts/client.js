/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(() => {

  // Fake data taken from initial-tweets.json
  const data = [
    {
      "user": {
        "name": "Newton",
        "avatars": "https://i.imgur.com/73hZDYK.png",
        "handle": "@SirIsaac"
      },
      "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
      },
      "created_at": 1655590403198
    },
    {
      "user": {
        "name": "Declan",
        "avatars": "https://i.imgur.com/o9fpo46.png",
        "handle": "@DexTheFish"
      },
      "content": {
        "text": "Fish goes swim swim in the pond. Splish splosh"
      },
      "created_at": 1655676803198
    },
    {
      "user": {
        "name": "Mia",
        "avatars": "https://i.imgur.com/l1aR1XP.png",
        "handle": "@Me_A_Cat"
      },
      "content": {
        "text": "Tweet tweet goes the bird, fly high in the sky, chirp chirp."
      },
      "created_at": 1655763203199
    },
    {
      "user": {
        "name": "Descartes",
        "avatars": "https://i.imgur.com/nlhLi3I.png",
        "handle": "@rd"
      },
      "content": {
        "text": "Je pense , donc je suis"
      },
      "created_at": 1655849603198
    }
  ];
    
    const renderTweets = function(tweets) {
      // loops through tweets
      tweets.forEach(tweet => {
        // calls createTweetElement for each tweet
        const tweetElement = createTweetElement(tweet);
        // takes return value and appends it to the tweets container
        $(".tweets-container").append(tweetElement);
      });
    };
    
    const createTweetElement = function(tweet) { // !! date should be converted from an integer to "X days ago"
      let $tweet = $(`
      <article class="tweet">
      <header>
        <span>
        <img src=${tweet.user.avatars}>
          ${tweet.user.name}
        </span>
        <small>
          ${tweet.user.handle}
        </small>
      </header>
      <p>
        ${tweet.content.text}
      </p>
      <footer>
        <div>
          ${tweet.created_at}  
        </div>
        <div class="action">
          <i class="fa-solid fa-flag"></i> &nbsp; 
          <i class="fa-solid fa-retweet"></i> &nbsp;
          <i class="fa-solid fa-heart"></i>
        </div>
      </footer>
    </article>
      `);
      return $tweet;
    };
    
    renderTweets(data);
    
    $(function() {
      const $form = $('.new-tweet form');
      $form.on('submit', function (event) {
        console.log('form submitted, performing ajax call...');
        event.preventDefault();
        // // $.ajax('more-posts.html', { method: 'POST' })
        // // .then(function (morePostsHtml) {
        // //   console.log('Success: ', morePostsHtml);
        // //   $button.replaceWith(morePostsHtml);
        // });
      });
    });
  });
