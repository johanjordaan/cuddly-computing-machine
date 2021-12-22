'use strict';

class CanvasCtl extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            width: 640,
            height: 480,
            ctx: null
        };
        this.clear = this.clear.bind(this)
    }

    get_ctx() {
        if(this.state.ctx === null) {
            let c = document.getElementById("canvas");  // TODO: Use generated name rather than canvas
            this.state.ctx = c.getContext("2d");
        }
        return this.state.ctx;
    }

    clear() {
        clear_canvas(this.get_ctx(), this.state.width,this.state.height);
    }

    render() {
        this.state.ctx = null;
        return jsx(this)(
            `
                <div className="CanvasCtl">
                    <button type="button" className="btn btn-sm clearBtn" onClick={this.clear}>Clear</button>
                    <canvas
                            id="canvas"
                            className="canvas"
                            width={this.state.width}
                            height={this.state.height}
                    >
                        Your browser does not support the HTML canvas tag.
                    </canvas>
                </div>
            `
        );
    }
}

