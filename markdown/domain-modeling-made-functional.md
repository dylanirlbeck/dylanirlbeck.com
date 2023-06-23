# Notes on Domain Modeling Made Functional

I’ll divide my notes from this book into four main sections: fundamentals of [domain-driven design](https://en.wikipedia.org/wiki/Domain-driven_design); functional architectures; domain modeling; and high-level takeaways. I’ll include page numbers where applicable in case you’ve purchased the book and want to use these notes as a reference.

Overall, I greatly enjoyed this book, and I’d likely advocate for using its guidance if I become an architect of an enterprise software project in the future. In practice, I plan to use its guidance on domain modeling quite heavily: I want to understand the domain of freight forwarding (and specifically, warehousing) deeply enough such that I can model the core components effectively in software. In addition, I will continue to look for ways to apply the principles of functional programming (particularly around designing programs as pipleines) despite my usage of object-oriented languages in my day-to-day (Ruby, JavaScript, and Java).

## Fundamentals of domain-driven design (DDD)

_p. 22_

- Fundamental components of DDD
  - _Bounded contexts_: subsystems with clear boundaries, each of which own their data stores. These systems consist of workflows, and each has its own contextual language.
  - _Domain events_: generated via techniques such as [event storming](https://en.wikipedia.org/wiki/Event_storming) (and related to [event sourcing](https://martinfowler.com/eaaDev/EventSourcing.html))
  - _Commands_
  - _Ubiquitous_: a language with nouns — data structures — and verbs — business processes — that is shared between all stakeholders in a project. These terms should be maintained in a **living** document.

## Functional architecture

_pp. 43-55_

- What are the main components of a functional architecture?
  - Bounded contexts as autonomus subsystems with well-defined [data] boundaries. These contexts could be _implemented_ in a variety of ways, depending on the scale of the system.
    - Could be simple software modules/classes, separate network-isolated services, or even microservices.
    - In general: start with a monolith and refactor into services at sufficient scale.
  - Components stay decoupled when communicating (via events/message queues), or simple function calls
  - Contracts between bounded contexts is a hard concept to get right, but incredibly important (p. 48)
  - Code structure within a bounded context: [onion architecture](https://jeffreypalermo.com/2008/07/the-onion-architecture-part-1/) (p. 52)

## Domain modeling

_p. 57_

- The idea of documentation as _compilable_ code — i.e. types — is the central to domain modeling.
- Type patterns (p. 78)
  - _Simple values_ (e.g. identifiers, messages). These values are often constrained in the domain. For example, if there are only 100 products in a catalog, an integer-based product code could only go up to 100.
  - _AND combinations_. These types represent closely linked data (i.e. documents), and are implemented with records.
  - _Choices with OR_. Represents a choice between this _or_ that.
  - _Workflows_. Business processes with well-defined inputs and outputs. Often, these workflows cause side effects. (Workflows correspond to functions.)
- [Value Objects vs. Entities](https://stackoverflow.com/questions/75446/value-vs-entity-objects-domain-driven-design) for classifying data(p. 88)
  - _Value Objects_: objects **without** a persistent identity. For instance, if the fact that the fields of two objects are the same means the “value” of those objects are the same, you’re dealing with value objects.
  - _Entity_: objects **with** a persistent identity. Often, these objects are documents of some kind. They have a unique identity even if their components (fields) change.
  - _Aggregate_: collection of entities, where the top-level entity is called the _aggregate root._ Aggregates enforce consistency and invariants in the domain: if an entity in its collection changes, it will reflect those changes across other associated entites in the domain.
- Core principle: [make illegal states unrepresentable](https://fsharpforfunandprofit.com/posts/designing-with-types-making-illegal-states-unrepresentable/) in the domain via _integrity_ and _consistency_ (p. 103)
  - In distributed systems, we should be able to trust that [“eventual consistency”](https://en.wikipedia.org/wiki/Eventual_consistency) will get the system to the state we expect in spite of transient failures.
- Workflows implemented as [pipelines](<https://en.wikipedia.org/wiki/Pipeline_(software)>) (p. 119)
  - Data is passed from one function to another, in the form of a pipeline. (And more concretely, using the pipeline operator in FP.)
  - State machines in particular can be highly useful for modeling workflows.
- Idea: documenting side effects in function type signatures.

## Takeaways

- F# is a great language for DDD: it has useful primitives such as algebraic data types, modules, map/bind methods, Result/Async type wrappers, and computation expressions.
  - I don’t believe that the third section of the book in particular, since it was so implementation-heavy, is immediately useful to most developers if there is already lots of code in a _different_ language. (Perhaps if the existing language is part of the JVM, though, this assertion might not hold.)
- I like to think of domain types as an _instantiation_ of the ubiquitious language.
  - However, I don’t think this book dove as deep into requirements gathering as I would have liked. Without understanding the domain, you can’t attempt to domain model.
- With rigorous and intentional domain modeling, I can’t imagine the design getting out-of-sync with the code _nor_ the real world requirements.
- Pushing input/output to the boundaries of a workflow/application can make business logic significantly easier to reason about. More practically, I think this pattern can be implemented in simple method calls as well: push logs, jobs, etc. to the very end of void (unit-returning) methods to make it crystal-clear where the side effects are occuring. Burying logs or other side effects in helper functions can make a system’s behavior incrementally more difficult to reason through (not to mention harder to test).
