// Split the page up into chunks
const chunks = {};
const $story = $('.story');
const $game = $('.game');

$story.children('hr').each(function() {
  const chunk = $(this).prevUntil('hr');
  if (chunk.last().has('a[name]')) {
    const name = chunk.last().find('a').attr('name');
    chunks[name] = chunk;
  }
});

$game.on('click', 'a[href^="#"]', function (evt) {
  evt.preventDefault();
  
  const chunkName = $(this).attr('href').slice(1);
  const chunk = chunks[chunkName];
  // Exit if the link doesn't go to a chunk that exists, or if the player 
  // isn't pressing on a link in the last chunk
  if (!chunk || !$(this).closest('.chunk:last-of-type').length) return;
  
  // Insert the chunk in a container
  const container = $('<div class="chunk">');
  chunk.clone().each(function() {
    container.prepend(this);
  });
  
  $game.append(container);
  
  // Fade in + scroll to bottom
  $('body, html').animate({ scrollTop: container.offset().top }, 500);
  container.hide().fadeIn(500);
  container.prev().fadeTo(300, 0.3);
});
