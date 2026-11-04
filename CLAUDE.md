# type-date

Natural-language datetime picker. The user types "oct 2 to oct 5" or "every other sunday". A tiny model running in the browser turns the text into a structured result. A React picker shows it. See `specs/idea.md` for the goal and `specs/plan.md` for the plan.

## Prose rules

Apply these to all docs, comments, commit messages, and UI copy.

- Be concise and concrete.
- Use simple sentence structure.
- No metaphor, no flowery language, no mannered prose.
- State facts and numbers. Say what you did and what happened.
- Do not hype results. Report failures plainly.

## Working rules

- Commit often to git with informative messages. Do not push. There is no remote.
- Keep total disk use under 10GB. Delete checkpoints that are not on the Pareto front or needed for a comparison. Record metrics before deleting.
- `design-ideas/` is gitignored. Look at the images there before doing UI work.
- Every experiment gets a sequential number (`exp-001`, `exp-002`, ...). Write one file per experiment in `specs/research/experiments/`.
- Background research goes in `specs/research/background/` as markdown.

## Updating this file

Agents are encouraged to update CLAUDE.md as they work. Put CLAUDE.md changes in a separate commit (or a separate PR if the project has PRs) from code changes. This helps other agents that start with an empty context.

Update CLAUDE.md whenever you waste time on something. Add a short note so the next agent avoids it. Good notes name the symptom, the cause, and the fix.

## Pitfalls

(Add entries here as they are found.)
