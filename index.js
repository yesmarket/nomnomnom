import React from 'react';
import ReactDOM from 'react-dom';
import Graph from 'nomnoml';

class CanvasComponent extends React.Component {
    componentDidMount() {
    	this._drawGraph();
    }
    componentDidUpdate(){
    	this._drawGraph();
    }
    _drawGraph() {
		var source = 
			`#direction: right
			#fontSize: 10
			#lineWidth: 2
			#padding: 10
			#.activestategood: fill=#ADFF2F visual=roundrect
			#.activestatebad: fill=#FF0000 visual=roundrect
			#.inactivestate: fill=#CCC visual=roundrect
			#.decision: fill=#CCC visual=rhomb
			[<start>st] -> [<${(this.props.status==0)?'activestategood':'inactivestate'}>Origination Request Received]
			[Origination Request Received] - [<decision>Approved?]
			[Approved?] n -> [<${(this.props.status==1)?'activestatebad':'inactivestate'}>Risk Declined]
			[Risk Declined] -> [<end>e1]
			[Approved?] y -> [<${(this.props.status==2)?'activestategood':'inactivestate'}>Risk Approved]
			[Risk Approved] -> [<${(this.props.status==3)?'activestategood':'inactivestate'}>Contract Drafted]
			[Contract Drafted] - [<decision>Accepted?]
			[Accepted?] n -> [<${(this.props.status==4)?'activestatebad':'inactivestate'}>Contract Declined]
			[Contract Declined] -> [<end>e2]
			[Accepted?] y -> [<${(this.props.status==5)?'activestategood':'inactivestate'}>Contract Accepted]
			[Contract Accepted] -> [<${(this.props.status==6)?'activestategood':'inactivestate'}>Contract Activated]
			[Contract Activated] -> [<end>e3]`;
		Graph.draw(this.refs.canvas, source);
    }
    render() {
        return (
            <canvas ref="canvas"></canvas>
        );
    }
}

class TestComponent extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			status: 0
		};
		this.onClick = this.onClick.bind(this);
	}
	onClick(e) {
		this.setState(state => ({
			status: (state.status < 6 ? state.status+1 : 0)
		}));
	}
    render() {
        return (
        	<div>
            	<button onClick={this.onClick}>change state</button><br/>
            	<CanvasComponent status={this.state.status}/>
        	</div>
        );
    }
}

ReactDOM.render(<TestComponent/>, document.getElementById("root"));