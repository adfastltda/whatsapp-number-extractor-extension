# WhatsApp Number Extractor Chrome Extension

This Chrome extension allows you to extract phone numbers from the WhatsApp Web interface and download them as a `.txt` file. The extension scans through the contact list visible on WhatsApp Web and highlights collected phone numbers for easy identification.

## Features

- **Number Extraction:** Automatically scans and collects phone numbers from your WhatsApp Web contact list.
- **Visual Highlight:** Highlights the contacts that have been successfully scanned.
- **Download as Text File:** Allows you to download the extracted numbers as a `.txt` file.
- **Simple UI:** Provides a clean and easy-to-use interface for scanning and saving contacts.

## How It Works

1. The extension injects a script into the active WhatsApp Web tab.
2. The script scans the contact list visible on WhatsApp Web, collecting valid phone numbers.
3. The numbers are highlighted in the contact list with a green background.
4. You can then save the collected numbers by clicking the "Save" button, which will download a `.txt` file with the numbers.

## Installation

1. Clone or download the repository.
2. Open Chrome and navigate to `chrome://extensions/`.
3. Enable **Developer Mode** (toggle in the top right corner).
4. Click on the "Load unpacked" button and select the directory where you saved the extension files.
5. The extension should now appear in your Chrome extensions list.

## Usage

1. Open WhatsApp Web in Chrome.
2. Click on the extension icon to open the popup.
3. Click the "Scan" button to start scanning for numbers in your contact list.
4. Once the scan is complete, click the "Save" button to download the phone numbers as a `.txt` file.

## Files

- `popup.html`: The popup interface of the extension.
- `popup.js`: Contains the logic to inject the content script, trigger scanning, and handle downloading.
- `content.js`: The script injected into WhatsApp Web to scan the DOM for phone numbers.
- `manifest.json`: Extension configuration and metadata.

## Permissions

This extension requires the following permissions:

- **`activeTab`**: To interact with the currently active WhatsApp Web tab.
- **`scripting`**: To inject scripts into the web page and extract phone numbers.

## Future Improvements

- Support for filtering or validating numbers before saving.
- Improve scanning accuracy for contacts with non-standard number formats.
- Option to export the numbers in formats other than `.txt`, like `.csv`.

## Contributing

Feel free to submit a pull request if you'd like to contribute or suggest enhancements. Please open an issue before submitting large changes for discussion.

## License

This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for details.
