# Conceptually-singular identifiers

A fundamental principle of a [bounded context](https://martinfowler.com/bliki/BoundedContext.html) is that concepts have a
singular meaning depending on the context. When a concept means different things
to different people, that is a key indicator that a new bounded context (or
several) need to be introduced.

In the process of translating the singularity principle into
application code, it is imperative that concepts with a single meaning also have a single, consistent
identifier: this best puts into practice the very theory behind bounded contexts, and ultimately leads to less confusion among all stakeholders, including engineering and business.

For example, if your bounded context has the concept of a customer, your
application code should use an appropriate identifier: `customer`. This
identifier should be used across class and method names, arguments, and business
logic, along with relevant derivatives, i.e. `customers` for a list of
customers. This particular translation, from a domain model to code, is
preserves the bounded context via the choice of a **conceptually-singular identifier**.

## When things get complicated: migrations

At Flexport, we've been migrating from a monolith to a service-oriented
architecture (SOA). One service that our organization is prioritizing, moreover, is
identity and access management (IAM). Ideally, sub-systems would
have a well-defined interface -- the IAM service -- with which they can fetch information about which users can access what data and perform what actions.

The move towards a SOA introduces the need for a new pattern: [data-transfer
objects (DTO)](). At the boundaries of a bounded context, domain objects should
transformed into these DTOs (which will then be serialized
into JSON/XML when communicating over the network with other services).

Traditionally, there was a single class to represent a user: `User`. However,
with the introduction of DTOs, non-IAM code must move to use a `UserDTO`; once
all legacy code is using DTOs, it becomes possible to create a network-isolated IAM service. However, this migration complicates the representation of the domain model in code: there are now _two_ representations of the "user" concept. The clean singularity we've achieved with our domain model is corrupted.

## Returning to singularity

The decision to introduce additional representations of a concept into the
codebase is acceptable insofar as there is a plan to disambiguate the system
once the migration is complete. That is, once _all_ of your system's code is
using the `UserDTO` representation, you have now returned to singularity
semantically, but not nominally: the `UserDTO` class is **now your
representation of a user**! Reflect this in your code by changing your local
identifiers from `user_dto` back to `user`, since you likely duplicated various
functions or code blocks during the migration.

The underlying type of the values
associated with a `user` identifier may be a DTO, but that is perfectly
acceptable. Storing information about the underlying type of a variable in its
identifier is a recipe for corrupting the domain model, since domain experts
**speak in concepts, not types**. Ensure that the identifiers you choose
throughout your codebase correspond with concepts in the domain model, and
you'll ensure your system can be reasoned about by developers and business
stakeholders alike.
