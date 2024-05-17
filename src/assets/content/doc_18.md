# CSS Configuration Starter

### Overview
This CSS starter configuration is designed to provide a comprehensive scaffolding for styling a website. It includes a robust set of variables for colors, typography, spacing, and more, allowing for extensive customization. The configuration supports both light and dark themes and is structured to be easily adaptable to various design needs.

### Features
- **Color System**: Extensive color palette with easy-to-modify variables for different states and themes.
- **Typography**: Scalable typography using responsive font sizes, weights, and families.
- **Spacing**: A logical spacing system to maintain consistent layout throughout the design.
- **Responsive Design**: Media queries included for adapting to different devices, including print settings.
- **Utility Classes**: Ready-to-use utility classes for colors and shadows to speed up development.
- **Dark and Light Theme**: Pre-configured themes that can be easily toggled based on user preference or system settings.

### How to Use
1. **Incorporate the CSS File**
   - Download the CSS file and include it in your HTML with a `<link>` tag, or
   - Import it into your existing CSS using `@import`.

2. **Customization**
   - Modify the variables in the `:root` section to match your brand's color scheme and design aesthetics.
   - Adjust font families to the typefaces you're using by replacing the URL in the `@font-face` rule.

3. **Utility Classes**
   - Apply utility classes directly to HTML elements to quickly add colors, backgrounds, and shadows.

### Example Usage
```html
<!DOCTYPE html>
<html>
<head>
    <link rel="stylesheet" href="path-to-your-css/starter.css">
</head>
<body>
    <div class="lightgrey">This is a light grey box.</div>
    <p class="opacity">This paragraph will have reduced opacity.</p>
</body>
</html>
