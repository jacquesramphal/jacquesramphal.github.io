# DynamicText Component

### Overview
The `DynamicText` component is a flexible Vue component designed to render text as plain text or HTML. It dynamically determines the rendering mode based on a Boolean prop. Below, you’ll find usage examples for Vue, plain HTML, and React.

### Features
- Renders text or HTML based on a prop.
- Allows dynamic tag rendering using the `as` prop.
- Accepts additional HTML attributes via the `attrs` prop.

### Usage

#### Vue
Here is the Vue implementation of the `DynamicText` component:

```
<template>
  <component :is="as" v-bind="attrs" v-if="isHtml" v-html="text" />
  <component :is="as" v-bind="attrs" v-else v-text="text" />
</template>
<script>
export default {
  name: "DynamicText",
  props: {
    as: {
      type: String,
      required: true,
      default: "p",
    },
    text: {
      type: String,
      default: "",
    },
    isHtml: {
      type: Boolean,
      default: false,
    },
    attrs: {
      type: Object,
      default: () => ({}),
    },
  },
};
</script>
```

To use the `DynamicText` component in a Vue application, ensure you have Vue set up in your project. Here’s how you can use it:

```
<template>
  <DynamicText :as="'p'" :text="textContent" :isHtml="false" />
</template>
<script>
import DynamicText from './DynamicText.vue';
export default {
  components: {
    DynamicText
  },
  data() {
    return {
      textContent: 'Hello, world!'
    };
  }
};
</script>

```

#### Plain HTML
For plain HTML, dynamic behavior based on the type of content isn’t directly supported, but you can mimic the behavior using JavaScript:

```
<!DOCTYPE html>
<html>
<head>
  <title>Dynamic Text Example</title>
</head>
<body>
  <div id="text-container"></div>
  <script>
    const textContent = "Hello, world!";
    const isHtml = false;
    const container = document.getElementById("text-container");
    if (isHtml) {
      container.innerHTML = textContent;
    } else {
      container.textContent = textContent;
    }
  </script>
</body>
</html>
```

#### React
In React, you can create a similar component that decides whether to render as plain text or HTML:

```
import React from 'react';
const DynamicText = ({ as: Component = 'p', text, isHtml, ...attrs }) => {
  return React.createElement(Component, {
    ...attrs,
    ...(isHtml ? { dangerouslySetInnerHTML: { __html: text } } : { children: text })
  });
};
export default DynamicText;
```

Here’s how you can use it in React:


```
import React from 'react';
const DynamicText = ({ as: Component = 'p', text, isHtml, ...attrs }) => {
  return React.createElement(Component, {
    ...attrs,
    ...(isHtml ? { dangerouslySetInnerHTML: { __html: text } } : { children: text })
  });
};
export default function App() {
  return (
    <div>
      <DynamicText as="p" text="Hello, React world!" isHtml={false} />
    </div>
  );
}
```

<!-- ### Contributing
Contributions are welcome. Please fork the repository and submit a pull request with your enhancements.

### License
This component is released under the MIT License, which allows free use, modification, and distribution. -->