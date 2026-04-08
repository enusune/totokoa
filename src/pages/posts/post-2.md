---
layout: ../../layouts/MarkdownPostLayout.astro
title: "The "Siesta" Workflow"
pubDate: 2026-04-08
description: "How I Replaced Manual Coding with Codex Autonomy"
author: "Enusune"
image:
  url: "https://docs.astro.build/assets/rose.webp"
  alt: "The Astro logo on a dark background with a pink glow."
tags: ["Codex", "AGENTS", "SKILLS"]
keywords: ["Codex", "AI Programmer", "OpenAI", "ChatGPT", "Lark Bot"]
---

# The "Siesta" Workflow: How I Replaced Manual Coding with Codex Autonomy

For a long time, tools like Cursor and Claude Code were my go-to companions. However, due to recent logistical shifts, I found myself transitioning to a new setup that changed my entire development philosophy: **switching to Codex.**

After a period of deep integration, I’ve realized that Codex has reached a tipping point where it is no longer just an "assistant"—it is an **autonomous engine**.

## 1. Beyond Code Review: Blind Trust by Design
The most shocking realization in my new workflow is that **I almost never read the code it generates anymore.** In the past, using AI meant constant vigilance—checking for hallucinations or syntax errors. With Codex, if the environment is set up correctly, it understands the entire project structure and performs autonomous coding with surgical precision. I’ve transitioned from being a "Code Reviewer" to a "Product Orchestrator."

## 2. The Secret Sauce: Self-Evolving AGENTS.md & SKILLS
The secret to this level of autonomy lies in two files: `AGENTS.md` and the `SKILLS` directory. But here’s the kicker—**I don’t even write these myself.**

Whenever I start a new project—for instance, a **Lark (Lark) Bot application**—my first prompt to Codex is:
> *"Analyze the requirements for this Lark Bot and generate the necessary AGENTS.md rules and functional SKILLS to manage this project autonomously."*

Codex then builds its own "operating manual." It defines its boundaries, understands the API limitations, and creates modular skills for specific tasks (like token refreshing or message routing).

## 3. The "Go Have a Tea" Experience
Once the infrastructure (the Agent and the Skills) is in place, my job is essentially done. 

Now, when I have a new feature request or a complex logic change, I simply describe the requirement in the chat. Then, **I can literally go have a cup of tea.** While I’m away, Codex:
* **Architects** the solution within the existing framework.
* **Executes** the code changes across multiple files.
* **Writes** comprehensive test cases.
* **Self-Debugs**: If a test fails, it investigates the logs, finds the bug, and fixes it before I’m even back from my break.

## 4. Conclusion
The transition from Claude Code to Codex wasn't just a change of IDE; it was a discovery of how powerful an AI can be when you give it the right "contextual brain" through `AGENTS.md`. If you are still spending your time auditing every line of AI-generated code, you are missing out on the true potential of the current tech.

---

## Appendix: A Real-World AGENTS.md Template (NestJS + Lark Bot)

To give you a better idea of how I constrain Codex to maintain a clean architecture, here is the English version of the `AGENTS.md` I use for my Lark Bot projects.

```markdown
### AGENTS.md

#### Project Positioning
This is a NestJS-based server-side project. The primary objective is to integrate with a Lark (Lark) Bot using the WebSocket protocol for event reception and processing.

#### Directory Structure (Current & Future)
- `src/config/`: `dotenv` loading and config validation.
- `src/modules/chat/`: Core chat logic, LLM adaptation layers, and MCP bridge.
- `src/modules/lark/`: 
  - `ws/`: WebSocket connection, heartbeats, and lifecycle.
  - `handlers/`: Event-specific logic (Message, Commands).
  - `services/`: Business orchestration.
  - `dto/`: Strict type definitions for Lark events.
- `test/`: Module-level integration tests.

#### Brief Constraints

**General Constraints**
- **Stack**: Use TypeScript and adhere to standard NestJS engineering patterns.
- **SRP**: Single Responsibility Principle; keep `main.ts` lean.
- **Modularity**: Never scatter Lark-related code in `app.*` files.
- **Vendor Abstraction**: OpenAI-compatible vendor differences must be encapsulated; do not leak provider details to business services.

**Lark Bot Constraints**
- **Protocol**: Exclusively use WebSocket.
- **Layering**: Decouple connection management from business logic. Do not write complex logic inside connection callbacks.
- **Type Safety**: Establish clear DTOs for all Lark payloads; **avoid the use of `any`**.
- **Resilience**: Reconnection, heartbeats, and idempotency must be implemented as infrastructure once, not repeated.

**Code Organization & Testing**
- **Data Flow**: Adhere to the `llm -> mcp/service -> repository` hierarchy. Handlers cannot interact with the database directly.
- **Test Coverage**: Provide unit tests for event dispatching and message parsing. For WebSocket flows, implement Minimum Viable Tests (MVT).
```