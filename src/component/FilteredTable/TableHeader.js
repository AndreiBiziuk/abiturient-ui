import React from "react";
import OptionsPopover from "./OptionsPopover"

export default class TableHeader extends React.Component {
    constructor(props) {
        super(props);
        this.getFilterValue = this.getFilterValue.bind(this);
        this.getSortValue = this.getSortValue.bind(this);
    }

    getFilterValue(n) {
        let result = "";
        this.props.filter.split(';').filter(f => f).map(f => f.split(',')).forEach(f => { if (f[0]*1 === n) result = decodeURIComponent(atob(f[1])) });
        return result;
    }

    getSortValue(n){
        let result = 0;
        this.props.sort.split(",").filter(s => s).forEach(s => { if(n === Math.abs(s)) result = Math.sign(s) });
        return result;
    }

    render() {
     return (
            <thead>
                <tr>
                    {
                        this.props.fields.map((name, i) => {
                            return (
                                <th key={i+1}>{name} <br/>
                                    <OptionsPopover
                                        handleFilterChange={this.props.handleFilterChange}
                                        handleSortChange={this.props.handleSortChange}
                                        num={i + 1}
                                        currentFilter={this.props.currentFilter}
                                        filter={this.getFilterValue(i+1)}
                                        sort={this.getSortValue(i+1)}
                                    />
                                </th>)
                        })
                    }
                </tr>
            </thead>
        );
    }
}