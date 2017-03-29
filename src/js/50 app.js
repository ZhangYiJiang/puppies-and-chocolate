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
  if (!chunk) return;
  
  const container = $('<div>');
  chunk.clone().each(function() {
    container.prepend(this);
  });
  
  $game.append(container);
});
