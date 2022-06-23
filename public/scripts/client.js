/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(() => {

    const renderTweets = function(tweets) {
      // refresh the container
      $(".tweets-container").empty(); //deleting the elem,ents themselves
      // loops through tweets
      tweets.forEach(tweet => {
        // calls createTweetElement for each tweet
        const tweetElement = createTweetElement(tweet);
        // takes return value and appends it to the tweets container
        $(".tweets-container").prepend(tweetElement);
      });
    };
    
    const createTweetElement = function(tweet) { // convert tweet object into HTML
      let $tweet = $(`
      <article class="tweet">
      <header>
        <span>
        <img src=${tweet.user.avatars}>
          &nbsp${tweet.user.name}
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
          ${timeago.format(tweet.created_at)}
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
    
    const loadTweets = function () { // get tweets from the server (/tweets/) and render them
      $.ajax('/tweets/', { method: 'GET' })
      .done(function(data) {
        renderTweets(data);
      })
    }

    $(function() { // Form submission handler
      const $form = $('.new-tweet form');
      $form.on('submit', function (event) {
        event.preventDefault();
        const queryString = $(this).serialize();
        const charCounter = $(".counter");
        const tweetLength = $(charCounter).html();
        // check for invalid tweet
        if (tweetLength >= 140) {
          alert('Cannot post an empty tweet!');
          return;
        }
        if (tweetLength < 0) {
          alert('Maximum tweet length exceeded!');
          return;
        }
        // send tweet to server
        $.ajax('/tweets/', { method: 'POST', data: queryString})
        .done(() => {
          // reload the tweets after a new one is posted
          loadTweets();
          // clear the form
          $("textarea").val("");
        });
      });
    });

    loadTweets();

  });
