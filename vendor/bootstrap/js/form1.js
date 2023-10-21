class MagicFocus {
    constructor(parent) {
      this.parent = parent;
  
      if (!this.parent) return;
  
      this.focus = document.createElement('div');
      this.focus.classList.add('magic-focus');
      this.parent.classList.add('has-magic-focus');
      this.parent.appendChild(this.focus);
  
      for (const input of this.parent.querySelectorAll('input, textarea, select')) {
        input.addEventListener('focus', () => {
          this.show();
        });
        input.addEventListener('blur', () => {
          this.hide();
        });
      }
    }
  
    show() {
      const el = document.activeElement;
  
      if (!['INPUT', 'SELECT', 'TEXTAREA'].includes(el.nodeName)) return;
  
      clearTimeout(this.reset);
  
      const focusedElement = ['checkbox', 'radio'].includes(el.type)
        ? document.querySelector(`[for=${el.id}]`)
        : el;
  
      this.focus.style.top = `${focusedElement.offsetTop || 0}px`;
      this.focus.style.left = `${focusedElement.offsetLeft || 0}px`;
      this.focus.style.width = `${focusedElement.offsetWidth || 0}px`;
      this.focus.style.height = `${focusedElement.offsetHeight || 0}px`;
    }
  
    hide() {
      const el = document.activeElement;
  
      if (!['INPUT', 'SELECT', 'TEXTAREA', 'LABEL'].includes(el.nodeName)) {
        this.focus.style.width = 0;
      }
  
      this.reset = setTimeout(() => {
        this.focus.removeAttribute('style');
      }, 200);
    }
  }
  
  window.magicFocus = new MagicFocus(document.querySelector('.form'));
  
  $(function() {
    $('.select').customSelect();
  });
  