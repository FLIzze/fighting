class Props {
    constructor() {
        this.props = new Set();
    }

    /**
     * @param {{ x: number, y: number }} cords
     * @param {{ width: number, height: number }} size
     **/
    addProp(cords, size) {
        this.props.add(cords, size);
    }

    /**
     * @returns {Set<{ x: number, y: number, width: number, height: number }>}
     **/
    getProps() {
        return this.props;
    }
}

export default Props;
