'use strict';

class CanvasCtl extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            width: 640,
            height: 480,
            ctx: null
        };
        this.clear = this.clear.bind(this);
        this.update = this.update.bind(this);
        this.get_ctx = this.get_ctx.bind(this);

    }

    get_ctx() {
        if(this.state.ctx === null) {
            let c = document.getElementById("canvas");  // TODO: Use generated name rather than canvas
            this.state.ctx = c.getContext("2d");
        }
        return this.state.ctx;
    }

    clear() {
        let ctx = this.get_ctx();
        ctx.beginPath();
        ctx.fillStyle = 'rgba(255,255,255,1)';
        ctx.fillRect(0, 0, this.state.width, this.state.height);
        ctx.stroke();
    }

    update() {
        let ctx = this.get_ctx();
        draw_wave(
            ctx,
            this.state.width/2,
            this.state.height/2,
            0,
            250,
            true
        );
    }

    render() {
        this.state.ctx = null;
        return jsx(this)(
            `
                <div className="CanvasCtl">
                    <button type="button" className="btn btn-sm clearBtn" onClick={this.clear}>Clear</button>
                    <button type="button" className="btn btn-primary" onClick={this.update}>Update</button>
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

