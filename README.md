# UMich Transcript Extractor

A Tampermonkey script to extract and merge lecture transcripts from the University of Michigan's lecture recording website.

## Features

- Extracts WEBVTT captions from UMich lecture recordings.
- Merges captions into a single block of text.
- Adds a "Copy Transcript" button to the page for easy copying.

## Installation

1. Install the [Tampermonkey](https://www.tampermonkey.net/) extension for your browser.
2. Click [this link](https://github.com/zpatronus/umich_transcript_extractor/raw/main/umich_transcript_extractor.user.js) to install the script.

## Usage

1. Navigate to a UMich lecture recording page (e.g., `https://leccap.engin.umich.edu/leccap/player/r/rmuWJl`).
2. The script will automatically fetch and process the transcript.
3. A "Copy Transcript" button will appear at the bottom right of the page.
4. Click the button to copy the merged transcript to your clipboard.

## Updating

The script will automatically update if you installed it via the [installation link](https://github.com/zpatronus/umich_transcript_extractor/raw/main/umich_transcript_extractor.user.js). Alternatively, you can manually reinstall it.

## License

This project is licensed under the AGPLv3 License. See the [LICENSE](LICENSE) file for details.
