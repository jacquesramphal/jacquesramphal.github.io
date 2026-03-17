<!-- ---
title: My Page
date: 2023-09-17
--- -->

<header>

# Markdown Basics
Tags Tags Tags

[Avatar] Jacques Ramphal  
July 15, 2023  
X min read
</header>

<!-- <main> -->

![Responsive Breakpoints](https://miro.medium.com/max/1400/0*QuR2HZPsD6O5fyjb)

Markdown Basics
https://www.markdownguide.org/hacks/

Markdown is a lightweight markup language that allows you to format plain text easily. It is widely used for creating documentation, README files, forum posts, and more.

---
## Headers

You can create headers using hash symbols (#). The number of hash symbols determines the header level. For example:

# Heading 1
## Heading 2
### Heading 3
#### Heading 4
##### Heading 5
###### Heading 6

<hr>

## Emphasis

You can make text *italic* or **bold** using asterisks (*) or double asterisks (**). For example:
This is *italic* text.
This is **bold** text.

<hr>

## Lists

You can create ordered and unordered lists using hyphens (-) or numbers (1.). For example:

- Item 1
- Item 2
- Item 3

1. First item
2. Second item
3. Third item

<hr>

## Links

You can create links using square brackets [] for the link text and parentheses () for the URL. For example:

[Ramphal Design](https://www.ramphal.design)

<hr>

## Images

You can display images using an exclamation mark (!), followed by square brackets [] for the alt text, and parentheses () for the image URL. For example:

### Local Image
![Image](images/image1.png)
#### Local Image with caption

<figure>
    <img src="./images/image1.png"
         alt="Albuquerque, New Mexico">
    <figcaption>A single track trail outside of Albuquerque, New Mexico.</figcaption>
</figure>
<br>

#### Remote Image
![Markdown Logo](https://upload.wikimedia.org/wikipedia/commons/4/48/Markdown-mark.svg)

<hr>

## Blockquotes
You can create blockquotes using the greater than symbol (>). For example:

> This is a blockquote.


> ⚠️ **If you are using mobile browser**: Be very careful here!

> ℹ️ **If you are using mobile browser**: Be very careful here!


> [!NOTE]  
> Highlights information that users should take into account, even when skimming.

> [!IMPORTANT]  
> Crucial information necessary for users to succeed.

> [!WARNING]  
> Critical content demanding immediate user attention due to potential risks.


> **Note**
> This is a note

> **Warning**
> This is a warning


<hr>

## Table
A responsive table with horizontal scrolling.

| Column 1 | Column 2 | Column 3 | Column 1 | Column 2 | Column 3 |
|---------|---------|---------|---------|---------|---------|
|  Cell 1 |  Cell 2 |  Cell 3 |  Cell 1 |  Cell 2 |  Cell 3 | 
|  Cell 4 |  Cell 5 |  Cell 6 |  Cell 4 |  Cell 5 |  Cell 6 |
|  Cell 4 |  Cell 5 |  Cell 6 |  Cell 4 |  Cell 5 |  Cell 6 |
|  Cell 4 |  Cell 5 |  Cell 6 |  Cell 4 |  Cell 5 |  Cell 6 |
|  Cell 4 |  Cell 5 |  Cell 6 |  Cell 4 |  Cell 5 |  Cell 6 |
|  Cell 4 |  Cell 5 |  Cell 6 |  Cell 4 |  Cell 5 |  Cell 6 |
|  Cell 4 |  Cell 5 |  Cell 6 |  Cell 4 |  Cell 5 |  Cell 6 |
|  Cell 4 |  Cell 5 |  Cell 6 |  Cell 4 |  Cell 5 |  Cell 6 |

---
## Accordian
<details>
<summary><b>Preview title</b></summary>

This is accordian text


- Points
- Points
- Points
- Points

</details>

---

## Code
You can display `inline code` using backticks (`) and code blocks using triple backticks (```). For example:
#### Python
```python
print("Hello, World!")
```
#### Javascript
```javascript
function greet(name) {
  console.log(`Hello, ${name}!`);
}
```
#### HTML
```html
<!DOCTYPE html>
<html>
<head>
  <title>Hello World</title>
</head>
<body>
  <h1>Hello, World!</h1>
</body>
</html>
```
<!-- </main> -->