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
            content.map(this._vDomPrototypeElementToHtmlElement) // [string|HTMLElement] => [HTMLElement]
                .forEach(htmlElement => {
                    this.host.appendChild(htmlElement)
                })
        }

    }
    /* @returns {string|[string|HTMLElement]}*/
    render(){

    }

    /**
     *
     * @param {string|HTMLElement|Object} element
     * @private
     */
    _vDomPrototypeElementToHtmlElement(element){
        if(typeof element === 'string') {
            const htmlElement = document.createElement('div');
            htmlElement.innerHTML = element;
            return htmlElement;
        } else {
            if(element.tag){
                if(typeof element.tag === 'function'){
                    const container = document.createElement('div');
                    new element.tag(container, element.props);
                    return container;
                } else {
                    //string
                    const container = document.createElement('div');
                    if(element.content){
                        container.innerHTML = element.content
                    }
                    //element props let should array
                    ['classList', 'attributes'].forEach(item => {
                        if(element.item && !Array.isArray(element.item)){
                            element[item] = [element[item]]
                        }
                    });
                    if(element.classList){
                        container.classList.add(...element.classList)
                    }
                    if(element.attributes){
                        element.attributes.forEach(attributeSpec => {
                            container.setAttribute(attributeSpec.name, attributeSpec.value)
                        })
                    }
                    return container;
                }
            }
            return element;
        }
    }
}