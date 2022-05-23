
# Justgraphit



[![Node.js CI](https://github.com/forforf/justgraphit/actions/workflows/node.js.yml/badge.svg)](https://github.com/forforf/justgraphit/actions/workflows/node.js.yml)


This is basically my app for kicking the tires on javascript build systems.
This is the fourth iteration. The first was built on Angular 1, the second using Angular 2,
third was classical React circa early 2017, the fourth was functional React with hooks 
late 2021

So far, React has fit best with the way I think about HTML UIs.

The App itself is pretty straight forward. 

The main page gives you input fields.
You name the graph, and provide it numbers. The numbers are plotted on the graph
based on the time that they were submitted.

The editor page is a very rudimentary graph editor (basically you can delete entries).

And then the about page, and that's basically it.

## Github Workflow Testing

### Local

* Install [act](https://github.com/nektos/act), if not already installed
* On the command line, run `act` which runs the default workflow: `on: push`.
* Follow along as the workflow runs.

Note: `act` is not guaranteed to be identical to the github workflows, so use it as a general guide, not gospel.

Worflows are found in `github/workflows`

## Opinions and Philosophies


## Why the emphasis on functional components?
I'm a huge fan of the functional approach. I feel like it pushes one towards stateless
and immutable more so than the OOP class approach. Plus I feel like the functional approach
is often easier to test and modify.

## Typescript?

~~Actually I hope to convert over to TypeScript after the functional switch over is complete.~~
Converted to typescript

### Deploying

Note: Until I get the automated process up and running again, here's the manual way.
1. `git push aws`, requires the IAM git https credentials
2. Go to AWS/CodeBuild/justgraphit. Click on "Start Build"

The automated way would to run the build automatically when the repo is updated. I just need to setup the triggers to do that.

### Testing

#### Why not test directory?

I've converted to the concept of having the test file adjacent to the file to be tested.
For me, it makes for easier refactoring. I also am of the mindset that testing is part of
the code, not its own separate thing.

#### Why snapshotting, isn't that lazy/bad?
Personally, I think snapshots are one of the best ideas to come around for unit testing 
in general, and UI unit testing in particular.

Why I like snapshotting
* Tests are small and easy to write
* Updating the test to pass is super easy
* The expected vs actual comparison is deep and robust

There is one very critical aspect of snapshotting. As a developer, you must never blindly
accept a new or modified snapshot. This is the biggest mistake I've seen developers make, 
The thought process is "oh, I just changed this one small thing", then when the snapshot 
fails (as it should), they just update it without even looking at the diff. Always, always,
always check the snapshot diff to make sure the changes in the diff match the changes you 
expect. If you do that one thing, snapshotting will be a blessing. If you forget or get lazy, 
then beware of passing tests but broken code.

#### Why deep and shallow rendering?

For complex components the testing will do both a deep render and a shallow render.
Deep rendering seems more like what I call integration testing, as it tests that the components are
properly integrated, while shallow testing is focused solely on the component under test and is what 
I consider as unit testing.

I think both approaches have their merits. I feel like the deep 
render might be able to find weird edge cases where a component higher up in the hierarchy
has an effect on it's grand-children (or the grand-children's descendents). But it also
means a broken sub-component causes the parent component to fail its test, even though
everything might be ok with the parent. Also, the snapshots of deep renders can be challenging to 
decipher. On the other hand, since shallow rendering is only 
focused on one level, the snapshots are (usually) quite easy to read and verify.



