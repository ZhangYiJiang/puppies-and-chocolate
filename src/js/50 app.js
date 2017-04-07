// Split the page up into chunks
const chunks = {};
const $story = $('.story');
const $game = $('.game');

$.fn.fadeNext = function(pDelay, liDelay) {
  this.first().addClass('pass');
  
  if (this.length <= 1) return;
  
  const wait = $(this[0]).is('li') ? liDelay: pDelay;
  
  setTimeout(() => {
    this.slice(1).fadeNext(pDelay, liDelay);
  }, wait);
};

$story.children('hr').each(function() {
  // Chunk processing
  const chunk = $(this).prevUntil('hr');
  const anchor = chunk.last().find('a[name]');
  
  if (anchor.length) {
    chunk.find('a[href]').each(function() {
      const $this = $(this);
      let replacement;
      if ($this.text().includes('|')) {
        const parts = $this.html().split('|');
        $this.html(parts[0]);
        replacement = parts[1];
      } else {
        replacement = $this.html();
      }
      
      $this.data('replacement', replacement);
    });
    
    const name = anchor.attr('name');
    chunks[name] = chunk.not(anchor.closest('p'));
  }
});

$game.on('click', 'a[href^="#"]', function (evt) {
  evt.preventDefault();
  
  const $this = $(this);
  const chunkName = $this.attr('href').slice(1);
  const chunk = chunks[chunkName];
  
  // Exit if the link doesn't go to a chunk that exists, or if the player 
  // isn't pressing on a link in the last chunk
  if (!chunk || !$(this).closest('.chunk:last-of-type, .intro').length) return;
  $this.closest('ul').hide();
  
  // Insert the chunk in a container
  const container = $('<div class="chunk">');
  chunk.clone(true).each(function() {
    container.prepend(this);
  });
  
  $game.append(container);
  
  // Add the chosen dialog option into the container as the first line
  const replacement = $("<p>", { html: $this.data('replacement') });
  replacement.prependTo(container);
  
  // Fade in + scroll to bottom
  $('body, html').animate({ scrollTop: container.offset().top }, 3600);
  container.find('p, li').fadeNext(1000, 400);
  
  container
    .prev().addClass('passed-1')
    .prev().addClass('passed-2')
    .prev().addClass('passed-3')
    .prev().addClass('passed-4');
});
