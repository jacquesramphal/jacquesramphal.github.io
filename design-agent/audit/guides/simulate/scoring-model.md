# Persona Fit Scoring Model (0-10 Scale)

The predictive simulation agent uses this additive scoring model to evaluate how well a site serves each persona.

## A. Category Fit (0-2 points)

Does the persona's preferred categories match the site's primary categories?

- **0** = low alignment (e.g., tech persona on a food site)
- **1** = moderate alignment (e.g., overlapping but not primary)
- **2** = strong alignment (e.g., Quality Perfectionist fits Consumer Electronics)

## B. Price Band Fit (0-2 points)

Does the site's visible price structure match the persona's typical spending?

- **0** = mismatch (e.g., luxury persona on a budget site)
- **1** = mixed (some overlap in price range)
- **2** = strong match (e.g., <$50 supports Price-Conscious; $250-500 supports Quality Perfectionist)

## C. Feature Alignment (0-3 points)

How many of the persona's top-used features are visible on the site?

Score based on presence of features the persona values most (reviews, comparison, wishlist, rich media, filters, etc.):

- **0** = none of the persona's key features present
- **1** = 1-2 features present
- **2** = 3-4 features present
- **3** = 5+ features present or strong alignment with persona's decision-making tools

## D. Flow Completeness (0-2 points)

Can the persona complete their preferred purchase journey?

- **0** = critical flow steps missing (e.g., no checkout, no product detail)
- **1** = partial flow available (e.g., can browse but checkout is incomplete)
- **2** = full flow available from discovery through purchase

## E. Trust & Proof Alignment (0-1 point)

Are trust signals present that match the persona's confidence requirements?

- **0** = no relevant trust signals (no reviews, no badges, no social proof)
- **1** = trust signals present (reviews, ratings, security badges, social proof, return policy visible)

## Interpretation

| Score | Rating | Meaning |
|-------|--------|---------|
| 0-2 | Poor | Site fundamentally misaligned with persona |
| 3-4 | Weak | Major gaps prevent conversion |
| 5-6 | Moderate | Some fit but significant friction expected |
| 7-8 | Good | Strong fit with minor friction points |
| 9-10 | Excellent | Persona is well-served, high conversion potential |

## Conversion Estimate Formula

Simulated conversions per 100 visits are estimated by mapping the persona fit score:

- Score 0-2: 0-1 conversions per 100
- Score 3-4: 2-5 conversions per 100
- Score 5-6: 6-12 conversions per 100
- Score 7-8: 13-22 conversions per 100
- Score 9-10: 23-35 conversions per 100

These are relative estimates, not real analytics. They indicate predicted conversion *potential* based on persona-site alignment.
