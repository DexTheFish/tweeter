/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(() => {

    const renderTweets = function(tweets) {
      // refresh the container
      $(".tweets-container").empty();
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
    
    const loadTweets = function () { // get tweets from the server (/tweets) and render them
      $.ajax('/tweets/', { method: 'GET' })
      .done(function(data) {
        renderTweets(data);
        console.log('loadTweets is working... probably!') //TEST CODE FOR DEBUGGING
      })
    }

    loadTweets();
    
    $(function() { // send new tweets to server
      const $form = $('.new-tweet form');
      $form.on('submit', function (event) {
        console.log('form submitted, performing ajax call...'); //TEST CODE FOR DEBUGGING
        event.preventDefault();
        const queryString = $(this).serialize();
        console.log(queryString); //TEST CODE FOR DEBUGGING
        $.ajax('/tweets/', { method: 'POST', data: queryString})
        // reload the tweets after a new one is posted
        .done(() =>
        loadTweets());
      });
    });



  });
