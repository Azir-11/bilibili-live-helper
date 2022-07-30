# Contributing Guide

Hi! We're really excited that you are interested in contributing to this project. Before submitting your contribution, please make sure to take a moment and read through the following guidelines:

- [Code of Conduct](#CODE_OF_CONDUCT)
- [Pull Request Guidelines](#pull-request-guidelines)

# Contributor Code of Conduct

As contributors and maintainers of this project, we pledge to respect all people who contribute through reporting issues, posting feature requests, updating documentation, submitting pull requests or patches, and other activities.

We are committed to making participation in this project a harassment-free experience for everyone, regardless of the level of experience, gender, gender identity and expression, sexual orientation, disability, personal appearance, body size, race, age, or religion.

Examples of unacceptable behavior by participants include the use of sexual language or imagery, derogatory comments or personal attacks, trolling, public or private harassment, insults, or other unprofessional conduct.

Project maintainers have the right and responsibility to remove, edit, or reject comments, commits, code, wiki edits, issues, and other contributions that are not aligned to this Code of Conduct. Project maintainers who do not follow the Code of Conduct may be removed from the project team.

Instances of abusive, harassing, or otherwise unacceptable behavior may be reported by opening an issue or contacting one or more of the project maintainers.

This Code of Conduct is adapted from the [Contributor Covenant](http://contributor-covenant.org), version 1.0.0, available at [http://contributor-covenant.org/version/1/0/0/](http://contributor-covenant.org/version/1/0/0/)

## Pull Request Guidelines

- Checkout a topic branch from the relevant branch, e.g. `master`, and merge back against that branch.

- If adding a new feature:

  - Provide a convincing reason to add this feature. Ideally, you should open a suggestion issue first and have it approved before working on it.

- If fixing bug:

  - Provide a detailed description of the bug in the PR. Live demo preferred.

- It's OK to have multiple small commits as you work on the PR - GitHub can automatically squash them before merging.

- Commit messages must follow the [commit message convention](./commit-convention.md) so that changelogs can be automatically generated.

## Development Setup

You will need 

- [nodeJS](https://nodejs.org)
- [git](https://git-scm.com/)
- [pnpm](https://pnpm.io)

After cloning the repo, run

```bash
# install the dependencies of the project
$ pnpm install
```

### Setup Dev Environment
You may start project local dev environment with

```bash
$ pnpm run dev
```

After executing the above command, try modifying the source code. You'll get live update.

Have fine on Coding!