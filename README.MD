# ARIA Slider
A Web Component for Slider element based on WAI-ARIA authoring practices.

## Demo
[Demo](https://rajasegar.github.io/wc-aria-slider)

Try to use UP, DOWN, RIGHT, LEFT ARROW KEYS, and also HOME, END, PAGE UP and PAGE DOWN keys
for navigating the slider value. Once the slider is focused you can either use mouse of keyboard for navigation.

Also test with a screen reader for ARIA compatibility if needed.


## Usage
Include the *aria-slider.js* file in your application.

```html
<aria-slider min="0" max="100" value="50"></aria-slider>
```

For update callbacks, pass on the event name to emit in case of update like below:

```html
<aria-slider min="0" max="100" value="50" on-update="update-red"></aria-slider>
```

Now listen for the corresponding events in your application:

```js
document.addEventListener('update-red', (event) => {
  let value = JSON.parse(event.detail).value;

  // Do something with the value

});


```


## Prerequisites for running demo in local server

Install Parcel using Yarn or npm:

Yarn:

` yarn global add parcel-bundler `

npm:

` npm install -g parcel-bundler `

## Installing
` git clone https://github.com/rajasegar/wc-aria-slider `

` npm install `


## Development server
`npm start`
or
`parcel index.html`

## Resources
- https://www.w3.org/TR/wai-aria-practices/#slider
- https://developers.google.com/web/fundamentals/web-components/customelements
