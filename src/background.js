// Log to confirm the background script is loaded
console.log('Background script loaded!');

chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: 'eli5',
    title: "Explain Like I'm 5",
    contexts: ["selection"]
  });
});

chrome.contextMenus.onClicked.addListener(async (info, tab) => {
  if (info.menuItemId === 'eli5' && info.selectionText) {
    try {
      chrome.tabs.sendMessage(tab.id, { action: 'showLoading' });

      const simplifiedText = await simplifyText(info.selectionText);

      chrome.tabs.sendMessage(tab.id, { action: 'showExplanation', text: simplifiedText });
    } catch (error) {
      chrome.tabs.sendMessage(tab.id, { action: 'showError', error: error.message });
    }
  }
});

async function simplifyText(text) {
  const config = await fetch(chrome.runtime.getURL("config.json")).then(res => res.json());
  const apiKey = config.OPENAI_API_KEY;

  const prompt = `Explain the following text in the simplest possible way. 
  Break it down step by step, avoiding complex words and jargon. Use simple analogies, everyday examples, and comparisons. 
  Make sure the explanation is engaging, clear, and easy to follow.
  Text: "${text}" `;

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      model: 'gpt-4',
      messages: [{ role: 'user', content: prompt }],
      max_tokens: 500
    })
  });

  if (!response.ok) {
    throw new Error(`API request failed with status ${response.status}`);
  }

  const data = await response.json();
  return data.choices[0].message.content;
}
