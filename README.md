# MCP Project

## Overview
This project is a Model Context Protocol (MCP) implementation with a client and server. The client interacts with the server using the MCP protocol, leveraging Google Gemini AI and custom tools. The server provides tool endpoints and manages communication with the client, including the ability to create posts on Twitter via the MCP protocol.

## Directory Structure
```
MCP/
  client/      # MCP client implementation (Node.js)
  server/      # MCP server implementation (Node.js), includes Twitter posting functionality
```

## Setup Instructions

### Prerequisites
- Node.js (v18 or higher recommended)
- npm

### 1. Clone the repository
```bash
git clone <repo-url>
cd MCP
```

### 2. Install dependencies
Install dependencies for both client and server:
```bash
cd client
npm install
cd ../server
npm install
```

### 3. Environment Variables
Create a `.env` file in the `client/` directory with your Google Gemini API key:
```
GEMINI_API_KEY=your_google_gemini_api_key
```

### 4. Run the Server
```bash
cd server
node index.js
```

### 5. Run the Client
In a new terminal:
```bash
cd client
node index.js
```

## Usage
- The client will connect to the MCP server and allow you to interact with AI and tools via the command line.
- The server exposes a tool for creating posts on Twitter. You can use the client to send a request to the server to create a Twitter post.
- Follow the prompts in the terminal to ask questions, invoke tools, or create Twitter posts.

## Technologies Used
- Node.js
- Google Gemini AI (via @google/genai)
- Model Context Protocol SDK (@modelcontextprotocol/sdk)
- dotenv

## License
Specify your license here. # x-mcp-server
# x-mcp-server
# x-mcp-server
