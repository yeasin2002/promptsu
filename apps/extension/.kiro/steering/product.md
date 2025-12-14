# Product Overview

**Promptsu** - A browser extension for AI prompt enhancement built with WXT and React.

## Key Features

- **AI Prompt Enhancement**: Enhances user prompts using Google AI before sending to chatbots
- **Prompt Collection**: Curated collection of ready-to-use prompts to copy and paste
- **Multi-Platform Support**: Works across ChatGPT, Claude, and other AI platforms
- **Cross-Browser Compatibility**: Chrome and Firefox support via WXT framework

## Extension Architecture

- **Background Script**: Handles extension lifecycle and background tasks
- **Content Scripts**: Platform detection and UI injection into AI chat interfaces
- **Popup UI**: Main extension interface with prompt collection and settings
- **Platform Adapters**: Configurable selectors for different AI platforms

## Core Functionality

- **Platform Detection**: Automatically detects supported AI platforms (ChatGPT, Claude, etc.)
- **DOM Observation**: Monitors page changes for dynamic UI injection
- **React Components**: Modern UI with TypeScript and TailwindCSS
- **API Integration**: Connects to Promptsu backend for AI-powered enhancement
