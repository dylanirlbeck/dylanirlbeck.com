# Track that pixel

Last week, I went down the rabbit hole of one particularly deceptive web tracking technology: [the tracking pixel ("web beacon")](https://en.wikipedia.org/wiki/Web_beacon). It is shocking how many websites employ things like the Meta Pixel to harvest data from users without their knowledge -- and in industries where the practice is possibly even illegal based on existing law.

To build up my mental model of how tracking pixels work (and maintain some
degree of coding proficiency), I wanted to write a minimal program to simulate
the basics of this technology. The result is [`track-that-pixel`](https://github.com/dylanirlbeck/track-that-pixel), the code for
which you can find open-sourced on my GitHub.

![Tracking pixel demo](images/tracking_pixel.gif)

## Background

A tracking pixel (also known as “web beacon”) is a visually-unnoticeable bit of information included in an HTML document that, when loaded by a client, will send information to a third-party server. This type of document could hypothetically appear anywhere on the web, but the most common formats are webpages and email content. A notable implementation of this technology is the [Meta Pixel](https://www.facebook.com/business/tools/meta-pixel/) ([developer docs](https://developers.facebook.com/docs/meta-pixel)): a small piece of code that any website owner can utilize to track user data and improve their targeted advertising across Meta's platforms.

Researchers at groups like the Markup and Adalytics have reported on several surreptitious — and possibly illegal — uses of the tracking pixel in the domains of [tax preparation software](https://themarkup.org/pixel-hunt/2022/11/22/tax-filing-websites-have-been-sending-users-financial-information-to-facebook), [medical care](https://themarkup.org/pixel-hunt/2022/06/16/facebook-is-receiving-sensitive-medical-information-from-hospital-websites), and [U.S. politicians’ personal websites](https://adalytics.io/blog/is-congress-leaking-your-data). Unlike many industries, tax, medicine, and politics are highly-regulated, with existing laws on the books specifically to protect privacy. (In fact, Senators Warren, Wyden, and others [recently recommended](https://www.warren.senate.gov/oversight/reports/in-new-report-senators-warren-wyden-lawmakers-reveal-massive-likely-illegal-breach-of-taxpayer-privacy-by-tax-prep-companies-with-meta_call-for-agencies-to-investigate-prosecute) that several federal agencies, including the Dept. of Justice, investigate these privacy violations and prosecute any company that violated the law.)

## Objective

Implement a minimally-viable tracking pixel to illustrate the ease with which sites can compromise user privacy (intentionally **_and_** unintentionally).

In general, consumers ought to be aware of this basic tracking technology and how it negatively impacts their overall privacy across the web. And developers ought to exercise judgement — and abide by the law, depending on the industry — when incorporating this tracking on websites they build.
