'use strict';

class InterpolationCtl extends React.Component {
    constructor(props) {
        super(props);
    }

    render_select() {
        return jsx(this)(
          `
           <div className="col col-sm-2">      
                <select className="form-control form-control-sm" id="interpolation_type">
                    <option>Linear</option>
                    <option>Stacked Linear</option>
                    <option>Projection</option>
                    <option>Stacked Projection</option>
                </select>
           </div>
          `
        );
    }


    render() {
        return jsx(this)(
            `
            <form>
                <div className="row">
                    <div className="col col-sm-1">      
                        <label htmlFor="interpolation_type" className="col-sm-1 col-form-label">{this.props.name}</label>
                    </div>

                    {this.render_select()}
                

                        <div className="col col-sm-1 x">                    
                            <input type="text" className="form-control form-control-sm" placeholder="from"/>
                        </div>
    
                        <div className="col col-sm-1 x">                    
                            <input type="text" className="form-control form-control-sm" placeholder="to"/>
                        </div>
    
                        <div className="col col-sm-1 x">                    
                            <input type="text" className="form-control form-control-sm" placeholder="num steps"/>
                        </div>
                    
                </div>
            </form>
            `
        );
    }
}

