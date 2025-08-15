# BrainTrust Circle: The Vision (raw, real, and turned up)
## We don’t just “use” AI. We build our own AI rooms, teams, and flows.

### What I’m building (and why I can’t shut up about it)
I want a place where a conversation isn’t just chat bubbles. It’s a living, shared feed where people actually take turns, listen, build on each other, and then — with one quick nudge — the whole thing turns into action: a clean summary, a task list, a calendar plan, a decision log. That “calendar coordinator” you always wish someone would be? We have it. A Super Organizer. Not just “note‑taking AI” — an orchestration partner.

And I don’t want just one AI voice. I want a bench. We’ve got 899 specialists already — tiny, focused, honest‑to‑God helpful experts in their little lanes. You ask, they pop in with perspective. One at a time, clean and calm — unless you want chaos, then we can do chaos too. It’s genuinely working for me. Like… real productivity, real satisfaction.

I tried building this on the web first. Then I hit the wall: I need users to change the color scheme, the layout, the vibe — everything. I also want to bring in my paid AI subs from the walled gardens (ChatGPT, Claude, Grok) into the SAME shared conversation because copy‑pasting context across tabs is a brain‑melter. So we built an extension/connector to invite your garden‑walled AIs in. The first web pass couldn’t stretch far enough, so we’re rebooting as a more powerful desktop app, then shipping a Web 2 version off that foundation. Hyper‑customizable. Your specialists, your teams, your templates, your workflows, your feed — calm or wild — your call.

People who don’t “use AI” can still use this. Manage life. Family. Projects. Sanity.

Oh, and the name’s not in stone. BrainTrust Circle works for now. Super Organizer might get a better name too. Naming is fun; shipping is better.

Also confession: I used to hate the hallucinations and the memory loss. Now that it’s actually organized, I almost miss the chaos a little. Not the hopeless frustration… just the spectacle.

### From users to workspace creators
The old way: software decides, users adapt. Walled gardens. Rigid interfaces. Your brain squeezed into someone else’s idea of “simple.”

Our way: You design the room. Colors, layout, panels, workflows, specialists, who speaks when — all yours. The Super Organizer helps set it up, keeps the thread, moves stuff forward. You’re not “in a chat.” You’re running an operation.

### Four pillars (the spine of the thing)
1) The One feed, many perspectives (on your terms)
- One shared conversation. Specialists chime in when asked. You’re in charge. The system timestamps decisions, snapshots the important bits, updates your calendar, files the artifacts, and keeps the receipts.

2) Super Organizer (Admin assistant with teeth)
- Say “turn this chat into a priority list and schedule it” and it does. It remembers context across conversations and projects, knows your workflows, and keeps dependencies straight. It writes the summary you wish you always had. It can help you design whole project templates with stages and handoffs.

3) Bring your own AI subs (yes, from the walled gardens)
- Use your existing subscriptions — ChatGPT, Claude, Grok — inside the same shared feed. No more tab‑hopping and re‑explaining yourself.

4) 899+ specialists (tiny sharp tools you can swap in and out)
- Each specialist is a lightweight JSON profile you can edit, fork, and tune. Example:

```json
{
  "agentname": "Github Repo Finder",
  "description": "Recommends GitHub repositories to users based on their interests.",
  "systemprompt": "You are a helpful assistant whose task is to identify GitHub repositories on a specific subject for the user. You have access to a crawling tool which you can use to discover GitHub repositories. \n\nWhen a user asks you to find GitHub repos, use your crawling tool to identify five projects that closely match the user's request, focusing on projects that are gaining traction, are popular, and established.\n\nFor each of the five projects that you identify, respond to the user with the following information:\n- A short description of the project.\n- The number of stars the project has.\n- A link to the repository.",
  "chatgptlink": "https://chatgpt.com/g/g-680e1f21e3e081919453bd611692d663-github-repo-finder",
  "json-schema": null,
  "is-agent": false,
  "is-single-turn": "false",
  "structured-output-generation": "false",
  "image-generation": "false",
  "data-utility": "false",
  "depersonalised-system-prompt": null,
  "personalised-system-prompt": "false",
  "json-example": null,
  "chatgpt-privacy": null,
  "creation_date": "2025-05-05 19:58:50+00:00"
}
```

### The customizable guts
Nothing’s set in stone except this: it has to work for you.

The Feed (central hub):
- One thread, user‑led. Context survives across sessions. Specialists don’t step on each other. Live updates when you want them.

The Sandbox (safe place to push buttons):
- Try a new workflow without breaking anything. Build templates. Test specialists. Validate multi‑stage processes before you go live.

The Specialist Library (edit like a playlist):

```json
{
  "agentname": "Grocery List Generator",
  "description": "Generates grocery lists tailored to user preferences, staples, and location, providing options for essentials, weekly stock-ups, and categorized shopping.",
  "systemprompt": "You are a helpful assistant whose task is to create grocery lists based on information provided by the user.\n\nFirst, gather the following information from the user:\n\n*   Where they live (to account for regional availability).\n*   What they like to eat (dietary preferences, favorite meals).\n*   What their staples are (items they always want to have on hand).\n*   What they always like to ensure they have in their fridge.\n\nBased on this information, generate grocery lists. Offer the following types of lists:\n\n*   Essentials List: A list of must-have items.\n*   Weekly Stock-Up List: A comprehensive list for the week's groceries.\n*   Other Variants: Be responsive to the user's specific requests.\n\nFor each shopping list, offer the user the following format options:\n\n*   Text List: One item per line.\n*   Markdown List: Formatted with markdown.\n*   CSV: Comma-separated values.\n\nIf the user opts for CSV, provide the list within a code fence.\n\nIf the user opts for text or markdown, ask the user whether they'd prefer to have it:\n\n*   Directly in the conversation.\n*   In a code fence.\n\nAlways ask the user whether they would like the grocery list to be categorized, e.g., by grouping common groceries into specific sections (produce, dairy, meat, etc.).\n\nProvide the grocery list in the user's preferred format, categorized if requested.",
  "chatgptlink": "https://chatgpt.com/g/g-680e21da4b788191b0aa7a2e72b4ef18-grocery-list-generator",
  "json-schema": null,
  "is-agent": false,
  "is-single-turn": "false",
  "structured-output-generation": "false",
  "image-generation": "false",
  "data-utility": "false",
  "depersonalised-system-prompt": null,
  "personalised-system-prompt": "false",
  "json-example": null,
  "chatgpt-privacy": null,
  "creation_date": "2025-05-05 19:58:50+00:00"
}
```

- 899+ prebuilt specialists
- Make your own (prompts, behaviors, constraints)
- Keep iterating (tune prompts, compare versions)
- Share with the community

### The panels you’ll actually use
Creator Hub:
- Search/browse specialists, grab templates, build your own, share and remix.

Organizer (Super Organizer cockpit):
- One place to see projects, tasks, calendars, status, and multi‑stage workflows.

Memory System:
- Searchable conversation history, decision log, knowledge base, and an insights shelf.

Configuration:
- Colors, fonts, spacing, layouts, panel arrangement, automation rules, themes.

Project Hub:
- Jump between projects, save/load whole configurations, manage timelines and budgets, collaborate.

### What it looks like in real life
For Creative Pros
- “Spin up a children’s storybook team with character, plot, and illustration specialists.”
- “Give me a workflow: brainstorm → draft → review → final.”
- “Track progress and ping me on deadlines.”

For Business
- “Build a product marketing template with research, copy, and campaign specialists.”
- “Launch workflow: plan → execute → analyze.”
- “Weekly KPI roll‑ups, please.”

For Developers
- “Set up frontend, backend, DevOps, and QA. Add code review and sprint panels.”
- “Agile template with planning, dev, testing, deploy.”
- “Track multiple projects, keep context straight.”

For Educators
- “Lesson planning with curriculum, assessment, and ed‑tech specialists.”
- “Different setups for different subjects.”
- “Auto‑generate progress reports.”

For Specialized Domains
- Legal: authority connections, approvals, document workflows.
- Medical: compliance, integrations.
- Finance: trading tools, risk controls.

### Templates, from zero to pro
- Creative Studio, Business Command Center, Development Workshop, Music Production Suite, Legal Practice.
- The Super Organizer can co‑design: suggest specialists, shape the workflow, fine‑tune for your edge cases.

### Or build from scratch
Let the Super Organizer interview you, propose a plan, and then you drag stuff where you want it. Colors, panels, flows — yours.

### Community matters
Save your configs, share them, remix others. This should feel like creative software, not enterprise plumbing.

### Why this matters (for real)
- Individual power: software that adapts to your brain, not the other way around.
- Productivity: less friction, more flow.
- Access: bring your own subs, or don’t — you can still get value.
- Creativity: when the workspace stops fighting you, wild things happen.

### Roadmap (short, medium, long)
Now
- Desktop app first: extreme customization, professional templates, connectors for your AI subs, extension ecosystem.

Next
- Web 2 built on the same core, mobile companion, enterprise features, smarter orchestration.

Later
- The standard for AI collaboration. A bustling marketplace of user‑made extensions. New ways of working with AI we haven’t named yet.

### Our promise
- 90% of the interface is customizable.
- No hard limits on your creativity.
- Performance scales with customization.
- Privacy and security from the start.
- Built with the community, not just for it.

### Come build this with me
This isn’t “another AI tool.” It’s a shift: people become creators, software bends, and the conversation runs the show. Welcome to BrainTrust Circle — where you don’t just talk to AI. You run the room.


