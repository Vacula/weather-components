import Component from '../../framework/Component';
import {Temperature} from '../Temperature'
import {Wind} from '../Wind'

export default class App extends Component{
    constructor(host){
        super(host)
    }

    render(){
        // const t1 = document.createElement('div');
        // new Temperature(t1, {temperature: 7, unit: 'C'});
        // const w1 = document.createElement('div');
        // new Wind(w1, {speed: 27, unit: 'mps'});

        /*
        <div></div>
        <Temperature temp="7" unit="C"/>
       Декларативный подход - только описываем.
        */
        return ['Range',
            {
            tag: Temperature,
            props:{
                temperature: 17,
                unit: 'C',
            },
        },
        {
            tag: Wind,
            props:{
                speed: 27,
                unit: 'mps',
            },
        }
        ]
    }
}

