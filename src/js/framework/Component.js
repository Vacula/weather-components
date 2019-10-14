export default class Component {
    constructor(host, porps={}){
        this.host = host;
        this.props = porps;
        this._render();
    }
    _render(){
        this.host.innerHTML = '';
        let content = this.render();

        if(typeof content === 'string') {
            this.host.innerHTML = content;
        } else {
            content.map(item => {
                if(typeof item === 'string') {
                    const htmlElement = document.createElement('div');
                    htmlElement.innerHTML = item;
                    return htmlElement;
                } else {
                    if(typeof item.tag === 'function'){
                        const container = document.createElement('div');
                        new item.tag(container, item.props);
                        return container;
                    }
                    return item;
                }
            }) // [string|HTMLElement] => [HTMLElement]
                .forEach(htmlElement => {
                    this.host.appendChild(htmlElement)
                })
        }

    }
    /* @returns {string|[string|HTMLElement]}*/
    render(){

    }
}