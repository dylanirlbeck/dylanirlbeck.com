# Error handling in Ruby: smelly patterns

_Note: This is the second post in a series on error handling in Ruby._

1. [Introduction](/writing/ruby-error-handling-introduction.html)
2. **[Smelly patterns](/writing/ruby-error-handling-smelly-patterns.html)**

---

As I pursue a coherent approach for error handling in Ruby, I'm bound to come
across patterns that I think are [smelly](https://en.wikipedia.org/wiki/Code_smell). This post attempts to maintain a list of those patterns and explain where I think they fall short.

## Returning, not `raise`ing, a Ruby exception

(This pattern was initially proposed by Robert Mosolgo in his post [Raising
Exceptions is Bad](https://rmosolgo.github.io/ruby/programming/2016/11/23/raising-exceptions-is-bad.html).)

One of the earliest patterns I experimented with was using [Sorbet union
types](https://sorbet.org/docs/union-types#__docusaurus) and custom exception
types. Rather than `raise`ing an exception as a form of controlling program flow, I simply return it.
In this pattern, the return type of error-throwing method (like `#sqrt`) will be a
union of the result type (`Float`) with _each_ of the possible custom exception types.

```ruby
# typed: strict

require "sorbet-runtime"

class SqrtService
  extend T::Sig

  class NegativeNumberError < StandardError; end

  sig {
    params(value: Float)
      .returns(T.any(
        Float,
        NegativeNumberError
      ))
  }
  def self.sqrt(value)
    if value < 0.0
      return NegativeNumberError.new
    end

    Math.sqrt(value)
  end
end

sqrt = SqrtService.sqrt(-5.4)
if sqrt.is_a?(SqrtService::SqrtValidationError)
  puts "Received error #{sqrt.class}"
else
  puts "doing something else with #{sqrt}"
end
```

This pattern takes advantage of Sorbet's strong error checking by forcing
callers to explicitly consider the error case: without calling `is_a?` on the result
to narrow the result type, program execution cannot continue down the happy
path.

Still, this pattern is confusing for a couple reasons. First, it _returns_
instances of exceptions rather than raising them. This is hardly an idiomatic
Ruby pattern: exception types are generally declared in order to `raise` and
`rescue` them. A better alternative, for instance, may be a lightweight result
type. In addition, the usage of `is_a?` for type narrowing is inexpressive and
verbose. For example, I can imagine a program with many nested calls to error-throwing
methods, each of which requires another level of `is_a?` for the type narrowing.
I'm confident that are more composable patterns that allow us to chain
operations in a more [railway-oriented manner](https://fsharpforfunandprofit.com/rop/).
