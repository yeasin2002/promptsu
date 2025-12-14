# Changesets

This project uses [changesets](https://github.com/changesets/changesets) for version management.

## Adding a Changeset

When you make a change that should be released, run:

```bash
pnpm changeset
```

This will prompt you to:

1. Select which packages have changed
2. Choose the semver bump type (major/minor/patch)
3. Write a summary of the changes

## Versioning

When ready to release, run:

```bash
pnpm version
```

This consumes all changesets and updates package versions accordingly.

## Publishing

After versioning, publish packages with:

```bash
pnpm release
```

## Guidelines

- **patch**: Bug fixes, small improvements
- **minor**: New features, non-breaking changes
- **major**: Breaking changes

Not every change needs a changeset - only changes that affect the public API or user-facing functionality.
