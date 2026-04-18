# Built-in Personas: Generic Persona Archetypes

These are the default personas used by `/audit simulate` when no custom persona document is provided.

Users can override these by providing a custom persona document path: `/audit simulate <url> --personas <path>`

---

## 1. Quality Perfectionist

**Profile:** Values premium quality, detailed product information, and expert reviews. Willing to pay more for the best option. Thorough researcher who reads specifications and compares options carefully.

**Demographics:** Higher income bracket, 35-55 age range, desktop-primary

**Key Behaviors:**
- Reads detailed product specs and descriptions
- Checks expert reviews and professional ratings
- Compares multiple products side-by-side
- Values rich media (360 views, zoom, video)
- Willing to spend more time on purchase decision
- Price is secondary to quality signals

**Preferred Features:** Product comparison, detailed specifications, expert reviews, high-res images, 360-degree views, brand story, warranty info, size guides

**Typical Price Band:** $250-500+ (premium range)

**Decision Triggers:** Quality certifications, expert endorsements, detailed specs, brand reputation

**Friction Points:** Missing product details, no comparison tools, low-quality images, no expert reviews

---

## 2. Price-Conscious Shopper

**Profile:** Driven primarily by value and deals. Actively seeks discounts, compares prices across sites, and is motivated by savings. Will switch brands for a better price.

**Demographics:** Broad income range, 25-45, mobile-heavy

**Key Behaviors:**
- Sorts by price (low to high)
- Looks for sale/clearance sections first
- Compares prices across multiple sites
- Motivated by percentage-off and coupon codes
- Checks for free shipping thresholds
- Quick decision-maker when deal is right

**Preferred Features:** Price filters, sale sections, coupon code fields, price comparison, free shipping indicators, bundle deals, loyalty points

**Typical Price Band:** <$50 (budget-conscious)

**Decision Triggers:** Discounts, free shipping, bundle deals, price-match guarantees, limited-time offers

**Friction Points:** No price sorting, hidden shipping costs, no promo code field, no sale section visible

---

## 3. Convenience Seeker

**Profile:** Values speed and ease above all. Wants the fastest path from need to purchase. Mobile-first, often uses saved preferences and express checkout. Low tolerance for friction.

**Demographics:** 25-40, urban professionals, mobile-dominant

**Key Behaviors:**
- Uses search over browsing
- Prefers express/one-click checkout
- Values saved payment and address info
- Low patience for complex navigation
- Appreciates auto-fill and smart defaults
- Reorders frequently

**Preferred Features:** Search bar (prominent), express checkout, saved payment methods, auto-fill, mobile optimization, reorder functionality, Apple Pay/Google Pay

**Typical Price Band:** Varied (price is less important than speed)

**Decision Triggers:** Fast checkout, free/fast shipping, easy returns, minimal steps to purchase

**Friction Points:** Forced account creation, multi-page checkout, no guest checkout, slow page loads, no mobile optimization

---

## 4. Social/Trend Shopper

**Profile:** Influenced by social proof, trends, and peer recommendations. Makes purchase decisions based on what's popular, trending, or recommended by others. Active on social media.

**Demographics:** 18-35, social media active, mobile-dominant

**Key Behaviors:**
- Checks customer reviews and ratings first
- Looks for trending/popular items
- Influenced by user-generated content
- Shares purchases on social media
- Values visual merchandising and lifestyle imagery
- Responds to urgency messaging ("selling fast")

**Preferred Features:** Customer reviews, star ratings, "trending now" sections, user-generated content, social sharing, wishlists, "customers also bought," influencer picks

**Typical Price Band:** $50-200 (mid-range, trend-driven)

**Decision Triggers:** High star ratings, volume of reviews, trending status, social proof, limited availability

**Friction Points:** No reviews, no ratings, no social proof, no trending section, no user content

---

## 5. Brand Loyalist

**Profile:** Strong affinity to specific brands. Prefers to shop within known brand ecosystems. Values consistency, loyalty rewards, and brand narrative. Less likely to comparison shop.

**Demographics:** 30-55, moderate-to-high income, mixed device

**Key Behaviors:**
- Navigates directly to preferred brands
- Engages with brand stories and content
- Values loyalty programs and member perks
- Less price-sensitive within preferred brands
- Appreciates personalized recommendations
- Repeat purchaser

**Preferred Features:** Brand pages, loyalty program, member-exclusive content, brand story/about pages, personalized recommendations, order history, subscription options

**Typical Price Band:** Varies by brand tier (loyal to price point)

**Decision Triggers:** Brand recognition, loyalty rewards, member pricing, brand narrative, consistent quality

**Friction Points:** No brand filtering, no loyalty program visible, generic experience, no brand story content

---

## Usage in Simulation

When running a predictive simulation, the agent should:

1. **Select relevant personas** — not all 5 may be relevant to every site. E-commerce sites should use all 5. B2B sites may focus on Quality Perfectionist and Convenience Seeker.
2. **Score each persona** against the site using the scoring model in `scoring-model.md`
3. **Simulate navigation paths** based on each persona's behavioral patterns
4. **Identify gaps** specific to each persona's preferred features and decision triggers
