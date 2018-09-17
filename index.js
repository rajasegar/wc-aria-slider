(function() {

  const RAIL_WIDTH = 300;

  const THUMB_WIDTH = 8;

  const KEYCODES = {
      'left': 37,
      'up': 38,
      'right': 39,
      'down': 40,
      'pageUp': 33,
      'pageDown': 34,
      'end': 35,
      'home': 36
  };


  const template = document.createElement('template');
  template.innerHTML = `
  <style>
:host {
    --slider-bg: #eee;
    --slider-border: #888;
    --slider-thumb-border: var(--slider-border);
    --slider-thumb-top-border: #666;
    --slider-thumb-left-border: var(--slider-thumb-top-border);
    --slider-thumb-bg: #ddd;
    --slider-thumb-active-bg: #def;
    --slider-thumb-active-outline: #888;
    --slider-active-bg: #aaa;
}

.aria-widget-slider {
    margin-top: 0.5em;
    margin-bottom: 0.5em;
    height: 4em;
}

.rail {
    margin: 2px;
    padding: 1px;
    background-color: var(--slider-bg);
    border: 1px solid var(--slider-border);
    position: relative;
    top: 2em;
    height: 4px;
    width: 300px;
}



.rail.focus {
    background-color: var(--slider-active-bg);
}

.value  {
    width:      2em;
    text-align: right;
    position: relative;
    left: 310px;
    top: 16px;
}

.thumb  {
    border: 1px solid var(--slider-thumb-border);
    border-top-color:  var(--slider-thumb-top-border);
    border-left-color: var(--slider-thumb-left-border);
    background-color: var(--slider-thumb-bg);
    position: relative;
    width:8px;
    height:28px;
    top:-14px;
}

.thumb.focus,
.thumb:hover {
    outline: 2px solid var(--slider-thumb-active-outline);
    background-color: var(--slider-thumb-active-bg);
}
</style>
<div class="aria-widget-slider">
   <div class="rail" >
    <div id="idRedValue"
           role="slider"
           tabindex="0"
           class="thumb"
           aria-valuemin="0"
           aria-valuenow="0"
           aria-valuemax="255"
           aria-labelledby="idRed">
      </div>
  </div>
  <div class="value">0</div>
</div>
`;
  class ARIASlider extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({mode: 'open'});
      this.shadowRoot.appendChild(template.content.cloneNode(true));


      this.addEventListener('focus', this._onFocus);
      this.addEventListener('blur', this._onBlur);
      let $thumb = this.shadowRoot.querySelector('.thumb');
      $thumb.addEventListener('keydown', this._onKeyDown.bind(this));
      $thumb.addEventListener('mousedown', this._onMouseDown.bind(this));
    }

    _onFocus(event) {
      const $rail = this.shadowRoot.querySelector('.rail');
      const $thumb = this.shadowRoot.querySelector('.thumb');
      $rail.classList.add('focus');
      $thumb.classList.add('focus');
    }

    _onBlur(event) {
      const $rail = this.shadowRoot.querySelector('.rail');
      const $thumb = this.shadowRoot.querySelector('.thumb');
      $rail.classList.remove('focus');
      $thumb.classList.remove('focus');
    }

    connectedCallback() {
      this._moveSliderTo(this.getAttribute('value'));
    }


    _onKeyDown(event) {
    var flag = false;

    let currentVal = this.currentValue;
    switch (event.keyCode) {
      case KEYCODES.left:
      case KEYCODES.down:
        this._moveSliderTo(currentVal - 1);
        flag = true;
        break;

      case KEYCODES.right:
      case KEYCODES.up:
        this._moveSliderTo(currentVal + 1);
        flag = true;
        break;

      case KEYCODES.pageDown:
        this._moveSliderTo(currentVal - 10);
        flag = true;
        break;

      case KEYCODES.pageUp:
        this._moveSliderTo(currentVal + 10);
        flag = true;
        break;

      case KEYCODES.home:
        this._moveSliderTo(this.get('minValue'));
        flag = true;
        break;

      case KEYCODES.end:
        this._moveSliderTo(this.get('maxValue'));
        flag = true;
        break;

      default:
        break;
    }

    if (flag) {
      event.preventDefault();
      event.stopPropagation();
    }
    }

    _onMouseDown(e) {
    let parentNode = e.target.parentNode;
    let minValue = this.getAttribute('min');
    let maxValue = this.getAttribute('max');

    let handleMouseMove = (event) => {

      let diffX = event.pageX - parentNode.offsetLeft;
      let valueNow = minValue + parseInt(((maxValue - minValue) * diffX) / RAIL_WIDTH);
      this._moveSliderTo(valueNow);

      event.preventDefault();
      event.stopPropagation();
    };

    var handleMouseUp = function() {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    // bind a mousemove event handler to move pointer
    document.addEventListener('mousemove', handleMouseMove);

    // bind a mouseup event handler to stop tracking mouse movements
    document.addEventListener('mouseup', handleMouseUp);

    e.preventDefault();
    e.stopPropagation();

    // Set focus to the clicked handle
    e.target.focus();

    }

    _moveSliderTo(value) {
      let minValue = Number(this.getAttribute('min'));
      let maxValue = Number(this.getAttribute('max'));

      let _value = Number(value);

      if (_value < minValue) {
        _value = minValue;
      }

      if (_value > maxValue) {
        _value = maxValue;
      }

      this.currentValue = _value;
      this.setAttribute('value', _value);
      let $value = this.shadowRoot.querySelector('.value');
      $value.textContent = _value;

      // Emit custom event;
      let _onUpdate = this.getAttribute('on-update');
      let eventDetails = JSON.stringify({ value: _value});
      this.dispatchEvent(new CustomEvent(_onUpdate, {
        bubbles: true,
        composed: true,
        detail: eventDetails
      }));


      let pos = Math.round((_value * RAIL_WIDTH) / (maxValue - minValue)) - (THUMB_WIDTH / 2);

      let $thumb = this.shadowRoot.querySelector('.thumb');

      $thumb.style.left = `${pos}px`;

    }

    updateARIAValues() {

    }
  }

  window.customElements.define('aria-slider', ARIASlider);

}());
