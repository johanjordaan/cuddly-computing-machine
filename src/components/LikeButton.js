'use strict';

class LikeButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = { liked: false };
    }

    render() {
        if (this.state.liked) {
            return jsx(this)(`
                <div>Liked.
                    <button className="btn btn-outline-secondary btn-sm" onClick={() => this.setState({ liked: false })}>
                        Unlike
                    </button>
                </div>
            `);
        }

        return jsx(this)(
            `
            <button className="btn btn-primary" onClick={() => this.setState({ liked: true })}>
                Like
            </button>
            `
        );
    }
}

