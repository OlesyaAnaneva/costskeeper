const doc = document;
const btn = doc.getElementsByTagName('button')[0];
const content = doc.getElementsByTagName('h3')[0];

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

recognition.onstart = function () {
  console.log('voice is activated');
};

recognition.onresult = function (event) {
  const current = event.resultIndex;
  const { transcript } = event.results[current][0];
  content.textContent = transcript;
  readOutLoud(transcript);

  const response = fetch(`http://markup.dusi.mobi/api/text?lang=ru&text=${transcript}`, {
    method: 'GET',
  });
  response.then((res) => {
    return res.json()
  }).then((data) => {
    console.log(data.tokens);
    const tbody = doc.getElementsByTagName('tbody')[0];
    const trItems = tbody.getElementsByClassName('items')[0];
    const itemName = doc.createElement('td');
    const itemPrice = doc.createElement('td');
    trItems.appendChild(itemName);
    trItems.appendChild(itemPrice);
    itemName.innerHTML = data.tokens[0].substring;
    itemPrice.innerHTML = data.tokens[1].substring;
  })
    .catch((error) => console.log('ERROR', error));
};

btn.addEventListener('click', () => {
  recognition.start();
});

function readOutLoud(message) {
  const speech = new SpeechSynthesisUtterance();

  speech.text = message;
  speech.volume = 1;
  speech.rate = 1;
  speech.pitch = 1;

  window.speechSynthesis.speak(speech);
}
