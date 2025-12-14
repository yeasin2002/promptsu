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
pnpm changeset:version
```

This consumes all changesets and updates package versions accordingly.

## Check Status

To see pending changesets:

```bash
pnpm changeset:status
```

## Release Workflow

1. Make changes and commit
2. Run `pnpm changeset` to create a changeset
3. Run `pnpm changeset:version` to bump versions
4. Commit the version changes
5. Create a git tag: `git tag v0.0.2`
6. Push with tags: `git push --follow-tags`
7. GitHub Actions will create the release automatically

## Guidelines

- **patch**: Bug fixes, small improvements
- **minor**: New features, non-breaking changes
- **major**: Breaking changes

Not every change needs a changeset - only changes that affect the public API or user-facing functionality.
