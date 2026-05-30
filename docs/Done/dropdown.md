Replace Principles search with a dropdown selector.
Requirements:
1. Remove free-text search for principles.
2. Add dropdown:

"Guide AI with a principle (optional)"

3. Options:
- None (default)
- Show all principles grouped by category

4. Each option should display:
[ Human-readable label (Principle name) ]

Example:
"Understand Suffering (Four Noble Truths)"

5. When selected:
- store preferredPrincipleHash
- selector should boost this principle score
- do NOT force it if irrelevant

6. Must support multilingual labels:
principle.names[locale]

7. Keep UI simple and fast.
Do not reintroduce search_alias logic.evant, selector should ignore it.

Important:
Do not auto-submit.
User must press Analyze manually.Selector behavior:
If preferredPrincipleHash exists:
- add that principle with a small score boost
- do not force it if completely irrelevant
- still return max 3 principles
Use included in Analyze's quota