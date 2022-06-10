# Error handling in Ruby: introduction

There exists a large class of functions which can “fail.” For side-effect-producing functions, loud failures may
arise when performing I/O like database reads and writes, gRPC calls to external services, or publishing
to an event log. But even simple, pure code may fail. For example, suppose we want to write a function for
updating two different dates — X and Y — on a domain object, and we have a rule that X _must_ always precede
Y (the function should return a new instance of the domain object). If a caller attempts to pass in a date for
Y that comes before X, what value should we return? One construct afforded by most languages, [including Ruby](https://ruby-doc.org/core-2.5.1/Exception.html), is to raise an exception. But exceptions [generally make code harder to understand](https://rmosolgo.github.io/ruby/programming/2016/11/23/raising-exceptions-is-bad.html), and are a bit heavy for pure functions like the date update described above. Is there another
pattern we can use as the return value for functions that can fail?

---

This post is the first in a series on error handling in Ruby. In it, I
attempt to explore how [exceptions](https://ruby-doc.org/core-2.5.1/Exception.html), result monad patterns
(like those present in languages like [OCaml](https://v2.ocaml.org/api/Result.html) and
[F#](https://docs.microsoft.com/en-us/dotnet/fsharp/language-reference/results)), and [Sorbet](https://sorbet.org/), a static type system,
might be combined to create a coherent approach to error handling in Ruby.

Error handling poses a challenge to the reasonability of digital systems in
general: if errors -- both expected and unexpected -- are not handled consistently and
explicitly, developers will have a difficult time predicting system behavior
with confidence. To this end, I'll aim to call out any learnings I have vis-a-vis error handling
which apply outside of Ruby.
