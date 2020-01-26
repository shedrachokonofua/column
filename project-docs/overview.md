# Problem
I need a single dashboard for viewing job/contract leads(another one of the these ...ugh).
It should be clean, simple and carry *relevant* leads only.

## Well, what does a relevant lead look like?
- Has been posted for < 48 hours (rough market ey?). 
- Fits my needs.
- Fits my skill-set.
- Has no duplicates in the system.
  
# Solution + Requirements
Dashboard Client + Crawler System 

## Dashboard Client
- Simple card-based UI
- One-click delete
- Lead refinement

## Crawler System(Orchestrator + Crawlers)
- Crawlers for each lead source
- Extendable with relative ease(Crawlers as Orchestrator plugins)
- No duplicate leads
- No reapparence of deleted leads