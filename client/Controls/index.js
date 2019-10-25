export const keyMapper = (callbackList) => {
    let keysdown = {
    };

    document.addEventListener('keydown', evt => {
        if (!(evt.key in keysdown)) {
            keysdown[evt.key] = true;
            callbackList.forEach(callback => callback(keysdown));
        }
    });

    document.addEventListener('keyup', evt => {
        delete keysdown[evt.key];

        callbackList.forEach(callback => callback(keysdown));
    });
}

export const mouseMapper = (canvas, callbackList, tileEngine) => {
    let mouseEvent = {
    }
    const downEvt = (evt) => {
        evt.preventDefault();
        let { sx, sy } = tileEngine;
        let x = evt.pageX;
        let y = evt.pageY;
        mouseEvent[evt.button] = { x, y, sx, sy }
        callbackList.forEach(callback => callback(mouseEvent));
    }

    const upEvt = (evt) => {
        evt.preventDefault();
        delete mouseEvent[evt.button];
        callbackList.forEach(callback => callback(mouseEvent));
    }

    canvas.oncontextmenu = function () {
        return false;
    }

    canvas.addEventListener('mousedown', downEvt, false);
    canvas.addEventListener('touchstart', downEvt, false);

    canvas.addEventListener('mouseup', upEvt, false);
    canvas.addEventListener('touchend', upEvt, false);
}
