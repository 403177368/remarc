# Remarc

> A js library to dynamically calculate and set rem as the viewport width changing.

## Installation

``` bash
npm install remarc --save-dev
```

## Concepts

* **rem**: The font-size value of the root element, used as a unit in web document. 
* **designWidth**: The width of the design drawing that designer gave you.
* **viewportRatio**: The ratio of **viewportHeight** to **viewportWidth**.

## Usage

Import the package and it will calculate and set rem for you automatically, then start watching the change of the size of window. The default designWidth is 750px.

``` js
// In ES6 way:
import Remarc from 'remarc'; 

// Or in CommonJS way:
const Remarc = require('remarc');

// Bootstrap
Remarc.init();
```

If the width of your design drawing is not 750px but, for example, 720px, you can:

``` js
import Remarc from 'remarc';

Remarc.init({
  designWidth: 720
});
```

## API Reference

### Remarc.init(options?: Object)

Call **Remarc.update** method immediately for once, and call it when **'load'** or **'resize'** event of window happened.

#### options

* designWidth: number - The width of your design drawing.

* maxWidth: number - When the viewportWidth is greater than maxWidth, the rem will be calculated using maxWidth thus it will stay unchanged.

``` js
// The default designWidth is 750px
Remarc.init();
// Or you can init with a different designWidth
Remarc.init({
  designWidth: 720,
  maxWidth: 1000
});
```

### Remarc.update()

Calculate and update the **values** immediately when called.

### Remarc.get(name: string): number

Get the current value of the given name.

``` js
Remarc.get('rem')
Remarc.get('designWidth')
Remarc.get('viewportWidth')
Remarc.get('viewportHeight')
Remarc.get('viewportRatio')
```

### Remarc.onChange(handler: Function): Function

Add an event handler which will be called when any of the **values** are changed.

``` js
var fn = Remarc.onResize(() => {
  let rem = Remarc.get('rem');
  console.log('The current rem value is ' + rem);
});
// Remove the event handler when it's necessary
fn();
```

## License

MIT