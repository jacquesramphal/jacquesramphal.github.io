# Documentation

This folder contains plans, technical documentation, and architectural decisions for the jacquesramphal.github.io portfolio site.

## Structure

```
docs/
├── README.md           ← This file
└── plans/
    └── vite-migration-plan.md    ← Comprehensive Vite migration strategy
```

## Available Documentation

### Plans

- **[Vite Migration Plan](plans/vite-migration-plan.md)** - Comprehensive migration strategy from Vue CLI/Webpack to Vite, including:
  - Critical blockers analysis (require.context, dynamic imports)
  - Package changes required (20+ to remove, 8+ to add)
  - 7-phase incremental migration approach
  - Risk mitigation and rollback strategy
  - Estimated timeline: 3-4 days

## Contributing Documentation

When adding new documentation:

1. **Plans** → `docs/plans/` - Migration plans, feature planning, architectural decisions
2. **Technical Specs** → `docs/specs/` - API specs, component specs, data schemas
3. **Guides** → `docs/guides/` - How-to guides, setup instructions
4. **ADRs** → `docs/decisions/` - Architecture Decision Records

## Current Status

- ✅ SEO/AEO/GEO optimization completed (Feb 2026)
- ✅ Automated sitemap generation
- ✅ Dynamic meta tags with @vueuse/head
- ✅ OG image for social sharing
- 📋 Vite migration plan documented (low urgency)
