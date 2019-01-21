/**
 * String to HashCode
 * @param str
 */
function hashCode(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    return hash;
}

/**
 * HashCode to RBG
 * @param i
 */
function intToRGB(i) {
    const c = (i & 0x00FFFFFF)
        .toString(16)
        .toUpperCase();

    return `#${'00000'.substring(0, 6 - c.length) + c}`;
}

export default class Logger {
    /**
     * @constructor
     * @param componentName
     */
    constructor(componentName) {
        this._componentName = componentName;
    }

    /**
     * Log one or more messages
     * @param arg
     * @param ...rest
     */
    log(arg, ...rest) {
        if (typeof arg === 'string' || arg instanceof String) {
            const formattedMessage = `[${this._componentName}] ${arg}`;
            this.toConsole(formattedMessage);
        } else {
            console.log(arg);
        }
        rest.forEach((additionalArgument) => this.log(additionalArgument));
    }

    /**
     * Log an error
     * @param error
     * @param message
     */
    error(error, message) {
        const formattedMessage = `[${this._componentName}] ERROR: ${message}`;
        this.toConsole(formattedMessage, 'log', 'Red');
        this.toConsole(error, 'error');
    }

    /**
     * Stringify and log
     * @param {*} obj - any object without circular references
     * @param {String} message - an optional message
     */
    stringify(obj, message = '') {
        try {
            const formattedMessage = `[ ${this._componentName} ] ${message} ${JSON.stringify(obj)}`;
            this.toConsole(formattedMessage);
        } catch (error) {
            this.error(error);
        }
    }

    /**
     * Handles the actual logging
     * @param message {*}
     * @param {String} type
     * @param {String} colorOverride
     */
    toConsole(message, type = 'log', colorOverride = null) {
        const color = colorOverride || intToRGB(hashCode(this._componentName));

        if (typeof window.console !== 'undefined' && type in window.console) {
            switch (type) {
                case 'log':
                    console[type](`%c${message}`, `color:${color}`);
                    break;
                case 'error':
                    console[type](message);
                    console.trace();
                    break;
                default:
                    console[type](message);
            }
        }
    }
}
