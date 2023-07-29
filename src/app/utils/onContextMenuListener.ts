"use client"

export default function onContextMenuListener() {
  window.oncontextmenu = function (event: any) {
    // eslint-disable-next-line no-console
    console.log(event); // prints [object PointerEvent]

    const pointerEvent = event as PointerEvent;
    // eslint-disable-next-line no-console
    console.log(`window.oncontextmenu: ${pointerEvent.pointerType}`);

    if (pointerEvent.pointerType === 'touch') {
      // context menu was triggerd by long press
      return false;
    }

    // just to show that pointerEvent.pointerType has another value 'mouse' aka right click
    if (pointerEvent.pointerType === 'mouse') {
      // context menu was triggered by right click
      return true;
    }

    // returning true will show a context menu for other cases
    return true;
  };
}