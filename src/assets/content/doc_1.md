<!-- ---
title: My Page
date: 2023-09-17
--- -->



<header>

# The Importance of Baselines

Tags Tags Tags



[Avatar] Jake Ramphal  
July 15, 2023  
X min read

</header>

![Image](../images/article/cover2.png)


- What are baselines?
- Why they matter?
  - starting points
  - repeatable and predictable usage
  - needed for regression testing
- Pitfalls of not setting them
  - DQA issues repeat themselves
- So how do we set baselines?
- What can we do with them?
  - automated testing
  - repeatable process


<blockquote>Baselines provide a stable and known starting point for comparison during software development and testing. By comparing changes or new versions against the baseline, discrepancies, bugs, or regressions can be easily identified, ensuring software quality and reliability throughout its development life cycle.</blockquote>

## Baselines in Software Testing


| Baseline Type   | Description                                                                                          | Purpose                                                                                                       |
|-----------------|------------------------------------------------------------------------------------------------------|----------------------------------------------------------------------------------------------------------------|
| Code Baseline   | A snapshot of the source code at a stable and well-tested version.                                 | Serves as the foundation for further development and comparison of code changes.                            |
|                 | Commonly used in version control systems to manage and track changes.                                |                                                                                                                |
| Design Baseline | Represents approved and finalized design specifications for an interface.                            | Used as a reference for developers to implement software as per the intended design.                         |
|                 | Ensures accuracy and adherence to the original vision during the Design QA process.                  |                                                                                                                |


## Establishing a Baseline with Figma & Storybook

Designers and developers can collaborate effectively by using Figma and Storybook to share a common understanding of components and features. Figma and Storybook offer controls and previews for coded components, facilitating a shared view of design and development environments.

## Conclusion and Key Takeaways

Automating DQA (Design Quality Assurance) through baselines in software testing is a strategic approach to ensure the integrity and reliability of your software products. Baselines, whether in code or design, establish stable reference points against which changes are compared. This section has explored the significance of baselines in software testing and how they are used in both code and design.

- Baselines are essential for identifying discrepancies in code and design.
- Leverage plugins to integrate your design references and coded libraries for collaboration.

By embracing baselines and integrating design and development environments effectively, you can ensure the high quality and reliability of your software products throughout the development life cycle.