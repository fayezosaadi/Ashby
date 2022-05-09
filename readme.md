# Overview

## Business and Semantics

### Class model

The primary goal of this class model is to define the major elements of the product and identifies the important
relationships between them. It specifies the policies and rules to be enforced. It shows classes, attributes,
associations, and generalizations in the _Form Application_ domain for both Owner and End Users.

![class model](https://user-images.githubusercontent.com/26156279/167326362-a0c55850-5b15-481c-9d91-b5c7abee88b4.png)

## High‐Level Design

This section illustrates a high‐level design for _Form Application_ domain, it shows classes, operations, and
dependencies derived from the previous class model.

### High‐Level Design Class Diagram for View-controller region(Owner and End User UI)

The UI is a single page application for both Owner and End User and has use cases/sections such as:

- Create Form
- Form Details?
- Add question
- Drop question
- Edit Question
- Confirm send form
- Add answers
- Confirm submit form
- ...etc

![high-level-design](https://user-images.githubusercontent.com/26156279/167331658-ebbe2a38-21db-4e86-8ced-db0c2c28ed70.png)

### High‐Level Design Class Diagram for Model region(Owner and End User business logic/functionality)

![high-level-design](https://user-images.githubusercontent.com/26156279/167329405-b8d8ea11-b111-41bb-8791-3deaf71634ac.png)

