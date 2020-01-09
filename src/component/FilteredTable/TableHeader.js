import React from "react";
import OptionsPopover from "./OptionsPopover"

export default class TableHeader extends React.Component {
    constructor(props) {
        super(props);
        this.getFilterValue = this.getFilterValue.bind(this);
    }

    getFilterValue(n) {
        let result = "";
        this.props.filter.split(';').filter(f => f).map(f => f.split(',')).forEach(f => { if (f[0]*1 === n) result = f[1] });
        return result;
    }

    render() {
     return (
            <thead>
                <tr>
                    {
                        this.props.fields.map((name, i) => {
                            return (
                                <th key={i+1}>{name} 
                                    <OptionsPopover
                                        handleFilterChange={this.props.handleFilterChange}
                                        num={i + 1}
                                        currentFilter={this.props.currentFilter}
                                        filter={this.getFilterValue(i+1)}
                                    />
                                </th>)
                        })
                    }
                </tr>
            </thead>
        );
    }
}