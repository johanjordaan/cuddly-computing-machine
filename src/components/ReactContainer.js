'use strict';

const jsx = (ctx) => {
    return (code) => {
        const newCode = code.replaceAll("this.","thisByAnyOtherName.");
        try {
            const result = window.Babel.transform(newCode, { presets: ['es2015', 'react']});
            let thisByAnyOtherName = ctx
            return eval(result.code);
        } catch(err) {
            return err.message
        }
    }
}

class ReactContainer extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return jsx(this)(`
            <div>
                <LikeButton></LikeButton>
                <InterpolationCtl name="Radius"></InterpolationCtl>
                <InterpolationCtl name="Tilt"></InterpolationCtl>
                <hr/>
                <CanvasCtl></CanvasCtl>
            </div>
        `)
    }
}

const bindReactContainer = (selector) => {
    const domContainer = document.querySelector(selector);
    ReactDOM.render(React.createElement(ReactContainer), domContainer);
}
