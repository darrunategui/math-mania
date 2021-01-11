import { Directive, ElementRef, HostListener, Input, OnDestroy } from '@angular/core';

import { NgControl, FormControl, AbstractControl } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil, pairwise, startWith } from 'rxjs/operators';

@Directive({
  selector: '[numericOnly]'
})
export class NumericOnlyDirective implements OnDestroy {

  private formControl: AbstractControl;
  private oldValue: string;
  private decimalCounter = 0;
  private destroyed$ = new Subject<void>();
  private navigationKeys = [
    'Backspace',
    'Delete',
    'Tab',
    'Escape',
    'Enter',
    'Home',
    'End',
    'ArrowLeft',
    'ArrowRight',
    'Clear',
    'Copy',
    'Paste'
  ];
  @Input() allowDecimal?= true;
  @Input() allowNegative?= true;
  @Input() decimalSeparator?= '.';

  constructor(private el: ElementRef, private control: NgControl) {
    // this.formControl = this.control.control;
    // this.oldValue = this.formControl.value;
    // this.formControl.valueChanges.pipe(
    //   takeUntil(this.destroyed$),
    //   startWith(this.formControl.value),
    //   pairwise()
    // ).subscribe(([prevValue, newValue]) => {
    //   this.oldValue = newValue == null ? null : prevValue
    //   console.log(`prev: ${prevValue}, new: ${newValue}`);
    // });
  }
  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  @HostListener('keydown', ['$event'])
  onKeyDown(e: KeyboardEvent) {
    if (
      this.navigationKeys.indexOf(e.key) > -1 || // Allow: navigation keys: backspace, delete, arrows etc.
      (e.key === 'a' && e.ctrlKey === true) || // Allow: Ctrl+A
      (e.key === 'c' && e.ctrlKey === true) || // Allow: Ctrl+C
      (e.key === 'v' && e.ctrlKey === true) || // Allow: Ctrl+V
      (e.key === 'x' && e.ctrlKey === true) || // Allow: Ctrl+X
      (e.key === 'a' && e.metaKey === true) || // Allow: Cmd+A (Mac)
      (e.key === 'c' && e.metaKey === true) || // Allow: Cmd+C (Mac)
      (e.key === 'v' && e.metaKey === true) || // Allow: Cmd+V (Mac)
      (e.key === 'x' && e.metaKey === true) || // Allow: Cmd+X (Mac)
      (this.allowDecimal && e.key === this.decimalSeparator && !this.nativeElementValue.includes(this.decimalSeparator)) || // Allow: only one decimal point
      (this.allowNegative && e.key === '-' && this.caretStartIndex === 0 && !this.nativeElementValue.includes('-')) // Allow: negative symbol at the beginning
    ) {
      // let it happen, don't do anything
      return;
    }

    // Ensure that it is a number and stop the keypress
    if (e.key === ' ' || isNaN(Number(e.key))) {
      e.preventDefault();
    }
  }

  @HostListener('paste', ['$event'])
  onPaste(event: ClipboardEvent) {
    const pastedInput: string = event.clipboardData.getData('text/plain');

    this.pasteText(pastedInput, event);
  }

  @HostListener('drop', ['$event'])
  onDrop(event: DragEvent) {
    const textData = event.dataTransfer.getData('text');
    this.el.nativeElement.focus();

    this.pasteText(textData, event);
  }

  private pasteText(input: string, event: Event) {
    if (!this.allowDecimal || (this.hasDecimalPoint && input.includes(this.decimalSeparator))) {
      // strip the decimal point from the input
      input = input.replace(/\./g, '');
    }
    if (!this.allowNegative) {
      // strip the negative symbol from the input
      input = input.replace(/\-/g, '');
    }

    let valueAfterPaste = this.nativeElementValue.substr(0, this.caretStartIndex) + input + this.nativeElementValue.substr(this.caretEndIndex);

    // read the string after inserting the text from left to right and strip any invalid characters
    for (let index = this.caretStartIndex, j = 0;
      j < input.length;
      index++, j++) {
      const subStr = valueAfterPaste.substr(0, index + 1);
      if (!this.isANumber(subStr)) {
        input = input.slice(0, j) + input.slice(j + 1);
        valueAfterPaste = valueAfterPaste.slice(0, this.caretStartIndex + j) + valueAfterPaste.slice(this.caretStartIndex + j + 1);
        index--;
        j--;
      }
    }
    document.execCommand('insertText', false, input);
    event.preventDefault();
  }

  private isANumber(text) {
    // https://stackoverflow.com/questions/175739/built-in-way-in-javascript-to-check-if-a-string-is-a-valid-number
    return !isNaN(text) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
      !isNaN(parseFloat(text)) // ...and ensure strings of whitespace fail
  }
  get nativeElementValue() {
    return this.el.nativeElement.value as string;
  }
  get hasDecimalPoint() {
    return this.el.nativeElement.value.includes(this.decimalSeparator);
  }
  get caretStartIndex() {
    return this.el.nativeElement.selectionStart as number;
  }
  get caretEndIndex() {
    return this.el.nativeElement.selectionEnd as number;
  }
}
