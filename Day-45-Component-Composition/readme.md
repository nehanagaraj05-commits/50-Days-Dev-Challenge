# 🗓️ Day 45: Advanced Component Composition (Templates & Slots)

## 🎯 Problem Statement
Writing massive strings of HTML inside JavaScript using `innerHTML` is difficult to maintain and prone to formatting errors. Furthermore, highly reusable components (like Dialogs, Modals, or Dropdowns) need to accept dynamic content. A Modal's outer shell remains the same, but the inner message changes. Today, we solve this by utilizing the native `<template>` tag to define inert HTML, and the `<slot>` tag to create placeholder "windows" where developers can inject dynamic content into the Shadow DOM.

## 🛠️ Tech Stack & Focus Areas
* **Languages:** Vanilla JavaScript (ES8+), HTML5, CSS3
* **Core Concepts:** The `<template>` API, The `<slot>` API (Named and Default), Shadow DOM Node Cloning, Component Reusability.
* **Goal:** Engineer a highly flexible Modal component that consumes a native HTML template and accepts dynamic inner content via CSS slots.

## 📝 Task Requirements
1. **The Native Template:** Open `index.html`. At the very top of your `<body>`, create a `<template id="modal-template">`. Anything written inside this tag is completely ignored by the browser until JavaScript explicitly asks for it.
2. **The Slots:** Inside the template, build the HTML and CSS for a modal box. Create two slots: 
   * A named slot for the header: `<slot name="title">Default Title</slot>`
   * A default slot for the body: `<slot>Default Body</slot>`
3. **The Component Logic:** Create `components/CustomModal.js` and set up your standard `HTMLElement` class with an open Shadow DOM.
4. **Node Cloning:** In the `constructor()`, grab the template from the DOM: `const template = document.getElementById('modal-template');`. Then, clone its contents and append it to the shadow root: `this.shadowRoot.appendChild(template.content.cloneNode(true));`.
5. **Component Deployment:** Go back to `index.html`. Deploy two different instances of your new `<custom-modal>` tag. 
6. **Injecting the Content:** Inside the first modal tag, write `<h2 slot="title">Warning</h2>` and `<p>Are you sure you want to delete this?</p>`. The browser will automatically map your `<h2>` to the named slot, and your `<p>` to the default slot, merging the Light DOM with the Shadow DOM!

## 🚀 Bonus Challenge (Optional)
A modal isn't very useful if it can't be opened and closed! Add an `open` attribute to your Web Component. In your CSS, hide the modal by default, but show it if the `:host([open])` selector is active. Then, write a quick JavaScript function to toggle that attribute when a button is clicked.

## ⚠️ Common Pitfalls & Expected Bugs
* **The "Null" Template:** If your `<script>` tag loads your Web Component *before* the browser reads the `<template>` tag in the HTML, `document.getElementById('modal-template')` will return `null` and crash your component. Always use `defer` or place your scripts at the bottom of the body.
* **Styling Slotted Content:** CSS inside the Shadow DOM generally does *not* affect the slotted elements coming from the outside (the Light DOM). If you want to style slotted content from within the component, you must use the special `::slotted()` CSS pseudo-element.

## 🧠 Outcomes & Learnings
* Mastered the `<template>` tag for clean, performant UI rendering.
* Engineered React-style "children" composition using native HTML `<slot>` elements.
* Maximized UI reusability by separating structural logic from content.

## 📚 Resources & Documentation
* [MDN Web Docs: Templates and slots](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_templates_and_slots)
* [Web.dev: Shadow DOM v1: Slots](https://web.dev/shadowdom-v1/#composition-and-slots)

---

## 📱 LinkedIn Post Template

**Share your progress!** Copy this template, add your own thoughts, attach a screenshot of your two different modals, and post it to LinkedIn. 

> **Day 45/50 of the Web Development Challenge! 🚀**
>
> Today we pushed our UI Architecture to the next level with Advanced Component Composition. 🧩
>
> Hardcoding HTML strings into JavaScript classes is messy. To build truly reusable, scalable Web Components, I utilized the native HTML5 `<template>` and `<slot>` APIs. 
>
> By writing inert UI shells in a template and cloning the DOM nodes directly into the Shadow DOM, the component architecture becomes incredibly clean. More importantly, the `<slot>` API allows us to project dynamic, external HTML directly into the component's protected layout—perfectly mirroring React's `children` pattern, but using standard browser protocols. 
> 
> 🔗 Source Code: [Link to your GitHub Repo]
> 
> #50daysdev #50daysweb #JavaScript #WebComponents #ShadowDOM #FrontendEngineering #CodingChallenge