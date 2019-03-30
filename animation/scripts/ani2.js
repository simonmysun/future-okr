const chat = ChatUI({
  title: 'Vivek',
  avatar: './avatars/avatar-3.png',
  subtitle: 'boss'
}).render('#chat');
const noti = (c) => {
  const nc = $(`<div>${c}</div>`).css({
    'position': 'absolute',
    'width': 'auto',
    'color': '#fff',
    'white-space': 'nowrap',
    'left': '0',
  });
  const n = $('<div></div>').css({
    'position': 'absolute',
    'overflow': 'hidden',
    'width': '100%',
    'height': '10px',
    'z-index': '9999',
    'background': '#1976d2',
    'opacity': 0.7,
  }).append(nc);
  $('.chat-ui-dialog-container').prepend(n);
  setTimeout((function(el, elp) {
    return function() {
      el.animate({
        'left': Math.min(elp.width() - el.width(), 0) + 'px',
      }, 3000, 'linear', function() {
        elp.fadeOut(function() {
          $(this).remove();
        });
      });
    }
  })(nc, n), 1000);
};

chat.trigger('open-chat');;

const o = [
  [function() {chat.trigger('add-phrase', {side: 'user', message: 'We have reached 90% of our target in sales last week. '});}, 1000],
  [function() {chat.trigger('is-typing');}, 2000],
  [function() {chat.trigger('add-phrase', {side: 'chat', message: 'Awesome. But I made a mistake. '})}, 1000],
  [function() {chat.trigger('is-typing');}, 2500],
  [function() {chat.trigger('add-phrase', {side: 'chat', message: 'I want to change the objective to 20 million dollars. '})}, 500],
  [function() {noti('Objective Updated: Reach 1 million dollars sales in 3 months');}, 1000],
  [function() {chat.trigger('add-phrase', {side: 'user', message: 'Ok.. Got it. '})}, 2000],


  [function() {chat.trigger('add-phrase', {side: 'user', message: 'Good news! we have reached 100% of our target in sales! '});}, 1000],
  [function() {chat.trigger('is-typing');}, 1000],
  [function() {chat.trigger('add-phrase', {side: 'chat', message: 'Good. '})}, 500],
  [function() {noti('Progress Updated: 100% ');}, 500],
  [function() {chat.trigger('is-typing');}, 2000],
  [function() {chat.trigger('add-phrase', {side: 'chat', message: 'Keep up the good work'})}, 2000],
  [function() {chat.trigger('add-phrase', {side: 'user', message: 'Yes sure. '})}, 2000],
];


const ani2 = () => {
  const f = o.shift();
  f[0]();
  setTimeout(() => ani2(), f[1]);
  o.push(f);
};

for(let i in o) {
  o[i][0]();
}
// ani2()
