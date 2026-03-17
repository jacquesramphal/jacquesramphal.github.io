# OnLogic Product Configurator
A hardware configuration experience for IT professionals where a wrong choice has real consequences.

| | |
|---|---|
| **Role** | Product Designer |
| **Client** | OnLogic / Orium |
| **Status** | Launched |
| **Tags** | commerce · configurator · b2b |



## Overview

OnLogic's customers are IT professionals configuring industrial PCs for specific deployment environments — a wrong component choice doesn't trigger a return, it triggers a failed deployment.

The legacy platform had been built for a general commerce audience and couldn't represent the dependencies between hardware components — how a processor choice limits memory options, how a chassis selection constrains thermal design. The migration to composable commerce was the opportunity to build a configuration experience that matched the precision of the audience it served.

## My Role

I led product design for the migration — the configuration flow, product detail pages, checkout experience, and the design system that held it together.

I owned the UX from discovery through to launch, working with OnLogic's product and engineering teams to map the hardware dependencies that needed to be reflected in the flow, and with Orium's development team to design specs that could be built on and extended.

## The Constraint

The product catalog was genuinely complex — components with real dependencies, configurations that could only be validated against hardware constraints, and users who would immediately notice any gap between what the interface implied and what was technically possible.

A standard PDP doesn't communicate component compatibility. A customer who selects an incompatible combination needs to understand why at the point of selection, not at checkout. Every dependency had to be surfaced early enough to be useful.

## Approach

Designing the configuration flow around the actual hardware constraints — options cascade based on what's compatible, not what's available.

Working with OnLogic's engineering team, I mapped the dependency graph for the key product categories: what depends on what, where the configuration forks, what a user needs at each step. The PDP became a staged experience where each selection narrows the valid options downstream. Real-time price calculations updated as selections were made. The composable architecture — commercetools, Contentful, Algolia — gave each layer room to evolve independently.

![OnLogic PDP — hardware options with pricing deltas and availability states](../images/casestudy/onlogic/onlogic-pdp-config.png)
*The configurator — storage options cascade with per-option pricing deltas, out-of-stock states, and spec detail inline. The sticky sidebar updates the total in real time.*

![OnLogic Component Library](../images/casestudy/onlogic/onlogic-4.png)
*The component system — buttons, inputs, selectors, alerts, and states built to cover the full range of the configurator.*

## Outcome

The platform launched with a configuration experience that matched the precision of the audience — technical users who could now configure and purchase complex hardware without consulting an external spec sheet.

Real-time validation, compatibility-driven option filtering, global payment and tax integration. The design specs were built with extensibility in mind so the development team could add new product categories without restructuring the interface.

![OnLogic Shopping Cart — configured items with expandable detail](../images/casestudy/onlogic/onlogic-cart.png)
*The cart — configured items with expandable hardware specs, volume quote option, and order summary. The configuration follows the user through to purchase.*

![OnLogic Product Comparison — side-by-side spec comparison across models](../images/casestudy/onlogic/onlogic-comparison.png)
*Product comparison — key specs across models in a single view, so customers can validate the right configuration before committing.*

## What I Learned

Designing for technical users means earning trust through precision — every edge case you account for is a signal that the product understands its audience.

The users who configure industrial hardware for a living will find every gap in your logic. That's not a problem — they're exactly the people who tell you where the experience breaks down before it ships. Map the real dependency graph before designing the interface, and make sure the UX exposes the same constraints the underlying system enforces.
