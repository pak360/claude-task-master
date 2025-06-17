# Task Master - pak360 Fork

[![CI](https://github.com/pak360/claude-task-master/actions/workflows/ci.yml/badge.svg)](https://github.com/pak360/claude-task-master/actions/workflows/ci.yml) [![npm version](https://badge.fury.io/js/pak360-task-master-ai.svg)](https://badge.fury.io/js/pak360-task-master-ai) [![Discord](https://dcbadge.limes.pink/api/server/https://discord.gg/taskmasterai?style=flat)](https://discord.gg/taskmasterai) [![License: MIT with Commons Clause](https://img.shields.io/badge/license-MIT%20with%20Commons%20Clause-blue.svg)](LICENSE)

Forked from [eyaltoledano/claude-task-master](https://github.com/eyaltoledano/claude-task-master)

## Original Authors
[@eyaltoledano](https://x.com/eyaltoledano), [@RalphEcom](https://x.com/RalphEcom) & [@jasonzhou1993](https://x.com/jasonzhou1993)

A task management system for AI-driven development with Claude, designed to work seamlessly with Cursor AI.

## Documentation

For more detailed information, check out the documentation in the `docs` directory:

- [Configuration Guide](docs/configuration.md) - Set up environment variables and customize Task Master
- [Tutorial](docs/tutorial.md) - Step-by-step guide to getting started with Task Master
- [Command Reference](docs/command-reference.md) - Complete list of all available commands
- [Task Structure](docs/task-structure.md) - Understanding the task format and features
- [Example Interactions](docs/examples.md) - Common Cursor AI interaction examples
- [Migration Guide](docs/migration-guide.md) - Guide to migrating to the new project structure

#### Quick Install for Cursor 1.0+ (One-Click)

📋 Click the copy button (top-right of code block) then paste into your browser:

```text
cursor://anysphere.cursor-deeplink/mcp/install?name=taskmaster-ai&config=eyJjb21tYW5kIjoibnB4IiwiYXJncyI6WyIteSIsIi0tcGFja2FnZT1wYWszNjAtdGFzay1tYXN0ZXItYWkiLCJ0YXNrLW1hc3Rlci1haSJdLCJlbnYiOnsiQU5USFJPUElDX0FQSV9LRVkiOiJZT1VSX0FOVEhST1BJQ19BUElfS0VZX0hFUkUiLCJQRVJQTEVYSVRZX0FQSV9LRVkiOiJZT1VSX1BFUlBMRVhJVFlfQVBJX0tFWV9IRVJFIiwiT1BFTkFJX0FQSV9LRVkiOiJZT1VSX09QRU5BSV9LRVlfSEVSRSIsIkdPT0dMRV9BUElfS0VZIjoiWU9VUl9HT09HTEVfS0VZX0hFUkUiLCJNSVNUUkFMX0FQSV9LRVkiOiJZT1VSX01JU1RSQUxfS0VZX0hFUkUiLCJPUEVOUk9VVEVSX0FQSV9LRVkiOiJZT1VSX09QRU5ST1VURVJfS0VZX0hFUkUiLCJYQUlfQVBJX0tFWSI6IllPVVJfWEFJX0tFWV9IRVJFIiwiQVpVUkVfT1BFTkFJX0FQSV9LRVkiOiJZT1VSX0FaVVJFX0tFWV9IRVJFIiwiT0xMQU1BX0FQSV9LRVkiOiJZT1VSX09MTEFNQV9BUElfS0VZX0hFUkUifX0K
```

> **Note:** After clicking the link, you'll still need to add your API keys to the configuration. The link installs the MCP server with placeholder keys that you'll need to replace with your actual API keys.

## Requirements

Taskmaster utilizes AI across several commands, and those require a separate API key. You can use a variety of models from different AI providers provided you add your API keys. For example, if you want to use Claude 3.7, you'll need an Anthropic API key.

You can define 3 types of models to be used: the main model, the research model, and the fallback model (in case either the main or research fail). Whatever model you use, its provider API key must be present in either mcp.json or .env.

At least one (1) of the following is required:

- Anthropic API key (Claude API)
- OpenAI API key
- Google Gemini API key
- Perplexity API key (for research model)
- xAI API Key (for research or main model)
- OpenRouter API Key (for research or main model)

Using the research model is optional but highly recommended. You will need at least ONE API key. Adding all API keys enables you to seamlessly switch between model providers at will.

## Quick Start

### Option 1: MCP (Recommended)

MCP (Model Control Protocol) lets you run Task Master directly from your editor.

#### 1. Add your MCP config at the following path depending on your editor

| Editor       | Scope   | Linux/macOS Path                      | Windows Path                                      | Key          |
| ------------ | ------- | ------------------------------------- | ------------------------------------------------- | ------------ |
| **Cursor**   | Global  | `~/.cursor/mcp.json`                  | `%USERPROFILE%\.cursor\mcp.json`                  | `mcpServers` |
|              | Project | `<project_folder>/.cursor/mcp.json`   | `<project_folder>\.cursor\mcp.json`               | `mcpServers` |
| **Windsurf** | Global  | `~/.codeium/windsurf/mcp_config.json` | `%USERPROFILE%\.codeium\windsurf\mcp_config.json` | `mcpServers` |
| **VS Code**  | Project | `<project_folder>/.vscode/mcp.json`   | `<project_folder>\.vscode\mcp.json`               | `servers`    |

##### Manual Configuration

###### Cursor & Windsurf (`mcpServers`)

```json
{
  "mcpServers": {
    "taskmaster-ai": {
      "command": "npx",
      "args": ["-y", "--package=pak360-task-master-ai", "task-master-ai"],
      "env": {
        "ANTHROPIC_API_KEY": "YOUR_ANTHROPIC_API_KEY_HERE",
        "PERPLEXITY_API_KEY": "YOUR_PERPLEXITY_API_KEY_HERE",
        "OPENAI_API_KEY": "YOUR_OPENAI_KEY_HERE",
        "GOOGLE_API_KEY": "YOUR_GOOGLE_KEY_HERE",
        "MISTRAL_API_KEY": "YOUR_MISTRAL_KEY_HERE",
        "OPENROUTER_API_KEY": "YOUR_OPENROUTER_KEY_HERE",
        "XAI_API_KEY": "YOUR_XAI_KEY_HERE",
        "AZURE_OPENAI_API_KEY": "YOUR_AZURE_KEY_HERE",
        "OLLAMA_API_KEY": "YOUR_OLLAMA_API_KEY_HERE"
      }
    }
  }
}
```

> 🔑 Replace `YOUR_…_KEY_HERE` with your real API keys. You can remove keys you don't use.

###### VS Code (`servers` + `type`)

```json
{
  "servers": {
    "taskmaster-ai": {
      "command": "npx",
      "args": ["-y", "--package=pak360-task-master-ai", "task-master-ai"],
      "env": {
        "ANTHROPIC_API_KEY": "YOUR_ANTHROPIC_API_KEY_HERE",
        "PERPLEXITY_API_KEY": "YOUR_PERPLEXITY_API_KEY_HERE",
        "OPENAI_API_KEY": "YOUR_OPENAI_KEY_HERE",
        "GOOGLE_API_KEY": "YOUR_GOOGLE_KEY_HERE",
        "MISTRAL_API_KEY": "YOUR_MISTRAL_KEY_HERE",
        "OPENROUTER_API_KEY": "YOUR_OPENROUTER_KEY_HERE",
        "XAI_API_KEY": "YOUR_XAI_KEY_HERE",
        "AZURE_OPENAI_API_KEY": "YOUR_AZURE_KEY_HERE"
      },
      "type": "stdio"
    }
  }
}
```

> 🔑 Replace `YOUR_…_KEY_HERE` with your real API keys. You can remove keys you don't use.

#### 2. (Cursor-only) Enable Taskmaster MCP

Open Cursor Settings (Ctrl+Shift+J) ➡ Click on MCP tab on the left ➡ Enable task-master-ai with the toggle

#### 3. (Optional) Configure the models you want to use

In your editor's AI chat pane, say:

```txt
Change the main, research and fallback models to <model_name>, <model_name> and <model_name> respectively.
```

[Table of available models](docs/models.md)

#### 4. Initialize Task Master

In your editor's AI chat pane, say:

```txt
Initialize taskmaster-ai in my project
```

#### 5. Make sure you have a PRD (Recommended)

For **new projects**: Create your PRD at `.taskmaster/docs/prd.txt`  
For **existing projects**: You can use `scripts/prd.txt` or migrate with `task-master migrate`

An example PRD template is available after initialization in `.taskmaster/templates/example_prd.txt`.

> [!NOTE]
> While a PRD is recommended for complex projects, you can always create individual tasks by asking "Can you help me implement [description of what you want to do]?" in chat.

**Always start with a detailed PRD.**

The more detailed your PRD, the better the generated tasks will be.

#### 6. Common Commands

Use your AI assistant to:

- Parse requirements: `Can you parse my PRD at scripts/prd.txt?`
- Plan next step: `What's the next task I should work on?`
- Implement a task: `Can you help me implement task 3?`
- View multiple tasks: `Can you show me tasks 1, 3, and 5?`
- Expand a task: `Can you help me expand task 4?`
- **Research fresh information**: `Research the latest best practices for implementing JWT authentication with Node.js`
- **Research with context**: `Research React Query v5 migration strategies for our current API implementation in src/api.js`

[More examples on how to use Task Master in chat](docs/examples.md)

### Option 2: Using Command Line

#### Installation

```bash
# Install globally
npm install -g pak360-task-master-ai

# OR install locally within your project
npm install pak360-task-master-ai
```

#### Initialize a new project

```bash
# If installed globally
task-master init

# If installed locally
npx task-master init
```

This will prompt you for project details and set up a new project with the necessary files and structure.

#### Common Commands

```bash
# Initialize a new project
task-master init

# Parse a PRD and generate tasks
task-master parse-prd your-prd.txt

# List all tasks
task-master list

# Show the next task to work on
task-master next

# Show specific task(s) - supports comma-separated IDs
task-master show 1,3,5

# Research fresh information with project context
task-master research "What are the latest best practices for JWT authentication?"

# Generate task files
task-master generate
```

## Troubleshooting

### If `task-master init` doesn't respond

Try running it with Node directly:

```bash
node node_modules/pak360-task-master-ai/scripts/init.js
```

Or clone the repository and run:

```bash
git clone https://github.com/pak360/claude-task-master.git
cd claude-task-master
node scripts/init.js
```

## Contributors

<a href="https://github.com/pak360/claude-task-master/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=pak360/claude-task-master" alt="Task Master project contributors" />
</a>

## Star History

[![Star History Chart](https://api.star-history.com/svg?repos=pak360/claude-task-master&type=Timeline)](https://www.star-history.com/#pak360/claude-task-master&Timeline)

## Licensing

Task Master is licensed under the MIT License with Commons Clause. This means you can:

✅ **Allowed**:

- Use Task Master for any purpose (personal, commercial, academic)
- Modify the code
- Distribute copies
- Create and sell products built using Task Master

❌ **Not Allowed**:

- Sell Task Master itself
- Offer Task Master as a hosted service
- Create competing products based on Task Master

See the [LICENSE](LICENSE) file for the complete license text and [licensing details](docs/licensing.md) for more information.
