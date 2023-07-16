Data Types

Number

Numbers start at 0 in JS and do not require quotes

0
1
2
...

String

A sequence of text know as a string. To signify that the value is a string, you must enclose it in quote marks (double or single)

'this is a string'

Boolean

A True/False value. The words TRUE or FALSE are special keywords. They don't need quotes.

true
false

JS Comparisons

===

Equal value and equal type

Example: Is 3 equal to 3?

3=3
VM43:1 Uncaught SyntaxError: Invalid left-hand side in assignment

// Invalid. Must have 3 equal signs in js.

Example: Is 3 equal to 3?

3===3
true

!==

Not equal value or not equal type

Example: Is 4 NOT equal to 3?

4!==3
true

Example: Is 3 NOT equal to 3?

3!==3
false

>=

Greater than or equal to

<=

Less than or equal to

>

Greater than

<

Less than

String Examples

Input:

'A string of text'

Console Output:

"A string of text"

Input:

20 + 'Jacques'

Console Output:

"20Jacques"

Input:

20 - '10'

Console Output:

10

Combining Strings

Strings can be combined to form lines of text. Spaces and special characters can be included for formatting.

'FirstName ' + 'LastName ' + '(' + 'Age' + ')' + ' Height'
"FirstName LastName (Age) Height"

Accessing individual Characters

In JS everything starts with 0

'Jacques' [0]
"J"

The length property

The .length property returns to number of elements in an array

Is this word greater than 8?

'Jacques'.length>8
false

Is this word greater than 7?

'Jacques'.length>7
false

Is this word greater than or equal to 7?

'Jacques'.length>=7
true

Modules

Read the Beginner's guide

Example using .length and % to calculate the difference of 2 strings

Scissors does not go into Rock and leaves 4 extra characters

'Rock'.length % 'Scissors'.length
4

Rock goes into Scissors 2 time with 0 extra characters

'Scissors'.length % 'Rock'.length
0