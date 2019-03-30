const isLetter = c => c.toLowerCase() != c.toUpperCase();

const dom = $('#g');
const say = (l, w, d) => {
  const [x, y] = l;
  let wr = w.split('');
  let i = 1;
  while(i < wr.length) {
    if(isLetter(wr[i - 1]) && isLetter(wr[i])) {
      wr[i - 1] += wr.splice(i, 1);
    } else {
      i += 1;
    }
  }
  let wc = [wr.shift()];
  const el = $(`<div></div>`)
        .addClass('l2 talk')
        .css({
          top: `${y}px`,
          left: `${x}px`,
        });
  dom.append(el);
  const it = () => {
    wc.push(wr.shift());
    el.text(wc.join(''));
    if(wr.length > 0) {
      setTimeout(it, wr[0].length * wr[0].length * 10 + 100);
    } else {
      el.addClass('talkend');
      setTimeout((function(self) {
        return function() {
          el.animate({
            'max-height': 0,
            'max-width': 0,
            'opacity': 0,
            'left': '260px',
          }, function() {
            setTimeout((function(self) {
              return function() {
                if(d.length > 0) {
                  $(self).html(d).animate({
                    'max-height': '200px',
                    'max-width': '360px',
                    'opacity': 1,
                    'font-size': '50%',
                    'left': '360px',
                  }, function() {
                    setTimeout((function(self) {
                      return function() {
                        $(self).animate({
                          'max-height': 0,
                          'max-width': 0,
                          'opacity': 0,
                          'left': '400px',
                        }, function() {
                          $(self).remove();
                        });
                      };
                    })(self), 1000);
                  });
                } else {
                  $(self).remove();
                }
              };
            })(this), 500);
          });
        };
      })(el), 500);
    }
  };
  it();
  el.animate({
    'top': '100px',
    'left': '160px',
  });
};

const ani1 = () => {
  const p1 = [80, 50];
  const p2 = [70, 100];
  const p3 = [80, 150];
  const pf = [260, 100];
  setTimeout(() => say(p1, 'Hi all! ', ''), 0);
  setTimeout(() => say(p2, 'Hello boss! ', ''), 1500);
  setTimeout(() => say(p3, 'Hello! ', ''), 3000);
  setTimeout(() => say(p1, 'Peter, our new objective is to reach 1 million dollars sales in 3 month. ', `<pre>{
  'action': 'ADD'
  'title': 'Reach 1 million dollars sales in 3 month. ',
  'type': 'OBJECTIVE',
  'assignedTo': 'Peter',
  'timestamp': '1518918657',
  'parent': 'none'
}</pre>`), 4500);
  setTimeout(() => say(p2, 'Got it boss! ', ''), 12000);
  setTimeout(() => say(pf, 'New Objective assigned to Peter: Reach 1 million dollars sales in 3 month. ', ''), 13500);
  setTimeout(() => say(p1, 'Alex, what is current revenue for new product? ', ''), 21500);
  setTimeout(() => say(p2, 'We have reached 80% of our target! ', `<pre>{
  'action': 'UPDATE'
  'title': 'New product revenue',
  'type': 'KEY RESULT',
  'progress': '80',
  'assignedTo': 'Alex',
  'timestamp': '1518957165',
  'parent': 'none'
}</pre>`), 26000);
  setTimeout(() => say(pf, 'Key result updated: New product revenue: 80%.  ', ''), 31000);
};

// ani1();
