'use strict';

class FNStepperCtl extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            y_from: undefined,
            y_to:undefined,
            steps:undefined,
            type:"Linear",
        };
    }

    render() {
        return jsx(this)(
            `
            <form>
                <div className="row">
                    <div className="col col-sm-1 x">                    
                        <input type="text" className="form-control form-control-sm" placeholder="y_from"/>
                    </div>
                    <div className="col col-sm-1 x">                    
                        <input type="text" className="form-control form-control-sm" placeholder="y_to"/>
                    </div>
                    <div className="col col-sm-1 x">                    
                        <input type="text" className="form-control form-control-sm" placeholder="steps"/>
                    </div>
                    <div className="col col-sm-2">      
                        <select className="form-control form-control-sm" id="type">
                            <option>Linear</option>
                        </select>
                    </div>
                    <div className="col col-sm-1 x">                    
                        <input type="text" className="form-control form-control-sm" placeholder="m"/>
                    </div>
                    <div className="col col-sm-1 x">                    
                        <input type="text" className="form-control form-control-sm" placeholder="c"/>
                    </div>
                </div>
            </form>
            `
        );
    }
}

