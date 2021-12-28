'use strict';

class FNStepperCtl extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            y_from: undefined,
            y_to:undefined,
            steps:undefined,
            type:'linear',
            parameter_lookup:{
                'linear':FN_Linear.parameters
            }
        };
    }

    render() {
        return jsx(this)(
            `
            <form>
                <div className="row">
                    <div className="col col-sm-1">      
                        <label htmlFor="y_from" className="col-sm-1 col-form-label">{this.props.name}</label>
                    </div>
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
                            <option value="linear">Linear</option>
                        </select>
                    </div>
                    {this.state.parameter_lookup[this.state.type].filter((p)=>{return !p.dependent}).map((p)=>{
                        return(
                            <div className="col col-sm-1 x">                    
                                <input type="text" className="form-control form-control-sm" placeholder={p.label}/>
                            </div>
                        );
                    })}
                </div>
            </form>
            `
        );
    }
}

