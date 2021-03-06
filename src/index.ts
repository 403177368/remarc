const htmlElem = document.querySelector('html');
const bodyElem = document.querySelector('body');

// Create a <div> element and insert it into <body>.
// By this div element we can get viewportWidth and viewportHeight.
const viewportElem = document.createElement('div');
viewportElem.style.cssText += 'position:fixed; width:100%; height:100%; display:none;';
bodyElem.insertBefore(viewportElem, bodyElem.firstChild);

type EventHandler = () => void;
type Hooks = {
  change: Array<EventHandler>;
};

class Adapter {
  private initialized = false;
  private callingHooks = false;
  private designWidth = 750;
  private maxWidth = Infinity;
  private rem = 0;
  private viewportWidth = 0;
  private viewportHeight = 0;
  private viewportRatio = 0;
  private hooks: Hooks;

  constructor() {
    this.hooks = {
      change: []
    };
    // this.init();
  }
  init(options: any) {
    if (options.designWidth) {
      if (typeof options.designWidth !== 'number') {
        throw new TypeError(`[remarc] Expect designWidth to be a number.`);
      }
      this.designWidth = options.designWidth;
    }
    if (options.maxWidth) {
      if (typeof options.maxWidth !== 'number') {
        throw new TypeError(`[remarc] Expect maxWidth to be a number.`);
      }
      this.maxWidth = options.maxWidth;
    }
    if (this.initialized === false) {
      window.addEventListener('resize', this.update.bind(this));
      document.addEventListener('DOMContentLoaded', () => {
        this.update();
      });
    }
    this.update();
    this.initialized = true;
  }
  get(name?: string) {
    if (!name) return;
    if ([
      'designWidth', 'rem', 
      'viewportWidth', 'viewportHeight', 'viewportRatio'
    ].indexOf(name) < 0) {
      throw new Error(`[remarc] Invalid value name ${name}`);
    }
    return this[name];
  }
  update() {
    if (this.callingHooks) {
      throw new Error('You can\'t call \`Remarc.update\` within an event handler.');
    }

    setTimeout(() => {
      // Get width and height of current viewport
      viewportElem.style.display = 'block';
      const width = Number(
        document.defaultView.getComputedStyle(
          viewportElem
        ).width.replace(/px/, '')
      );
      const height = Number(
        document.defaultView.getComputedStyle(
          viewportElem
        ).height.replace(/px/, '')
      );

      // Update viewportWidth, viewportHeight and viewportRatio
      this.viewportWidth = width;
      this.viewportHeight = height;
      this.viewportRatio = height / width;
      viewportElem.style.display = 'none';

      // Calculate and update the value of rem
      if (width <= this.maxWidth) {
        this.rem = 100 * width / this.designWidth;
      } else {
        this.rem = 100 * this.maxWidth / this.designWidth;
      }
      htmlElem.style.fontSize = this.rem + 'px';

      // Call the hooks
      this.callHooks('change');
    }, 100);

  }
  onChange(handler: EventHandler) {
    if (typeof handler !== 'function') {
      throw new TypeError('[soap-rem] Expect the callback to be a function.');
    }
    this.hooks['change'].push(handler);
    return this.removeHook.bind(this, this.hooks['change'], handler);
  }
  callHooks(eventName: string) {
    this.hooks[eventName].forEach((hook: EventHandler) => {
      if (typeof hook === 'function') {
        hook();
      }
    });
  }
  removeHook(arr: Array<EventHandler>, fn: EventHandler) {
    const index = arr.indexOf(fn);
    arr.splice(index, 1);
  }

}

const adapter = new Adapter();

const Remarc = {
  init: adapter.init.bind(adapter),
  get: adapter.get.bind(adapter),
  onChange: adapter.onChange.bind(adapter),
  update: adapter.update.bind(adapter),
};

export default Remarc;
