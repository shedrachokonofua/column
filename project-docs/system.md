# System
## The solution comprises 2 components:
- Crawler Orchestrator: Uses **crawlers** to get **leads**
- Client Dashboard: Interact(View + Delete) with **leads**

## The orchestrator should, in a nutshell:
- Be able to take **crawlers** as "plugins"
- Have a finite run time, shorter is better
- Execute **crawlers** in parallel
- "Listen" to running **crawlers** for **leads**
- Save **leads** ensuring:
  - There are no duplicates
  - No already deleted lead makes it back into the system

## These would require crawlers to:
- Have a common interface
- Have a finite run time
- Strictly only be concerned with sourcing relevant leads

## Diagrammatically,
DB <---> Orchestrator <---> [Crawler, Crawler, Crawler, Crawler]
