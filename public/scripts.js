const sessionId = new Date().getTime() + Math.random().toString();
const accessToken = "4eb576bd743c41faa505d4f3f2028e97";
const baseUrl = "https://api.api.ai/v1/";

const activeDetect = function(activeFn, inactiveFn) {
  let timeoutID;
  const self = this;
  const setup = () => {
    document.addEventListener("mousemove", resetTimer, false);
    document.addEventListener("mousedown", resetTimer, false);
    document.addEventListener("keypress", resetTimer, false);
    document.addEventListener("DOMMouseScroll", resetTimer, false);
    document.addEventListener("mousewheel", resetTimer, false);
    document.addEventListener("touchmove", resetTimer, false);
    document.addEventListener("MSPointerMove", resetTimer, false);
    startTimer();
  };
  const startTimer = () => {
    timeoutID = window.setTimeout(self.goInactive, 5000);
  };
  const resetTimer = e => {
    window.clearTimeout(timeoutID);
    self.goActive();
  };
  self.goInactive = () => {
    inactiveFn();
  };
  self.goActive = () => {
    activeFn();
    startTimer();
  };
  setup();
};

const Rec = function(responseEl, previewEl) {
  const self = this;
  self.recording = false;
  self.paused = false;
  const recognition = new webkitSpeechRecognition();
  recognition.continuous = true;
  recognition.interimResults = true;
  recognition.onstart = () => {
    console.log('Recognition started. ');
    self.recording = true;
  };
  recognition.onresult = event => {
    let interimTranscript = '';
    for(let i = event.resultIndex; i < event.results.length; ++i) {
      if(event.results[i].isFinal) {
        self.cb(event.results[i][0].transcript);
      } else {
        interimTranscript += event.results[i][0].transcript;
      }
    }
    console.log(interimTranscript);
    previewEl.val(interimTranscript);
    // previewEl.val(interimTranscript.trim().toLowerCase().startsWith('future ') ? interimTranscript.trim().slice(7) : Array(Math.floor(Math.random() * 3) + 2).join('.'));
  };
  recognition.onerror = event => {
  };
  recognition.onend = event => {
    console.log('Recognition ended. ');
    if(self.recording) {
      console.log('Recognition restarting. ');
      self.start(self.cb);
    }
  };
  
  self.start = callback => {
    self.cb = callback;
    recognition.start();
  };
  self.end = callback => {
    self.recording = false;
    recognition.stop();
  };
};

function processResponse(data) {
  if(data.result.actionIncomplete) {
    return;
  }
  if(data.result.action === 'addObjective') {
    okr.addObjective(data.result.parameters.Objective);
  }
  if(data.result.action === 'addobjective.addkeyresults') {
    okr.addKeyResult(data.result.contexts[0].parameters.Objective, data.result.parameters.keyResult);
  }
  if(data.result.action === 'listObjective') {
    return `There are ${vm.objectives.length} objective${vm.objectives.length > 1 ? 's' : ''}. ${vm.objectives.map(x => x.title).join('. ')}`;
  }
  return data.result.fulfillment.speech;
};

let tmp = 0;

function send(text) {
  $('#response')[0].innerHTML += `<div class="speech-bubble-r">${text}</div>`;
  $('#response').scrollTop($('#response')[0].scrollHeight);

  
  $('.loader').addClass('loader-loading');
  setTimeout(() => {
    // speechSynthesis.speak(new SpeechSynthesisUtterance('Internal Server Error'));
    $('.loader').removeClass('loader-loading');
    const u1 = 'I dont understand what you mean.';
    const u2 = 'Okey, new objective added: working out. What is the objective measured by? Or what are the key results?';
    const speaker = new SpeechSynthesisUtterance();
    speaker.onend = () => {
      rec.start(rec.cb);
      $("#rec>i").text('record_voice_over');
    };
    if(tmp === 0) {
      tmp += 1;
      speaker.text = u1;
      $('#response')[0].innerHTML += `<div class="speech-bubble-l">${u1}</div>`;
    } else {
      speaker.text = u2; 
      $('#response')[0].innerHTML += `<div class="speech-bubble-l">${u2}</div>`;
    }
    speechSynthesis.speak(speaker);
    $('#response').scrollTop($('#response')[0].scrollHeight);
  }, 750);
  return;

  
  $.ajax({
    type: "POST",
    url: baseUrl + "query?v=20150910",
    contentType: "application/json; charset=utf-8",
    dataType: "json",
    headers: {
      "Authorization": "Bearer " + accessToken
    },
    data: JSON.stringify({ query: text, lang: "en", sessionId: sessionId }),
    success: data => {
      $('.loader').removeClass('loader-loading');
      const response = processResponse(data);
      $('#response')[0].innerHTML += `<div class="speech-bubble-l">${response}</div>`;
      console.log(data);
        // (JSON.stringify(data, undefined, 2));
      $('#response').scrollTop($('#response')[0].scrollHeight);
      const speaker = new SpeechSynthesisUtterance();
      speaker.text = response; 
      speaker.voice = speechSynthesis.getVoices().filter(function(voice) {
        return voice.name == "Google UK English Female"
      })[0];
      speaker.onstart = () => {
        console.log('Speak started');
      };
      speaker.onend = () => {
        console.log('Speak ended');
        if(rec.paused) {
          rec.start(rec.cb);
          $("#rec>i").text('record_voice_over');
        }
      };
      speechSynthesis.speak(speaker);
    },
    error: err => {
      $('#response')[0].innerHTML += 'Internal Server Error';
      speechSynthesis.speak(new SpeechSynthesisUtterance('Internal Server Error'));
    }
  });
  $('.loader').addClass('loader-loading');
};

const rec = new Rec($('#response'), $('#input'));

$(document).ready(() => {
  $('#rec').removeClass('scale-out').addClass('scale-in');
  new activeDetect(() => {
    $('#rec').removeClass('pulse');
  }, function() {
    if(!rec.recording) {
      $('#rec').addClass('pulse');
    }
  });
  $("#input").keypress(event => {
    if (event.which == 13) {
      event.preventDefault();
      if(rec.recording) {
        rec.paused = true;
      }
      rec.end(() => console.log('Recognization inactive. '));
      $("#rec>i").text('keyboard_voice');
      send($("#input").val());
      $('#input').val('');
    }
  });
  $("#rec").click(event => {
    if(rec.recording) {
      rec.end(() => console.log('Recognization inactive. '));
      $("#rec>i").text('keyboard_voice');
    } else {
      rec.end(() => console.log('Recognization active. '));
      rec.start(x => {
        if(true || /future/.test(x)) {
          send(x);
          rec.end();
          rec.paused = true;
        }
      });
      $("#rec>i").text('record_voice_over');
    }
  });
});
