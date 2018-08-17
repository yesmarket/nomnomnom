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
			#.activestate: fill=#ADFF2F visual=roundrect
			#.inactivestate: fill=#CCC visual=roundrect
			#.decision: fill=#CCC visual=rhomb
			[<start>st] -> [<${(this.props.status==0)?'activestate':'inactivestate'}>saved]
			[saved] -> [<${(this.props.status==1)?'activestate':'inactivestate'}>deposit]
			[deposit] -> [<${(this.props.status==2)?'activestate':'inactivestate'}>email]
			[email] - [<decision>dispatched?]
			[dispatched?] y -> [<end>e]
			[dispatched?] -> n [<${(this.props.status==3)?'activestate':'inactivestate'}>mail]
			[mail] -> [<end>e]`;
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
			status: (state.status < 3 ? state.status+1 : 0)
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