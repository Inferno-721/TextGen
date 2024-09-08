## Myracle Intern Assignment Project

# Multimodal Testing Instruction Generator

## Overview

This project is a **Multimodal LLM-based tool** that generates **step-by-step testing instructions** for digital product features based on screenshots. The tool leverages the **Google Gemini API** to analyze the screenshots and provide comprehensive, structured test cases that include descriptions, pre-conditions, testing steps, and expected results.

This project demonstrates the features of a mobile application (e.g., **Red Bus**), including **Source, Destination, and Date Selection**, **Bus Selection**, **Seat Selection**, **Pick-up and Drop-off Point Selection**, **Offers**, **Filters**, and **Bus Information**.

## Features

- **Multimodal LLM**: Uses screenshots and text input to generate test instructions.
- **Gemini API**: Integrated with Google’s Gemini LLM for generating precise and descriptive test cases.
- **React Frontend**: A responsive single-page application for uploading images and viewing test instructions.
- **Tailwind CSS**: Styled using Tailwind for dark/light mode and modern design.
- **Step-by-step Test Case Generation**: Generates detailed test cases with a clear structure.

## Project Structure

```
- client/               # React frontend![Screenshot_20240908_113123](https://github.com/user-attachments/assets/09ea37ab-8b64-43b3-a520-aa03a30d302c)

    ├── components/     # React components (UploadSection, OutputSection, Modal)
    └── App.jsx         # Main application component
- server/               # Node.js backend
    └── index.js        # Server code with Google Gemini API integration
- uploads/              # Stores uploaded screenshots
- README.md             # Project documentation
```

## Prompting Strategy

The tool follows a **multi-shot prompting** strategy to enhance the quality and accuracy of generated test cases. Each prompt is structured to request the following details:
- **Description**: What the test case is about.
- **Pre-conditions**: What needs to be set up before testing.
- **Testing Steps**: Clear, step-by-step instructions.
- **Expected Result**: The expected outcome if the feature works correctly.

Example of a prompt:

```
Please describe step-by-step testing instructions for the features shown in the following images:
- Description: What the test case is about.
- Pre-conditions: What needs to be set up before testing.
- Testing Steps: Clear, step-by-step instructions.
- Expected Result: The expected behavior if the feature works as intended.
```

### Multi-shot Prompting Example
In cases where multiple images are uploaded, each prompt is generated in sequence to enhance the model's understanding of the overall feature and ensure consistent and accurate results.

## Setup Instructions

### Prerequisites
- **Node.js** (v14 or higher)
- **Google Gemini API Key**: Get it from [Google AI Studio](https://ai.google.com/).


### Usage

1. Upload screenshots from the app you want to generate test instructions for.
2. Click **Generate Instructions** to receive detailed testing instructions.
3. View the output in a **modal window** which can be opened or closed as required.

![Screenshot_20240908_113123](https://github.com/user-attachments/assets/93bcca5c-c2dd-4cfe-a948-e0dd8c4e3f67)

![Screenshot_20240908_113137](https://github.com/user-attachments/assets/fb2c5a5f-64e4-47c0-8a28-9d9f99ee8dce)


![Screenshot_20240908_114804](https://github.com/user-attachments/assets/2e930eae-0313-4599-8e6e-4097a2d1c3fd)


