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
    let itemNameResult = data.tokens[0].substring;
    let itemPriceResult = data.tokens[1].substring;
    const postResponse = fetch('/items', {
      method: 'POST',
      body: JSON.stringify({
        itemNameResult, itemPriceResult
      }),
      headers: {
        "Content-type": 'application/json'
      },
    });
    console.log(data.tokens);
    const tbody = doc.getElementsByTagName('tbody')[0];
    const trItems = doc.createElement('tr');
    tbody.appendChild(trItems);
    const itemName = doc.createElement('td');
    const itemPrice = doc.createElement('td');
    trItems.appendChild(itemName);
    trItems.appendChild(itemPrice);
    itemName.innerHTML = itemNameResult;
    itemPrice.innerHTML = itemPriceResult;
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
