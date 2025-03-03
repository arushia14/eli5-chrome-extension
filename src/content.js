console.log('Content script loaded!');

// Function to show the loading spinner
function showLoadingSpinner() {
  const spinner = document.createElement('div');
  spinner.id = 'loading-spinner';
  spinner.style.position = 'fixed';
  spinner.style.top = '50%';
  spinner.style.left = '50%';
  spinner.style.transform = 'translate(-50%, -50%)';
  spinner.style.zIndex = 1000;
  spinner.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
  spinner.style.color = '#fff';
  spinner.style.padding = '20px';
  spinner.style.borderRadius = '10px';
  spinner.innerText = 'Loading...';
  document.body.appendChild(spinner);
}

// Function to hide the loading spinner
function hideLoadingSpinner() {
  const spinner = document.getElementById('loading-spinner');
  if (spinner) {
    spinner.remove();
  }
}

// Function to show the explanation in a scrollable modal
function showExplanation(text) {
  const modal = document.createElement('div');
  modal.id = 'explanation-modal';
  modal.style.position = 'fixed';
  modal.style.top = '50%';
  modal.style.left = '50%';
  modal.style.transform = 'translate(-50%, -50%)';
  modal.style.zIndex = 1000;
  modal.style.backgroundColor = '#fff';
  modal.style.padding = '20px';
  modal.style.borderRadius = '10px';
  modal.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.2)';
  modal.style.maxWidth = '90%';
  modal.style.maxHeight = '80vh';
  modal.style.overflowY = 'auto';

  const modalContent = document.createElement('div');
  modalContent.innerText = text;
  modal.appendChild(modalContent);

  const closeButton = document.createElement('button');
  closeButton.innerText = 'Close';
  closeButton.style.marginTop = '10px';
  closeButton.style.padding = '10px';
  closeButton.style.backgroundColor = '#007bff';
  closeButton.style.color = '#fff';
  closeButton.style.border = 'none';
  closeButton.style.borderRadius = '5px';
  closeButton.style.cursor = 'pointer';
  closeButton.addEventListener('click', () => {
    modal.remove();
  });
  modal.appendChild(closeButton);

  document.body.appendChild(modal);
}

// Function to show an error message
function showError(error) {
  const modal = document.createElement('div');
  modal.id = 'error-modal';
  modal.style.position = 'fixed';
  modal.style.top = '50%';
  modal.style.left = '50%';
  modal.style.transform = 'translate(-50%, -50%)';
  modal.style.zIndex = 1000;
  modal.style.backgroundColor = '#fff';
  modal.style.padding = '20px';
  modal.style.borderRadius = '10px';
  modal.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.2)';
  modal.style.maxWidth = '90%';
  modal.style.maxHeight = '80vh';
  modal.style.overflowY = 'auto';

  const modalContent = document.createElement('div');
  modalContent.innerText = 'Error: ' + error;
  modal.appendChild(modalContent);

  const closeButton = document.createElement('button');
  closeButton.innerText = 'Close';
  closeButton.style.marginTop = '10px';
  closeButton.style.padding = '10px';
  closeButton.style.backgroundColor = '#ff0000';
  closeButton.style.color = '#fff';
  closeButton.style.border = 'none';
  closeButton.style.borderRadius = '5px';
  closeButton.style.cursor = 'pointer';
  closeButton.addEventListener('click', () => {
    modal.remove();
  });
  modal.appendChild(closeButton);

  document.body.appendChild(modal);
}

// Listen for messages from the background script
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log('Message received:', message);

  if (message.action === 'showLoading') {
    showLoadingSpinner(); // Show the loading spinner
  } else if (message.action === 'showExplanation') {
    hideLoadingSpinner(); // Hide the loading spinner
    showExplanation(message.text); // Display the explanation
  } else if (message.action === 'showError') {
    hideLoadingSpinner(); // Hide the loading spinner
    showError(message.error); // Display the error
  }
});