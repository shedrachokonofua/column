# Project Entities

## Crawler
### Attributes
- name: string
### Operations
- findPotentialLeads: Lead[]
- filterIrrelevantLeads: Lead[]

## Lead
### Attributes
- title: string
- posted: date
- crawlerName: string
- sourced: date
- tags: string[]
- employer: string
- description: string
- link: string