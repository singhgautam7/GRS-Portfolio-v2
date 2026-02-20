---
title: Python f-Strings
description: Learn how to profile your Python code to find performance bottlenecks
date: 2023-12-12
draft: false
slug: python-f-strings
tags:
  - Python
  - Performance
---

Today, we’re diving into a new tutorial where we’ll explore a fantastic feature in Python — F-Strings.

## What are f-strings?
-----------------------

*   F-Strings in Python provide a straightforward way to format strings.
*   You’ll need version 3.6 or higher to leverage this feature.

## Uses of f-strings
-----------------

*   Can be used for debugging, such as in print statements or logs.
*   Can be used for assigning formatted or transformed string value to a variable (You’ll understand what I mean by the end of the blog).

How to create an f-string
-------------------------

*   Add letter ‘f’ before defining a string. Example: `f"Namaste World"` .
*   Use curly braces to embed a python code (or a variable) in f-strings. Below is an example of how to use it -

```
name = "Gautam"
print("My name is " + name)  # Without f-string
print(f"My name is {name}")  # With f-string
# Output
# My name is Gautam
# My name is Gautam
```

Now that we have learnt how to define an f-string, let’s dive into some of the features of it.

## Debugging made easy
-------------------

Let’s say you have multiple variables defined like this

```
name = "Gautam"
place = "Bharat"
age = 26
```

You are planning to print all of the values. Your usual approach will be something like this -

```
print(f"name = {name}")
print(f"place = {place}")
print(f"age = {age}")
# Output
# name = Gautam
# place = Bharat
# age = 26
```

But the similar result can be achieved in fstring using `=`operator

```
print(f"{name = }")
print(f"{place = }")
print(f"{age = }")
# Output
# name = 'Gautam'
# place = 'Bharat'
# age = 26
```

Which gives us exactly same output but with much less effort.

> So that means, just adding ‘=’ after variable name inside curly braces will print the variable name with the value.

## Arithmetic and conversion operations

1.  **Basic arithmetic operations —**

```
num1 = 80
num2 = 20
print(f"The sum is {num1 + num2}")
# Output
# The sum is 100
```

Like addition, we can also perform subtraction, multiplication etc.

2. **Limiting decimal digits —**

```
pi = 22/7
print(f"{pi = }")
print(f"pi with 2 decimals = {pi:.2f}")    # .2f = only 2 decimal digits
print(f"pi with 4 decimals = {pi:.4f}")    # .4f = only 4 decimal digits
# Output
# pi = 3.142857142857143
# pi with 2 decimals = 3.14
# pi with 3 decimals = 3.1428
```

As the example above shows, `.nf` will limit the number of decimals to ’n’ digits.

3. **Conversion to binary** —

```
# Converting to binary
age = 26
print(f"My age = {age}")
print(f"My age in binary = {age:b}")    # b = binary. similar can be done for octal and hexadecimal
# Output
# My age = 26
# My age in binary = 11010
```

Now that you know how to convert a string to binary using f-strings, try finding out how to convert it to octal or hexadecimal by yourself.

4. **Comma separated integers —**

A normal integer number can be converted into a comma separated integer by just using this nifty little technique here -

```
# Comma separated integer
not_my_money = 123456789
print(f"{not_my_money = :0,}")
# Output
# not_my_money = 123,456,789
```

So, are you seeing common pattern here?

> `=` operator means name of the variable and the value must be displayed.
>
> `:` means an operation/transformation is to be performed on the value of the variable.

## Datetime to string using f-strings

```
from datetime import datetime
now = datetime.now()
# Conventional method
formatted_date_1 = now.strftime("%Y-%b-%d %H:%M:%S")
print(f"{formatted_date_1 = }")
# Using f-strings
formatted_date_2 = f"{now:%Y-%b-%d %H:%M:%S}"
print(f"{formatted_date_2 = }")
# Output
# formatted_date_1 = '2023-Dec-12 01:06:34'
# formatted_date_2 = '2023-Dec-12 01:06:34'
```

## Speed comparison with other string formatting methods

```
import timeit
string1 = "My name is {f_name}, I am {f_age}".format(f_name=name, f_age=age)  # str.format() method
string2 = "My name is %s, I am %d" % (name, age)  # % method
string3 = f"My name is {name}, I am {age}"  # f-string
print(f"{string1 = }")
print(f"{string2 = }")
print(f"{string3 = }")
method1 = lambda: string1
method2 = lambda: string2
method3 = lambda: string3
# Calculating avg time taken for each method
time1 = timeit.timeit(method1, number=100000)
time2 = timeit.timeit(method2, number=100000)
time3 = timeit.timeit(method3, number=100000)
print(f"Avg time taken by str.format() = {time1}")
print(f"Avg time taken by % operator = {time2}")
print(f"Avg time taken by f-strings = {time3}")
# Output
# string1 = 'My name is Gautam, I am 26'
# string2 = 'My name is Gautam, I am 26'
# string3 = 'My name is Gautam, I am 26'
# Avg time taken by str.format() = 0.006625500041991472
# Avg time taken by % operator = 0.00526219978928566
# Avg time taken by f-strings = 0.004289500182494521
```

So, as we can see in the output of the above code snippet, f-strings not only enhance code readability but also offer better performance compared to other formatting methods compared to other string formatting methods. Don’t hesitate to explore and implement them in your Python projects for a more concise and efficient syntax.

Happy coding!

**Other important links** -

*   **_Github:_** [_https://github.com/singhgautam7/tutorials/blob/main/Python/Videos/fstrings.py_](https://github.com/singhgautam7/tutorials/blob/main/Python/Videos/fstrings.py)
*   **_Youtube:_** [_https://www.youtube.com/watch?v=pvc5_Dm-LnU_](https://www.youtube.com/watch?v=pvc5_Dm-LnU)
